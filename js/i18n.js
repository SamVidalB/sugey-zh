/**
 * Sugey ZH Rehabilitación Oral — Bilingual Engine (ES / EN)
 * Zero-reload dictionary translation, localStorage persistence, and localized
 * clinical metadata for modals, form feedback, and WhatsApp conversion links.
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'sugey_zh_lang';
  const DEFAULT_LANG = 'es';
  const SUPPORTED_LANGS = ['es', 'en'];
  const WHATSAPP_PHONE = '573156783888';
  const CLINIC_EMAIL = 'szodontologiaunivalle@gmail.com';
  const TEST_CC_EMAIL = 'samirvidal@gmail.com';
  const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/' + CLINIC_EMAIL;

  const I18N_DICTIONARY = {
    es: {
      'meta.title': 'Sugey ZH — Rehabilitación Oral & Estética Dental en Cali',
      'meta.description': 'Consultorio odontológico en Unicentro Cali, Edificio Oasis 720A: Implantología, Prostodoncia, Diseño de Sonrisa, Periodoncia y Endodoncia.',
      'brand.subtitle': 'Rehabilitación Oral',

      'topbar.address': 'Unicentro Cali, Ed. Oasis, Cons. 720A',
      'topbar.hours': 'Lun - Vie: 8am - 6pm | Sáb: 8am - 1pm',
      'topbar.certified': 'Rehabilitación Oral Certificada',

      'nav.home': 'Inicio',
      'nav.about': 'Nosotros',
      'nav.services': 'Servicios',
      'nav.cases': 'Casos',
      'nav.reviews': 'Opiniones',
      'nav.contact': 'Ubicación',
      'nav.menu_aria': 'Abrir menú de navegación',
      'cta.book': 'Agendar Cita',

      'theme.toggle_to_dark': 'Cambiar a modo oscuro',
      'theme.toggle_to_light': 'Cambiar a modo claro',
      'scroll.top_aria': 'Volver arriba',
      'scroll.top_title': 'Volver arriba',

      'hero.badge': 'Rehabilitación Oral & Implantología · Cali',
      'hero.title_p1': 'Precisión clínica para',
      'hero.title_p2': 'devolver tu sonrisa',
      'hero.desc': 'Odontología reconstructiva y estética 3D en Cali bajo el liderazgo de la Dra. Sugey Zúñiga H.',
      'hero.stat1': 'Años de experiencia',
      'hero.stat2': 'Planificación 3D',
      'hero.stat3': 'Reseñas Google',
      'hero.cta_main': 'Agendar Valoración',
      'hero.cta_wa': 'WhatsApp',
      'hero.trust_note': 'Atención personalizada y bioseguridad certificada.',
      'hero.card_doc_sub': 'Rehabilitación Oral',
      'hero.card_doc_desc': 'Prostodoncia e Implantología',
      'hero.tag_tech': 'Scanner 3D CAD/CAM',

      'about.badge': 'Especialista & Consultorio',
      'about.title': 'Ciencia, estética y empatía para tu bienestar bucal',
      'about.p1': 'En Unicentro Cali (Ed. Oasis), la Dra. Sugey Zúñiga H. une ciencia y tecnología 3D para rehabilitar tu sonrisa con precisión.',
      'about.p2': 'Diagnósticos certeros, preservación biológica y transparencia en cada etapa de tu tratamiento.',
      'about.quote': '"Devolvemos función masticatoria, armonía facial y la seguridad de sonreír libremente."',
      'about.pillar1_title': 'Planificación 3D',
      'about.pillar1_desc': 'Diseño digital previo sin improvisaciones.',
      'about.pillar2_title': 'Materiales Puros',
      'about.pillar2_desc': 'Disilicato de litio y zirconio traslúcido.',
      'about.pillar3_title': 'Mínima Invasión',
      'about.pillar3_desc': 'Técnicas gentiles y ambiente tranquilo.',
      'about.pillar4_title': 'Alta Durabilidad',
      'about.pillar4_desc': 'Oclusión balanceada y protección articular.',

      'services.badge': 'Especialidades',
      'services.title': 'Servicios Especializados',
      'services.subtitle': 'Cinco áreas clínicas integradas con tecnología digital para restaurar tu salud y estética dental.',

      'srv1.tag': 'Especialidad #1',
      'srv1.title': 'Implantología',
      'srv1.desc': 'Reemplazo de piezas perdidas con implantes de titanio y planificación digital 3D.',
      'srv1.f1': 'Implantes unitarios o múltiples',
      'srv1.f2': 'Guía tomográfica 3D',
      'srv1.f3': 'Recuperación predecible',

      'srv2.tag': 'Especialidad #2',
      'srv2.title': 'Prostodoncia - Rehabilitación Oral',
      'srv2.desc': 'Reconstrucción funcional con coronas, puentes fijos y prótesis sobre implantes.',
      'srv2.f1': 'Prótesis fijas y sobre implantes',
      'srv2.f2': 'Equilibrio de mordida y ATM',
      'srv2.f3': 'Solución a desgaste y bruxismo',

      'srv3.tag': 'Especialidad #3',
      'srv3.title': 'Odontología Estética: Diseño de Sonrisa (Carillas, Coronas)',
      'srv3.desc': 'Armonía dental con carillas ultrafinas y coronas cerámicas de aspecto 100% natural.',
      'srv3.f1': 'Carillas cerámicas y en resina',
      'srv3.f2': 'Coronas libres de metal',
      'srv3.f3': 'Prueba estética previa (Mock-up)',

      'srv4.tag': 'Especialidad #4',
      'srv4.title': 'Periodoncia',
      'srv4.desc': 'Cuidado de encías y hueso de soporte para asegurar una base periodontal sana.',
      'srv4.f1': 'Control de gingivitis y periodontitis',
      'srv4.f2': 'Estética gingival y recesiones',
      'srv4.f3': 'Mantenimiento de implantes',

      'srv5.tag': 'Especialidad #5',
      'srv5.title': 'Endodoncia',
      'srv5.desc': 'Tratamiento de conductos de alta precisión para aliviar el dolor y salvar tus dientes.',
      'srv5.f1': 'Instrumentación rotatoria 3D',
      'srv5.f2': 'Retratamientos complejos',
      'srv5.f3': 'Conservación dental natural',

      'srv.ver_mas': 'Ver detalles',

      'cases.badge': 'Casos Reales',
      'cases.title': 'Galería: Antes y Después',
      'cases.desc': 'Desliza la barra para comparar la transformación estética y funcional.',
      'cases.instruction': 'Arrastra la barra',
      'cases.label_after': 'Después',
      'cases.label_before': 'Antes',
      'cases.range_aria': 'Deslizador para comparar antes y después del tratamiento',

      'case.badge': 'Caso #104',
      'case.title': 'Rehabilitación Estética',
      'case.diag_title': 'Diagnóstico:',
      'case.diag_desc': 'Desgaste incisal por bruxismo, asimetría gingival y microfracturas.',
      'case.treat_title': 'Tratamiento:',
      'case.treat_desc': 'Diseño digital DSD, armonización gingival y 8 carillas de disilicato de litio.',
      'case.time_label': 'Duración:',
      'case.time_value': '3 sesiones',
      'case.doc_label': 'Especialista:',
      'case.btn_quote': 'Evaluar mi caso',

      'reviews.badge': 'Confianza Verificada',
      'reviews.title': 'Opiniones en Google Maps',
      'reviews.subtitle': 'La tranquilidad de nuestros pacientes es nuestra mejor referencia.',
      'reviews.count': '+68 Reseñas',
      'reviews.verified': 'Google Business Profile',
      'reviews.cta_maps': 'Ver en Google Maps',

      'rev1.date': 'Hace 2 semanas',
      'rev1.text': '"Me realizaron mi implante con guía 3D y cero dolor. Resultado natural e impecable."',
      'rev1.role': 'Paciente de Implantología',

      'rev2.date': 'Hace 1 mes',
      'rev2.text': '"Mi diseño de sonrisa luce completamente natural, nada artificial. Atención cálida y serena."',
      'rev2.role': 'Paciente de Diseño de Sonrisa',

      'rev3.date': 'Hace 2 meses',
      'rev3.text': '"Recuperé mi mordida con coronas de zirconia y desaparecieron mis dolores de cabeza."',
      'rev3.role': 'Paciente de Rehabilitación Oral',

      'contact.badge': 'Ubicación & Citas',
      'contact.title': 'Agenda tu Cita de Valoración',
      'contact.subtitle': 'Escríbenos por WhatsApp o correo para coordinar tu consulta en Unicentro Cali.',

      'form.title': 'Solicitar Cita',
      'form.subtitle': 'Confirmación en menos de 2 horas hábiles.',
      'form.name_label': 'Nombre completo *',
      'form.name_placeholder': 'Ej. Carolina Montes',
      'form.phone_label': 'WhatsApp / Teléfono *',
      'form.phone_placeholder': '+57 315 678 3888',
      'form.email_label': 'Correo electrónico',
      'form.email_placeholder': 'paciente@ejemplo.com',
      'form.service_label': 'Tratamiento *',
      'form.opt1': 'Implantología',
      'form.opt2': 'Prostodoncia - Rehabilitación Oral',
      'form.opt3': 'Odontología Estética: Diseño de Sonrisa (Carillas, Coronas)',
      'form.opt4': 'Periodoncia',
      'form.opt5': 'Endodoncia',
      'form.opt6': 'Valoración General',
      'form.msg_label': 'Comentarios / Horario',
      'form.msg_placeholder': 'Cuéntanos brevemente tu motivo de consulta...',
      'form.submit': 'Enviar por WhatsApp',
      'form.submit_email': 'Enviar por Correo',
      'form.sending': 'Enviando...',
      'form.err_required': 'Ingresa tu nombre y un teléfono válido (mínimo 7 dígitos).',
      'form.err_email': 'Ingresa un correo electrónico válido o déjalo vacío.',
      'form.email_error': 'No pudimos completar el envío automático. Usa WhatsApp o el enlace directo de correo.',
      'form.success_title': '¡Solicitud lista!',
      'form.success_desc': 'Abrimos WhatsApp con tu solicitud. También puedes enviarla por correo.',
      'form.email_success_title': '¡Correo enviado!',
      'form.email_success_desc': 'Recibimos tu solicitud. Te responderemos en menos de 2 horas hábiles.',

      'loc.title': 'Consultorio Cali',
      'loc.addr_title': 'Dirección:',
      'loc.addr_text': 'C.C. Unicentro Cali, Edificio Oasis, Consultorio 720A, Cali.',
      'loc.parking': 'Parqueadero vigilado en Unicentro Cali.',
      'loc.phone_title': 'WhatsApp:',
      'loc.email_title': 'Email:',
      'loc.wa_btn': 'Chatear por WhatsApp',
      'loc.map_title': 'Google Maps — Unicentro Cali, Edificio Oasis, Consultorio 720A',

      'modal.default_title': 'Detalle del Tratamiento',
      'modal.close_aria': 'Cerrar ventana',
      'modal.close': 'Cerrar',
      'modal.book': 'Agendar tratamiento',

      'whatsapp.aria': 'Atención por WhatsApp con Dra. Sugey',
      'whatsapp.tooltip': '¿Dudas? Escríbenos por WhatsApp',

      'footer.desc': 'Odontología especializada en función, estética y cuidado personalizado en Cali.',
      'footer.col_treatments': 'Especialidades',
      'footer.srv1': 'Implantología',
      'footer.srv2': 'Prostodoncia - Rehabilitación Oral',
      'footer.srv3': 'Diseño de Sonrisa',
      'footer.srv4': 'Periodoncia',
      'footer.srv5': 'Endodoncia',
      'footer.col_clinic': 'Consultorio',
      'footer.link_about': 'Nosotros',
      'footer.link_cases': 'Antes y Después',
      'footer.link_reviews': 'Google Maps',
      'footer.link_booking': 'Agendar Cita',
      'footer.link_location': 'Unicentro Cali',
      'footer.col_hours': 'Horarios',
      'footer.hours_mf_label': 'Lunes a Viernes:',
      'footer.hours_mf_val': '8:00 AM – 6:00 PM',
      'footer.hours_sat_label': 'Sábados:',
      'footer.hours_sat_val': '8:00 AM – 1:00 PM',
      'footer.urgent_label': 'Urgencias:',
      'footer.urgent_val': 'Atención vía WhatsApp.',
      'footer.copyright': '© 2026 Sugey ZH Rehabilitación Oral · Santiago de Cali.',
      'footer.privacy': 'Privacidad',
      'footer.consent': 'Consentimiento',
      'footer.legal': 'Aviso Legal'
    },

    en: {
      'meta.title': 'Sugey ZH — Oral Rehabilitation & Aesthetic Dentistry in Cali',
      'meta.description': 'Specialist dental clinic at Unicentro Cali, Oasis Building 720A: Implantology, Prosthodontics, Smile Design, Periodontics, and Endodontics.',
      'brand.subtitle': 'Oral Rehabilitation',

      'topbar.address': 'Unicentro Cali, Oasis Bldg, Suite 720A',
      'topbar.hours': 'Mon - Fri: 8am - 6pm | Sat: 8am - 1pm',
      'topbar.certified': 'Certified Oral Rehabilitation',

      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.cases': 'Cases',
      'nav.reviews': 'Reviews',
      'nav.contact': 'Location',
      'nav.menu_aria': 'Open navigation menu',
      'cta.book': 'Book Now',

      'theme.toggle_to_dark': 'Switch to dark mode',
      'theme.toggle_to_light': 'Switch to light mode',
      'scroll.top_aria': 'Back to top',
      'scroll.top_title': 'Back to top',

      'hero.badge': 'Oral Rehabilitation & Implantology · Cali',
      'hero.title_p1': 'Clinical precision to',
      'hero.title_p2': 'restore your smile',
      'hero.desc': '3D reconstructive and aesthetic dentistry in Cali led by Dr. Sugey Zúñiga H.',
      'hero.stat1': 'Years experience',
      'hero.stat2': '3D Planning',
      'hero.stat3': 'Google rating',
      'hero.cta_main': 'Book Consultation',
      'hero.cta_wa': 'WhatsApp',
      'hero.trust_note': 'Personalized care and certified biosafety.',
      'hero.card_doc_sub': 'Oral Rehabilitation',
      'hero.card_doc_desc': 'Prosthodontics & Implantology',
      'hero.tag_tech': '3D CAD/CAM Scanner',

      'about.badge': 'Specialist & Practice',
      'about.title': 'Science, aesthetics, and empathy for your oral health',
      'about.p1': 'At Unicentro Cali (Oasis Bldg), Dr. Sugey Zúñiga H. combines scientific rigor and 3D technology to restore your smile.',
      'about.p2': 'Accurate diagnosis, biological preservation, and full transparency at every step.',
      'about.quote': '"We restore chewing comfort, facial harmony, and the freedom to smile confidently."',
      'about.pillar1_title': '3D Planning',
      'about.pillar1_desc': 'Digital design before any tooth prep.',
      'about.pillar2_title': 'Pure Ceramics',
      'about.pillar2_desc': 'Lithium disilicate & translucent zirconia.',
      'about.pillar3_title': 'Gentle Care',
      'about.pillar3_desc': 'Minimally invasive, calm environment.',
      'about.pillar4_title': 'Lasting Results',
      'about.pillar4_desc': 'Balanced bite & TMJ protection.',

      'services.badge': 'Specialties',
      'services.title': 'Specialized Services',
      'services.subtitle': 'Five clinical disciplines united by digital workflows to restore function and aesthetics.',

      'srv1.tag': 'Specialty #1',
      'srv1.title': 'Implantology',
      'srv1.desc': 'Missing-tooth replacement with titanium implants and 3D digital planning.',
      'srv1.f1': 'Single or multiple implants',
      'srv1.f2': '3D CBCT guidance',
      'srv1.f3': 'Predictable healing',

      'srv2.tag': 'Specialty #2',
      'srv2.title': 'Prosthodontics & Oral Rehabilitation',
      'srv2.desc': 'Functional restoration via crowns, bridges, and implant-supported prostheses.',
      'srv2.f1': 'Fixed & implant prosthetics',
      'srv2.f2': 'Bite & TMJ equilibration',
      'srv2.f3': 'Bruxism & wear recovery',

      'srv3.tag': 'Specialty #3',
      'srv3.title': 'Aesthetic Dentistry: Smile Design (Veneers, Crowns)',
      'srv3.desc': 'Ultra-thin ceramic veneers and metal-free crowns for a natural, bright smile.',
      'srv3.f1': 'Ceramic & composite veneers',
      'srv3.f2': 'Metal-free crowns',
      'srv3.f3': 'Trial intraoral mock-up',

      'srv4.tag': 'Specialty #4',
      'srv4.title': 'Periodontics',
      'srv4.desc': 'Gum and bone tissue therapy securing a healthy biological foundation.',
      'srv4.f1': 'Gum disease treatment',
      'srv4.f2': 'Esthetic gum sculpting',
      'srv4.f3': 'Implant maintenance',

      'srv5.tag': 'Specialty #5',
      'srv5.title': 'Endodontics',
      'srv5.desc': 'Precision root canal therapy to relieve pain and preserve natural teeth.',
      'srv5.f1': 'Rotary 3D instrumentation',
      'srv5.f2': 'Complex retreatments',
      'srv5.f3': 'Natural tooth preservation',

      'srv.ver_mas': 'View details',

      'cases.badge': 'Real Cases',
      'cases.title': 'Gallery: Before & After',
      'cases.desc': 'Slide to compare the aesthetic and functional transformation.',
      'cases.instruction': 'Drag handle',
      'cases.label_after': 'After',
      'cases.label_before': 'Before',
      'cases.range_aria': 'Slider to compare before and after treatment results',

      'case.badge': 'Case #104',
      'case.title': 'Aesthetic Rehabilitation',
      'case.diag_title': 'Diagnosis:',
      'case.diag_desc': 'Bruxism incisal wear, gingival asymmetry, and enamel cracks.',
      'case.treat_title': 'Treatment:',
      'case.treat_desc': 'DSD digital design, gingival alignment, and 8 lithium disilicate veneers.',
      'case.time_label': 'Timeline:',
      'case.time_value': '3 visits',
      'case.doc_label': 'Specialist:',
      'case.btn_quote': 'Evaluate my case',

      'reviews.badge': 'Verified Trust',
      'reviews.title': 'Google Maps Reviews',
      'reviews.subtitle': "Our patients' comfort is our best reference.",
      'reviews.count': '+68 Reviews',
      'reviews.verified': 'Google Business Profile',
      'reviews.cta_maps': 'View on Google Maps',

      'rev1.date': '2 weeks ago',
      'rev1.text': '"3D guided implant with zero pain. Natural, flawless functional result."',
      'rev1.role': 'Implantology Patient',

      'rev2.date': '1 month ago',
      'rev2.text': '"My smile design looks completely natural—nothing fake. Warm, calm care."',
      'rev2.role': 'Smile Design Patient',

      'rev3.date': '2 months ago',
      'rev3.text': '"Zirconia rehabilitation restored my bite and ended my chronic headaches."',
      'rev3.role': 'Oral Rehabilitation Patient',

      'contact.badge': 'Location & Booking',
      'contact.title': 'Book Your Consultation',
      'contact.subtitle': 'Message us on WhatsApp or email to schedule your visit at Unicentro Cali.',

      'form.title': 'Request Appointment',
      'form.subtitle': 'Confirmation within 2 business hours.',
      'form.name_label': 'Full name *',
      'form.name_placeholder': 'e.g. Carolina Montes',
      'form.phone_label': 'WhatsApp / Phone *',
      'form.phone_placeholder': '+57 315 678 3888',
      'form.email_label': 'Email address',
      'form.email_placeholder': 'patient@example.com',
      'form.service_label': 'Treatment *',
      'form.opt1': 'Implantology',
      'form.opt2': 'Prosthodontics & Oral Rehabilitation',
      'form.opt3': 'Aesthetic Dentistry: Smile Design (Veneers, Crowns)',
      'form.opt4': 'Periodontics',
      'form.opt5': 'Endodontics',
      'form.opt6': 'General Evaluation',
      'form.msg_label': 'Comments / Schedule',
      'form.msg_placeholder': 'Briefly share your reason for visiting...',
      'form.submit': 'Send via WhatsApp',
      'form.submit_email': 'Send via Email',
      'form.sending': 'Sending...',
      'form.err_required': 'Enter your full name and a valid phone number (7+ digits).',
      'form.err_email': 'Enter a valid email address or leave blank.',
      'form.email_error': 'Automatic delivery failed. Please use WhatsApp or the direct email link.',
      'form.success_title': 'Request ready!',
      'form.success_desc': 'WhatsApp opened with your details. You may also send via email.',
      'form.email_success_title': 'Email sent!',
      'form.email_success_desc': 'We received your request and will reply within 2 business hours.',

      'loc.title': 'Cali Clinic',
      'loc.addr_title': 'Address:',
      'loc.addr_text': 'Unicentro Cali Mall, Oasis Bldg, Suite 720A, Cali.',
      'loc.parking': 'Secured parking at Unicentro Cali Mall.',
      'loc.phone_title': 'WhatsApp:',
      'loc.email_title': 'Email:',
      'loc.wa_btn': 'Chat on WhatsApp',
      'loc.map_title': 'Google Maps — Unicentro Cali Mall, Oasis Building, Suite 720A',

      'modal.default_title': 'Treatment Details',
      'modal.close_aria': 'Close modal',
      'modal.close': 'Close',
      'modal.book': 'Book treatment',

      'whatsapp.aria': 'WhatsApp consultation with Dr. Sugey',
      'whatsapp.tooltip': 'Questions? Chat on WhatsApp',

      'footer.desc': 'Specialized dentistry focused on function, aesthetics, and personal care in Cali.',
      'footer.col_treatments': 'Specialties',
      'footer.srv1': 'Implantology',
      'footer.srv2': 'Prosthodontics & Oral Rehabilitation',
      'footer.srv3': 'Smile Design',
      'footer.srv4': 'Periodontics',
      'footer.srv5': 'Endodontics',
      'footer.col_clinic': 'Practice',
      'footer.link_about': 'About Us',
      'footer.link_cases': 'Before & After',
      'footer.link_reviews': 'Google Maps',
      'footer.link_booking': 'Book Visit',
      'footer.link_location': 'Unicentro Cali',
      'footer.col_hours': 'Hours',
      'footer.hours_mf_label': 'Mon – Fri:',
      'footer.hours_mf_val': '8:00 AM – 6:00 PM',
      'footer.hours_sat_label': 'Saturday:',
      'footer.hours_sat_val': '8:00 AM – 1:00 PM',
      'footer.urgent_label': 'Urgencies:',
      'footer.urgent_val': 'Via WhatsApp.',
      'footer.copyright': '© 2026 Sugey ZH Oral Rehabilitation · Santiago de Cali.',
      'footer.privacy': 'Privacy',
      'footer.consent': 'Consent',
      'footer.legal': 'Legal'
    }
  };

  /**
   * Concise localized clinical descriptions for the 5 specialties modal (Lite version)
   */
  const SERVICE_MODAL_DETAILS = {
    es: {
      implantologia: {
        title: 'Implantología',
        icon: 'medical_services',
        intro: 'Reemplazamos piezas perdidas con implantes de titanio biocompatibles para devolver función y estética.',
        sectionTitle: 'Protocolo clínico:',
        bullets: [
          { label: 'Tomografía 3D:', text: 'Evaluación ósea precisa previa a la cirugía.' },
          { label: 'Cirugía mínimamente invasiva:', text: 'Inserción guiada confortable y segura.' },
          { label: 'Corona definitiva:', text: 'Prótesis atornillada de ajuste exacto.' }
        ]
      },
      prostodoncia: {
        title: 'Prostodoncia - Rehabilitación Oral',
        icon: 'precision_manufacturing',
        intro: 'Reconstrucción integral de mordida, piezas fracturadas, desgaste severo o pérdida dental múltiple.',
        sectionTitle: 'Soluciones:',
        bullets: [
          { label: 'Prótesis fija e implantes:', text: 'Coronas, puentes y rehabilitaciones completas.' },
          { label: 'Equilibrio oclusal:', text: 'Recuperación de dimensión vertical y ATM.' },
          { label: 'Tecnología CAD/CAM:', text: 'Ajuste preciso y materiales de alta resistencia.' }
        ]
      },
      estetica: {
        title: 'Odontología Estética: Diseño de Sonrisa',
        icon: 'diamond',
        intro: 'Corrección de color, forma y proporción dental conservando al máximo tu esmalte natural.',
        sectionTitle: 'Incluye:',
        bullets: [
          { label: 'Mock-up previo:', text: 'Prueba visual en boca antes del resultado final.' },
          { label: 'Carillas y coronas:', text: 'Disilicato de litio y zirconio traslúcido.' },
          { label: 'Aspecto natural:', text: 'Sin tonos artificiales ni excesos.' }
        ]
      },
      periodoncia: {
        title: 'Periodoncia',
        icon: 'health_and_safety',
        intro: 'Diagnóstico y tratamiento de encías y hueso de soporte como base sana de tu sonrisa.',
        sectionTitle: 'Áreas de atención:',
        bullets: [
          { label: 'Control gingival:', text: 'Terapia para gingivitis y periodontitis.' },
          { label: 'Estética gingival:', text: 'Nivelación de márgenes y recesiones.' },
          { label: 'Mantenimiento:', text: 'Cuidado preventivo de dientes e implantes.' }
        ]
      },
      endodoncia: {
        title: 'Endodoncia',
        icon: 'biotech',
        intro: 'Tratamiento de conductos de precisión para eliminar el dolor, controlar infecciones y salvar el diente.',
        sectionTitle: 'Enfoque clínico:',
        bullets: [
          { label: 'Sistema rotatorio:', text: 'Limpieza rápida, cómoda y precisa.' },
          { label: 'Sellado hermético:', text: 'Medición digital e imagenología exacta.' },
          { label: 'Reconstrucción:', text: 'Integración directa con Rehabilitación Oral.' }
        ]
      }
    },
    en: {
      implantologia: {
        title: 'Implantology',
        icon: 'medical_services',
        intro: 'Missing teeth replaced with medical-grade titanium implants for lasting function and aesthetics.',
        sectionTitle: 'Clinical protocol:',
        bullets: [
          { label: '3D CBCT scan:', text: 'Accurate pre-surgical bone assessment.' },
          { label: 'Minimally invasive:', text: 'Gentle, predictable guided placement.' },
          { label: 'Final crown:', text: 'Precision screw-retained restoration.' }
        ]
      },
      prostodoncia: {
        title: 'Prosthodontics & Oral Rehabilitation',
        icon: 'precision_manufacturing',
        intro: 'Comprehensive restoration for broken teeth, severe bruxism wear, or multiple tooth loss.',
        sectionTitle: 'Solutions:',
        bullets: [
          { label: 'Fixed & implant care:', text: 'Crowns, bridges, and full-arch prosthetics.' },
          { label: 'Bite & TMJ balance:', text: 'Vertical dimension and joint recovery.' },
          { label: 'CAD/CAM precision:', text: 'Durable, passive-fit ceramics.' }
        ]
      },
      estetica: {
        title: 'Aesthetic Dentistry: Smile Design',
        icon: 'diamond',
        intro: 'Refining tooth shade, shape, and proportion while conserving healthy natural enamel.',
        sectionTitle: 'Includes:',
        bullets: [
          { label: 'Trial mock-up:', text: 'Preview your smile in-mouth beforehand.' },
          { label: 'Veneers & crowns:', text: 'Lithium disilicate and layered zirconia.' },
          { label: 'Natural aesthetics:', text: 'Balanced translucency, never artificial.' }
        ]
      },
      periodoncia: {
        title: 'Periodontics',
        icon: 'health_and_safety',
        intro: 'Gum and supporting-bone therapy ensuring a healthy foundation for teeth and implants.',
        sectionTitle: 'Care focus:',
        bullets: [
          { label: 'Gum health:', text: 'Gingivitis and periodontitis control.' },
          { label: 'Gum sculpting:', text: 'Margin alignment and recession care.' },
          { label: 'Maintenance:', text: 'Long-term peri-implant prevention.' }
        ]
      },
      endodoncia: {
        title: 'Endodontics',
        icon: 'biotech',
        intro: 'Precision root canal therapy to relieve pain, eliminate infection, and save natural teeth.',
        sectionTitle: 'Clinical approach:',
        bullets: [
          { label: 'Rotary system:', text: 'Fast, comfortable canal shaping.' },
          { label: 'Hermetic seal:', text: 'Digital apex measurement & imaging.' },
          { label: 'Restoration:', text: 'Seamless follow-up with Prosthodontics.' }
        ]
      }
    }
  };

  const WHATSAPP_MESSAGES = {
    es: {
      hero: 'Hola Dra. Sugey, quisiera agendar una cita de valoración en Unicentro Cali (Consultorio 720A)',
      location: 'Hola Dra. Sugey, quisiera solicitar información para una cita presencial en Unicentro Cali, Edificio Oasis',
      floating: 'Hola Dra. Sugey, quisiera consultar por una cita o tratamiento'
    },
    en: {
      hero: 'Hello Dr. Sugey, I would like to schedule an evaluation consultation at Unicentro Cali (Suite 720A)',
      location: 'Hello Dr. Sugey, I would like information to book an in-person appointment at Unicentro Cali, Oasis Building',
      floating: 'Hello Dr. Sugey, I would like to inquire about an appointment or treatment'
    }
  };

  let activeLanguage = DEFAULT_LANG;

  function readStoredLanguage() {
    try {
      const saved = global.localStorage ? global.localStorage.getItem(STORAGE_KEY) : null;
      return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
    } catch (_) {
      return DEFAULT_LANG;
    }
  }

  function persistLanguage(lang) {
    try {
      if (global.localStorage) {
        global.localStorage.setItem(STORAGE_KEY, lang);
      }
    } catch (_) {
      // Ignore storage errors in private/restricted browser contexts
    }
  }

  function updateLanguageButtons(lang) {
    const btnEs = document.getElementById('lang-es');
    const btnEn = document.getElementById('lang-en');
    const activeClasses = 'px-2.5 py-1 rounded-full bg-light-primary text-white transition-all duration-state-change shadow-sm cursor-pointer';
    const inactiveClasses = 'px-2.5 py-1 rounded-full text-light-on-surface-variant hover:text-light-primary transition-all duration-state-change cursor-pointer';

    if (btnEs) {
      btnEs.className = lang === 'es' ? activeClasses : inactiveClasses;
      btnEs.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    }
    if (btnEn) {
      btnEn.className = lang === 'en' ? activeClasses : inactiveClasses;
      btnEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    }
  }

  function updateWhatsAppLinks(lang) {
    const msgs = WHATSAPP_MESSAGES[lang] || WHATSAPP_MESSAGES[DEFAULT_LANG];
    const mappings = [
      { id: 'hero-whatsapp-link', msg: msgs.hero },
      { id: 'location-whatsapp-link', msg: msgs.location },
      { id: 'floating-whatsapp-link', msg: msgs.floating }
    ];

    mappings.forEach(function (item) {
      const el = document.getElementById(item.id);
      if (el) {
        el.href = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(item.msg);
      }
    });
  }

  function applyTranslations(lang) {
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY[DEFAULT_LANG];

    document.documentElement.setAttribute('lang', lang);

    if (dict['meta.title']) {
      document.title = dict['meta.title'];
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict['meta.description']) {
      metaDesc.setAttribute('content', dict['meta.description']);
    }

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        const attrTarget = el.tagName === 'IFRAME' ? 'title' : 'aria-label';
        el.setAttribute(attrTarget, dict[key]);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.setAttribute('title', dict[key]);
      }
    });
  }

  function switchLanguage(lang) {
    const nextLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    activeLanguage = nextLang;

    persistLanguage(nextLang);
    updateLanguageButtons(nextLang);
    applyTranslations(nextLang);
    updateWhatsAppLinks(nextLang);

    document.dispatchEvent(new CustomEvent('sugey:languageChanged', {
      detail: { lang: nextLang }
    }));

    return nextLang;
  }

  function getActiveLanguage() {
    return activeLanguage;
  }

  function getText(key, lang) {
    const targetLang = SUPPORTED_LANGS.includes(lang) ? lang : activeLanguage;
    const dict = I18N_DICTIONARY[targetLang] || I18N_DICTIONARY[DEFAULT_LANG];
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : '';
  }

  function getServiceDetails(serviceKey, lang) {
    const targetLang = SUPPORTED_LANGS.includes(lang) ? lang : activeLanguage;
    const langSet = SERVICE_MODAL_DETAILS[targetLang] || SERVICE_MODAL_DETAILS[DEFAULT_LANG];
    return langSet[serviceKey] || null;
  }

  function initI18n() {
    const initialLang = readStoredLanguage();
    switchLanguage(initialLang);
  }

  // Expose public API globally for header buttons and main.js
  global.switchLanguage = switchLanguage;
  global.SugeyI18n = {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_LANG: DEFAULT_LANG,
    WHATSAPP_PHONE: WHATSAPP_PHONE,
    CLINIC_EMAIL: CLINIC_EMAIL,
    TEST_CC_EMAIL: TEST_CC_EMAIL,
    FORM_SUBMIT_URL: FORM_SUBMIT_URL,
    dictionary: I18N_DICTIONARY,
    SERVICE_MODAL_DETAILS: SERVICE_MODAL_DETAILS,
    serviceDetails: SERVICE_MODAL_DETAILS,
    switchLanguage: switchLanguage,
    getActiveLanguage: getActiveLanguage,
    getText: getText,
    getServiceDetails: getServiceDetails
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
})(window);
