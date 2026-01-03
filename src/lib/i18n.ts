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
  };
}> = {
  es: {
    cv: cvEs,
    label: 'Español',
    ogLocale: 'es_AR',
    htmlLang: 'es',
    urlPrefix: '',
    pdfFile: '/FelipeAlemanArce_CV_WEB.pdf',
    metaDescription: 'Desarrollador FullStack con experiencia en React, Node.js y TypeScript. Técnico Universitario en Programación graduado de la UTN. Explora mi portafolio y proyectos.',
    pageTitle: 'Felipe Arce - Desarrollador FullStack | Portfolio',
    ogTitle: 'Felipe Arce - Desarrollador FullStack',
    ogDescription: 'Desarrollador web y Técnico Universitario en Programación, con experiencia en React, Node.js, MongoDB y tecnologías modernas. Especializado en desarrollo frontend y backend.',
    keywords: 'Felipe Arce, desarrollador fullstack, desarrollador MERN, React, Node.js, MongoDB, Express, JavaScript, TypeScript, portfolio developer, programador web, frontend developer, backend developer, Buenos Aires, Argentina',
    jobTitle: 'Desarrollador FullStack',
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
      visit: 'Visitar'
    }
  },
  en: {
    cv: cvEn,
    label: 'English',
    ogLocale: 'en_US',
    htmlLang: 'en',
    urlPrefix: '/en',
    pdfFile: '/FelipeAlemanArce_CV_EN.pdf',
    metaDescription: 'FullStack Developer with experience in React, Node.js and TypeScript. University Programming Technician graduated from UTN. Explore my portfolio and projects.',
    pageTitle: 'Felipe Arce - FullStack Developer | Portfolio',
    ogTitle: 'Felipe Arce - FullStack Developer',
    ogDescription: 'Web developer and University Programming Technician, with experience in React, Node.js, MongoDB and modern technologies. Specialized in frontend and backend development.',
    keywords: 'Felipe Arce, fullstack developer, MERN developer, React, Node.js, MongoDB, Express, JavaScript, TypeScript, developer portfolio, web programmer, frontend developer, backend developer, Buenos Aires, Argentina',
    jobTitle: 'FullStack Developer',
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
      visit: 'Visit'
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
