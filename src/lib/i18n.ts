// Sistema central de internacionalización (i18n)
// ============================================
// Para agregar un nuevo idioma (ej: portugués):
// 1. Crear cv_portuguese.json en la raíz
// 2. Agregar 'pt' al array LOCALES
// 3. Agregar la configuración en LOCALE_CONFIG
// 4. Crear la carpeta src/pages/pt/ con index.astro
// 5. Actualizar astro.config.mjs agregando 'pt' a locales

import cvEs from '../../cv.json';
import cvEn from '../../cv_english.json';
// import cvPt from '../../cv_portuguese.json'; // Descomentar cuando exista

// ============================================
// CONFIGURACIÓN CENTRAL - Solo editar aquí
// ============================================

export const DEFAULT_LOCALE = 'es';
export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

// Configuración completa por idioma
export const LOCALE_CONFIG: Record<Locale, {
  cv: any;
  label: string;
  ogLocale: string;
  htmlLang: string;
  urlPrefix: string;
  pdfFile: string;
  metaDescription: string;
  pageTitle: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string;
  jobTitle: string;
  ui: {
    aboutMe: string;
    workExperience: string;
    projects: string;
    education: string;
    skills: string;
    jobSimulations: string;
    current: string;
    downloadCV: string;
    printCV: string;
    sendEmail: string;
    callPhone: string;
    sendWhatsApp: string;
    visitProfile: string;
    viewProject: string;
    viewSourceCode: string;
    commandPalette: string;
    searchCommand: string;
    social: string;
    actions: string;
    visit: string;
    currentPractices: string;
    viewAllPractices: string;
    readGuide: string;
    rhcsaBlogTitle: string;
    rhcsaBlogDescription: string;
    ieltsPractices: string;
    ieltsBlogTitle: string;
    ieltsBlogDescription: string;
    ieltsIndexContextTitle: string;
    ieltsIndexContextNow: string;
    ieltsIndexContextCui: string;
    ieltsIndexContextFuture: string;
    ieltsIndexModulesNote: string;
    viewAllIeltsPractices: string;
    publishedOn: string;
    rhcsaListClassPrefix: string;
    rhcsaListModuleLabel: string;
    rhcsaIndexTrainingTitle: string;
    rhcsaIndexTrainingLmsLink: string;
    rhcsaIndexTrainingLmsNote: string;
    rhcsaIndexTrainingRolLink: string;
    rhcsaIndexRh124Title: string;
    rhcsaIndexRh124Link: string;
    rhcsaIndexRh134Title: string;
    rhcsaIndexRh134Link: string;
    rhcsaIndexTimelineNote: string;
    rhcsaIndexThanksNote: string;
    rhcsaIndexPlanNote: string;
  };
}> = {
  es: {
    cv: cvEs,
    label: 'Español',
    ogLocale: 'es_AR',
    htmlLang: 'es',
    urlPrefix: '',
    pdfFile: '/FelipeAlemanArce_CV_esp_Junio_2026.pdf',
    metaDescription: 'Desarrollador FullStack SSR con experiencia en React, Node.js y TypeScript. Técnico Universitario en Programación (UTN, 2025). Ingreso a Ingeniería Informática en la UNLaM. Explora mi portafolio y proyectos.',
    pageTitle: 'Felipe Arce - Desarrollador FullStack SSR | Portfolio',
    ogTitle: 'Felipe Arce - Desarrollador FullStack SSR',
    ogDescription: 'Desarrollador web, Técnico Universitario en Programación (UTN, 2025) y estudiante del ingreso a Ingeniería Informática (UNLaM). React, Node.js, MongoDB y tecnologías modernas.',
    keywords: 'Felipe Arce, desarrollador fullstack SSR, desarrollador MERN, React, Node.js, MongoDB, Express, JavaScript, TypeScript, portfolio developer, programador web, frontend developer, backend developer, Buenos Aires, Argentina',
    jobTitle: 'Desarrollador FullStack SSR',
    ui: {
      aboutMe: 'Sobre mí',
      workExperience: 'Experiencia laboral',
      projects: 'Proyectos',
      education: 'Educación',
      skills: 'Habilidades',
      jobSimulations: 'Simulaciones laborales',
      current: 'Actual',
      downloadCV: 'Descargar CV en PDF',
      printCV: 'Imprimir CV',
      sendEmail: 'Enviar un correo electrónico a',
      callPhone: 'Llamar por teléfono a',
      sendWhatsApp: 'Enviar mensaje de WhatsApp a',
      visitProfile: 'Visitar perfil de',
      viewProject: 'Ver proyecto',
      viewSourceCode: 'Ver código fuente',
      commandPalette: 'Pulsa <kbd>Cmd</kbd> + <kbd>K</kbd> para abrir la paleta de comandos.',
      searchCommand: 'Buscar comando',
      social: 'Social',
      actions: 'Acciones',
      visit: 'Visitar',
      currentPractices: 'Prácticas actuales',
      viewAllPractices: 'Ver todas las prácticas',
      readGuide: 'Leer guía',
      rhcsaBlogTitle: 'Blog RHCSA EX200',
      rhcsaBlogDescription: 'Documentación de laboratorios, guías y progreso de estudio para la certificación RHCSA EX200.',
      ieltsPractices: 'Prácticas IELTS',
      ieltsBlogTitle: 'Práctica IELTS',
      ieltsBlogDescription:
        'Preparación planificada para IELTS. Hoy priorizo inglés presencial en el CUI; el examen lo evaluaré más adelante.',
      ieltsIndexContextTitle: 'Dónde estoy ahora con el inglés',
      ieltsIndexContextNow:
        'Foco actual: CUI (ciclo básico). Terminé el Nivel 4 (oral, clase en inglés) y arranqué el Nivel 5 en junio de 2026. Nivel de referencia: ~A2 oral en aula (CUI); ~B1 lectura/escucha (EFSET).',
      ieltsIndexContextCui:
        'En la escala del CUI, los niveles 4 a 6 del ciclo básico equivalen a MCER A2; el ciclo de perfeccionamiento (niveles 11–14) apunta a MCER B2.',
      ieltsIndexContextFuture:
        'IELTS no es el foco inmediato: pienso rendir el examen cuando llegue a un nivel alto en el CUI (objetivo orientativo: Nivel 14, MCER B2+), con base oral y académica más sólida.',
      ieltsIndexModulesNote:
        'Los módulos de abajo son borradores de práctica para usar cuando empiece la preparación formal al IELTS.',
      viewAllIeltsPractices: 'Ver todas las prácticas IELTS',
      publishedOn: 'Publicado',
      rhcsaListClassPrefix: 'Clase',
      rhcsaListModuleLabel: 'Módulo',
      rhcsaIndexTrainingTitle: 'Formación oficial Red Hat (RHCSA)',
      rhcsaIndexTrainingLmsLink: 'Portal de aprendizaje Red Hat (LMS)',
      rhcsaIndexTrainingLmsNote:
        'acceso a cursos y laboratorios con tu cuenta / Learning Subscription (entrá desde tu cuenta activa).',
      rhcsaIndexTrainingRolLink: 'Catálogo Red Hat Online Learning (ROL)',
      rhcsaIndexRh124Title: 'Curso RH124 (Red Hat System Administration I)',
      rhcsaIndexRh124Link: 'RH124 — versión del curso en ROL',
      rhcsaIndexRh134Title: 'Curso RH134 (Red Hat System Administration II)',
      rhcsaIndexRh134Link: 'RH134 — versión del curso en ROL',
      rhcsaIndexTimelineNote:
        'Notas personales sobre plazos: se puede seguir trabajando aunque no alcances el tiempo previsto del curso. La renovación típica va por ventanas de ~90 días y en algunos casos eso puede reiniciar el progreso; en mi caso no me reinició el avance.',
      rhcsaIndexThanksNote:
        'Agradecimiento: en América Virtual me facilitaron la entrada gratuita al curso y van a cubrir el costo; les estoy muy agradecido.',
      rhcsaIndexPlanNote:
        'Plan: completar las prácticas en los labs de RH124 y RH134 (ROL/LMS) y documentar aquí lo hecho en esos entornos.',
    }
  },
  en: {
    cv: cvEn,
    label: 'English',
    ogLocale: 'en_US',
    htmlLang: 'en',
    urlPrefix: '/en',
    pdfFile: '/FelipeAlemanArce_CV_eng_June_2026.pdf',
    metaDescription: 'FullStack Developer SSR with experience in React, Node.js and TypeScript. University Programming Technician (UTN, 2025). UNLaM Computer Engineering entrance course. Explore my portfolio and projects.',
    pageTitle: 'Felipe Arce - FullStack Developer SSR | Portfolio',
    ogTitle: 'Felipe Arce - FullStack Developer SSR',
    ogDescription: 'Web developer, University Programming Technician (UTN, 2025), and UNLaM Computer Engineering entrance student. React, Node.js, MongoDB and modern stack.',
    keywords: 'Felipe Arce, fullstack developer SSR, MERN developer, React, Node.js, MongoDB, Express, JavaScript, TypeScript, developer portfolio, web programmer, frontend developer, backend developer, Buenos Aires, Argentina',
    jobTitle: 'FullStack Developer SSR',
    ui: {
      aboutMe: 'About me',
      workExperience: 'Work Experience',
      projects: 'Projects',
      education: 'Education',
      skills: 'Skills',
      jobSimulations: 'Job Simulations',
      current: 'Current',
      downloadCV: 'Download CV as PDF',
      printCV: 'Print CV',
      sendEmail: 'Send an email to',
      callPhone: 'Call',
      sendWhatsApp: 'Send WhatsApp message to',
      visitProfile: 'Visit profile on',
      viewProject: 'View project',
      viewSourceCode: 'View source code',
      commandPalette: 'Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open command palette.',
      searchCommand: 'Search command',
      social: 'Social',
      actions: 'Actions',
      visit: 'Visit',
      currentPractices: 'Current practice',
      viewAllPractices: 'View all practice logs',
      readGuide: 'Read guide',
      rhcsaBlogTitle: 'RHCSA EX200 Blog',
      rhcsaBlogDescription: 'Lab documentation, study guides, and progress updates for RHCSA EX200 certification.',
      ieltsPractices: 'IELTS Practice',
      ieltsBlogTitle: 'IELTS Practice',
      ieltsBlogDescription:
        'Planned IELTS preparation. Current priority is in-person English at CUI; I expect to sit the exam later.',
      ieltsIndexContextTitle: 'Where my English stands today',
      ieltsIndexContextNow:
        'Current focus: CUI (basic cycle). Completed Level 4 (oral, English-only class) and started Level 5 in June 2026. Reference level: ~A2 spoken in class (CUI); ~B1 reading/listening (EFSET).',
      ieltsIndexContextCui:
        'On the official CUI scale, basic-cycle levels 4–6 map to CEFR A2; the improvement cycle (levels 11–14) targets CEFR B2.',
      ieltsIndexContextFuture:
        'IELTS is not my immediate focus: I plan to take the exam after reaching a strong CUI level (working target: Level 14, CEFR B2+), with a more solid oral and academic base.',
      ieltsIndexModulesNote:
        'The modules below are practice drafts for when I start formal IELTS preparation.',
      viewAllIeltsPractices: 'View all IELTS practices',
      publishedOn: 'Published',
      rhcsaListClassPrefix: 'Class',
      rhcsaListModuleLabel: 'Module',
      rhcsaIndexTrainingTitle: 'Official Red Hat training (RHCSA)',
      rhcsaIndexTrainingLmsLink: 'Red Hat Learning portal (LMS)',
      rhcsaIndexTrainingLmsNote:
        'courses and labs through your account / Learning Subscription (sign in with your active account).',
      rhcsaIndexTrainingRolLink: 'Red Hat Online Learning catalog (ROL)',
      rhcsaIndexRh124Title: 'Course RH124 (Red Hat System Administration I)',
      rhcsaIndexRh124Link: 'RH124 — course on ROL',
      rhcsaIndexRh134Title: 'Course RH134 (Red Hat System Administration II)',
      rhcsaIndexRh134Link: 'RH134 — course on ROL',
      rhcsaIndexTimelineNote:
        'Personal notes on timelines: you can keep going even if you do not finish within the allotted window. Renewals often run in ~90-day cycles and in some setups that can reset course progress; in my case it did not reset my progress.',
      rhcsaIndexThanksNote:
        'Thanks: América Virtual gave me complimentary access to the course and is covering the course cost — very grateful.',
      rhcsaIndexPlanNote:
        'Plan: finish labs in RH124 and RH134 (ROL/LMS) and document here what I complete in those environments.',
    }
  }
  // Ejemplo de cómo agregar portugués:
  // pt: {
  //   cv: cvPt,
  //   label: 'Português',
  //   ogLocale: 'pt_BR',
  //   htmlLang: 'pt',
  //   urlPrefix: '/pt',
  //   pdfFile: '/FelipeAlemanArce_CV_PT.pdf',
  //   metaDescription: '...',
  //   ...
  // }
};

// ============================================
// FUNCIONES HELPER - No necesitan modificación
// ============================================

export function getLocaleConfig(locale: Locale = DEFAULT_LOCALE) {
  return LOCALE_CONFIG[locale] || LOCALE_CONFIG[DEFAULT_LOCALE];
}

export function getCV(locale: Locale = DEFAULT_LOCALE) {
  return getLocaleConfig(locale).cv;
}

export function getUI(locale: Locale = DEFAULT_LOCALE) {
  return getLocaleConfig(locale).ui;
}

export function getLocaleFromPath(path: string): Locale {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

export function getLocalePath(locale: Locale, path: string = ''): string {
  const config = getLocaleConfig(locale);
  const cleanPath = path.replace(/^\//, '');
  return config.urlPrefix + (cleanPath ? `/${cleanPath}` : '') || '/';
}

export function getAllLocaleUrls(basePath: string = ''): Record<Locale, string> {
  const urls = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    urls[locale] = `https://arceprog.dev${getLocalePath(locale, basePath)}`;
  }
  return urls;
}

export function getOtherLocales(currentLocale: Locale): Locale[] {
  return LOCALES.filter(l => l !== currentLocale);
}
