import type { Locale } from '@/lib/i18n';

export const CV_BUILDER_STORAGE_KEY = 'arceprog.cv-builder.v1';
export const CV_BUILDER_PREVIEW_KEY = 'arceprog.cv-builder.preview.v1';
export const CV_DRAFT_VERSION = 1 as const;

export interface UserCvJob {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  /** Texto plano; usá **tech** para negrita */
  description: string;
}

export interface UserCvEdu {
  title: string;
  badge: string;
  startDate: string;
  endDate: string;
  description: string;
}

/** JSON portable que cualquiera puede editar / descargar / reimportar. */
export interface UserCvDraft {
  version: typeof CV_DRAFT_VERSION;
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
  jobs: UserCvJob[];
  education: UserCvEdu[];
  simulations: string[];
  hardSkills: string;
  softSkills: string;
  labels: {
    work: string;
    education: string;
    simulations: string;
    hardSkills: string;
    softSkills: string;
  };
}

export function emptyUserCv(locale: Locale): UserCvDraft {
  const es = locale === 'es';
  return {
    version: CV_DRAFT_VERSION,
    fullName: '',
    label: es ? 'Desarrollador FullStack' : 'FullStack Developer',
    location: 'Buenos Aires - Argentina',
    summary: '',
    linkedinUrl: 'https://linkedin.com/in/',
    linkedinLabel: '',
    portfolioUrl: 'https://',
    portfolioLabel: '',
    githubUrl: 'https://github.com/',
    githubLabel: '',
    email: '',
    jobs: [
      {
        company: '',
        title: '',
        startDate: '2024-01-01',
        endDate: '',
        description: es
          ? 'Describí el rol. Tecnologías en negrita: **React**, **TypeScript**.'
          : 'Describe the role. Bold tech with **React**, **TypeScript**.',
      },
    ],
    education: [
      {
        title: '',
        badge: es ? 'Certificado' : 'Certificate',
        startDate: '2022-01-01',
        endDate: '2023-12-01',
        description: '',
      },
    ],
    simulations: [''],
    hardSkills: 'TypeScript, React, Node.js, Git, Scrum',
    softSkills: es
      ? 'Trabajo en equipo, Adaptabilidad, Resolución de problemas'
      : 'Teamwork, Adaptability, Problem solving',
    labels: {
      work: es ? 'Historial Laboral - Work History' : 'Work History - Historial Laboral',
      education: es ? 'Formación Académica - Education' : 'Education - Formación Académica',
      simulations: es ? 'Simulaciones Laborales -' : 'Job Simulations -',
      hardSkills: 'Hard Skills',
      softSkills: 'Soft Skills',
    },
  };
}

/** Ejemplo anónimo para probar la vista (no es el CV de Felipe). */
export function exampleUserCv(locale: Locale): UserCvDraft {
  if (locale === 'en') {
    return {
      version: CV_DRAFT_VERSION,
      fullName: 'Alex Rivera',
      label: 'Frontend Developer',
      location: 'Remote - LatAm',
      summary:
        'Frontend developer with 4 years building web apps with React and TypeScript. Focused on accessible UI, performance and clean component design.',
      linkedinUrl: 'https://linkedin.com/in/example',
      linkedinLabel: 'alexrivera',
      portfolioUrl: 'https://example.dev',
      portfolioLabel: 'example.dev',
      githubUrl: 'https://github.com/example',
      githubLabel: 'example',
      email: 'alex@example.dev',
      jobs: [
        {
          company: 'Northwind Apps',
          title: 'Frontend Developer',
          startDate: '2023-03-01',
          endDate: '',
          description:
            'Shipped dashboards with **React**, **TypeScript** and **Tailwind**. Improved LCP and built a design-system of reusable components.',
        },
        {
          company: 'Studio Pixel',
          title: 'Web Developer',
          startDate: '2021-01-01',
          endDate: '2023-02-01',
          description:
            'Marketing sites and landing pages with **HTML**, **CSS** and **JavaScript**, collaborating with designers in Figma.',
        },
      ],
      education: [
        {
          title: 'Software Development Diploma',
          badge: 'Certificate',
          startDate: '2019-03-01',
          endDate: '2021-11-01',
          description: 'Web development track: JavaScript, databases and agile teamwork.',
        },
      ],
      simulations: [
        '2024: Recipe app MVP in React (team of 4).',
        '2025: Book-exchange UI with Next.js.',
      ],
      hardSkills:
        'React, TypeScript, Next.js, HTML, CSS, Tailwind, Git, Figma, Scrum, English B2',
      softSkills: 'Teamwork, Communication, Adaptability, Problem solving',
      labels: {
        work: 'Work History - Historial Laboral',
        education: 'Education - Formación Académica',
        simulations: 'Job Simulations -',
        hardSkills: 'Hard Skills',
        softSkills: 'Soft Skills',
      },
    };
  }

  return {
    version: CV_DRAFT_VERSION,
    fullName: 'Alex Rivera',
    label: 'Desarrollador Frontend',
    location: 'Remoto - LatAm',
    summary:
      'Desarrollador Frontend con 4 años armando apps web con React y TypeScript. Enfocado en UI accesible, rendimiento y componentes reutilizables.',
    linkedinUrl: 'https://linkedin.com/in/example',
    linkedinLabel: 'alexrivera',
    portfolioUrl: 'https://example.dev',
    portfolioLabel: 'example.dev',
    githubUrl: 'https://github.com/example',
    githubLabel: 'example',
    email: 'alex@example.dev',
    jobs: [
      {
        company: 'Northwind Apps',
        title: 'Desarrollador Frontend',
        startDate: '2023-03-01',
        endDate: '',
        description:
          'Dashboards con **React**, **TypeScript** y **Tailwind**. Mejoré LCP y armé un design system de componentes.',
      },
      {
        company: 'Studio Pixel',
        title: 'Desarrollador Web',
        startDate: '2021-01-01',
        endDate: '2023-02-01',
        description:
          'Sitios y landings con **HTML**, **CSS** y **JavaScript**, colaborando con diseño en Figma.',
      },
    ],
    education: [
      {
        title: 'Diplomatura en Desarrollo de Software',
        badge: 'Certificado',
        startDate: '2019-03-01',
        endDate: '2021-11-01',
        description: 'Track web: JavaScript, bases de datos y trabajo ágil en equipo.',
      },
    ],
    simulations: [
      '2024: MVP de recetas en React (equipo de 4).',
      '2025: UI de intercambio de libros con Next.js.',
    ],
    hardSkills:
      'React, TypeScript, Next.js, HTML, CSS, Tailwind, Git, Figma, Scrum, Inglés B2',
    softSkills: 'Trabajo en equipo, Comunicación, Adaptabilidad, Resolución de problemas',
    labels: {
      work: 'Historial Laboral - Work History',
      education: 'Formación Académica - Education',
      simulations: 'Simulaciones Laborales -',
      hardSkills: 'Hard Skills',
      softSkills: 'Soft Skills',
    },
  };
}

/** Límites para import JSON / render: mitigan DoS y payload abusivo. */
export const CV_DRAFT_LIMITS = {
  jsonChars: 400_000,
  short: 160,
  medium: 400,
  long: 4_000,
  url: 2_000,
  email: 254,
  jobs: 25,
  education: 25,
  simulations: 40,
} as const;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clampString(value: unknown, max: number): string {
  if (typeof value === 'string') return value.slice(0, max);
  if (value == null) return '';
  return String(value).slice(0, max);
}

/**
 * Solo http/https absolutos. Rechaza javascript:, data:, vbscript:,
 * esquemas con espacios/control y URLs relativas.
 */
export function sanitizeHttpUrl(raw: unknown): string {
  const input = clampString(raw, CV_DRAFT_LIMITS.url).trim().replace(/[\u0000-\u001F\u007F]/g, '');
  if (!input) return '';
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return '';
  }
  const protocol = parsed.protocol.toLowerCase();
  if (protocol !== 'http:' && protocol !== 'https:') return '';
  if (parsed.username || parsed.password) return '';
  return parsed.toString();
}

/** Email simple sin query/fragment que puedan abusarse en mailto. */
export function sanitizeEmail(raw: unknown): string {
  const email = clampString(raw, CV_DRAFT_LIMITS.email).trim();
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(email)) {
    return '';
  }
  return email;
}

export function mailtoHref(email: string): string {
  const safe = sanitizeEmail(email);
  return safe ? `mailto:${safe}` : '';
}

/** Convierte **texto** a <strong> después de escapar HTML. */
export function richTextToHtml(value: string): string {
  const escaped = escapeHtml(value);
  return escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function formatDraftRange(
  start: string,
  end: string,
  currentLabel: string,
): string {
  const startLabel = formatDraftDate(start);
  if (!end.trim()) return `${startLabel} – ${currentLabel}`;
  return `${startLabel} – ${formatDraftDate(end)}`;
}

function formatDraftDate(iso: string): string {
  const safe = clampString(iso, 32);
  const [year, month] = safe.split('-');
  if (!year) return safe;
  if (!month) return year;
  return `${month}/${year}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeJob(value: unknown): UserCvJob {
  const job = isRecord(value) ? value : {};
  return {
    company: clampString(job.company, CV_DRAFT_LIMITS.medium),
    title: clampString(job.title, CV_DRAFT_LIMITS.medium),
    startDate: clampString(job.startDate, 32),
    endDate: clampString(job.endDate, 32),
    description: clampString(job.description, CV_DRAFT_LIMITS.long),
  };
}

function normalizeEdu(value: unknown): UserCvEdu {
  const item = isRecord(value) ? value : {};
  return {
    title: clampString(item.title, CV_DRAFT_LIMITS.medium),
    badge: clampString(item.badge, CV_DRAFT_LIMITS.short),
    startDate: clampString(item.startDate, 32),
    endDate: clampString(item.endDate, 32),
    description: clampString(item.description, CV_DRAFT_LIMITS.long),
  };
}

/**
 * Coerción tipada + límites de tamaño.
 * Las URLs se dejan como texto (para poder tipearlas); se filtran en sanitize/render.
 */
export function coerceUserCvDraft(value: unknown): UserCvDraft {
  if (!isRecord(value) || value.version !== CV_DRAFT_VERSION) {
    throw new Error('JSON inválido: falta version=1 o campos requeridos.');
  }
  if (!Array.isArray(value.jobs) || !Array.isArray(value.education) || !Array.isArray(value.simulations)) {
    throw new Error('JSON inválido: falta version=1 o campos requeridos.');
  }

  const labelsRaw = isRecord(value.labels) ? value.labels : {};
  const jobs = value.jobs.slice(0, CV_DRAFT_LIMITS.jobs).map(normalizeJob);
  const education = value.education.slice(0, CV_DRAFT_LIMITS.education).map(normalizeEdu);
  const simulations = value.simulations
    .slice(0, CV_DRAFT_LIMITS.simulations)
    .map((line) => clampString(line, CV_DRAFT_LIMITS.medium));

  return {
    version: CV_DRAFT_VERSION,
    fullName: clampString(value.fullName, CV_DRAFT_LIMITS.medium),
    label: clampString(value.label, CV_DRAFT_LIMITS.medium),
    location: clampString(value.location, CV_DRAFT_LIMITS.medium),
    summary: clampString(value.summary, CV_DRAFT_LIMITS.long),
    linkedinUrl: clampString(value.linkedinUrl, CV_DRAFT_LIMITS.url),
    linkedinLabel: clampString(value.linkedinLabel, CV_DRAFT_LIMITS.short),
    portfolioUrl: clampString(value.portfolioUrl, CV_DRAFT_LIMITS.url),
    portfolioLabel: clampString(value.portfolioLabel, CV_DRAFT_LIMITS.short),
    githubUrl: clampString(value.githubUrl, CV_DRAFT_LIMITS.url),
    githubLabel: clampString(value.githubLabel, CV_DRAFT_LIMITS.short),
    email: clampString(value.email, CV_DRAFT_LIMITS.email),
    jobs: jobs.length > 0 ? jobs : [normalizeJob({})],
    education: education.length > 0 ? education : [normalizeEdu({})],
    simulations: simulations.length > 0 ? simulations : [''],
    hardSkills: clampString(value.hardSkills, CV_DRAFT_LIMITS.long),
    softSkills: clampString(value.softSkills, CV_DRAFT_LIMITS.long),
    labels: {
      work: clampString(labelsRaw.work, CV_DRAFT_LIMITS.medium) || 'Work History',
      education: clampString(labelsRaw.education, CV_DRAFT_LIMITS.medium) || 'Education',
      simulations: clampString(labelsRaw.simulations, CV_DRAFT_LIMITS.medium) || 'Simulations',
      hardSkills: clampString(labelsRaw.hardSkills, CV_DRAFT_LIMITS.short) || 'Hard Skills',
      softSkills: clampString(labelsRaw.softSkills, CV_DRAFT_LIMITS.short) || 'Soft Skills',
    },
  };
}

/** Coerción + allowlist de http(s)/email. Usar al importar e imprimir. */
export function normalizeUserCvDraft(value: unknown): UserCvDraft {
  const draft = coerceUserCvDraft(value);
  return {
    ...draft,
    linkedinUrl: sanitizeHttpUrl(draft.linkedinUrl),
    portfolioUrl: sanitizeHttpUrl(draft.portfolioUrl),
    githubUrl: sanitizeHttpUrl(draft.githubUrl),
    email: sanitizeEmail(draft.email),
  };
}

export function isUserCvDraft(value: unknown): value is UserCvDraft {
  try {
    coerceUserCvDraft(value);
    return true;
  } catch {
    return false;
  }
}

export function parseUserCvJson(raw: string): UserCvDraft {
  if (raw.length > CV_DRAFT_LIMITS.jsonChars) {
    throw new Error('JSON demasiado grande.');
  }
  const parsed = JSON.parse(raw) as unknown;
  return normalizeUserCvDraft(parsed);
}

function contactLink(
  kind: string,
  href: string,
  label: string,
): string {
  if (!href || !label) return '';
  return `<li><span>${escapeHtml(kind)}:</span> <a href="${escapeHtml(href)}" aria-label="${escapeHtml(kind)}: ${escapeHtml(label)}" rel="noopener noreferrer">${escapeHtml(label)}</a></li>`;
}

export function renderUserCvHtml(draftInput: UserCvDraft, currentLabel: string): string {
  // Defensa en profundidad: coerce + allowlist solo al armar hrefs.
  const draft = coerceUserCvDraft(draftInput);
  const name = escapeHtml(draft.fullName || 'Tu nombre');
  const label = escapeHtml(draft.label || '');
  const location = escapeHtml(draft.location || '');
  const summary = escapeHtml(draft.summary || '');
  const safeCurrent = clampString(currentLabel, CV_DRAFT_LIMITS.short);
  const linkedinHref = sanitizeHttpUrl(draft.linkedinUrl);
  const portfolioHref = sanitizeHttpUrl(draft.portfolioUrl);
  const githubHref = sanitizeHttpUrl(draft.githubUrl);
  const emailSafe = sanitizeEmail(draft.email);

  const contacts = [
    contactLink('Linkedin', linkedinHref, draft.linkedinLabel),
    contactLink('Portfolio', portfolioHref, draft.portfolioLabel),
    contactLink('Github', githubHref, draft.githubLabel),
    contactLink('Email', mailtoHref(emailSafe), emailSafe),
  ]
    .filter(Boolean)
    .join('');

  const monthDate = (iso: string) => escapeHtml((iso || '').slice(0, 7) || iso);

  const jobs = draft.jobs
    .filter((job) => job.company || job.title || job.description)
    .map((job) => {
      const head = escapeHtml(
        [job.company, job.title].filter(Boolean).join(' - ') || 'Experiencia',
      );
      const range = escapeHtml(formatDraftRange(job.startDate, job.endDate, safeCurrent));
      return `<li>
        <div class="cv-entry-head"><h3>${head}</h3><time datetime="${monthDate(job.startDate)}">${range}</time></div>
        <p class="cv-entry-body">${richTextToHtml(job.description)}</p>
      </li>`;
    })
    .join('');

  const education = draft.education
    .filter((item) => item.title || item.description)
    .map((item) => {
      const badge = item.badge
        ? ` <span class="cv-badge">${escapeHtml(item.badge)}</span>`
        : '';
      const range = escapeHtml(formatDraftRange(item.startDate, item.endDate, safeCurrent));
      return `<li>
        <div class="cv-entry-head"><h3>${escapeHtml(item.title || 'Formación')}${badge}</h3><time datetime="${monthDate(item.startDate)}">${range}</time></div>
        <p class="cv-entry-body">${richTextToHtml(item.description)}</p>
      </li>`;
    })
    .join('');

  const sims = draft.simulations
    .filter((line) => line.trim())
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('');

  const workId = 'user-cv-work';
  const eduId = 'user-cv-education';
  const simsId = 'user-cv-simulations';
  const skillsId = 'user-cv-skills';

  return `<article class="cv-doc" aria-labelledby="user-cv-name">
  <header class="cv-header">
    <div class="cv-identity">
      <h1 id="user-cv-name">${name}</h1>
      <p class="cv-label">${label}</p>
      <p class="cv-location">${location}</p>
    </div>
    <ul class="cv-contacts" aria-label="Contact">${contacts}</ul>
  </header>
  <p class="cv-summary">${summary}</p>
  <section class="cv-section" aria-labelledby="${workId}">
    <h2 id="${workId}">${escapeHtml(draft.labels.work)}</h2>
    <ul class="cv-entries">${jobs}</ul>
  </section>
  <section class="cv-section" aria-labelledby="${eduId}">
    <h2 id="${eduId}">${escapeHtml(draft.labels.education)}</h2>
    <ul class="cv-entries">${education}</ul>
  </section>
  <section class="cv-section" aria-labelledby="${simsId}">
    <h2 id="${simsId}">${escapeHtml(draft.labels.simulations)}</h2>
    <ul class="cv-simulations">${sims}</ul>
  </section>
  <footer class="cv-skills" aria-labelledby="${skillsId}">
    <h2 id="${skillsId}" class="visually-hidden">${escapeHtml(draft.labels.hardSkills)} / ${escapeHtml(draft.labels.softSkills)}</h2>
    <p><strong>${escapeHtml(draft.labels.hardSkills)} :</strong> ${escapeHtml(draft.hardSkills)}</p>
    <p><strong>${escapeHtml(draft.labels.softSkills)} :</strong> ${escapeHtml(draft.softSkills)}</p>
  </footer>
</article>`;
}

export function downloadJsonFile(draft: UserCvDraft, filenameStem: string): void {
  const pad = (value: number) => String(value).padStart(2, '0');
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
  ].join('_');
  const time = [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join('-');
  const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filenameStem}-${stamp}-${time}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function draftFileStem(draft: UserCvDraft): string {
  const slug =
    draft.fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_|_$/g, '') || 'mi_cv';
  return `${slug}_CV`;
}
