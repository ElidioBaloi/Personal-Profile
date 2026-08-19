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

  const bookingModal = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookingFormView = document.getElementById('booking-form-view');
  const bookingConfirmation = document.getElementById('booking-confirmation');
  const bookingError = document.getElementById('booking-error');
  const specialtySelect = document.getElementById('specialty');
  const pediatricFields = document.getElementById('pediatric-fields');
  const preferredDate = document.getElementById('preferred-date');
  const timeSlot = document.getElementById('time-slot');
  const timeSlotHint = document.getElementById('time-slot-hint');
  const bookingConfig = {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    ownerEmail: 'elidiobaloi@gmail.com',
  };
  const bookingStoreConfig = {
    endpoint: '',
    adminApiKey: '',
  };

  const isEmailConfigured = () => Object.values(bookingConfig).every((value) => !value.startsWith('YOUR_'));

  if (bookingModal && bookingForm) {
    const openBookingModal = (event) => {
      event.preventDefault();
      bookingModal.classList.add('is-open');
      bookingModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('booking-is-open');
      window.setTimeout(() => bookingForm.querySelector('input')?.focus(), 150);
    };

    const closeBookingModal = () => {
      bookingModal.classList.remove('is-open');
      bookingModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('booking-is-open');
    };

    document.querySelectorAll('.booking-trigger').forEach((trigger) => {
      trigger.addEventListener('click', openBookingModal);
    });

    bookingModal.querySelectorAll('[data-booking-close]').forEach((control) => {
      control.addEventListener('click', closeBookingModal);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && bookingModal.classList.contains('is-open')) {
        closeBookingModal();
      }
    });

    if (preferredDate) {
      preferredDate.min = new Date().toISOString().split('T')[0];
    }

    const isBlackoutSlot = (dateValue, timeValue) => {
      if (!dateValue || !timeValue) {
        return false;
      }
      const date = new Date(`${dateValue}T00:00:00`);
      const day = date.getDay();
      const startHour = Number(timeValue.slice(0, 2));
      return (day === 5 && startHour >= 16) || day === 6;
    };

    const updateTimeSlots = () => {
      if (!timeSlot || !preferredDate) {
        return;
      }
      const isSaturday = preferredDate.value && new Date(`${preferredDate.value}T00:00:00`).getDay() === 6;
      timeSlot.querySelectorAll('option[value]').forEach((option) => {
        option.disabled = isBlackoutSlot(preferredDate.value, option.value);
      });
      if (timeSlot.selectedOptions[0]?.disabled) {
        timeSlot.value = '';
      }
      timeSlotHint.textContent = isSaturday
        ? 'All Saturday slots are unavailable until 19:00.'
        : 'Friday from 15:00 through Saturday 19:00 is unavailable.';
    };

    preferredDate.addEventListener('change', updateTimeSlots);
    updateTimeSlots();

    const updatePediatricFields = () => {
      const isPediatric = specialtySelect.value === 'Pediatric Nutrition';
      pediatricFields.hidden = !isPediatric;
      pediatricFields.querySelectorAll('input').forEach((input) => {
        input.required = isPediatric;
      });
    };

    specialtySelect.addEventListener('change', updatePediatricFields);

    const createBookingReference = () => `#BAL-${Math.floor(100000 + Math.random() * 900000)}`;
    const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    const baseSummaryFields = [
      ['Name', 'fullName'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Age', 'age'],
      ['Sex', 'sex'],
      ['Occupation', 'occupation'],
      ['Place of residence', 'residence'],
      ['Specialty', 'specialty'],
      ['Preferred date', 'preferredDate'],
      ['Time slot', 'timeSlot'],
      ['Format', 'format'],
    ];

    const getFormData = () => {
      const data = Object.fromEntries(new FormData(bookingForm).entries());
      data.preferredDate = formatDate(data.preferredDate);
      data.bookingReference = createBookingReference();
      data.status = 'Pending';
      data.createdAt = new Date().toISOString();
      return data;
    };

    const renderSummary = (data) => {
      const summaryFields = data.specialty === 'Pediatric Nutrition'
        ? [...baseSummaryFields.slice(0, 7), ['Child age', 'childAge'], ['Parent/Guardian', 'guardianName'], ...baseSummaryFields.slice(7)]
        : baseSummaryFields;
      document.getElementById('booking-reference').textContent = data.bookingReference;
      document.getElementById('booking-summary').innerHTML = summaryFields.map(([label, key]) => `<div><dt>${label}</dt><dd>${data[key] || 'Not provided'}</dd></div>`).join('');
    };

    const sendConfirmationEmail = (data) => {
      if (!isEmailConfigured() || !window.emailjs) {
        return Promise.resolve(false);
      }
      emailjs.init({ publicKey: bookingConfig.publicKey });
      const emailParams = {
        to_email: data.email,
        owner_email: bookingConfig.ownerEmail,
        patient_name: data.fullName,
        booking_reference: data.bookingReference,
        phone: data.phone,
        age: data.age,
        sex: data.sex,
        occupation: data.occupation,
        residence: data.residence,
        specialty: data.specialty,
        preferred_date: data.preferredDate,
        time_slot: data.timeSlot,
        format: data.format,
        notes: data.notes || 'None provided',
      };
      return Promise.all([
        emailjs.send(bookingConfig.serviceId, bookingConfig.templateId, emailParams),
        emailjs.send(bookingConfig.serviceId, bookingConfig.templateId, {
          ...emailParams,
          to_email: bookingConfig.ownerEmail,
          notification_type: 'New consultation booking notification',
        }),
      ]).then(() => true).catch(() => false);
    };

    const saveBookingRecord = (data) => {
      const records = JSON.parse(localStorage.getItem('clinicalBookings') || '[]');
      records.unshift(data);
      localStorage.setItem('clinicalBookings', JSON.stringify(records));
      if (bookingStoreConfig.endpoint && bookingStoreConfig.adminApiKey) {
        fetch(bookingStoreConfig.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Key': bookingStoreConfig.adminApiKey },
          body: JSON.stringify(data),
        }).catch(() => undefined);
      }
      return data;
    };

    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      bookingError.textContent = '';
      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        bookingError.textContent = 'Please complete all required fields.';
        return;
      }

      if (isBlackoutSlot(preferredDate.value, timeSlot.value)) {
        bookingError.textContent = 'That time is unavailable. Please choose a slot outside Friday 15:00 through Saturday 19:00.';
        timeSlot.focus();
        return;
      }

      const data = getFormData();
      saveBookingRecord(data);
      renderSummary(data);
      bookingFormView.hidden = true;
      bookingConfirmation.hidden = false;
      sendConfirmationEmail(data).then((wasSent) => {
        document.getElementById('booking-email-status').textContent = wasSent
          ? 'A confirmation email has been sent to your inbox.'
          : 'Your request is recorded. Email delivery will activate after EmailJS is configured.';
      });
    });

    document.getElementById('print-receipt').addEventListener('click', () => window.print());
    document.getElementById('new-booking').addEventListener('click', () => {
      bookingForm.reset();
      updatePediatricFields();
      updateTimeSlots();
      bookingError.textContent = '';
      bookingConfirmation.hidden = true;
      bookingFormView.hidden = false;
      window.setTimeout(() => bookingForm.querySelector('input')?.focus(), 50);
    });
  }

  const adminPortal = document.getElementById('admin-portal');
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminLoginView = document.getElementById('admin-login-view');
  const adminDashboardView = document.getElementById('admin-dashboard-view');
  const adminLoginError = document.getElementById('admin-login-error');
  const adminBookingsBody = document.getElementById('admin-bookings-body');
  const adminEmpty = document.getElementById('admin-empty');
  const adminDetailModal = document.getElementById('admin-detail-modal');
  let selectedBookingReference = null;

  const adminAccessCode = 'BAL-ADMIN-2026';
  const getBookings = () => JSON.parse(localStorage.getItem('clinicalBookings') || '[]');
  const saveBookings = (records) => localStorage.setItem('clinicalBookings', JSON.stringify(records));

  if (adminPortal) {
    const renderAdminBookings = () => {
      const search = document.getElementById('admin-search').value.toLowerCase();
      const specialty = document.getElementById('admin-specialty-filter').value;
      const records = getBookings().filter((booking) => {
        const matchesSearch = !search || `${booking.bookingReference} ${booking.fullName}`.toLowerCase().includes(search);
        return matchesSearch && (!specialty || booking.specialty === specialty);
      });
      adminBookingsBody.replaceChildren();
      adminEmpty.hidden = records.length > 0;
      records.forEach((booking) => {
        const row = document.createElement('tr');
        row.tabIndex = 0;
        row.dataset.reference = booking.bookingReference;
        [booking.bookingReference, booking.fullName, booking.age, booking.sex, booking.occupation, booking.specialty, `${booking.preferredDate} ${booking.timeSlot}`, booking.format, booking.status || 'Pending'].forEach((value, index) => {
          const cell = document.createElement('td');
          cell.textContent = value || 'Not provided';
          if (index === 8) cell.className = `status-tag status-${String(value || 'Pending').toLowerCase()}`;
          row.appendChild(cell);
        });
        row.addEventListener('click', () => openBookingDetails(booking.bookingReference));
        row.addEventListener('keydown', (event) => { if (event.key === 'Enter') openBookingDetails(booking.bookingReference); });
        adminBookingsBody.appendChild(row);
      });
    };

    const openBookingDetails = (reference) => {
      const booking = getBookings().find((item) => item.bookingReference === reference);
      if (!booking) return;
      selectedBookingReference = reference;
      document.getElementById('admin-detail-title').textContent = reference;
      document.getElementById('admin-status-select').value = booking.status || 'Pending';
      const detailFields = [['Full Name', 'fullName'], ['Email', 'email'], ['Phone', 'phone'], ['Age', 'age'], ['Sex', 'sex'], ['Occupation', 'occupation'], ['Residence', 'residence'], ['Specialty', 'specialty'], ['Date & Time', 'dateTime'], ['Format', 'format'], ['Child Age', 'childAge'], ['Parent/Guardian', 'guardianName'], ['Clinical Notes', 'notes']];
      const detailList = document.getElementById('admin-detail-list');
      detailList.replaceChildren();
      detailFields.forEach(([label, key]) => {
        const value = key === 'dateTime' ? `${booking.preferredDate} ${booking.timeSlot}` : booking[key];
        if (!value) return;
        const wrapper = document.createElement('div');
        const term = document.createElement('dt');
        const description = document.createElement('dd');
        term.textContent = label;
        description.textContent = value;
        wrapper.append(term, description);
        detailList.appendChild(wrapper);
      });
      adminDetailModal.classList.add('is-open');
      adminDetailModal.setAttribute('aria-hidden', 'false');
    };

    const closeBookingDetails = () => {
      adminDetailModal.classList.remove('is-open');
      adminDetailModal.setAttribute('aria-hidden', 'true');
      selectedBookingReference = null;
    };

    const setAdminRoute = () => {
      const isAdminRoute = window.location.hash.toLowerCase() === '#admin';
      adminPortal.classList.toggle('is-visible', isAdminRoute);
      adminPortal.setAttribute('aria-hidden', String(!isAdminRoute));
      if (isAdminRoute) {
        const authenticated = sessionStorage.getItem('clinicalAdminAuthenticated') === 'true';
        adminLoginView.hidden = authenticated;
        adminDashboardView.hidden = !authenticated;
        if (authenticated) renderAdminBookings();
      }
    };

    adminLoginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const password = document.getElementById('admin-password').value;
      if (password !== adminAccessCode) {
        adminLoginError.textContent = 'Incorrect admin password.';
        return;
      }
      sessionStorage.setItem('clinicalAdminAuthenticated', 'true');
      adminLoginView.hidden = true;
      adminDashboardView.hidden = false;
      adminLoginError.textContent = '';
      renderAdminBookings();
    });
    document.getElementById('admin-logout').addEventListener('click', () => {
      sessionStorage.removeItem('clinicalAdminAuthenticated');
      window.location.hash = '';
    });
    document.getElementById('admin-search').addEventListener('input', renderAdminBookings);
    document.getElementById('admin-specialty-filter').addEventListener('change', renderAdminBookings);
    adminDetailModal.querySelectorAll('[data-admin-detail-close]').forEach((control) => control.addEventListener('click', closeBookingDetails));
    document.getElementById('admin-update-status').addEventListener('click', () => {
      const records = getBookings();
      const booking = records.find((item) => item.bookingReference === selectedBookingReference);
      if (!booking) return;
      booking.status = document.getElementById('admin-status-select').value;
      saveBookings(records);
      closeBookingDetails();
      renderAdminBookings();
    });
    document.getElementById('admin-delete-booking').addEventListener('click', () => {
      if (!selectedBookingReference || !window.confirm('Delete this booking permanently?')) return;
      saveBookings(getBookings().filter((item) => item.bookingReference !== selectedBookingReference));
      closeBookingDetails();
      renderAdminBookings();
    });
    document.getElementById('admin-print-receipt').addEventListener('click', () => window.print());
    window.addEventListener('hashchange', setAdminRoute);
    setAdminRoute();
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
