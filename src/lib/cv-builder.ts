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

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
  const [year, month] = iso.split('-');
  if (!year) return iso;
  if (!month) return year;
  return `${month}/${year}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isUserCvDraft(value: unknown): value is UserCvDraft {
  if (!isRecord(value)) return false;
  if (value.version !== CV_DRAFT_VERSION) return false;
  if (typeof value.fullName !== 'string') return false;
  if (!Array.isArray(value.jobs) || !Array.isArray(value.education)) return false;
  if (!Array.isArray(value.simulations)) return false;
  if (!isRecord(value.labels)) return false;
  const { labels } = value;
  return (
    typeof labels.work === 'string' &&
    typeof labels.education === 'string' &&
    typeof labels.simulations === 'string' &&
    typeof labels.hardSkills === 'string' &&
    typeof labels.softSkills === 'string'
  );
}

export function parseUserCvJson(raw: string): UserCvDraft {
  const parsed = JSON.parse(raw) as unknown;
  if (!isUserCvDraft(parsed)) {
    throw new Error('JSON inválido: falta version=1 o campos requeridos.');
  }
  return parsed;
}

export function renderUserCvHtml(draft: UserCvDraft, currentLabel: string): string {
  const name = escapeHtml(draft.fullName || 'Tu nombre');
  const label = escapeHtml(draft.label || '');
  const location = escapeHtml(draft.location || '');
  const summary = escapeHtml(draft.summary || '');

  const contacts = [
    draft.linkedinLabel
      ? `<li><span>Linkedin:</span> <a href="${escapeHtml(draft.linkedinUrl)}">${escapeHtml(draft.linkedinLabel)}</a></li>`
      : '',
    draft.portfolioLabel
      ? `<li><span>Portfolio:</span> <a href="${escapeHtml(draft.portfolioUrl)}">${escapeHtml(draft.portfolioLabel)}</a></li>`
      : '',
    draft.githubLabel
      ? `<li><span>Github:</span> <a href="${escapeHtml(draft.githubUrl)}">${escapeHtml(draft.githubLabel)}</a></li>`
      : '',
    draft.email
      ? `<li><span>Email:</span> <a href="mailto:${escapeHtml(draft.email)}">${escapeHtml(draft.email)}</a></li>`
      : '',
  ]
    .filter(Boolean)
    .join('');

  const jobs = draft.jobs
    .filter((job) => job.company || job.title || job.description)
    .map((job) => {
      const head = escapeHtml(
        [job.company, job.title].filter(Boolean).join(' - ') || 'Experiencia',
      );
      const range = escapeHtml(formatDraftRange(job.startDate, job.endDate, currentLabel));
      return `<li>
        <div class="cv-entry-head"><h3>${head}</h3><time>${range}</time></div>
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
      const range = escapeHtml(formatDraftRange(item.startDate, item.endDate, currentLabel));
      return `<li>
        <div class="cv-entry-head"><h3>${escapeHtml(item.title || 'Formación')}${badge}</h3><time>${range}</time></div>
        <p class="cv-entry-body">${richTextToHtml(item.description)}</p>
      </li>`;
    })
    .join('');

  const sims = draft.simulations
    .filter((line) => line.trim())
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('');

  return `<article class="cv-doc">
  <header class="cv-header">
    <div class="cv-identity">
      <h1>${name}</h1>
      <p class="cv-label">${label}</p>
      <p class="cv-location">${location}</p>
    </div>
    <ul class="cv-contacts">${contacts}</ul>
  </header>
  <p class="cv-summary">${summary}</p>
  <section class="cv-section">
    <h2>${escapeHtml(draft.labels.work)}</h2>
    <ul class="cv-entries">${jobs}</ul>
  </section>
  <section class="cv-section">
    <h2>${escapeHtml(draft.labels.education)}</h2>
    <ul class="cv-entries">${education}</ul>
  </section>
  <section class="cv-section">
    <h2>${escapeHtml(draft.labels.simulations)}</h2>
    <ul class="cv-simulations">${sims}</ul>
  </section>
  <footer class="cv-skills">
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
