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
    rhcsaIndexContextTitle: string;
    rhcsaIndexContextNow: string;
    rhcsaIndexContextPipeline: string;
    rhcsaIndexContextFocus: string;
    rhcsaIndexModulesNote: string;
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
    rhcsaIndexRh024Title: string;
    rhcsaIndexRh024Status: string;
    rhcsaIndexRh104Title: string;
    rhcsaIndexRh104Link: string;
    rhcsaIndexRh104Status: string;
    rhcsaIndexRh124Title: string;
    rhcsaIndexRh124Link: string;
    rhcsaIndexRh124Status: string;
    rhcsaIndexRh124BadgeLink: string;
    rhcsaIndexRh134Title: string;
    rhcsaIndexRh134Link: string;
    rhcsaIndexRh134Status: string;
    rhcsaIndexRh134BadgeLink: string;
    rhcsaIndexRh199Title: string;
    rhcsaIndexRh199Link: string;
    rhcsaIndexRh199Status: string;
    rhcsaIndexBookTitle: string;
    rhcsaIndexBookStatus: string;
    rhcsaIndexEx200Title: string;
    rhcsaIndexEx200Link: string;
    rhcsaIndexEx294Title: string;
    rhcsaIndexEx294Link: string;
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
    metaDescription: 'Desarrollador Full Stack en Buenos Aires. Técnico en Programación (UTN). React, Node.js y TypeScript. Portfolio y proyectos.',
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
      rhcsaBlogDescription:
        'Labs y notas de Felipe Arce para RHCSA EX200 en Linux: RH124 y RH134 hechos, RH024 hecho, RH104 y RH199 en curso, libro Van Vugt y prácticas con Vagrant.',
      rhcsaIndexContextTitle: 'Dónde estoy ahora con RHCSA',
      rhcsaIndexContextNow:
        'RH024 terminado; RH104 Fundamentals v9.1 en curso (10/56, 8 sep). RH124 y RH134 acreditados. Libro Van Vugt pág. 335/1593 (~21%, Cap. 7 Permissions) y RH199 Rapid Track (10/154, Cap. 2 Links). Meta práctica pre-examen: ~30 oct 2026 (día 20/73 del plan; quedan ~53 días).',
      rhcsaIndexContextPipeline:
        'Pipeline: RH024 → RH104 → RH124 → RH134 → Libro → RH199 → EX200 (objetivo) → EX294 (ruta RHCE).',
      rhcsaIndexContextFocus:
        'Fortaleza: shell, archivos, SSH y users. Refuerzo: permisos/ACL, nmcli, systemd. Más adelante: storage/LVM, SELinux, firewall y boot.',
      rhcsaIndexModulesNote:
        'Los módulos de abajo documentan prácticas y notas en labs oficiales Red Hat y lab local Vagrant.',
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
      rhcsaIndexRh024Title: 'RH024 — Getting Started with Linux (video)',
      rhcsaIndexRh024Status: 'Completado — 8 sep 2026',
      rhcsaIndexRh104Title: 'RH104 — Getting Started with Linux Fundamentals (v9.1)',
      rhcsaIndexRh104Link: 'RH104 — curso en ROL',
      rhcsaIndexRh104Status: 'En curso — 10/56 pág. • path RHCSA (8 sep 2026); labs GNOME vía VNC',
      rhcsaIndexRh124Title: 'Curso RH124 (Red Hat System Administration I)',
      rhcsaIndexRh124Link: 'RH124 — versión del curso en ROL',
      rhcsaIndexRh124Status: 'Completado — badge Credly',
      rhcsaIndexRh124BadgeLink: 'Ver certificado RH124 en Credly',
      rhcsaIndexRh134Title: 'Curso RH134 (Red Hat System Administration II)',
      rhcsaIndexRh134Link: 'RH134 — versión del curso en ROL',
      rhcsaIndexRh134Status: 'Completado — badge Credly',
      rhcsaIndexRh134BadgeLink: 'Ver certificado RH134 en Credly',
      rhcsaIndexRh199Title: 'Curso RH199 (RHCSA Rapid Track v10.0)',
      rhcsaIndexRh199Link: 'RH199 — versión del curso en ROL',
      rhcsaIndexRh199Status: 'En curso — 10/154 pág. • Cap. 2 ch02s03 Links (27 ago 2026)',
      rhcsaIndexBookTitle: 'Libro: Red Hat RHCSA 9 Cert Guide (Sander van Vugt)',
      rhcsaIndexBookStatus: 'En curso — 335/1593 pág. (~21%) • Cap. 7 Permissions Management',
      rhcsaIndexEx200Title: 'Examen objetivo: RHCSA (EX200)',
      rhcsaIndexEx200Link: 'EX200 — examen RHCSA oficial',
      rhcsaIndexEx294Title: 'Ruta posterior: RHCE (EX294)',
      rhcsaIndexEx294Link: 'EX294 — examen RHCE (requiere RHCSA)',
      rhcsaIndexTimelineNote:
        'Notas personales sobre plazos: se puede seguir trabajando aunque no alcances el tiempo previsto del curso. La renovación típica va por ventanas de ~90 días y en algunos casos eso puede reiniciar el progreso; en mi caso no me reinició el avance.',
      rhcsaIndexThanksNote:
        'Agradecimiento: en América Virtual me facilitaron la entrada gratuita al curso y van a cubrir el costo; les estoy muy agradecido.',
      rhcsaIndexPlanNote:
        'Plan ~73 días hasta ~30 oct: Cap. 7 permisos/ACL ahora; luego nmcli, DNF/systemd, storage/LVM, SELinux/firewall/boot; paralelamente RH104 + RH199 + libro; cierre con practice exams EX200.',
    }
  },
  en: {
    cv: cvEn,
    label: 'English',
    ogLocale: 'en_US',
    htmlLang: 'en',
    urlPrefix: '/en',
    pdfFile: '/FelipeAlemanArce_CV_eng_June_2026.pdf',
    metaDescription: 'Full Stack developer in Buenos Aires. Programming technician (UTN). React, Node.js and TypeScript. Portfolio and projects.',
    pageTitle: 'Felipe Arce - Mid-Level Full Stack Developer | Portfolio',
    ogTitle: 'Felipe Arce - Mid-Level Full Stack Developer',
    ogDescription: 'Web developer, University Programming Technician (UTN, 2025), and UNLaM Computer Engineering entrance student. React, Node.js, MongoDB and modern stack.',
    keywords: 'Felipe Arce, mid-level full stack developer, MERN developer, React, Node.js, MongoDB, Express, JavaScript, TypeScript, developer portfolio, web programmer, frontend developer, backend developer, Buenos Aires, Argentina',
    jobTitle: 'Mid-Level Full Stack Developer',
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
      rhcsaBlogDescription:
        'Felipe Arce study notes and labs for RHCSA EX200 on Linux: RH124 and RH134 done, RH024 done, RH104 and RH199 in progress, Van Vugt book plus Vagrant.',
      rhcsaIndexContextTitle: 'Where I stand on RHCSA',
      rhcsaIndexContextNow:
        'RH024 completed; RH104 Fundamentals v9.1 in progress (10/56, Sep 8). RH124 and RH134 earned. Van Vugt book p. 335/1593 (~21%, Ch. 7 Permissions) and RH199 Rapid Track (10/154, Ch. 2 Links). Pre-exam practice target: ~Oct 30, 2026 (day 20/73 of the plan; ~53 days left).',
      rhcsaIndexContextPipeline:
        'Pipeline: RH024 → RH104 → RH124 → RH134 → Book → RH199 → EX200 (target) → EX294 (RHCE path).',
      rhcsaIndexContextFocus:
        'Strength: shell, files, SSH and users. Reinforcement: permissions/ACL, nmcli, systemd. Later: storage/LVM, SELinux, firewall and boot.',
      rhcsaIndexModulesNote:
        'The modules below document practice notes from official Red Hat labs and the local Vagrant lab.',
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
      rhcsaIndexRh024Title: 'RH024 — Getting Started with Linux (video)',
      rhcsaIndexRh024Status: 'Completed — Sep 8, 2026',
      rhcsaIndexRh104Title: 'RH104 — Getting Started with Linux Fundamentals (v9.1)',
      rhcsaIndexRh104Link: 'RH104 — course on ROL',
      rhcsaIndexRh104Status: 'In progress — 10/56 pages • RHCSA path (Sep 8, 2026); GNOME labs via VNC',
      rhcsaIndexRh124Title: 'Course RH124 (Red Hat System Administration I)',
      rhcsaIndexRh124Link: 'RH124 — course on ROL',
      rhcsaIndexRh124Status: 'Completed — Credly badge',
      rhcsaIndexRh124BadgeLink: 'View RH124 certificate on Credly',
      rhcsaIndexRh134Title: 'Course RH134 (Red Hat System Administration II)',
      rhcsaIndexRh134Link: 'RH134 — course on ROL',
      rhcsaIndexRh134Status: 'Completed — Credly badge',
      rhcsaIndexRh134BadgeLink: 'View RH134 certificate on Credly',
      rhcsaIndexRh199Title: 'Course RH199 (RHCSA Rapid Track v10.0)',
      rhcsaIndexRh199Link: 'RH199 — course on ROL',
      rhcsaIndexRh199Status: 'In progress — 10/154 pages • Ch. 2 ch02s03 Links (Aug 27, 2026)',
      rhcsaIndexBookTitle: 'Book: Red Hat RHCSA 9 Cert Guide (Sander van Vugt)',
      rhcsaIndexBookStatus: 'In progress — 335/1593 pages (~21%) • Ch. 7 Permissions Management',
      rhcsaIndexEx200Title: 'Target exam: RHCSA (EX200)',
      rhcsaIndexEx200Link: 'EX200 — official RHCSA exam',
      rhcsaIndexEx294Title: 'Next step: RHCE (EX294)',
      rhcsaIndexEx294Link: 'EX294 — RHCE exam (requires RHCSA)',
      rhcsaIndexTimelineNote:
        'Personal notes on timelines: you can keep going even if you do not finish within the allotted window. Renewals often run in ~90-day cycles and in some setups that can reset course progress; in my case it did not reset my progress.',
      rhcsaIndexThanksNote:
        'Thanks: América Virtual gave me complimentary access to the course and is covering the course cost — very grateful.',
      rhcsaIndexPlanNote:
        'Plan ~73 days until ~Oct 30: Ch. 7 permissions/ACL now; then nmcli, DNF/systemd, storage/LVM, SELinux/firewall/boot; in parallel RH104 + RH199 + book; close with EX200 practice exams.',
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

/**
 * Ruta con prefijo de idioma y barra final SIEMPRE (`/`, `/en/`, `/rhcsa-ex200/01-lab-setup/`).
 * Debe coincidir con las URLs del sitemap (@astrojs/sitemap genera con barra final)
 * para que canonical, hreflang, enlaces internos y sitemap apunten a la misma URL.
 */
export function getLocalePath(locale: Locale, path: string = ''): string {
  const config = getLocaleConfig(locale);
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return `${config.urlPrefix}/${cleanPath ? `${cleanPath}/` : ''}`;
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
