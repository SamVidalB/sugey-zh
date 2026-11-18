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
  let activeModalServiceKey = null;

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
      sectionHeading.className = 'font-headline font-bold text-light-primary text-sm mb-2';
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
          strong.className = 'text-light-primary';
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

  function showFormFeedback(isError, message, urls) {
    const errorAlert = document.getElementById('form-error-alert');
    const errorText = document.getElementById('form-error-text');
    const successAlert = document.getElementById('form-success-alert');
    const waFallback = document.getElementById('form-wa-fallback');
    const mailtoFallback = document.getElementById('form-mailto-fallback');

    if (isError) {
      if (successAlert) successAlert.classList.add('hidden');
      if (errorText) errorText.textContent = message;
      if (errorAlert) errorAlert.classList.remove('hidden');
      return;
    }

    if (errorAlert) errorAlert.classList.add('hidden');
    if (urls) {
      if (waFallback) waFallback.href = urls.whatsappUrl;
      if (mailtoFallback) mailtoFallback.href = urls.mailtoUrl;
    }
    if (successAlert) successAlert.classList.remove('hidden');
  }

  function handleFormSubmit(event, channel) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const validation = validateFormInputs();
    if (!validation.valid) {
      showFormFeedback(true, validation.errorMessage);
      return false;
    }

    const urls = buildDispatchUrls(validation.data);
    showFormFeedback(false, '', urls);

    const targetUrl = channel === 'email' ? urls.mailtoUrl : urls.whatsappUrl;
    if (channel === 'email') {
      global.location.href = targetUrl;
    } else if (typeof global.open === 'function') {
      global.open(targetUrl, '_blank', 'noopener,noreferrer');
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
   * 5. Global Keyboard & Viewport Listeners
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
    initSmoothScroll();
    initServiceModals();
    initAppointmentForm();
    initGlobalListeners();
  }

  // Expose public handlers for HTML attributes and tests
  global.toggleMobileMenu = toggleMobileMenu;
  global.closeMobileMenu = closeMobileMenu;
  global.openServiceModal = openServiceModal;
  global.closeServiceModal = closeServiceModal;
  global.handleFormSubmit = handleFormSubmit;
  global.SugeyMain = {
    init: initMain,
    toggleMobileMenu: toggleMobileMenu,
    closeMobileMenu: closeMobileMenu,
    openServiceModal: openServiceModal,
    closeServiceModal: closeServiceModal,
    handleFormSubmit: handleFormSubmit,
    validateFormInputs: validateFormInputs,
    buildStructuredConsultationMessage: buildStructuredConsultationMessage
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
  } else {
    initMain();
  }
})(window);
