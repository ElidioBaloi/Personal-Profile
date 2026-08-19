document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (themeToggle) {
    const icon = themeToggle.querySelector('.material-symbols-outlined');

    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      if (icon) {
        icon.textContent = html.classList.contains('dark') ? 'dark_mode' : 'light_mode';
      }
    });
  }

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
    };

    const openMenu = () => {
      mobileMenu.classList.add('is-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenuToggle.querySelector('.material-symbols-outlined').textContent = 'close';
    };

    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  const contactDropdown = document.getElementById('contact-dropdown');
  const contactToggle = document.getElementById('contact-toggle');
  const contactMenu = document.getElementById('contact-menu');

  if (contactDropdown && contactToggle && contactMenu) {
    const closeContactMenu = () => {
      contactDropdown.classList.remove('is-open');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactToggle.setAttribute('aria-label', 'Open contact options');
      contactMenu.setAttribute('aria-hidden', 'true');
    };

    contactToggle.addEventListener('click', () => {
      const isOpen = contactDropdown.classList.toggle('is-open');
      contactToggle.setAttribute('aria-expanded', String(isOpen));
      contactToggle.setAttribute('aria-label', isOpen ? 'Close contact options' : 'Open contact options');
      contactMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!contactDropdown.contains(event.target)) {
        closeContactMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeContactMenu();
      }
    });
  }

  const shaderCanvas = document.getElementById('shader-container');
  if (shaderCanvas) {
    const gl = shaderCanvas.getContext('webgl');

    if (gl) {
      const resizeCanvas = () => {
        const rect = shaderCanvas.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));

        if (shaderCanvas.width !== width || shaderCanvas.height !== height) {
          shaderCanvas.width = width;
          shaderCanvas.height = height;
        }
      };

      resizeCanvas();

      const vertexShaderSource = `
        attribute vec2 position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `
        precision highp float;

        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;

        void main() {
          vec2 uv = v_texCoord;
          vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
          float t = u_time * 0.4;
          vec3 color = vec3(0.0);

          for (float i = 1.0; i < 4.0; i++) {
            p.x += 0.3 / i * sin(i * 3.0 * p.y + t + u_mouse.x / u_resolution.x);
            p.y += 0.3 / i * cos(i * 3.0 * p.x + t + u_mouse.y / u_resolution.y);

            color += 0.1 / abs(length(p) - 0.5) * vec3(
              0.5 + 0.5 * sin(t + i),
              0.5 + 0.5 * sin(t + i + 2.0),
              0.5 + 0.5 * sin(t + i + 4.0)
            );
          }

          color *= 0.3;
          float d = length(uv - 0.5);
          color *= smoothstep(0.8, 0.2, d);

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const compileShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      const program = gl.createProgram();

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1.0, -1.0,
           1.0, -1.0,
          -1.0,  1.0,
          -1.0,  1.0,
           1.0, -1.0,
           1.0,  1.0,
        ]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
      const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      });

      const renderShader = (time) => {
        resizeCanvas();
        gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
        gl.uniform1f(timeLocation, time * 0.001);
        gl.uniform2f(resolutionLocation, shaderCanvas.width, shaderCanvas.height);
        gl.uniform2f(mouseLocation, mouseX, mouseY);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(renderShader);
      };

      requestAnimationFrame(renderShader);
    }
  }

  const threeContainer = document.getElementById('three-container');
  if (threeContainer && window.THREE) {
    const width = threeContainer.clientWidth || 400;
    const height = threeContainer.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    threeContainer.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.3,
    });
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      emissive: 0x111111,
    });

    const points = [];
    const pointCount = 20;

    for (let i = 0; i < pointCount; i++) {
      const point = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      points.push(point);

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(point);
      group.add(sphere);
    }

    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        if (points[i].distanceTo(points[j]) < 1.5) {
          const geometry = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
          const line = new THREE.Line(geometry, lineMaterial);
          group.add(line);
        }
      }
    }

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const animateScene = () => {
      requestAnimationFrame(animateScene);
      group.rotation.y += 0.005;
      group.rotation.x += 0.003;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const w = threeContainer.clientWidth || 400;
      const h = threeContainer.clientHeight || 400;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    animateScene();
  }
});
