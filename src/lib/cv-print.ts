import { getCV, type Locale } from '@/lib/i18n';
import { datedPdfName } from '@/lib/pdf-download-name';

/** Variantes de una hoja orientadas a oferta / ATS. */
export type CvRole = 'general' | 'frontend' | 'backend' | 'sysadmin';

export const CV_ROLES: CvRole[] = ['general', 'frontend', 'backend', 'sysadmin'];

export interface CvPrintJob {
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  html: string;
}

export interface CvPrintEdu {
  title: string;
  badge?: string;
  startDate: string;
  endDate: string | null;
  html: string;
}

export interface CvPrintLabels {
  work: string;
  education: string;
  simulations: string;
  hardSkills: string;
  softSkills: string;
  current: string;
  linkedin: string;
  portfolio: string;
  github: string;
  email: string;
  back: string;
  savePdf: string;
  hint: string;
  roleNav: string;
  roleGeneral: string;
  roleFrontend: string;
  roleBackend: string;
  roleSysadmin: string;
}

export interface CvPrintModel {
  locale: Locale;
  role: CvRole;
  fullName: string;
  label: string;
  location: string;
  summary: string;
  linkedinUrl: string;
  linkedinLabel: string;
  portfolioUrl: string;
  portfolioLabel: string;
  githubUrl: string;
  githubLabel: string;
  email: string;
  jobs: CvPrintJob[];
  education: CvPrintEdu[];
  simulations: string[];
  hardSkills: string;
  softSkills: string;
  labels: CvPrintLabels;
}

type CvRoleContent = Pick<
  CvPrintModel,
  'label' | 'summary' | 'jobs' | 'education' | 'simulations' | 'hardSkills'
>;

const MONTHS: Record<Locale, Record<string, string>> = {
  es: {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre',
  },
  en: {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  },
};

export function formatPrintDate(date: string, locale: Locale): string {
  const [year, month] = date.split('-');
  return `${MONTHS[locale][month] ?? month} ${year}`;
}

export function formatPrintRange(
  start: string,
  end: string | null,
  locale: Locale,
  currentLabel: string,
): string {
  const startLabel = formatPrintDate(start, locale);
  if (!end) return `${startLabel} – ${currentLabel}`;
  return `${startLabel} – ${formatPrintDate(end, locale)}`;
}

export function isCvRole(value: string | undefined): value is CvRole {
  return typeof value === 'string' && (CV_ROLES as readonly string[]).includes(value);
}

function sharedContacts(locale: Locale): Pick<
  CvPrintModel,
  | 'fullName'
  | 'location'
  | 'linkedinUrl'
  | 'linkedinLabel'
  | 'portfolioUrl'
  | 'portfolioLabel'
  | 'githubUrl'
  | 'githubLabel'
  | 'email'
> {
  const { basics } = getCV(locale);
  const profiles = basics.profiles as ReadonlyArray<{ network: string; url: string }>;
  const linkedin = profiles.find((profile) => profile.network === 'LinkedIn');
  const github = profiles.find((profile) => profile.network === 'GitHub');
  return {
    fullName: 'Felipe Antonio Aleman Arce',
    location: 'Buenos Aires - Argentina',
    linkedinUrl: linkedin?.url ?? 'https://linkedin.com/in/arcefelipe/',
    linkedinLabel: 'arcefelipe',
    portfolioUrl: 'https://arceprog.dev',
    portfolioLabel: 'arceprog.dev',
    githubUrl: github?.url ?? 'https://github.com/arceprogramando',
    githubLabel: 'arceprogramando',
    email: basics.email,
  };
}

function labelsEs(): CvPrintLabels {
  return {
    work: 'Historial Laboral',
    education: 'Formación Académica',
    simulations: 'Simulaciones Laborales',
    hardSkills: 'Hard Skills',
    softSkills: 'Soft Skills',
    current: 'Actualidad',
    linkedin: 'Linkedin',
    portfolio: 'Portfolio',
    github: 'Github',
    email: 'Email',
    back: '← Portfolio',
    savePdf: 'Imprimir PDF',
    hint: 'En el diálogo: Guardar como PDF · hoja letter · márgenes predeterminados.',
    roleNav: 'Variante',
    roleGeneral: 'General',
    roleFrontend: 'Frontend',
    roleBackend: 'Backend',
    roleSysadmin: 'SysAdmin',
  };
}

function labelsEn(): CvPrintLabels {
  return {
    work: 'Work History',
    education: 'Education',
    simulations: 'Job Simulations',
    hardSkills: 'Hard Skills',
    softSkills: 'Soft Skills',
    current: 'Present',
    linkedin: 'Linkedin',
    portfolio: 'Portfolio',
    github: 'Github',
    email: 'Email',
    back: '← Portfolio',
    savePdf: 'Print PDF',
    hint: 'In the dialog: Save as PDF · letter · default margins.',
    roleNav: 'Variant',
    roleGeneral: 'General',
    roleFrontend: 'Frontend',
    roleBackend: 'Backend',
    roleSysadmin: 'SysAdmin',
  };
}

const SOFT_SKILLS =
  'Teamwork, Public speaking, Adaptability, Problem solving, Initiative, Innovative thinking.';

/** CV de una hoja orientado por rol (contenido al día). */
export function buildCvPrintModel(locale: Locale, role: CvRole = 'general'): CvPrintModel {
  const contacts = sharedContacts(locale);
  const labels = locale === 'en' ? labelsEn() : labelsEs();
  const roleContent = locale === 'en' ? buildEnRole(role) : buildEsRole(role);

  return {
    ...contacts,
    locale,
    role,
    labels,
    softSkills: SOFT_SKILLS,
    ...roleContent,
  };
}

function buildEsRole(role: CvRole): CvRoleContent {
  const eduCui: CvPrintEdu = {
    title: 'CUI - Centro Universitario de Idiomas',
    badge: 'Certificado',
    startDate: '2025-08-01',
    endDate: null,
    html: 'Niveles 2–6 (ciclo básico A2+) y Nivel 7 Consolidación (B1, oct 2026), con foco oral.',
  };
  const eduRh134: CvPrintEdu = {
    title: 'RH134 – Red Hat System Administration II (v10.0)',
    badge: 'Certificado',
    startDate: '2026-01-01',
    endDate: '2026-06-01',
    html: 'Path RHEL 10 hacia RHCSA: LVM, SELinux, arranque, shell scripting y contenedores. RH124 completado; RH199 Rapid Track en curso hacia EX200.',
  };
  const eduRh124: CvPrintEdu = {
    title: 'RH124 – Red Hat System Administration I (v10.0)',
    badge: 'Certificado',
    startDate: '2025-07-01',
    endDate: '2025-10-01',
    html: 'Usuarios, permisos, almacenamiento, procesos y bash. Automatización con scripts y troubleshooting en entornos empresariales.',
  };
  const eduUtn: CvPrintEdu = {
    title: 'Tecnicatura Universitaria en Programación',
    startDate: '2024-01-01',
    endDate: '2025-12-01',
    html: 'Graduado 2025 (UTN CUDI). Proyecto con Astro, React.js y TypeScript; C# / .NET (WPF) y SQL. Ingreso 2027 Ingeniería Informática UNLaM en curso.',
  };
  const eduBe: CvPrintEdu = {
    title: 'Desarrollo Web Backend',
    badge: 'Certificado',
    startDate: '2023-04-01',
    endDate: '2023-11-01',
    html: 'Backend con <strong>Node.js</strong> y <strong>Express.js</strong> (MVC), MongoDB y APIs REST.',
  };
  const eduFe: CvPrintEdu = {
    title: 'Desarrollo Web Frontend',
    badge: 'Certificado',
    startDate: '2022-08-01',
    endDate: '2023-03-01',
    html: 'HTML, CSS, JavaScript y <strong>React.js</strong>: interfaces dinámicas y componentes reutilizables.',
  };

  const jobAvFull: CvPrintJob = {
    company: 'America Virtual',
    title: 'Desarrollador FullStack',
    startDate: '2025-12-01',
    endDate: null,
    html: 'Sistema de RRHH con <strong>Next.js</strong>, <strong>TypeScript</strong> y Tailwind/shadcn, y <strong>NestJS</strong>, <strong>Prisma</strong> y <strong>PostgreSQL</strong>. APIs REST, JWT, Excel y Scrum/Jira.',
  };
  const jobAvFe: CvPrintJob = {
    company: 'America Virtual',
    title: 'Desarrollador Frontend',
    startDate: '2025-06-01',
    endDate: null,
    html: 'Apps web y móviles con <strong>React.js</strong> y <strong>React Native</strong>: dashboards Material UI, SQLite offline, notificaciones escolares (DGCYE) y APIs REST.',
  };
  const jobMicro: CvPrintJob = {
    company: 'Microgenesis',
    title: 'Desarrollador Frontend',
    startDate: '2022-12-01',
    endDate: '2023-05-01',
    html: 'Frontend de plataforma de salud con <strong>HTML</strong> y <strong>CSS</strong>, UI, rendimiento y colaboración con diseño/backend.',
  };
  const jobAvBe: CvPrintJob = {
    company: 'America Virtual',
    title: 'Desarrollador Backend / FullStack',
    startDate: '2025-12-01',
    endDate: null,
    html: 'API y dominio de RRHH con <strong>NestJS</strong>, <strong>PostgreSQL</strong>, <strong>Prisma</strong>, JWT/RBAC, auditoría, Swagger e importación Excel. Integración con frontend Next.js bajo Scrum.',
  };
  const jobAvSys: CvPrintJob = {
    company: 'America Virtual',
    title: 'Desarrollador FullStack (plataformas Linux-ready)',
    startDate: '2025-12-01',
    endDate: null,
    html: 'Servicios backend en <strong>NestJS</strong>/<strong>PostgreSQL</strong> y front en Next.js. Hábitos de troubleshooting, logs y despliegue alineados con prácticas SysAdmin aprendidas en RHEL.',
  };

  const simsFe = [
    'Enero 2025 - Febrero 2025: MVP blog de recetas en React.js (No Country).',
    'Febrero 2025 - Presente: Front de intercambio de libros con Next.js.',
  ];
  const simsBe = [
    'Febrero 2025 - Presente: API e intercambio de libros con NestJS, PostgreSQL y Next.js.',
    'Enero 2025 - Febrero 2025: MVP colaborativo en React.js (No Country).',
  ];
  const simsSys = [
    'Path RHCSA: labs RH104/RH124/RH134, RH199 en curso, Vagrant y notas en arceprog.dev/rhcsa-ex200/.',
    'Fedora como entorno diario desde 2022; automatización bash y servicios systemd en práctica.',
  ];
  const simsGen = [
    'Enero 2025 - Febrero 2025: MVP blog de recetas en React.js.',
    'Febrero 2025 - Presente: Plataforma de intercambio de libros con NestJS, PostgreSQL y Next.js.',
  ];

  switch (role) {
    case 'frontend':
      return {
        label: 'Frontend Developer',
        summary:
          'Desarrollador Frontend con 3 años de experiencia en React, React Native, Next.js y TypeScript. Interfaces accesibles, dashboards y apps móviles offline-first. Técnico Universitario en Programación (UTN, 2025); inglés CUI en Consolidación B1.',
        jobs: [jobAvFe, jobAvFull, jobMicro],
        education: [eduFe, eduUtn, eduCui, eduBe],
        simulations: simsFe,
        hardSkills:
          'React, React Native, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind, Material UI / shadcn, Figma, Git/GitHub, Responsive Design, Scrum/Jira, Inglés B1 (EFSET).',
      };
    case 'backend':
      return {
        label: 'Backend Developer',
        summary:
          'Desarrollador Backend / Full-Stack con NestJS, Node.js, PostgreSQL y Prisma. APIs REST, JWT/RBAC, auditoría y datos. Experiencia también en Express/MongoDB. Técnico Universitario en Programación (UTN, 2025).',
        jobs: [jobAvBe, jobAvFull, jobMicro],
        education: [eduBe, eduUtn, eduRh134, eduCui],
        simulations: simsBe,
        hardSkills:
          'NestJS, Node.js, Express.js, TypeScript, PostgreSQL, Prisma, MongoDB, REST APIs, JWT/RBAC, Swagger, Git/GitHub, Scrum/Jira, SOLID, Inglés B1 (EFSET).',
      };
    case 'sysadmin':
      return {
        label: 'Linux SysAdmin / RHCSA track',
        summary:
          'SysAdmin en formación RHCSA (RH124 y RH134 completos; RH199 hacia EX200) sobre RHEL 10. Base sólida en bash, usuarios/permisos, systemd, LVM y SELinux, combinada con experiencia desarrollando servicios Node/Nest en entornos Linux (Fedora).',
        jobs: [jobAvSys, jobAvFull, jobMicro],
        education: [eduRh134, eduRh124, eduUtn, eduCui],
        simulations: simsSys,
        hardSkills:
          'RHEL / Fedora, bash, users & permissions, systemd, LVM, SELinux, networking basics, Vagrant labs, Git, NestJS/PostgreSQL (app ops), Inglés B1 (EFSET), documentación de labs.',
      };
    default:
      return {
        label: 'FullStack Developer',
        summary:
          'Técnico Universitario en Programación y Desarrollador de Software con 3 años de experiencia Full-Stack web y móvil. Especializado en flujos de usuario, SEO y soluciones orientadas al cliente. Ingreso 2027 Ingeniería Informática (UNLaM) y path RHCSA hacia EX200.',
        jobs: [jobAvFull, jobAvFe, jobMicro],
        education: [eduCui, eduRh134, eduUtn, eduBe],
        simulations: simsGen,
        hardSkills:
          'Inglés B1 (EFSET), Figma, Tailwind, Version Control (Git, GitHub), Responsive Design, Collaboration Tools (Slack, Trello, Jira), Agile Methodologies (Scrum), SOLID Principles, OSI Model.',
      };
  }
}

function buildEnRole(role: CvRole): CvRoleContent {
  const eduCui: CvPrintEdu = {
    title: 'CUI - University Language Center',
    badge: 'Certificate',
    startDate: '2025-08-01',
    endDate: null,
    html: 'Levels 2–6 (basic cycle A2+) and Level 7 Consolidation (B1, Oct 2026); oral-focused.',
  };
  const eduRh134: CvPrintEdu = {
    title: 'RH134 – Red Hat System Administration II (v10.0)',
    badge: 'Certificate',
    startDate: '2026-01-01',
    endDate: '2026-06-01',
    html: 'RHEL 10 path toward RHCSA: LVM, SELinux, boot troubleshooting, shell scripting and containers. RH124 completed; RH199 Rapid Track in progress toward EX200.',
  };
  const eduRh124: CvPrintEdu = {
    title: 'RH124 – Red Hat System Administration I (v10.0)',
    badge: 'Certificate',
    startDate: '2025-07-01',
    endDate: '2025-10-01',
    html: 'Users, permissions, storage, processes and bash. Scripting automation and troubleshooting in enterprise-oriented labs.',
  };
  const eduUtn: CvPrintEdu = {
    title: 'University Technical Degree in Programming',
    startDate: '2024-01-01',
    endDate: '2025-12-01',
    html: 'Graduated 2025 (UTN CUDI). Capstone with Astro, React.js and TypeScript; C# / .NET (WPF) and SQL. UNLaM Computer Engineering entrance 2027 in progress.',
  };
  const eduBe: CvPrintEdu = {
    title: 'Web Backend Development',
    badge: 'Certificate',
    startDate: '2023-04-01',
    endDate: '2023-11-01',
    html: 'Backend with <strong>Node.js</strong> and <strong>Express.js</strong> (MVC), MongoDB and REST APIs.',
  };
  const eduFe: CvPrintEdu = {
    title: 'Web Frontend Development',
    badge: 'Certificate',
    startDate: '2022-08-01',
    endDate: '2023-03-01',
    html: 'HTML, CSS, JavaScript and <strong>React.js</strong>: dynamic UIs and reusable components.',
  };

  const jobAvFull: CvPrintJob = {
    company: 'America Virtual',
    title: 'FullStack Developer',
    startDate: '2025-12-01',
    endDate: null,
    html: 'HR platform with <strong>Next.js</strong>, <strong>TypeScript</strong> and Tailwind/shadcn, plus <strong>NestJS</strong>, <strong>Prisma</strong> and <strong>PostgreSQL</strong>. REST APIs, JWT, Excel import/export, Scrum/Jira.',
  };
  const jobAvFe: CvPrintJob = {
    company: 'America Virtual',
    title: 'Frontend Developer',
    startDate: '2025-06-01',
    endDate: null,
    html: 'Web and mobile apps with <strong>React.js</strong> and <strong>React Native</strong>: Material UI dashboards, offline SQLite access control, school notifications (DGCYE) and REST APIs.',
  };
  const jobMicro: CvPrintJob = {
    company: 'Microgenesis',
    title: 'Frontend Developer',
    startDate: '2022-12-01',
    endDate: '2023-05-01',
    html: 'Health-platform frontend with <strong>HTML</strong> and <strong>CSS</strong>, UI implementation, performance and designer/backend collaboration.',
  };
  const jobAvBe: CvPrintJob = {
    company: 'America Virtual',
    title: 'Backend / FullStack Developer',
    startDate: '2025-12-01',
    endDate: null,
    html: 'HR domain APIs with <strong>NestJS</strong>, <strong>PostgreSQL</strong>, <strong>Prisma</strong>, JWT/RBAC, auditing, Swagger and Excel pipelines, integrated with a Next.js frontend under Scrum.',
  };
  const jobAvSys: CvPrintJob = {
    company: 'America Virtual',
    title: 'FullStack Developer (Linux-ready services)',
    startDate: '2025-12-01',
    endDate: null,
    html: 'Backend services on <strong>NestJS</strong>/<strong>PostgreSQL</strong> and Next.js UI. Troubleshooting, logging and deploy habits aligned with RHEL SysAdmin practice.',
  };

  switch (role) {
    case 'frontend':
      return {
        label: 'Frontend Developer',
        summary:
          'Frontend developer with 3 years of experience in React, React Native, Next.js and TypeScript. Accessible UIs, dashboards and offline-first mobile apps. University Programming Technician (UTN, 2025); CUI English on Consolidation B1.',
        jobs: [jobAvFe, jobAvFull, jobMicro],
        education: [eduFe, eduUtn, eduCui, eduBe],
        simulations: [
          'January 2025 – February 2025: Recipe blog MVP in React.js (No Country).',
          'February 2025 – Present: Book-exchange frontend with Next.js.',
        ],
        hardSkills:
          'React, React Native, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind, Material UI / shadcn, Figma, Git/GitHub, Responsive Design, Scrum/Jira, English B1 (EFSET).',
      };
    case 'backend':
      return {
        label: 'Backend Developer',
        summary:
          'Backend / full-stack developer focused on NestJS, Node.js, PostgreSQL and Prisma. REST APIs, JWT/RBAC, auditing and data pipelines. Also Express/MongoDB. University Programming Technician (UTN, 2025).',
        jobs: [jobAvBe, jobAvFull, jobMicro],
        education: [eduBe, eduUtn, eduRh134, eduCui],
        simulations: [
          'February 2025 – Present: Book-exchange API with NestJS, PostgreSQL and Next.js.',
          'January 2025 – February 2025: Collaborative React.js MVP (No Country).',
        ],
        hardSkills:
          'NestJS, Node.js, Express.js, TypeScript, PostgreSQL, Prisma, MongoDB, REST APIs, JWT/RBAC, Swagger, Git/GitHub, Scrum/Jira, SOLID, English B1 (EFSET).',
      };
    case 'sysadmin':
      return {
        label: 'Linux SysAdmin / RHCSA track',
        summary:
          'SysAdmin on the RHCSA track (RH124 and RH134 completed; RH199 toward EX200) on RHEL 10. Strong bash, users/permissions, systemd, LVM and SELinux fundamentals, plus experience shipping Node/Nest services on Linux (Fedora daily driver).',
        jobs: [jobAvSys, jobAvFull, jobMicro],
        education: [eduRh134, eduRh124, eduUtn, eduCui],
        simulations: [
          'RHCSA path: RH104/RH124/RH134 labs, RH199 in progress, Vagrant and notes at arceprog.dev/rhcsa-ex200/.',
          'Fedora as daily OS since 2022; bash automation and systemd practice.',
        ],
        hardSkills:
          'RHEL / Fedora, bash, users & permissions, systemd, LVM, SELinux, networking basics, Vagrant labs, Git, NestJS/PostgreSQL (app ops), English B1 (EFSET), lab documentation.',
      };
    default:
      return {
        label: 'FullStack Developer',
        summary:
          'University Programming Technician and Software Developer with 3 years of experience in full-stack web and mobile apps. Specialized in user-flow optimization, SEO and client-oriented solutions. UNLaM Computer Engineering entrance 2027 and RHCSA path toward EX200.',
        jobs: [jobAvFull, jobAvFe, jobMicro],
        education: [eduCui, eduRh134, eduUtn, eduBe],
        simulations: [
          'January 2025 – February 2025: Recipe blog MVP in React.js.',
          'February 2025 – Present: Book-exchange platform with NestJS, PostgreSQL and Next.js.',
        ],
        hardSkills:
          'English B1 (EFSET), Figma, Tailwind, Version Control (Git, GitHub), Responsive Design, Collaboration Tools (Slack, Trello, Jira), Agile Methodologies (Scrum), SOLID Principles, OSI Model.',
      };
  }
}

export function cvPrintPath(locale: Locale, role: CvRole = 'general'): string {
  const base = locale === 'en' ? '/en/cv' : '/cv';
  if (role === 'general') return `${base}/`;
  return `${base}/${role}/`;
}

export function cvPrintFileStem(locale: Locale, role: CvRole = 'general'): string {
  const lang = locale === 'en' ? 'eng' : 'esp';
  const suffix = role === 'general' ? '' : `_${role}`;
  return `FelipeAlemanArce_CV_${lang}${suffix}`;
}

export function cvPrintDocumentTitle(
  locale: Locale,
  role: CvRole = 'general',
  now = new Date(),
): string {
  return datedPdfName(`${cvPrintFileStem(locale, role)}.pdf`, now).replace(/\.pdf$/i, '');
}

export function cvRoleLabel(role: CvRole, locale: Locale): string {
  const labels = locale === 'en' ? labelsEn() : labelsEs();
  switch (role) {
    case 'frontend':
      return labels.roleFrontend;
    case 'backend':
      return labels.roleBackend;
    case 'sysadmin':
      return labels.roleSysadmin;
    default:
      return labels.roleGeneral;
  }
}
