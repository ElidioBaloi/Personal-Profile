document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  const translations = {
    pt: {
      'Accepting New Patients': 'Aceitando novos pacientes', 'Expertise': 'Especialidades', 'Specialties': 'Áreas de atendimento', 'Clinical Tools': 'Ferramentas clínicas', 'Public Health': 'Saúde pública', 'Booking': 'Agendamento', 'Admin Portal': 'Portal administrativo', 'Bridging Clinical Science': 'Unindo a ciência clínica', 'and Human Wellness.': 'e o bem-estar humano.', 'Book Consultation': 'Agendar consulta', 'Specialized Protocols': 'Áreas de atendimento', 'Athletic Performance': 'Desempenho esportivo', 'Body Composition': 'Composição corporal', 'Pediatric Nutrition': 'Nutrição pediátrica', 'Reproductive Health': 'Saúde reprodutiva', 'General Nutrition': 'Nutrição geral', 'Reason for consultation': 'Motivo da consulta', 'Select a reason': 'Selecione um motivo', 'Pediatric Consultation (children)': 'Consulta pediátrica (crianças)', 'Reproductive Health (pregnancy)': 'Saúde reprodutiva (gravidez)', 'Full Name': 'Nome completo', 'Email Address': 'E-mail', 'Phone Number': 'Telefone', 'Age': 'Idade', "Child's age": 'Idade da criança', 'Sex': 'Sexo', 'Select an option': 'Selecione uma opção', 'Occupation': 'Profissão', 'Place of Residence': 'Local de residência', 'Parent/Guardian Name': 'Nome do pai, mãe ou responsável', 'Preferred date': 'Data preferida', 'Preferred time': 'Horário preferido', 'Select a time': 'Selecione um horário', 'How would you like to meet?': 'Como você gostaria de ser atendido?', 'Select how you would like to meet': 'Selecione uma opção', 'Online appointment': 'Consulta online', 'In-person appointment': 'Consulta presencial', 'What would you like help with?': 'Em que você gostaria de ajuda?', 'Optional': 'Opcional', 'Request Consultation': 'Solicitar consulta', 'You will receive a confirmation email with your booking reference.': 'Você receberá um e-mail de confirmação com o código da consulta.', 'Consultation requested': 'Consulta solicitada', 'Keep this reference for your records.': 'Guarde este código para seus registros.', 'Print Receipt / Download PDF': 'Imprimir recibo / Baixar PDF', 'Make Another Request': 'Fazer outra solicitação', 'Contact Us': 'Fale conosco', 'Private access': 'Acesso privado', 'Admin Portal': 'Portal administrativo', 'Sign in to view and manage consultation requests.': 'Entre para ver e gerenciar solicitações de consulta.', 'Admin password': 'Senha administrativa', 'Sign In': 'Entrar', 'Forgot password?': 'Esqueceu a senha?', 'Private workspace': 'Área privada', 'Consultation Bookings': 'Consultas agendadas', 'Sign Out': 'Sair', 'Change admin password': 'Alterar senha administrativa', 'Security': 'Segurança', 'Current password': 'Senha atual', 'New password': 'Nova senha', 'Confirm new password': 'Confirme a nova senha', 'Update Password': 'Atualizar senha', 'Search patient or order number': 'Buscar paciente ou número do pedido', 'All specialties': 'Todas as áreas', 'No bookings found.': 'Nenhuma consulta encontrada.'
    },
    es: {
      'Accepting New Patients': 'Aceptando nuevos pacientes', 'Expertise': 'Especialidades', 'Specialties': 'Áreas de atención', 'Clinical Tools': 'Herramientas clínicas', 'Public Health': 'Salud pública', 'Booking': 'Reservas', 'Admin Portal': 'Portal administrativo', 'Bridging Clinical Science': 'Uniendo la ciencia clínica', 'and Human Wellness.': 'y el bienestar humano.', 'Book Consultation': 'Reservar consulta', 'Specialized Protocols': 'Áreas de atención', 'Athletic Performance': 'Rendimiento deportivo', 'Body Composition': 'Composición corporal', 'Pediatric Nutrition': 'Nutrición pediátrica', 'Reproductive Health': 'Salud reproductiva', 'General Nutrition': 'Nutrición general', 'Reason for consultation': 'Motivo de la consulta', 'Select a reason': 'Seleccione un motivo', 'Pediatric Consultation (children)': 'Consulta pediátrica (niños)', 'Reproductive Health (pregnancy)': 'Salud reproductiva (embarazo)', 'Full Name': 'Nombre completo', 'Email Address': 'Correo electrónico', 'Phone Number': 'Teléfono', 'Age': 'Edad', "Child's age": 'Edad del niño', 'Sex': 'Sexo', 'Select an option': 'Seleccione una opción', 'Occupation': 'Profesión', 'Place of Residence': 'Lugar de residencia', 'Parent/Guardian Name': 'Nombre del padre, madre o tutor', 'Preferred date': 'Fecha preferida', 'Preferred time': 'Hora preferida', 'Select a time': 'Seleccione una hora', 'How would you like to meet?': '¿Cómo desea realizar la consulta?', 'Select how you would like to meet': 'Seleccione una opción', 'Online appointment': 'Consulta en línea', 'In-person appointment': 'Consulta presencial', 'What would you like help with?': '¿En qué le gustaría recibir ayuda?', 'Optional': 'Opcional', 'Request Consultation': 'Solicitar consulta', 'You will receive a confirmation email with your booking reference.': 'Recibirá un correo de confirmación con el código de su consulta.', 'Consultation requested': 'Consulta solicitada', 'Keep this reference for your records.': 'Guarde este código para sus registros.', 'Print Receipt / Download PDF': 'Imprimir recibo / Descargar PDF', 'Make Another Request': 'Hacer otra solicitud', 'Contact Us': 'Contáctenos', 'Private access': 'Acceso privado', 'Sign in to view and manage consultation requests.': 'Inicie sesión para ver y gestionar las solicitudes.', 'Admin password': 'Contraseña administrativa', 'Sign In': 'Iniciar sesión', 'Forgot password?': '¿Olvidó su contraseña?', 'Private workspace': 'Área privada', 'Consultation Bookings': 'Consultas reservadas', 'Sign Out': 'Cerrar sesión', 'Change admin password': 'Cambiar contraseña administrativa', 'Security': 'Seguridad', 'Current password': 'Contraseña actual', 'New password': 'Nueva contraseña', 'Confirm new password': 'Confirme la nueva contraseña', 'Update Password': 'Actualizar contraseña', 'Search patient or order number': 'Buscar paciente o número de pedido', 'All specialties': 'Todas las áreas', 'No bookings found.': 'No se encontraron consultas.'
    },
    zh: {
      'Accepting New Patients': '接受新患者', 'Expertise': '专业领域', 'Specialties': '服务项目', 'Clinical Tools': '临床工具', 'Public Health': '公共卫生', 'Booking': '预约', 'Admin Portal': '管理门户', 'Bridging Clinical Science': '连接临床科学', 'and Human Wellness.': '与人类健康。', 'Book Consultation': '预约咨询', 'Specialized Protocols': '服务项目', 'Athletic Performance': '运动表现', 'Body Composition': '身体成分', 'Pediatric Nutrition': '儿童营养', 'Reproductive Health': '生殖健康', 'General Nutrition': '普通营养', 'Reason for consultation': '咨询原因', 'Select a reason': '请选择原因', 'Pediatric Consultation (children)': '儿童咨询', 'Reproductive Health (pregnancy)': '生殖健康（孕期）', 'Full Name': '姓名', 'Email Address': '电子邮箱', 'Phone Number': '电话', 'Age': '年龄', "Child's age": '孩子的年龄', 'Sex': '性别', 'Select an option': '请选择', 'Occupation': '职业', 'Place of Residence': '居住地', 'Parent/Guardian Name': '父母或监护人姓名', 'Preferred date': '首选日期', 'Preferred time': '首选时间', 'Select a time': '请选择时间', 'How would you like to meet?': '您希望如何进行咨询？', 'Select how you would like to meet': '请选择方式', 'Online appointment': '在线咨询', 'In-person appointment': '现场咨询', 'What would you like help with?': '您希望获得哪方面的帮助？', 'Optional': '可选', 'Request Consultation': '提交咨询申请', 'You will receive a confirmation email with your booking reference.': '您将收到包含预约编号的确认邮件。', 'Consultation requested': '咨询申请已提交', 'Keep this reference for your records.': '请保存此编号。', 'Print Receipt / Download PDF': '打印收据 / 下载 PDF', 'Make Another Request': '提交新的申请', 'Contact Us': '联系我们', 'Private access': '私人访问', 'Sign in to view and manage consultation requests.': '登录以查看和管理咨询申请。', 'Admin password': '管理员密码', 'Sign In': '登录', 'Forgot password?': '忘记密码？', 'Private workspace': '私人工作区', 'Consultation Bookings': '咨询预约', 'Sign Out': '退出登录', 'Change admin password': '更改管理员密码', 'Security': '安全', 'Current password': '当前密码', 'New password': '新密码', 'Confirm new password': '确认新密码', 'Update Password': '更新密码', 'Search patient or order number': '搜索患者或订单号', 'All specialties': '所有服务项目', 'No bookings found.': '未找到预约。'
    }
  };

  const sharedTranslations = {
    pt: {
      'Nutritionist & Public Health Professional specializing in evidence-based dietary interventions, pediatric growth, and athletic performance optimization.': 'Nutricionista e profissional de saúde pública, especializado em intervenções alimentares baseadas em evidências, crescimento infantil e desempenho esportivo.',
      'Clinical intake': 'Informações da consulta', 'Book a Consultation': 'Agendar uma consulta', 'Share a few details so the right consultation can be prepared for you.': 'Compartilhe alguns dados para prepararmos a consulta ideal para você.', 'Request received': 'Solicitação recebida', 'Clinical Tools': 'Ferramentas clínicas', 'Contact us': 'Fale conosco', 'Friday from 15:00 through Saturday 19:00 is unavailable.': 'De sexta-feira às 15h até sábado às 19h, não há horários disponíveis.', 'Athletic: Macro Periodization': 'Esportivo: plano de alimentação para treinos', 'Body Comp: Dual BMI & FFMI Calculator': 'Composição corporal: calculadora de peso e massa magra', 'Pediatric: Growth Z-Score Estimator': 'Pediatria: estimativa de crescimento infantil', 'Reproductive Health: Gestational Weight & PCOS Tool': 'Saúde reprodutiva: gravidez e SOP', 'General: BMR & TDEE Estimator': 'Geral: estimativa de necessidades energéticas', 'Macronutrient periodization and recovery nutrition for endurance and strength athletes.': 'Alimentação para treinos, recuperação e desempenho esportivo.', 'Structured, sustainable leaning phases for aesthetic professionals and models.': 'Planos equilibrados para mudanças de composição corporal.', 'Growth monitoring, micro-deficiency correction, and developmental dietary planning.': 'Acompanhamento do crescimento e planejamento alimentar infantil.', 'Gestational nutrition, PCOS management, and fertility-focused dietary interventions.': 'Alimentação durante a gravidez e cuidados para a saúde reprodutiva.', 'Consultation details': 'Detalhes da consulta', 'Booking details': 'Detalhes da consulta', 'Update Status': 'Atualizar situação', 'Save Status': 'Salvar situação', 'Print Patient Receipt': 'Imprimir recibo do paciente', 'Delete Entry': 'Excluir registro'
    },
    es: {
      'Nutritionist & Public Health Professional specializing in evidence-based dietary interventions, pediatric growth, and athletic performance optimization.': 'Nutricionista y profesional de salud pública especializado en alimentación basada en evidencia, crecimiento infantil y rendimiento deportivo.',
      'Clinical intake': 'Información de la consulta', 'Book a Consultation': 'Reservar una consulta', 'Share a few details so the right consultation can be prepared for you.': 'Comparta algunos datos para preparar la consulta adecuada para usted.', 'Request received': 'Solicitud recibida', 'Clinical Tools': 'Herramientas clínicas', 'Contact us': 'Contáctenos', 'Friday from 15:00 through Saturday 19:00 is unavailable.': 'No hay horarios disponibles desde el viernes a las 15:00 hasta el sábado a las 19:00.', 'Athletic: Macro Periodization': 'Deportivo: alimentación para el entrenamiento', 'Body Comp: Dual BMI & FFMI Calculator': 'Composición corporal: calculadora de peso y masa magra', 'Pediatric: Growth Z-Score Estimator': 'Pediatría: estimación del crecimiento infantil', 'Reproductive Health: Gestational Weight & PCOS Tool': 'Salud reproductiva: embarazo y SOP', 'General: BMR & TDEE Estimator': 'General: estimación de necesidades energéticas', 'Macronutrient periodization and recovery nutrition for endurance and strength athletes.': 'Alimentación para entrenamiento, recuperación y rendimiento deportivo.', 'Structured, sustainable leaning phases for aesthetic professionals and models.': 'Planes equilibrados para cambiar la composición corporal.', 'Growth monitoring, micro-deficiency correction, and developmental dietary planning.': 'Seguimiento del crecimiento y planificación de la alimentación infantil.', 'Gestational nutrition, PCOS management, and fertility-focused dietary interventions.': 'Alimentación durante el embarazo y cuidado de la salud reproductiva.', 'Booking details': 'Detalles de la consulta', 'Update Status': 'Actualizar estado', 'Save Status': 'Guardar estado', 'Print Patient Receipt': 'Imprimir recibo del paciente', 'Delete Entry': 'Eliminar registro'
    },
    zh: {
      'Nutritionist & Public Health Professional specializing in evidence-based dietary interventions, pediatric growth, and athletic performance optimization.': '营养师兼公共卫生专业人士，专注于循证饮食、儿童成长和运动表现。',
      'Clinical intake': '咨询信息', 'Book a Consultation': '预约咨询', 'Share a few details so the right consultation can be prepared for you.': '请提供一些信息，以便为您准备合适的咨询。', 'Request received': '申请已收到', 'Clinical Tools': '临床工具', 'Contact us': '联系我们', 'Friday from 15:00 through Saturday 19:00 is unavailable.': '周五15:00至周六19:00没有可预约时间。', 'Athletic: Macro Periodization': '运动：训练饮食计划', 'Body Comp: Dual BMI & FFMI Calculator': '身体成分：体重和瘦体重计算器', 'Pediatric: Growth Z-Score Estimator': '儿科：儿童成长估算', 'Reproductive Health: Gestational Weight & PCOS Tool': '生殖健康：孕期与多囊卵巢工具', 'General: BMR & TDEE Estimator': '普通：能量需求估算', 'Macronutrient periodization and recovery nutrition for endurance and strength athletes.': '为训练、恢复和运动表现提供饮食建议。', 'Structured, sustainable leaning phases for aesthetic professionals and models.': '提供平衡、可持续的身体成分管理方案。', 'Growth monitoring, micro-deficiency correction, and developmental dietary planning.': '儿童成长监测和饮食规划。', 'Gestational nutrition, PCOS management, and fertility-focused dietary interventions.': '孕期营养和生殖健康饮食支持。', 'Booking details': '咨询详情', 'Update Status': '更新状态', 'Save Status': '保存状态', 'Print Patient Receipt': '打印患者收据', 'Delete Entry': '删除记录'
    }
  };

  translations['zh-TW'] = {
    ...translations.zh,
    'Accepting New Patients': '接受新患者', 'Expertise': '專業領域', 'Specialties': '服務項目', 'Clinical Tools': '臨床工具', 'Public Health': '公共衛生', 'Booking': '預約', 'Admin Portal': '管理入口', 'Bridging Clinical Science': '連結臨床科學', 'and Human Wellness.': '與人類健康。', 'Book Consultation': '預約諮詢', 'Specialized Protocols': '服務項目', 'Athletic Performance': '運動表現', 'Body Composition': '身體組成', 'Pediatric Nutrition': '兒童營養', 'Reproductive Health': '生殖健康', 'General Nutrition': '一般營養', 'Reason for consultation': '諮詢原因', 'Select a reason': '請選擇原因', 'Pediatric Consultation (children)': '兒童諮詢', 'Reproductive Health (pregnancy)': '生殖健康（孕期）', 'Full Name': '姓名', 'Email Address': '電子郵件', 'Phone Number': '電話', 'Age': '年齡', "Child's age": '孩子的年齡', 'Sex': '性別', 'Select an option': '請選擇', 'Occupation': '職業', 'Place of Residence': '居住地', 'Parent/Guardian Name': '父母或監護人姓名', 'Preferred date': '首選日期', 'Preferred time': '首選時間', 'Select a time': '請選擇時間', 'How would you like to meet?': '您希望如何進行諮詢？', 'Select how you would like to meet': '請選擇方式', 'Online appointment': '線上諮詢', 'In-person appointment': '現場諮詢', 'What would you like help with?': '您希望獲得哪方面的協助？', 'Optional': '選填', 'Request Consultation': '提交諮詢申請', 'You will receive a confirmation email with your booking reference.': '您將收到包含預約編號的確認郵件。', 'Consultation requested': '諮詢申請已提交', 'Keep this reference for your records.': '請保存此編號。', 'Print Receipt / Download PDF': '列印收據 / 下載 PDF', 'Make Another Request': '提交新的申請', 'Contact Us': '聯絡我們', 'Private access': '私人存取', 'Sign in to view and manage consultation requests.': '登入以查看及管理諮詢申請。', 'Admin password': '管理員密碼', 'Sign In': '登入', 'Forgot password?': '忘記密碼？', 'Private workspace': '私人工作區', 'Consultation Bookings': '諮詢預約', 'Sign Out': '登出', 'Change admin password': '更改管理員密碼', 'Security': '安全性', 'Current password': '目前密碼', 'New password': '新密碼', 'Confirm new password': '確認新密碼', 'Update Password': '更新密碼', 'Search patient or order number': '搜尋患者或訂單號碼', 'All specialties': '所有服務項目', 'No bookings found.': '找不到預約。'
  };

  sharedTranslations['zh-TW'] = {
    ...sharedTranslations.zh,
    'Nutritionist & Public Health Professional specializing in evidence-based dietary interventions, pediatric growth, and athletic performance optimization.': '營養師兼公共衛生專業人士，專注於實證飲食、兒童成長與運動表現。', 'Clinical intake': '諮詢資訊', 'Book a Consultation': '預約諮詢', 'Share a few details so the right consultation can be prepared for you.': '請提供一些資訊，以便為您準備合適的諮詢。', 'Request received': '申請已收到', 'Contact us': '聯絡我們', 'Friday from 15:00 through Saturday 19:00 is unavailable.': '週五 15:00 至週六 19:00 沒有可預約時段。', 'Athletic: Macro Periodization': '運動：訓練飲食計畫', 'Body Comp: Dual BMI & FFMI Calculator': '身體組成：體重與瘦體重計算器', 'Pediatric: Growth Z-Score Estimator': '兒科：兒童成長估算', 'Reproductive Health: Gestational Weight & PCOS Tool': '生殖健康：孕期與多囊卵巢工具', 'General: BMR & TDEE Estimator': '一般：能量需求估算', 'Macronutrient periodization and recovery nutrition for endurance and strength athletes.': '為訓練、恢復與運動表現提供飲食建議。', 'Structured, sustainable leaning phases for aesthetic professionals and models.': '提供平衡且可持續的身體組成管理方案。', 'Growth monitoring, micro-deficiency correction, and developmental dietary planning.': '兒童成長監測與飲食規劃。', 'Gestational nutrition, PCOS management, and fertility-focused dietary interventions.': '孕期營養與生殖健康飲食支持。', 'Booking details': '諮詢詳情', 'Update Status': '更新狀態', 'Save Status': '儲存狀態', 'Print Patient Receipt': '列印患者收據', 'Delete Entry': '刪除紀錄'
  };

  const translatePage = (language) => {
    const dictionary = { ...(translations[language] || {}), ...(sharedTranslations[language] || {}) };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.__originalText) node.__originalText = node.textContent;
      const original = node.__originalText.trim();
      if (!original || node.parentElement?.tagName === 'SCRIPT') continue;
      const translated = dictionary[original] || original;
      node.textContent = node.__originalText.replace(original, translated);
    }
    document.querySelectorAll('[placeholder], [aria-label], [title], img[alt]').forEach((element) => {
      ['placeholder', 'aria-label', 'title', 'alt'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const originalAttribute = `data-original-${attribute}`;
        const original = element.getAttribute(originalAttribute) || element.getAttribute(attribute);
        element.setAttribute(originalAttribute, original);
        if (dictionary[original]) element.setAttribute(attribute, dictionary[original]);
      });
    });
    document.documentElement.lang = language;
  };

  if (languageSelect) {
    const savedLanguage = localStorage.getItem('siteLanguage') || 'en';
    languageSelect.value = savedLanguage;
    languageSelect.addEventListener('change', () => {
      localStorage.setItem('siteLanguage', languageSelect.value);
      translatePage(languageSelect.value);
    });
    window.translatePage = translatePage;
    translatePage(savedLanguage);
  }

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

  const calculatorModal = document.getElementById('calculator-modal');
  const calculatorTitle = document.getElementById('calculator-title');
  const calculatorContent = document.getElementById('calculator-content');
  const calculatorMenus = document.querySelectorAll('.hero-tools-dropdown');

  if (calculatorModal && calculatorTitle && calculatorContent) {
    const calculatorTemplates = {
      athletic: {
        title: 'Athletic Macro Periodization',
        fields: `<label class="booking-field"><span>Body Weight <b>*</b></span><input type="number" name="weight" min="1" step="0.1" required /><small>kg</small></label><label class="booking-field"><span>Training Day <b>*</b></span><select name="training" required><option value="">Select target</option><option value="rest">Rest</option><option value="moderate">Moderate training</option><option value="heavy">Heavy training</option></select></label>`,
        calculate: (data) => { const targets = { rest: [1.6, 2.5, 1.0], moderate: [1.7, 4, 1.0], heavy: [1.8, 5.5, 1.1] }; const [protein, carbs, fat] = targets[data.training]; return `<h3>Daily target</h3><p><strong>${(data.weight * protein).toFixed(0)} g</strong> protein</p><p><strong>${(data.weight * carbs).toFixed(0)} g</strong> carbohydrates</p><p><strong>${(data.weight * fat).toFixed(0)} g</strong> fat</p>`; },
      },
      'body-composition': {
        title: 'Dual BMI & FFMI Calculator',
        fields: `<label class="booking-field"><span>Weight <b>*</b></span><input type="number" name="weight" min="1" step="0.1" required /><small>kg</small></label><label class="booking-field"><span>Height <b>*</b></span><input type="number" name="height" min="50" step="0.1" required /><small>cm</small></label><label class="booking-field booking-field-wide"><span>Body Fat Percentage (optional)</span><input type="number" name="bodyFat" min="1" max="70" step="0.1" /><small>%</small></label>`,
        calculate: (data) => { const bmi = data.weight / ((data.height / 100) ** 2); const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Overweight' : 'Obesity range'; const ffmi = data.bodyFat ? (data.weight * (1 - data.bodyFat / 100)) / ((data.height / 100) ** 2) : null; return `<h3>Composition snapshot</h3><p>BMI: <strong>${bmi.toFixed(1)}</strong> (${category})</p><p>${ffmi ? `Estimated FFMI: <strong>${ffmi.toFixed(1)}</strong>. This is a screening estimate; muscle quality and distribution require clinical assessment.` : 'Add body fat percentage to estimate FFMI and lean mass.'}</p>`; },
      },
      pediatric: {
        title: 'Pediatric Growth Z-Score Estimator',
        fields: `<label class="booking-field"><span>Age <b>*</b></span><input type="number" name="ageMonths" min="1" max="228" required /><small>months</small></label><label class="booking-field"><span>Sex <b>*</b></span><select name="sex" required><option value="">Select</option><option value="male">Male</option><option value="female">Female</option></select></label><label class="booking-field"><span>Height <b>*</b></span><input type="number" name="height" min="40" step="0.1" required /><small>cm</small></label><label class="booking-field"><span>Weight <b>*</b></span><input type="number" name="weight" min="1" step="0.1" required /><small>kg</small></label>`,
        calculate: (data) => { const age = data.ageMonths; const sexOffset = data.sex === 'male' ? 1 : 0; const medianHeight = 50 + age * 0.55 + sexOffset; const medianWeight = 3.3 + age * 0.22 + sexOffset * 0.15; const heightZ = (data.height - medianHeight) / (age < 24 ? 4 : 7); const weightZ = (data.weight - medianWeight) / (age < 24 ? 1.5 : 3); return `<h3>Estimated growth position</h3><p>Height-for-age estimate: <strong>${heightZ.toFixed(2)} SD</strong></p><p>Weight-for-age estimate: <strong>${weightZ.toFixed(2)} SD</strong></p><p>This simplified estimator is for screening only. Use WHO growth standards and a qualified pediatric clinician for interpretation.</p>`; },
      },
      reproductive: {
        title: 'Reproductive Health Tool',
        fields: `<label class="booking-field booking-field-wide"><span>Select Protocol <b>*</b></span><select name="protocol" id="reproductive-protocol" required><option value="">Select protocol</option><option value="gestational">Gestational Weight Target</option><option value="pcos">PCOS Glycemic Threshold</option></select></label><label class="booking-field"><span>Pre-pregnancy / Current Weight <b>*</b></span><input type="number" name="weight" min="1" step="0.1" required /><small>kg</small></label><label class="booking-field"><span>Height <b>*</b></span><input type="number" name="height" min="50" step="0.1" required /><small>cm</small></label><label class="booking-field reproductive-trimester"><span>Trimester <b>*</b></span><select name="trimester"><option value="1">1st</option><option value="2">2nd</option><option value="3">3rd</option></select></label>`,
        calculate: (data) => { const bmi = data.weight / ((data.height / 100) ** 2); if (data.protocol === 'pcos') { const carbs = bmi >= 30 ? 30 : bmi >= 25 ? 40 : 45; return `<h3>PCOS meal target</h3><p>Suggested carbohydrate distribution: <strong>${carbs} g per meal</strong>, adjusted across 3 meals.</p><p>Pair carbohydrates with protein, fiber, and unsaturated fats. This is educational guidance, not a substitute for individualized medical care.</p>`; } const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal BMI' : bmi < 30 ? 'Overweight' : 'Obesity'; const ranges = { 'Underweight': ['12.5', '18', '0.45'], 'Normal BMI': ['11.5', '16', '0.4'], 'Overweight': ['7', '11.5', '0.3'], 'Obesity': ['5', '9', '0.25'] }; const [low, high, weekly] = ranges[category]; return `<h3>Gestational target</h3><p>Pre-pregnancy BMI category: <strong>${category}</strong> (${bmi.toFixed(1)})</p><p>Total recommended gain: <strong>${low} - ${high} kg</strong></p><p>Second/third trimester weekly rate: <strong>about ${weekly} kg/week</strong></p>`; },
      },
      general: {
        title: 'BMR & TDEE Estimator',
        fields: `<label class="booking-field"><span>Sex <b>*</b></span><select name="sex" required><option value="">Select</option><option value="male">Male</option><option value="female">Female</option></select></label><label class="booking-field"><span>Age <b>*</b></span><input type="number" name="age" min="13" max="120" required /><small>years</small></label><label class="booking-field"><span>Weight <b>*</b></span><input type="number" name="weight" min="1" step="0.1" required /><small>kg</small></label><label class="booking-field"><span>Height <b>*</b></span><input type="number" name="height" min="50" step="0.1" required /><small>cm</small></label><label class="booking-field booking-field-wide"><span>Activity Level <b>*</b></span><select name="activity" required><option value="">Select</option><option value="1.2">Sedentary</option><option value="1.375">Lightly active</option><option value="1.55">Moderately active</option><option value="1.725">Very active</option><option value="1.9">Extra active</option></select></label>`,
        calculate: (data) => { const bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + (data.sex === 'male' ? 5 : -161); return `<h3>Energy estimate</h3><p>BMR: <strong>${Math.round(bmr)} kcal/day</strong></p><p>TDEE: <strong>${Math.round(bmr * data.activity)} kcal/day</strong></p>`; },
      },
    };

    const closeCalculator = () => {
      calculatorModal.classList.remove('is-open');
      calculatorModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('calculator-is-open');
    };

    const openCalculator = (toolName) => {
      const template = calculatorTemplates[toolName];
      if (!template) return;
      calculatorTitle.textContent = template.title;
      calculatorContent.innerHTML = `<form class="calculator-form" id="calculator-form">${template.fields}</form><div class="calculator-output" id="calculator-output"><p>Enter your details to see an estimate.</p></div><div class="calculator-actions"><button class="booking-submit" type="submit" form="calculator-form">Calculate</button><button class="booking-secondary" type="reset" form="calculator-form">Reset</button></div>`;
      const form = document.getElementById('calculator-form');
      const output = document.getElementById('calculator-output');
      form.addEventListener('submit', (event) => { event.preventDefault(); if (!form.checkValidity()) { form.reportValidity(); return; } output.innerHTML = template.calculate(Object.fromEntries(new FormData(form).entries())); });
      form.addEventListener('reset', () => { window.setTimeout(() => { output.innerHTML = '<p>Enter your details to see an estimate.</p>'; }, 0); });
      const reproductiveProtocol = document.getElementById('reproductive-protocol');
      if (reproductiveProtocol) reproductiveProtocol.addEventListener('change', () => { document.querySelector('.reproductive-trimester').hidden = reproductiveProtocol.value === 'pcos'; });
      calculatorModal.classList.add('is-open');
      calculatorModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('calculator-is-open');
      window.setTimeout(() => form.querySelector('input, select')?.focus(), 100);
    };

    calculatorMenus.forEach((menu) => {
      const trigger = menu.querySelector('button:not([data-tool])');
      trigger.addEventListener('click', () => { const isOpen = menu.classList.toggle('is-open'); trigger.setAttribute('aria-expanded', String(isOpen)); });
      menu.querySelectorAll('[data-tool]').forEach((item) => item.addEventListener('click', () => {
        calculatorMenus.forEach((other) => other.classList.remove('is-open'));
        if (mobileMenu?.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const mobileMenuIcon = mobileMenuToggle.querySelector('.material-symbols-outlined');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
          }
        }
        openCalculator(item.dataset.tool);
      }));
    });
    calculatorModal.querySelectorAll('[data-calculator-close]').forEach((control) => control.addEventListener('click', closeCalculator));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeCalculator(); calculatorMenus.forEach((menu) => menu.classList.remove('is-open')); } });
    document.addEventListener('click', (event) => { calculatorMenus.forEach((menu) => { if (!menu.contains(event.target)) menu.classList.remove('is-open'); }); });
  }

  const bookingModal = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookingFormView = document.getElementById('booking-form-view');
  const bookingConfirmation = document.getElementById('booking-confirmation');
  const bookingError = document.getElementById('booking-error');
  const specialtySelect = document.getElementById('specialty');
  const pediatricFields = document.getElementById('pediatric-fields');
  const ageLabel = document.getElementById('age-label');
  const occupationLabel = document.getElementById('occupation-label');
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
      const isPediatric = ['Pediatric Consultation (children)', 'Pediatric Nutrition'].includes(specialtySelect.value);
      pediatricFields.hidden = !isPediatric;
      ageLabel.firstChild.textContent = isPediatric ? "Child's age " : 'Age ';
      pediatricFields.querySelectorAll('input').forEach((input) => {
        input.required = isPediatric;
      });
      if (window.translatePage) window.translatePage(localStorage.getItem('siteLanguage') || 'en');
      const language = localStorage.getItem('siteLanguage') || 'en';
      const ageText = isPediatric
        ? { en: "Child's age", pt: 'Idade da criança', es: 'Edad del niño', zh: '孩子的年龄', 'zh-TW': '孩子的年齡' }[language]
        : { en: 'Age', pt: 'Idade', es: 'Edad', zh: '年龄', 'zh-TW': '年齡' }[language];
      ageLabel.firstChild.textContent = `${ageText} `;
      const occupationText = isPediatric
        ? { en: "Parent/Guardian's occupation", pt: 'Profissão do pai, mãe ou responsável', es: 'Profesión del padre, madre o tutor', zh: '父母或监护人的职业', 'zh-TW': '父母或監護人的職業' }[language]
        : { en: 'Occupation', pt: 'Profissão', es: 'Profesión', zh: '职业', 'zh-TW': '職業' }[language];
      occupationLabel.firstChild.textContent = `${occupationText} `;
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
      const summaryFields = ['Pediatric Consultation (children)', 'Pediatric Nutrition'].includes(data.specialty)
        ? [...baseSummaryFields.slice(0, 4), ['Parent/Guardian', 'guardianName'], ...baseSummaryFields.slice(4)]
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
  const adminPasswordForm = document.getElementById('admin-password-form');
  const adminPasswordError = document.getElementById('admin-password-error');
  const adminPasswordStatus = document.getElementById('admin-password-status');
  const adminRecoveryForm = document.getElementById('admin-recovery-form');
  const adminRecoveryError = document.getElementById('admin-recovery-error');
  const adminRecoveryStatus = document.getElementById('admin-recovery-status');
  let selectedBookingReference = null;

  const defaultAdminAccessCode = 'BAL-ADMIN-2026';
  const getAdminAccessCode = () => localStorage.getItem('clinicalAdminPassword') || defaultAdminAccessCode;
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
      const detailFields = [['Full Name', 'fullName'], ['Email', 'email'], ['Phone', 'phone'], ['Age', 'age'], ['Sex', 'sex'], ['Occupation', 'occupation'], ['Residence', 'residence'], ['Specialty', 'specialty'], ['Date & Time', 'dateTime'], ['Format', 'format'], ['Parent/Guardian', 'guardianName'], ['Clinical Notes', 'notes']];
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
      if (password !== getAdminAccessCode()) {
        adminLoginError.textContent = 'Incorrect admin password.';
        return;
      }
      sessionStorage.setItem('clinicalAdminAuthenticated', 'true');
      adminLoginView.hidden = true;
      adminDashboardView.hidden = false;
      adminLoginError.textContent = '';
      renderAdminBookings();
    });
    document.getElementById('show-password-recovery').addEventListener('click', () => {
      adminLoginForm.hidden = true;
      adminRecoveryForm.hidden = false;
      document.getElementById('admin-recovery-email').focus();
    });
    document.getElementById('hide-password-recovery').addEventListener('click', () => {
      adminRecoveryForm.reset();
      adminRecoveryError.textContent = '';
      adminRecoveryStatus.textContent = '';
      adminRecoveryForm.hidden = true;
      adminLoginForm.hidden = false;
      document.getElementById('admin-password').focus();
    });
    adminRecoveryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      adminRecoveryError.textContent = '';
      adminRecoveryStatus.textContent = '';
      const recoveryEmail = document.getElementById('admin-recovery-email').value.trim().toLowerCase();
      if (recoveryEmail !== bookingConfig.ownerEmail.toLowerCase()) {
        adminRecoveryError.textContent = 'That email is not associated with the admin account.';
        return;
      }
      const subject = encodeURIComponent('Admin password reset request');
      const body = encodeURIComponent('Please help me reset the admin password for the booking portal.');
      window.location.href = `mailto:${bookingConfig.ownerEmail}?subject=${subject}&body=${body}`;
      adminRecoveryStatus.textContent = 'Your email app should open with the reset request ready to send.';
    });
    document.getElementById('show-password-change').addEventListener('click', (event) => {
      const trigger = event.currentTarget;
      const isOpen = !adminPasswordForm.hidden;
      adminPasswordForm.hidden = isOpen;
      trigger.setAttribute('aria-expanded', String(!isOpen));
      trigger.querySelector('.material-symbols-outlined').textContent = isOpen ? 'expand_more' : 'expand_less';
      if (!isOpen) document.getElementById('current-admin-password').focus();
    });
    document.querySelectorAll('[data-password-toggle]').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const input = document.getElementById(toggle.dataset.passwordToggle);
        const icon = toggle.querySelector('.material-symbols-outlined');
        const isVisible = input.type === 'text';
        input.type = isVisible ? 'password' : 'text';
        toggle.setAttribute('aria-label', `${isVisible ? 'Show' : 'Hide'} ${input.id.replaceAll('-', ' ')}`);
        toggle.title = isVisible ? 'Show password' : 'Hide password';
        icon.textContent = isVisible ? 'visibility' : 'visibility_off';
      });
    });
    adminPasswordForm.addEventListener('submit', (event) => {
      event.preventDefault();
      adminPasswordError.textContent = '';
      adminPasswordStatus.textContent = '';
      const currentPassword = document.getElementById('current-admin-password').value;
      const newPassword = document.getElementById('new-admin-password').value;
      const confirmedPassword = document.getElementById('confirm-admin-password').value;
      if (currentPassword !== getAdminAccessCode()) {
        adminPasswordError.textContent = 'Current password is incorrect.';
        return;
      }
      if (newPassword.length < 8) {
        adminPasswordError.textContent = 'New password must be at least 8 characters.';
        return;
      }
      if (newPassword !== confirmedPassword) {
        adminPasswordError.textContent = 'New passwords do not match.';
        return;
      }
      localStorage.setItem('clinicalAdminPassword', newPassword);
      adminPasswordForm.reset();
      adminPasswordStatus.textContent = 'Admin password updated.';
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
