/**
 * Sugey ZH Rehabilitación Oral — Main Interactive Controller
 * Handles smooth anchor navigation, responsive mobile drawer, dynamic
 * 5-specialty treatment modals (ES/EN), and appointment form validation
 * with WhatsApp & email dispatch.
 */
(function (global) {
  'use strict';

  const DEFAULT_WHATSAPP = '573156783888';
  const DEFAULT_EMAIL = 'szodontologiaunivalle@gmail.com';
  const DEFAULT_TEST_CC = 'samirvidal@gmail.com';
  const DEFAULT_FORMSUBMIT_URL = 'https://formsubmit.co/ajax/' + DEFAULT_EMAIL;
  const THEME_STORAGE_KEY = 'sugey_zh_theme';
  const NAVBAR_LOGO_LIGHT = './assets/img/logos/logo-navbar.png';
  const NAVBAR_LOGO_DARK = './assets/img/logos/logo-footer.png';
  const SCROLL_TOP_THRESHOLD = 400;
  let activeModalServiceKey = null;
  let isEmailSubmitting = false;
  let activeTheme = 'light';

  function getI18nApi() {
    return global.SugeyI18n || null;
  }

  function getActiveLang() {
    const api = getI18nApi();
    if (api && typeof api.getActiveLanguage === 'function') {
      return api.getActiveLanguage();
    }
    return document.documentElement.getAttribute('lang') || 'es';
  }

  function getLocalizedText(key, fallback) {
    const api = getI18nApi();
    if (api && typeof api.getText === 'function') {
      const val = api.getText(key);
      if (val) return val;
    }
    return fallback || '';
  }

  /* --------------------------------------------------------------------------
   * 1. Mobile Navigation Drawer
   * ------------------------------------------------------------------------ */
  function setMobileMenuOpen(isOpen) {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const btn = document.getElementById('mobile-menu-btn');

    if (!menu || !btn) return;

    if (isOpen) {
      menu.classList.remove('hidden');
      if (icon) icon.textContent = 'close';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      menu.classList.add('hidden');
      if (icon) icon.textContent = 'menu';
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    const willOpen = menu.classList.contains('hidden');
    setMobileMenuOpen(willOpen);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  /* --------------------------------------------------------------------------
   * 2. Smooth Scroll with Sticky Header Compensation
   * ------------------------------------------------------------------------ */
  function scrollToSection(targetId) {
    if (!targetId || targetId === '#') return;
    const id = targetId.charAt(0) === '#' ? targetId.slice(1) : targetId;
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    const header = document.querySelector('header');
    const headerOffset = header ? header.offsetHeight + 8 : 88;
    const targetTop = targetEl.getBoundingClientRect().top + global.pageYOffset - headerOffset;

    if (typeof global.scrollTo === 'function') {
      global.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });
    } else if (typeof targetEl.scrollIntoView === 'function') {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetEl = document.getElementById(href.slice(1));
      if (!targetEl) return;

      e.preventDefault();
      closeMobileMenu();
      scrollToSection(href);

      if (global.history && typeof global.history.pushState === 'function') {
        global.history.pushState(null, '', href);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 3. Dynamic Treatment Details Modal (5 Specialties)
   * ------------------------------------------------------------------------ */
  function renderModalContent(details) {
    const container = document.getElementById('modal-content');
    const titleEl = document.getElementById('modal-title');
    const iconEl = document.getElementById('modal-icon');

    if (!container || !details) return;

    if (titleEl) titleEl.textContent = details.title;
    if (iconEl) iconEl.textContent = details.icon || 'dentistry';

    // Clear existing content safely
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const introP = document.createElement('p');
    introP.className = 'mb-3 leading-relaxed';
    introP.textContent = details.intro;
    container.appendChild(introP);

    if (details.sectionTitle) {
      const sectionHeading = document.createElement('h4');
      sectionHeading.className = 'font-headline font-bold text-light-primary dark:text-[#FAFAF7] text-sm mb-2';
      sectionHeading.textContent = details.sectionTitle;
      container.appendChild(sectionHeading);
    }

    if (Array.isArray(details.bullets) && details.bullets.length > 0) {
      const list = document.createElement('ul');
      list.className = 'list-disc pl-5 space-y-2';

      details.bullets.forEach(function (item) {
        const li = document.createElement('li');
        if (item.label) {
          const strong = document.createElement('strong');
          strong.className = 'text-light-primary dark:text-[#FAFAF7]';
          strong.textContent = item.label + ' ';
          li.appendChild(strong);
        }
        li.appendChild(document.createTextNode(item.text || ''));
        list.appendChild(li);
      });

      container.appendChild(list);
    }
  }

  function getDetailsForKey(serviceKey) {
    const api = getI18nApi();
    const lang = getActiveLang();
    if (!api) return null;

    if (typeof api.getServiceDetails === 'function') {
      return api.getServiceDetails(serviceKey, lang);
    }
    const catalog = api.SERVICE_MODAL_DETAILS || api.serviceDetails;
    if (catalog && catalog[lang] && catalog[lang][serviceKey]) {
      return catalog[lang][serviceKey];
    }
    return null;
  }

  function openServiceModal(serviceKey) {
    const modalEl = document.getElementById('treatment-modal');
    const details = getDetailsForKey(serviceKey);
    if (!modalEl || !details) return false;

    activeModalServiceKey = serviceKey;
    renderModalContent(details);

    const bookBtn = document.getElementById('modal-book-btn');
    if (bookBtn) {
      bookBtn.setAttribute('data-selected-service', serviceKey);
    }

    if (typeof modalEl.showModal === 'function') {
      if (!modalEl.open) {
        modalEl.showModal();
      }
    } else {
      modalEl.setAttribute('open', 'open');
    }
    return true;
  }

  function closeServiceModal() {
    const modalEl = document.getElementById('treatment-modal');
    if (!modalEl) return;

    activeModalServiceKey = null;
    if (typeof modalEl.close === 'function' && modalEl.open) {
      modalEl.close();
    } else {
      modalEl.removeAttribute('open');
    }
  }

  function initServiceModals() {
    const modalEl = document.getElementById('treatment-modal');
    if (!modalEl) return;

    // Close when clicking the backdrop outside the dialog card
    modalEl.addEventListener('click', function (e) {
      if (typeof modalEl.getBoundingClientRect !== 'function') return;
      const rect = modalEl.getBoundingClientRect();
      const clickedOutside = (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
      if (clickedOutside) {
        closeServiceModal();
      }
    });

    // Support native Escape key cancel event
    modalEl.addEventListener('cancel', function () {
      activeModalServiceKey = null;
    });

    // Pre-select specialty in booking form when clicking "Agendar este tratamiento"
    const bookBtn = document.getElementById('modal-book-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', function () {
        const chosenService = bookBtn.getAttribute('data-selected-service');
        const serviceSelect = document.getElementById('form-service');
        if (chosenService && serviceSelect) {
          serviceSelect.value = chosenService;
        }
        closeServiceModal();
      });
    }

    // Re-render active modal content if user toggles ES / EN while open
    document.addEventListener('sugey:languageChanged', function () {
      if (activeModalServiceKey && modalEl.open) {
        const updated = getDetailsForKey(activeModalServiceKey);
        if (updated) renderModalContent(updated);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 4. Appointment Form Validation & WhatsApp / Email Dispatch
   * ------------------------------------------------------------------------ */
  function setFieldErrorState(field, hasError) {
    if (!field || !field.classList) return;
    if (hasError) {
      field.classList.add('border-red-500', 'ring-1', 'ring-red-500');
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
      field.removeAttribute('aria-invalid');
    }
  }

  function validateFormInputs() {
    const nameEl = document.getElementById('form-name');
    const phoneEl = document.getElementById('form-phone');
    const emailEl = document.getElementById('form-email');
    const serviceEl = document.getElementById('form-service');
    const notesEl = document.getElementById('form-notes');

    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const serviceKey = serviceEl ? serviceEl.value : '';
    const serviceLabel = (serviceEl && serviceEl.selectedIndex >= 0 && serviceEl.options[serviceEl.selectedIndex])
      ? serviceEl.options[serviceEl.selectedIndex].textContent.trim()
      : serviceKey;
    const notes = notesEl ? notesEl.value.trim() : '';

    setFieldErrorState(nameEl, false);
    setFieldErrorState(phoneEl, false);
    setFieldErrorState(emailEl, false);

    const digitCount = phone.replace(/\D/g, '').length;
    if (name.length < 2 || digitCount < 7) {
      if (name.length < 2) setFieldErrorState(nameEl, true);
      if (digitCount < 7) setFieldErrorState(phoneEl, true);
      const firstInvalid = name.length < 2 ? nameEl : phoneEl;
      if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
      return {
        valid: false,
        errorMessage: getLocalizedText('form.err_required', 'Por favor ingresa tu nombre completo y un teléfono válido.')
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setFieldErrorState(emailEl, true);
      if (emailEl && typeof emailEl.focus === 'function') emailEl.focus();
      return {
        valid: false,
        errorMessage: getLocalizedText('form.err_email', 'Por favor ingresa un correo electrónico válido.')
      };
    }

    return {
      valid: true,
      data: {
        name: name,
        phone: phone,
        email: email,
        serviceKey: serviceKey,
        serviceLabel: serviceLabel,
        notes: notes
      }
    };
  }

  function buildStructuredConsultationMessage(data, lang) {
    const isEnglish = lang === 'en';
    const lines = isEnglish
      ? [
          'Hello Dr. Sugey Zúñiga, I would like to request an appointment at Unicentro Cali (Suite 720A):',
          '',
          '• Patient Name: ' + data.name,
          '• Phone / WhatsApp: ' + data.phone,
          data.email ? '• Email: ' + data.email : null,
          '• Treatment of Interest: ' + data.serviceLabel,
          data.notes ? '• Comments / Schedule: ' + data.notes : null
        ]
      : [
          'Hola Dra. Sugey Zúñiga, quisiera solicitar una cita de valoración en Unicentro Cali (Consultorio 720A):',
          '',
          '• Nombre: ' + data.name,
          '• Teléfono / WhatsApp: ' + data.phone,
          data.email ? '• Correo electrónico: ' + data.email : null,
          '• Tratamiento de interés: ' + data.serviceLabel,
          data.notes ? '• Comentarios / Horario: ' + data.notes : null
        ];

    return lines.filter(Boolean).join('\n');
  }

  function buildDispatchUrls(data) {
    const api = getI18nApi();
    const waPhone = (api && api.WHATSAPP_PHONE) ? api.WHATSAPP_PHONE : DEFAULT_WHATSAPP;
    const clinicEmail = (api && api.CLINIC_EMAIL) ? api.CLINIC_EMAIL : DEFAULT_EMAIL;
    const lang = getActiveLang();

    const message = buildStructuredConsultationMessage(data, lang);
    const subject = lang === 'en'
      ? 'Appointment Request — ' + data.serviceLabel + ' (' + data.name + ')'
      : 'Solicitud de Cita — ' + data.serviceLabel + ' (' + data.name + ')';

    return {
      whatsappUrl: 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent(message),
      mailtoUrl: 'mailto:' + clinicEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message)
    };
  }

  function showFormFeedback(isError, message, urls, successChannel) {
    const errorAlert = document.getElementById('form-error-alert');
    const errorText = document.getElementById('form-error-text');
    const successAlert = document.getElementById('form-success-alert');
    const successTitle = document.getElementById('form-success-title');
    const successDesc = document.getElementById('form-success-desc');
    const waFallback = document.getElementById('form-wa-fallback');
    const mailtoFallback = document.getElementById('form-mailto-fallback');

    if (isError) {
      if (successAlert) successAlert.classList.add('hidden');
      if (errorText) errorText.textContent = message;
      if (errorAlert) errorAlert.classList.remove('hidden');
      return;
    }

    if (errorAlert) errorAlert.classList.add('hidden');

    if (successTitle && successDesc) {
      if (successChannel === 'email') {
        successTitle.textContent = getLocalizedText('form.email_success_title', '¡Correo enviado exitosamente!');
        successDesc.textContent = getLocalizedText('form.email_success_desc', 'Tu solicitud de cita fue enviada a nuestro equipo clínico. Te responderemos en menos de 2 horas hábiles.');
      } else {
        successTitle.textContent = getLocalizedText('form.success_title', '¡Solicitud lista para enviar!');
        successDesc.textContent = getLocalizedText('form.success_desc', 'Hemos abierto WhatsApp con los datos de tu consulta. También puedes enviarla directamente por correo si lo prefieres.');
      }
    }

    if (urls) {
      if (waFallback) waFallback.href = urls.whatsappUrl;
      if (mailtoFallback) mailtoFallback.href = urls.mailtoUrl;
    }
    if (successAlert) successAlert.classList.remove('hidden');
  }

  function setEmailButtonLoading(isLoading) {
    const emailBtn = document.getElementById('form-email-btn');
    const emailLabel = document.getElementById('form-email-btn-label');
    if (emailBtn) {
      emailBtn.disabled = isLoading;
      emailBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    }
    if (emailLabel) {
      emailLabel.textContent = isLoading
        ? getLocalizedText('form.sending', 'Enviando correo...')
        : getLocalizedText('form.submit_email', 'Enviar por Correo Electrónico');
    }
  }

  function buildFormSubmitPayload(data, lang) {
    const api = getI18nApi();
    const ccEmail = (api && api.TEST_CC_EMAIL) ? api.TEST_CC_EMAIL : DEFAULT_TEST_CC;
    const isEnglish = lang === 'en';
    const submittedAt = new Date().toLocaleString(isEnglish ? 'en-US' : 'es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const subject = isEnglish
      ? 'New Appointment Request — ' + data.serviceLabel + ' | ' + data.name + ' (Sugey ZH)'
      : 'Nueva Solicitud de Cita — ' + data.serviceLabel + ' | ' + data.name + ' (Sugey ZH)';

    const payload = {
      _subject: subject,
      _cc: ccEmail,
      _template: 'table',
      _captcha: 'false',
      _honey: ''
    };

    if (isEnglish) {
      payload['Patient Name'] = data.name;
      payload['Phone / WhatsApp'] = data.phone;
      payload['Requested Treatment'] = data.serviceLabel;
      payload['Clinic Location'] = 'Unicentro Cali Mall, Oasis Building, Suite 720A — Santiago de Cali';
      payload['Patient Comments'] = data.notes || 'No additional comments provided.';
      payload['Preferred Language'] = 'English';
      payload['Submitted At'] = submittedAt;
    } else {
      payload['Nombre del Paciente'] = data.name;
      payload['Teléfono / WhatsApp'] = data.phone;
      payload['Tratamiento de Interés'] = data.serviceLabel;
      payload['Sede de Atención'] = 'C.C. Unicentro Cali, Edificio Oasis, Consultorio 720A — Santiago de Cali';
      payload['Comentarios / Horario'] = data.notes || 'Sin comentarios adicionales.';
      payload['Idioma de Solicitud'] = 'Español';
      payload['Fecha y Hora'] = submittedAt;
    }

    if (data.email) {
      payload.email = data.email;
      payload._replyto = data.email;
      payload._autoresponse = isEnglish
        ? [
            'Hello ' + data.name + ',',
            '',
            'Thank you for contacting Sugey ZH Oral Rehabilitation (Dr. Sugey Zúñiga H.).',
            'We have received your consultation request for: ' + data.serviceLabel + '.',
            '',
            'Our reception team will confirm your appointment slot within 2 business hours.',
            'Clinic Address: Unicentro Cali Mall, Oasis Building, Suite 720A, Santiago de Cali, Colombia.',
            'Direct WhatsApp: +57 315 678 3888',
            'Email: szodontologiaunivalle@gmail.com',
            '',
            'Warm regards,',
            'Sugey ZH Oral Rehabilitation Team'
          ].join('\n')
        : [
            'Hola ' + data.name + ',',
            '',
            'Gracias por comunicarte con Sugey ZH Rehabilitación Oral (Dra. Sugey Zúñiga H.).',
            'Hemos recibido tu solicitud de cita para: ' + data.serviceLabel + '.',
            '',
            'Nuestro equipo confirmará tu horario disponible en menos de 2 horas hábiles.',
            'Consultorio: Centro Comercial Unicentro Cali, Edificio Oasis, Consultorio 720A, Santiago de Cali.',
            'WhatsApp directo: +57 315 678 3888',
            'Correo: szodontologiaunivalle@gmail.com',
            '',
            'Cordialmente,',
            'Equipo Sugey ZH Rehabilitación Oral'
          ].join('\n');
    }

    return payload;
  }

  async function sendEmailViaFormSubmit(data, urls) {
    if (isEmailSubmitting) return false;

    const api = getI18nApi();
    const endpoint = (api && api.FORM_SUBMIT_URL) ? api.FORM_SUBMIT_URL : DEFAULT_FORMSUBMIT_URL;
    const lang = getActiveLang();
    const payload = buildFormSubmitPayload(data, lang);

    if (typeof global.fetch !== 'function') {
      showFormFeedback(false, '', urls, 'email');
      global.location.href = urls.mailtoUrl;
      return true;
    }

    isEmailSubmitting = true;
    setEmailButtonLoading(true);

    try {
      const response = await global.fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(function () { return {}; });
      const ok = response.ok && (result.success === true || result.success === 'true');
      if (!ok) {
        throw new Error(result.message || 'FormSubmit request failed');
      }

      showFormFeedback(false, '', urls, 'email');
      const formEl = document.getElementById('appointment-form');
      if (formEl && typeof formEl.reset === 'function') {
        formEl.reset();
      }
      return true;
    } catch (_) {
      showFormFeedback(
        true,
        getLocalizedText(
          'form.email_error',
          'No pudimos completar el envío automático en este momento. Puedes escribirnos directamente por WhatsApp o usar el enlace de correo.'
        ),
        urls
      );
      return false;
    } finally {
      isEmailSubmitting = false;
      setEmailButtonLoading(false);
    }
  }

  function handleFormSubmit(event, channel) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const honeyEl = document.getElementById('form-honey');
    if (honeyEl && honeyEl.value) {
      return false;
    }

    const validation = validateFormInputs();
    if (!validation.valid) {
      showFormFeedback(true, validation.errorMessage);
      return false;
    }

    const urls = buildDispatchUrls(validation.data);

    if (channel === 'email') {
      return sendEmailViaFormSubmit(validation.data, urls);
    }

    showFormFeedback(false, '', urls, 'whatsapp');
    if (typeof global.open === 'function') {
      global.open(urls.whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    return true;
  }

  function initAppointmentForm() {
    const emailBtn = document.getElementById('form-email-btn');
    if (emailBtn) {
      emailBtn.addEventListener('click', function () {
        handleFormSubmit(null, 'email');
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 5. Light / Dark Clinical Theme Controller (Light by default)
   * ------------------------------------------------------------------------ */
  function readStoredTheme() {
    try {
      const saved = global.localStorage ? global.localStorage.getItem(THEME_STORAGE_KEY) : null;
      return saved === 'dark' ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  }

  function persistTheme(theme) {
    try {
      if (global.localStorage) {
        global.localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch (_) {
      // Ignore storage errors in private/restricted browser contexts
    }
  }

  function updateThemeToggleUi(isDark) {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const navbarLogo = document.getElementById('navbar-logo-img');
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (navbarLogo) {
      navbarLogo.setAttribute('src', isDark ? NAVBAR_LOGO_DARK : NAVBAR_LOGO_LIGHT);
    }

    if (sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.classList.remove('opacity-0', 'scale-75', '-rotate-90', 'pointer-events-none');
        sunIcon.classList.add('opacity-100', 'scale-100', 'rotate-0');
        moonIcon.classList.add('opacity-0', 'scale-75', 'rotate-90', 'pointer-events-none');
        moonIcon.classList.remove('opacity-100', 'scale-100', 'rotate-0');
      } else {
        moonIcon.classList.remove('opacity-0', 'scale-75', 'rotate-90', 'pointer-events-none');
        moonIcon.classList.add('opacity-100', 'scale-100', 'rotate-0');
        sunIcon.classList.add('opacity-0', 'scale-75', '-rotate-90', 'pointer-events-none');
        sunIcon.classList.remove('opacity-100', 'scale-100', 'rotate-0');
      }
    }

    if (toggleBtn) {
      const label = isDark
        ? getLocalizedText('theme.toggle_to_light', 'Cambiar a modo claro')
        : getLocalizedText('theme.toggle_to_dark', 'Cambiar a modo oscuro');
      toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      toggleBtn.setAttribute('aria-label', label);
      toggleBtn.setAttribute('title', label);
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#121820' : '#1C2430');
    }
  }

  function applyTheme(theme, shouldPersist) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    const isDark = nextTheme === 'dark';
    activeTheme = nextTheme;

    if (document.documentElement && document.documentElement.classList) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    document.documentElement.setAttribute('data-theme', nextTheme);

    if (shouldPersist) {
      persistTheme(nextTheme);
    }

    updateThemeToggleUi(isDark);
    return nextTheme;
  }

  function toggleTheme() {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    return applyTheme(nextTheme, true);
  }

  function getActiveTheme() {
    return activeTheme;
  }

  function initTheme() {
    const initialTheme = readStoredTheme();
    applyTheme(initialTheme, false);

    document.addEventListener('sugey:languageChanged', function () {
      updateThemeToggleUi(activeTheme === 'dark');
    });
  }

  /* --------------------------------------------------------------------------
   * 6. Floating Scroll-to-Top Button (> 400px)
   * ------------------------------------------------------------------------ */
  function updateScrollToTopVisibility() {
    const btn = document.getElementById('scroll-to-top-btn');
    if (!btn) return;

    const currentScroll = global.scrollY !== undefined ? global.scrollY : (global.pageYOffset || 0);
    const shouldShow = currentScroll > SCROLL_TOP_THRESHOLD;

    if (shouldShow) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      btn.setAttribute('aria-hidden', 'false');
      btn.tabIndex = 0;
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      btn.setAttribute('aria-hidden', 'true');
      btn.tabIndex = -1;
    }
  }

  function scrollToTop() {
    if (typeof global.scrollTo === 'function') {
      global.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  }

  function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top-btn');
    if (!btn) return;

    btn.addEventListener('click', scrollToTop);
    global.addEventListener('scroll', updateScrollToTopVisibility, { passive: true });
    updateScrollToTopVisibility();
  }

  /* --------------------------------------------------------------------------
   * 7. Global Keyboard & Viewport Listeners
   * ------------------------------------------------------------------------ */
  function initGlobalListeners() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeServiceModal();
      }
    });

    global.addEventListener('resize', function () {
      if (global.innerWidth >= 1024) {
        closeMobileMenu();
      }
    });
  }

  function initMain() {
    initTheme();
    initSmoothScroll();
    initServiceModals();
    initAppointmentForm();
    initScrollToTop();
    initGlobalListeners();
  }

  // Expose public handlers for HTML attributes and tests
  global.toggleMobileMenu = toggleMobileMenu;
  global.closeMobileMenu = closeMobileMenu;
  global.openServiceModal = openServiceModal;
  global.closeServiceModal = closeServiceModal;
  global.handleFormSubmit = handleFormSubmit;
  global.toggleTheme = toggleTheme;
  global.scrollToTop = scrollToTop;
  global.SugeyMain = {
    init: initMain,
    toggleMobileMenu: toggleMobileMenu,
    closeMobileMenu: closeMobileMenu,
    openServiceModal: openServiceModal,
    closeServiceModal: closeServiceModal,
    handleFormSubmit: handleFormSubmit,
    validateFormInputs: validateFormInputs,
    buildStructuredConsultationMessage: buildStructuredConsultationMessage,
    buildFormSubmitPayload: buildFormSubmitPayload,
    sendEmailViaFormSubmit: sendEmailViaFormSubmit,
    toggleTheme: toggleTheme,
    applyTheme: applyTheme,
    getActiveTheme: getActiveTheme,
    scrollToTop: scrollToTop,
    updateScrollToTopVisibility: updateScrollToTopVisibility
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
  } else {
    initMain();
  }
})(window);
