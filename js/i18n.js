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
      'meta.title': 'Sugey ZH — Rehabilitación Oral & Alta Estética Dental en Cali',
      'meta.description': 'Consultorio odontológico especializado en Implantología, Prostodoncia - Rehabilitación Oral, Odontología Estética, Periodoncia y Endodoncia en Unicentro Cali, Edificio Oasis, Consultorio 720A.',
      'brand.subtitle': 'Rehabilitación Oral',

      'topbar.address': 'C.C. Unicentro Cali, Edificio Oasis, Consultorio 720A',
      'topbar.hours': 'Lun - Vie: 8:00 AM - 6:00 PM | Sáb: 8:00 AM - 1:00 PM',
      'topbar.certified': 'Especialista Certificada en Rehabilitación Oral',

      'nav.home': 'Inicio',
      'nav.about': 'Nosotros',
      'nav.services': 'Servicios Especializados',
      'nav.cases': 'Casos Clínicos',
      'nav.reviews': 'Opiniones',
      'nav.contact': 'Ubicación & Cita',
      'nav.menu_aria': 'Abrir menú de navegación',
      'cta.book': 'Agendar Cita',

      'hero.badge': 'Excelencia en Rehabilitación Oral & Implantología en Cali',
      'hero.title_p1': 'Precisión clínica y alta tecnología para',
      'hero.title_p2': 'devolver tu sonrisa',
      'hero.desc': 'Bajo el liderazgo de la Dra. Sugey Zúñiga H, combinamos odontología reconstructiva avanzada, planificación digital 3D y un ambiente sereno de calidez humana en Santiago de Cali.',
      'hero.stat1': 'Años de experiencia',
      'hero.stat2': 'Planificación digital',
      'hero.stat3': 'Reseñas en Google',
      'hero.cta_main': 'Solicitar Valoración',
      'hero.cta_wa': 'Hablar por WhatsApp',
      'hero.trust_note': 'Atención personalizada y protocolos bioseguros de estándar internacional.',
      'hero.card_doc_sub': 'Especialista en Rehabilitación Oral',
      'hero.card_doc_desc': 'Odontóloga y especialista en Prostodoncia y Rehabilitación Oral',
      'hero.tag_tech': 'Scanner Intraoral 3D CAD/CAM',

      'about.badge': 'Sobre la Especialista & El Consultorio',
      'about.title': 'Ciencia, estética y empatía al servicio de tu bienestar bucal',
      'about.p1': 'En Sugey ZH Rehabilitación Oral entendemos que cada paciente tiene una historia y necesidades anatómicas únicas. Desde nuestro consultorio en Unicentro Cali, Edificio Oasis, la Dra. Sugey combina rigurosa formación científica con tecnología de última generación para resolver desde casos estéticos sutiles hasta rehabilitaciones orales completas.',
      'about.p2': 'Inspirados en la filosofía de la odontología de precisión (diagnóstico integral, preservación biológica y sobriedad clínica), garantizamos planes de tratamiento certeros donde el paciente siempre comprende cada etapa con total transparencia.',
      'about.quote': '"Rehabilitar no es solo devolver dientes; es restaurar la función masticatoria, la armonía facial y la seguridad de volver a sonreír con total libertad."',
      'about.pillar1_title': 'Planificación Guiada 3D',
      'about.pillar1_desc': 'Diseño digital antes de tocar cualquier estructura dental.',
      'about.pillar2_title': 'Materiales Biocompatibles',
      'about.pillar2_desc': 'Cerámicas puras de disilicato de litio y zirconio traslúcido.',
      'about.pillar3_title': 'Tratamiento sin Dolor',
      'about.pillar3_desc': 'Técnicas mínimamente invasivas y atmósfera relajante.',
      'about.pillar4_title': 'Garantía de Durabilidad',
      'about.pillar4_desc': 'Oclusión balanceada que protege articulación y restauraciones.',

      'services.badge': 'Especialidades Odontológicas Integrales',
      'services.title': 'Servicios Especializados en Rehabilitación Oral',
      'services.subtitle': 'Cinco áreas clínicas de alta especialidad integradas bajo flujos digitales, microscopía y materiales de última generación para restituir la salud, función y estética de tu sonrisa.',

      'srv1.tag': 'Especialidad #1',
      'srv1.title': 'Implantología',
      'srv1.desc': 'Reposición de piezas dentales perdidas mediante implantes de titanio biocompatibles planificados con tomografía 3D para máxima estabilidad, oseointegración y recuperación predecible.',
      'srv1.f1': 'Implantes unitarios, múltiples o totales',
      'srv1.f2': 'Planificación digital con tomografía 3D',
      'srv1.f3': 'Cirugía mínimamente invasiva y segura',

      'srv2.tag': 'Especialidad #2',
      'srv2.title': 'Prostodoncia - Rehabilitación Oral',
      'srv2.desc': 'Reconstrucción funcional y estética de casos simples y complejos mediante coronas, puentes fijos, prótesis sobre implantes y equilibrio oclusal integral.',
      'srv2.f1': 'Prótesis fija sobre dientes e implantes',
      'srv2.f2': 'Recuperación de mordida y dimensión vertical',
      'srv2.f3': 'Manejo de desgaste severo y bruxismo',

      'srv3.tag': 'Especialidad #3',
      'srv3.title': 'Odontología Estética: Diseño de Sonrisa (Carillas, Coronas)',
      'srv3.desc': 'Armonización facial y dental mediante carillas ultrafinas y coronas libres de metal en cerámica de alta traslucidez para lograr una sonrisa natural y duradera.',
      'srv3.f1': 'Carillas cerámicas y en resina de alta gama',
      'srv3.f2': 'Coronas estéticas en disilicato y zirconio',
      'srv3.f3': 'Prueba estética previa (Mock-up en boca)',

      'srv4.tag': 'Especialidad #4',
      'srv4.title': 'Periodoncia',
      'srv4.desc': 'Diagnóstico, prevención y tratamiento especializado de encías y tejidos de soporte dental para garantizar bases sanas antes de cualquier rehabilitación o diseño estético.',
      'srv4.f1': 'Tratamiento de gingivitis y periodontitis',
      'srv4.f2': 'Cirugía plástica gingival y alargamientos',
      'srv4.f3': 'Mantenimiento periodontal e implantes',

      'srv5.tag': 'Especialidad #5',
      'srv5.title': 'Endodoncia',
      'srv5.desc': 'Tratamiento de conductos de alta precisión con instrumentación mecanizada e imagenología digital para eliminar el dolor, controlar infecciones y salvar tus dientes naturales.',
      'srv5.f1': 'Endodoncia rotatoria y sellado hermético',
      'srv5.f2': 'Retratamientos endodónticos complejos',
      'srv5.f3': 'Preservación de la estructura dental natural',

      'srv.ver_mas': 'Ver detalles del tratamiento',

      'cases.badge': 'Evidencia Clínica Real',
      'cases.title': 'Galería Interactiva de Casos: Antes y Después',
      'cases.desc': 'Desliza la barra horizontal para apreciar la transformación anatómica, la textura natural de las cerámicas y el cierre estético logrado.',
      'cases.instruction': 'Arrastra la barra central',
      'cases.label_after': 'Después / Resultado',
      'cases.label_before': 'Antes / Diagnóstico',
      'cases.range_aria': 'Deslizador para comparar antes y después del tratamiento',

      'case.badge': 'Caso Clínico #104',
      'case.title': 'Rehabilitación Estética & Rejuvenecimiento de Sonrisa',
      'case.diag_title': 'Diagnóstico inicial:',
      'case.diag_desc': 'Atrición severa en bordes incisales por bruxismo nocturno, discrepancia de márgenes gingivales y microfracturas en esmalte.',
      'case.treat_title': 'Tratamiento implementado:',
      'case.treat_desc': 'Encerado diagnóstico digital (DSD), armonización gingival periodontal y colocación de 8 carillas cerámicas en disilicato de litio estratificadas.',
      'case.time_label': 'Tiempo de ejecución:',
      'case.time_value': '3 sesiones clínicas',
      'case.doc_label': 'Especialista a cargo:',
      'case.btn_quote': 'Evaluar si soy candidato para este tratamiento',

      'reviews.badge': 'Gestión de Confianza & Transparencia',
      'reviews.title': 'Testimonios Reales Verificados en Google Maps',
      'reviews.subtitle': 'La tranquilidad de nuestros pacientes es nuestro mayor orgullo profesional.',
      'reviews.count': '+68 Reseñas Verificadas',
      'reviews.verified': 'Google Business Profile',
      'reviews.cta_maps': 'Ver en Google Maps',

      'rev1.date': 'Hace 2 semanas',
      'rev1.text': '"Venía con mucho miedo tras un fracaso en otra clínica con un implante. La Dra. Sugey me explicó todo con calma, utilizó guía computarizada y no sentí ningún dolor. El resultado estético y funcional es impecable."',
      'rev1.role': 'Paciente de Implantología',

      'rev2.date': 'Hace 1 mes',
      'rev2.text': '"El diseño de sonrisa que me hizo la Dra. Sugey luce completamente natural. Nada de dientes falsos o excesivamente blancos tipo tiza. Es una verdadera artista de la odontología estética. El consultorio es hermoso y muy relajante."',
      'rev2.role': 'Paciente de Diseño de Sonrisa',

      'rev3.date': 'Hace 2 meses',
      'rev3.text': '"Padecía de dolores severos de cabeza y desgaste en mis muelas por apretar los dientes. Me hicieron una rehabilitación oclusal completa con coronas de zirconia. Volví a masticar con seguridad y cesaron los dolores. Calidad de nivel internacional."',
      'rev3.role': 'Paciente de Rehabilitación Oral',

      'contact.badge': 'Atención Presencial & Agendamiento',
      'contact.title': 'Inicia tu Transformación: Agenda tu Cita de Valoración',
      'contact.subtitle': 'Completa el formulario o contáctanos por WhatsApp o correo electrónico para coordinar tu consulta en Unicentro Cali, Edificio Oasis.',

      'form.title': 'Solicitar Cita Directa',
      'form.subtitle': 'Nuestro equipo confirmará tu horario por WhatsApp o correo electrónico en menos de 2 horas hábiles.',
      'form.name_label': 'Nombre y Apellidos *',
      'form.name_placeholder': 'Ej. Carolina Montes',
      'form.phone_label': 'Teléfono / WhatsApp *',
      'form.phone_placeholder': '+57 315 678 3888',
      'form.email_label': 'Correo electrónico',
      'form.email_placeholder': 'paciente@ejemplo.com',
      'form.service_label': 'Tratamiento de Interés *',
      'form.opt1': 'Implantología',
      'form.opt2': 'Prostodoncia - Rehabilitación Oral',
      'form.opt3': 'Odontología Estética: Diseño de Sonrisa (Carillas, Coronas)',
      'form.opt4': 'Periodoncia',
      'form.opt5': 'Endodoncia',
      'form.opt6': 'Valoración Integral General',
      'form.msg_label': 'Comentarios o preferencia de horario',
      'form.msg_placeholder': 'Cuéntanos brevemente tu caso o si prefieres horario mañana o tarde...',
      'form.submit': 'Solicitar Cita por WhatsApp',
      'form.submit_email': 'Enviar por Correo Electrónico',
      'form.sending': 'Enviando correo...',
      'form.err_required': 'Por favor ingresa tu nombre completo y un número de teléfono válido (mínimo 7 dígitos).',
      'form.err_email': 'Por favor ingresa un correo electrónico válido o deja el campo vacío.',
      'form.email_error': 'No pudimos completar el envío automático en este momento. Puedes escribirnos directamente por WhatsApp o usar el enlace de correo.',
      'form.success_title': '¡Solicitud lista para enviar!',
      'form.success_desc': 'Hemos abierto WhatsApp con los datos de tu consulta. También puedes enviarla directamente por correo si lo prefieres.',
      'form.email_success_title': '¡Correo enviado exitosamente!',
      'form.email_success_desc': 'Tu solicitud de cita fue enviada a nuestro equipo clínico. Te responderemos en menos de 2 horas hábiles.',

      'loc.title': 'Información del Consultorio',
      'loc.addr_title': 'Dirección Exacta:',
      'loc.addr_text': 'Centro Comercial Unicentro Cali, Edificio Oasis, Consultorio 720A, Santiago de Cali, Colombia.',
      'loc.parking': 'Parqueadero amplio y vigilado en Centro Comercial Unicentro Cali.',
      'loc.phone_title': 'WhatsApp & Atención Inmediata:',
      'loc.email_title': 'Email Oficial:',
      'loc.wa_btn': 'Chatear directamente por WhatsApp ahora',
      'loc.map_title': 'Ubicación en Google Maps — Unicentro Cali, Edificio Oasis, Consultorio 720A',

      'modal.default_title': 'Detalle del Tratamiento',
      'modal.close_aria': 'Cerrar ventana',
      'modal.close': 'Cerrar',
      'modal.book': 'Agendar este tratamiento',

      'whatsapp.aria': 'Atención inmediata por WhatsApp con Dra. Sugey',
      'whatsapp.tooltip': '¿Tienes dudas? Escríbenos por WhatsApp',

      'footer.desc': 'Práctica odontológica especializada enfocada en la longevidad biomecánica, precisión estética y cuidado personalizado en Santiago de Cali.',
      'footer.col_treatments': 'Especialidades',
      'footer.srv1': 'Implantología',
      'footer.srv2': 'Prostodoncia - Rehabilitación Oral',
      'footer.srv3': 'Odontología Estética: Diseño de Sonrisa',
      'footer.srv4': 'Periodoncia',
      'footer.srv5': 'Endodoncia',
      'footer.col_clinic': 'Consultorio',
      'footer.link_about': 'Sobre la Dra. Sugey Zúñiga',
      'footer.link_cases': 'Casos Antes y Después',
      'footer.link_reviews': 'Opiniones en Google Maps',
      'footer.link_booking': 'Agendamiento de Citas',
      'footer.link_location': 'Ubicación en Unicentro Cali',
      'footer.col_hours': 'Horarios de Atención',
      'footer.hours_mf_label': 'Lunes a Viernes:',
      'footer.hours_mf_val': '8:00 AM – 6:00 PM',
      'footer.hours_sat_label': 'Sábados:',
      'footer.hours_sat_val': '8:00 AM – 1:00 PM',
      'footer.urgent_label': 'Urgencias odontológicas:',
      'footer.urgent_val': 'Atención prioritaria vía WhatsApp.',
      'footer.copyright': '© 2026 Sugey ZH Rehabilitación Oral. Todos los derechos reservados. Santiago de Cali, Colombia.',
      'footer.privacy': 'Política de Privacidad',
      'footer.consent': 'Consentimiento Informado',
      'footer.legal': 'Aviso Legal'
    },

    en: {
      'meta.title': 'Sugey ZH — Oral Rehabilitation & High-End Aesthetic Dentistry in Cali',
      'meta.description': 'Specialist dental clinic in Cali offering Implantology, Prosthodontics & Oral Rehabilitation, Aesthetic Dentistry (Smile Design, Veneers & Crowns), Periodontics, and Endodontics at Unicentro Cali, Oasis Building, Suite 720A.',
      'brand.subtitle': 'Oral Rehabilitation',

      'topbar.address': 'Unicentro Cali Mall, Oasis Building, Suite 720A',
      'topbar.hours': 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 8:00 AM - 1:00 PM',
      'topbar.certified': 'Board-Certified Oral Rehabilitation Specialist',

      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.services': 'Specialized Services',
      'nav.cases': 'Clinical Cases',
      'nav.reviews': 'Reviews',
      'nav.contact': 'Location & Booking',
      'nav.menu_aria': 'Open navigation menu',
      'cta.book': 'Book Appointment',

      'hero.badge': 'Excellence in Oral Rehabilitation & Implantology in Cali',
      'hero.title_p1': 'Clinical precision and high technology to',
      'hero.title_p2': 'restore your smile',
      'hero.desc': 'Led by Dr. Sugey Zúñiga H, we combine advanced reconstructive dentistry, 3D digital planning, and a calm, warm clinical atmosphere in Santiago de Cali.',
      'hero.stat1': 'Years of experience',
      'hero.stat2': 'Digital planning',
      'hero.stat3': 'Google rating',
      'hero.cta_main': 'Request Consultation',
      'hero.cta_wa': 'Chat via WhatsApp',
      'hero.trust_note': 'Personalized care and international biosafety protocols.',
      'hero.card_doc_sub': 'Oral Rehabilitation Specialist',
      'hero.card_doc_desc': 'Specialist in Prosthodontics, Oral Rehabilitation & Implants',
      'hero.tag_tech': '3D CAD/CAM Intraoral Scanner',

      'about.badge': 'About the Specialist & Practice',
      'about.title': 'Science, aesthetics, and empathy devoted to your oral health',
      'about.p1': 'At Sugey ZH Oral Rehabilitation, we understand every patient has a unique anatomical profile and personal story. From our practice at Unicentro Cali, Oasis Building, Dr. Sugey blends rigorous scientific training with state-of-the-art digital dentistry to deliver everything from refined smile enhancements to full-mouth rehabilitations.',
      'about.p2': 'Guided by precision dentistry principles (comprehensive diagnosis, biological tooth preservation, and calm clinical clarity), we deliver predictable outcomes where you understand every stage of your care with full transparency.',
      'about.quote': '"Rehabilitation is not just replacing teeth; it is restoring chewing comfort, facial harmony, and the genuine confidence of smiling freely."',
      'about.pillar1_title': '3D Guided Planning',
      'about.pillar1_desc': 'Digital mock-ups before touching any tooth structure.',
      'about.pillar2_title': 'Biocompatible Materials',
      'about.pillar2_desc': 'Pure lithium disilicate and high-translucency zirconia.',
      'about.pillar3_title': 'Pain-Free Treatments',
      'about.pillar3_desc': 'Minimally invasive techniques in a soothing atmosphere.',
      'about.pillar4_title': 'Proven Durability',
      'about.pillar4_desc': 'Balanced occlusion protecting your TMJ joint and restorations.',

      'services.badge': 'Comprehensive Dental Specialties',
      'services.title': 'Specialized Oral Rehabilitation Services',
      'services.subtitle': 'Five specialized clinical disciplines integrated through digital workflows, dental microscopy, and advanced biomaterials to restore oral function and aesthetics.',

      'srv1.tag': 'Specialty #1',
      'srv1.title': 'Implantology',
      'srv1.desc': 'Replacement of missing teeth with biocompatible titanium implants planned via 3D CBCT tomography for optimal stability, osseointegration, and predictable healing.',
      'srv1.f1': 'Single, multiple, or full-arch implants',
      'srv1.f2': '3D CBCT digital surgical planning',
      'srv1.f3': 'Minimally invasive guided protocols',

      'srv2.tag': 'Specialty #2',
      'srv2.title': 'Prosthodontics & Oral Rehabilitation',
      'srv2.desc': 'Functional and aesthetic reconstruction of simple and complex cases through crowns, fixed bridges, implant prostheses, and comprehensive occlusal equilibration.',
      'srv2.f1': 'Fixed prosthetics on teeth and implants',
      'srv2.f2': 'Bite & vertical dimension recovery',
      'srv2.f3': 'Severe wear & bruxism management',

      'srv3.tag': 'Specialty #3',
      'srv3.title': 'Aesthetic Dentistry: Smile Design (Veneers, Crowns)',
      'srv3.desc': 'Facial and dental harmonization using ultra-thin ceramic veneers and metal-free high-translucency crowns crafted for a natural, luminous, and lasting smile.',
      'srv3.f1': 'Ceramic & high-end composite veneers',
      'srv3.f2': 'Lithium disilicate & zirconia crowns',
      'srv3.f3': 'Pre-treatment intraoral trial mock-up',

      'srv4.tag': 'Specialty #4',
      'srv4.title': 'Periodontics',
      'srv4.desc': 'Specialized diagnosis, prevention, and treatment of gums and supporting bone tissues to secure a healthy biological foundation before any aesthetic or prosthetic work.',
      'srv4.f1': 'Gingivitis & periodontitis therapy',
      'srv4.f2': 'Periodontal plastic surgery & contouring',
      'srv4.f3': 'Periodontal & peri-implant maintenance',

      'srv5.tag': 'Specialty #5',
      'srv5.title': 'Endodontics',
      'srv5.desc': 'High-precision root canal therapy using rotary instrumentation and digital imaging to relieve pain, eliminate infection, and preserve your natural tooth structure.',
      'srv5.f1': 'Rotary instrumentation & hermetic sealing',
      'srv5.f2': 'Complex endodontic retreatments',
      'srv5.f3': 'Preservation of natural tooth vitality',

      'srv.ver_mas': 'View treatment details',

      'cases.badge': 'Real Clinical Evidence',
      'cases.title': 'Interactive Case Gallery: Before & After',
      'cases.desc': 'Slide horizontally to evaluate anatomical harmony, natural porcelain translucency, and the precise aesthetic restoration achieved.',
      'cases.instruction': 'Drag the center handle',
      'cases.label_after': 'After / Final Result',
      'cases.label_before': 'Before / Initial State',
      'cases.range_aria': 'Slider to compare before and after treatment results',

      'case.badge': 'Clinical Case #104',
      'case.title': 'Aesthetic Rehabilitation & Smile Rejuvenation',
      'case.diag_title': 'Initial diagnosis:',
      'case.diag_desc': 'Severe incisal edge attrition caused by nocturnal bruxism, asymmetric gingival margins, and enamel micro-fractures.',
      'case.treat_title': 'Implemented treatment:',
      'case.treat_desc': 'Digital Smile Design (DSD) wax-up, periodontal gingival harmonization, and placement of 8 hand-layered lithium disilicate ceramic veneers.',
      'case.time_label': 'Treatment timeline:',
      'case.time_value': '3 clinical sessions',
      'case.doc_label': 'Lead specialist:',
      'case.btn_quote': 'Check if I am a candidate for this treatment',

      'reviews.badge': 'Trust & Verified Transparency',
      'reviews.title': 'Real Verified Reviews on Google Maps',
      'reviews.subtitle': "Our patients' long-term peace of mind is our highest clinical reward.",
      'reviews.count': '+68 Verified Reviews',
      'reviews.verified': 'Google Business Profile',
      'reviews.cta_maps': 'View on Google Maps',

      'rev1.date': '2 weeks ago',
      'rev1.text': '"I arrived with high anxiety after a failed implant at another clinic. Dr. Sugey explained every step calmly, used 3D computer guidance, and I felt zero pain. The aesthetic and functional result is impeccable."',
      'rev1.role': 'Implantology Patient',

      'rev2.date': '1 month ago',
      'rev2.text': '"The smile design Dr. Sugey crafted looks completely natural. No chalky or overly artificial teeth. She is a true artist in restorative dentistry. The clinic is spotless and deeply calming."',
      'rev2.role': 'Smile Design Patient',

      'rev3.date': '2 months ago',
      'rev3.text': '"I suffered from severe headaches and molar wear from clenching. Dr. Sugey completed a full occlusal rehabilitation with zirconia crowns. I chew with complete confidence now and the headaches stopped. International-level quality."',
      'rev3.role': 'Oral Rehabilitation Patient',

      'contact.badge': 'In-Person Care & Scheduling',
      'contact.title': 'Begin Your Transformation: Book Your Consultation',
      'contact.subtitle': 'Complete the appointment form or reach out via WhatsApp or email to schedule your evaluation at Unicentro Cali, Oasis Building.',

      'form.title': 'Request Direct Appointment',
      'form.subtitle': 'Our team will confirm your preferred appointment time via WhatsApp or email within 2 business hours.',
      'form.name_label': 'Full Name *',
      'form.name_placeholder': 'e.g. Carolina Montes',
      'form.phone_label': 'Phone / WhatsApp *',
      'form.phone_placeholder': '+57 315 678 3888',
      'form.email_label': 'Email Address',
      'form.email_placeholder': 'patient@example.com',
      'form.service_label': 'Treatment of Interest *',
      'form.opt1': 'Implantology',
      'form.opt2': 'Prosthodontics & Oral Rehabilitation',
      'form.opt3': 'Aesthetic Dentistry: Smile Design (Veneers, Crowns)',
      'form.opt4': 'Periodontics',
      'form.opt5': 'Endodontics',
      'form.opt6': 'General Comprehensive Evaluation',
      'form.msg_label': 'Comments or preferred schedule',
      'form.msg_placeholder': 'Briefly describe your case or whether you prefer morning or afternoon appointments...',
      'form.submit': 'Request Appointment via WhatsApp',
      'form.submit_email': 'Send via Email',
      'form.sending': 'Sending email...',
      'form.err_required': 'Please enter your full name and a valid phone number (at least 7 digits).',
      'form.err_email': 'Please enter a valid email address or leave the field blank.',
      'form.email_error': 'We could not complete the automatic email delivery right now. Please contact us via WhatsApp or the direct email link.',
      'form.success_title': 'Request ready to send!',
      'form.success_desc': 'We have opened WhatsApp with your consultation details. You can also send it directly by email if you prefer.',
      'form.email_success_title': 'Email sent successfully!',
      'form.email_success_desc': 'Your appointment request has been delivered to our clinical team. We will reply within 2 business hours.',

      'loc.title': 'Clinic Information',
      'loc.addr_title': 'Exact Address:',
      'loc.addr_text': 'Unicentro Cali Mall, Oasis Building, Suite 720A, Santiago de Cali, Colombia.',
      'loc.parking': 'Spacious and secure parking available inside Unicentro Cali Mall.',
      'loc.phone_title': 'WhatsApp & Immediate Assistance:',
      'loc.email_title': 'Official Email:',
      'loc.wa_btn': 'Chat directly on WhatsApp now',
      'loc.map_title': 'Google Maps location — Unicentro Cali Mall, Oasis Building, Suite 720A',

      'modal.default_title': 'Treatment Details',
      'modal.close_aria': 'Close modal',
      'modal.close': 'Close',
      'modal.book': 'Schedule this treatment',

      'whatsapp.aria': 'Immediate WhatsApp consultation with Dr. Sugey',
      'whatsapp.tooltip': 'Questions? Message us on WhatsApp',

      'footer.desc': 'Specialized dental practice focused on biomechanical longevity, aesthetic precision, and personalized care in Santiago de Cali.',
      'footer.col_treatments': 'Specialties',
      'footer.srv1': 'Implantology',
      'footer.srv2': 'Prosthodontics & Oral Rehabilitation',
      'footer.srv3': 'Aesthetic Dentistry: Smile Design',
      'footer.srv4': 'Periodontics',
      'footer.srv5': 'Endodontics',
      'footer.col_clinic': 'Practice',
      'footer.link_about': 'About Dr. Sugey Zúñiga',
      'footer.link_cases': 'Before & After Cases',
      'footer.link_reviews': 'Google Maps Reviews',
      'footer.link_booking': 'Appointment Booking',
      'footer.link_location': 'Location at Unicentro Cali',
      'footer.col_hours': 'Clinic Hours',
      'footer.hours_mf_label': 'Monday to Friday:',
      'footer.hours_mf_val': '8:00 AM – 6:00 PM',
      'footer.hours_sat_label': 'Saturdays:',
      'footer.hours_sat_val': '8:00 AM – 1:00 PM',
      'footer.urgent_label': 'Dental emergencies:',
      'footer.urgent_val': 'Priority care via WhatsApp.',
      'footer.copyright': '© 2026 Sugey ZH Oral Rehabilitation. All rights reserved. Santiago de Cali, Colombia.',
      'footer.privacy': 'Privacy Policy',
      'footer.consent': 'Informed Consent',
      'footer.legal': 'Legal Notice'
    }
  };

  /**
   * Localized detailed clinical descriptions for the 5 specialties modal
   * consumed by js/main.js when clicking "Ver detalles del tratamiento".
   */
  const SERVICE_MODAL_DETAILS = {
    es: {
      implantologia: {
        title: 'Implantología Dental de Precisión',
        icon: 'medical_services',
        intro: 'Reemplazamos uno, varios o todos los dientes perdidos mediante implantes de titanio grado médico que se integran biológicamente al hueso, devolviendo fuerza masticatoria natural y estética armónica.',
        sectionTitle: 'Protocolo clínico en nuestro consultorio:',
        bullets: [
          { label: 'Estudio tomográfico 3D:', text: 'Evaluación tridimensional exacta de la densidad ósea y estructuras anatómicas antes de la cirugía.' },
          { label: 'Inserción guiada mínimamente invasiva:', text: 'Procedimiento predecible, confortable y con mínima inflamación postoperatoria.' },
          { label: 'Rehabilitación definitiva sobre implante:', text: 'Coronas y prótesis atornilladas de ajuste exacto diseñadas para una larga vida útil.' }
        ]
      },
      prostodoncia: {
        title: 'Prostodoncia - Rehabilitación Oral',
        icon: 'precision_manufacturing',
        intro: 'Especialidad enfocada en diagnosticar y reconstruir de forma integral bocas afectadas por pérdida dental, fracturas extensas, desgaste severo por bruxismo o alteraciones de la mordida.',
        sectionTitle: 'Soluciones funcionales y protésicas:',
        bullets: [
          { label: 'Prótesis fija y sobre implantes:', text: 'Coronas individuales, puentes cerámicos y rehabilitaciones completas de alta resistencia.' },
          { label: 'Equilibrio oclusal y ATM:', text: 'Recuperación de la dimensión vertical y estabilidad de la articulación temporomandibular.' },
          { label: 'Revisión de tratamientos previos:', text: 'Solución integral de prótesis desadaptadas o restauraciones fracturadas con tecnología CAD/CAM.' }
        ]
      },
      estetica: {
        title: 'Odontología Estética: Diseño de Sonrisa (Carillas, Coronas)',
        icon: 'diamond',
        intro: 'Combinamos análisis facial, proporción áurea y cerámicas de última generación para corregir color, forma, tamaño y alineación dental preservando al máximo el esmalte sano.',
        sectionTitle: 'Nuestro protocolo estético:',
        bullets: [
          { label: 'Diseño digital y prueba en boca (Mock-up):', text: 'Visualiza y prueba tu nueva sonrisa directamente antes de realizar el tratamiento definitivo.' },
          { label: 'Carillas ultrafinas y coronas libres de metal:', text: 'Disilicato de litio y zirconio traslúcido con textura natural e inalterabilidad de color.' },
          { label: 'Armonía natural sin excesos:', text: 'Resultados elegantes que respetan tu identidad facial y translucidez dental natural.' }
        ]
      },
      periodoncia: {
        title: 'Periodoncia & Salud Gingival',
        icon: 'health_and_safety',
        intro: 'Tratamiento especializado de las encías y el hueso que sostienen los dientes e implantes. Una base periodontal sana es indispensable para la longevidad de cualquier rehabilitación oral.',
        sectionTitle: 'Áreas de atención periodontal:',
        bullets: [
          { label: 'Control de inflamación y sangrado:', text: 'Terapia integral contra gingivitis, periodontitis y bolsas periodontales.' },
          { label: 'Cirugía plástica y estética gingival:', text: 'Corrección de sonrisa gingival, recesiones y nivelación de márgenes antes de carillas o coronas.' },
          { label: 'Mantenimiento periimplantario:', text: 'Cuidado preventivo periódico para conservar tus implantes y encías libres de infección.' }
        ]
      },
      endodoncia: {
        title: 'Endodoncia de Alta Precisión',
        icon: 'biotech',
        intro: 'Tratamiento conservador del tejido pulpar (nervio) orientado a aliviar el dolor dental agudo, erradicar infecciones profundas y evitar extracciones innecesarias conservando tu diente natural.',
        sectionTitle: 'Tecnología y enfoque clínico:',
        bullets: [
          { label: 'Instrumentación mecanizada rotatoria:', text: 'Limpieza y conformación tridimensional más rápida, cómoda y precisa de los conductos.' },
          { label: 'Localización electrónica e imagen digital:', text: 'Medición exacta de la longitud radicular para un sellado hermético seguro.' },
          { label: 'Retratamientos y reconstrucción posterior:', text: 'Integración directa con Rehabilitación Oral para proteger el diente tratado con incrustación o corona.' }
        ]
      }
    },
    en: {
      implantologia: {
        title: 'Precision Dental Implantology',
        icon: 'medical_services',
        intro: 'We replace single, multiple, or full-arch missing teeth using medical-grade titanium implants that osseointegrate naturally with bone, restoring confident chewing function and facial harmony.',
        sectionTitle: 'Our clinical workflow:',
        bullets: [
          { label: '3D CBCT Tomographic Evaluation:', text: 'Three-dimensional assessment of bone volume, density, and anatomical safety zones prior to surgery.' },
          { label: 'Minimally invasive placement:', text: 'Predictable, gentle surgical protocols designed to minimize swelling and accelerate healing.' },
          { label: 'Definitive implant restoration:', text: 'Screw-retained ceramic crowns and prostheses engineered for passive fit and long-term durability.' }
        ]
      },
      prostodoncia: {
        title: 'Prosthodontics & Oral Rehabilitation',
        icon: 'precision_manufacturing',
        intro: 'Specialized discipline dedicated to diagnosing and comprehensively restoring teeth compromised by tooth loss, structural fractures, severe bruxism wear, or collapsed bite relationships.',
        sectionTitle: 'Functional & prosthetic solutions:',
        bullets: [
          { label: 'Fixed & implant-supported prosthetics:', text: 'Single crowns, ceramic bridges, and full-mouth rehabilitations built for biomechanically sound longevity.' },
          { label: 'Occlusal & TMJ equilibration:', text: 'Restoration of physiological vertical dimension and temporomandibular joint comfort.' },
          { label: 'Revision of failing restorations:', text: 'Comprehensive replacement of ill-fitting crowns or bridges using CAD/CAM precision.' }
        ]
      },
      estetica: {
        title: 'Aesthetic Dentistry: Smile Design (Veneers, Crowns)',
        icon: 'diamond',
        intro: 'We merge facial aesthetic analysis with artisanal dental ceramics to refine tooth shade, contour, surface micro-texture, and proportion while conserving healthy natural enamel.',
        sectionTitle: 'Our bespoke aesthetic protocol:',
        bullets: [
          { label: 'Digital Smile Design & Mock-up trial:', text: 'Preview and feel your proposed smile directly in your mouth before final fabrication.' },
          { label: 'Ultra-thin veneers & metal-free crowns:', text: 'Lithium disilicate and layered zirconia restorations with permanent color stability.' },
          { label: 'Refined, natural-looking results:', text: 'Balanced translucency tailored to your facial features—never chalky or artificial.' }
        ]
      },
      periodoncia: {
        title: 'Periodontics & Gum Health',
        icon: 'health_and_safety',
        intro: 'Specialized care for the gums and supporting bone around natural teeth and dental implants. Healthy periodontal tissues are the essential foundation of any lasting oral rehabilitation.',
        sectionTitle: 'Periodontal care pillars:',
        bullets: [
          { label: 'Gingivitis & periodontitis therapy:', text: 'Targeted non-surgical and surgical management to arrest gum bleeding and bone loss.' },
          { label: 'Esthetic gingival sculpting:', text: 'Gummy-smile correction, root coverage, and gingival margin alignment prior to veneers or crowns.' },
          { label: 'Peri-implant maintenance:', text: 'Scheduled preventive care to keep implants and surrounding tissues healthy long term.' }
        ]
      },
      endodoncia: {
        title: 'High-Precision Endodontics',
        icon: 'biotech',
        intro: 'Conservative root canal therapy aimed at relieving acute dental pain, eliminating deep root infections, and saving compromised natural teeth from unnecessary extraction.',
        sectionTitle: 'Clinical technology & care:',
        bullets: [
          { label: 'Mechanized rotary instrumentation:', text: 'Efficient, comfortable, and thorough cleaning and shaping of complex root canal systems.' },
          { label: 'Electronic apex location & digital imaging:', text: 'Accurate working-length precision for reliable three-dimensional hermetic sealing.' },
          { label: 'Endodontic retreatments & coronal protection:', text: 'Seamless coordination with Prosthodontics for post-endodontic onlays or crowns.' }
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
