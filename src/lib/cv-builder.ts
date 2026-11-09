import type { Locale } from '@/lib/i18n';

export const CV_BUILDER_STORAGE_KEY = 'arceprog.cv-builder.v1';
export const CV_BUILDER_PREVIEW_KEY = 'arceprog.cv-builder.preview.v1';
/** Foto aparte del JSON: solo en este navegador, no se sube a ningún servidor. */
export const CV_BUILDER_PHOTO_KEY = 'arceprog.cv-builder.photo.v1';
export const CV_DRAFT_VERSION = 1 as const;
export const CV_PHOTO_SIZE_PX = 256;
export const CV_PHOTO_MAX_CHARS = 280_000;

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

/** Títulos de sección por idioma (un solo idioma; sin “ES - EN”). */
export function defaultSectionLabels(locale: Locale): UserCvDraft['labels'] {
  const es = locale === 'es';
  return {
    work: es ? 'Historial Laboral' : 'Work History',
    education: es ? 'Formación Académica' : 'Education',
    simulations: es ? 'Simulaciones Laborales' : 'Job Simulations',
    hardSkills: 'Hard Skills',
    softSkills: 'Soft Skills',
  };
}

const STOCK_SECTION_LABELS = new Set([
  'Historial Laboral',
  'Work History',
  'Historial Laboral - Work History',
  'Work History - Historial Laboral',
  'Formación Académica',
  'Education',
  'Formación Académica - Education',
  'Education - Formación Académica',
  'Simulaciones Laborales',
  'Job Simulations',
  'Simulaciones Laborales -',
  'Job Simulations -',
  'Simulations',
]);

/**
 * Si el título es el default (o el bilingüe viejo), lo alinea al locale actual.
 * Si el usuario lo personalizó (p. ej. “Proyectos personales”), no lo toca.
 */
export function alignSectionLabelsToLocale(draft: UserCvDraft, locale: Locale): UserCvDraft {
  const defaults = defaultSectionLabels(locale);
  const next = (value: string, key: keyof UserCvDraft['labels']) => {
    const trimmed = value.trim();
    if (!trimmed || STOCK_SECTION_LABELS.has(trimmed)) return defaults[key];
    return value;
  };
  return {
    ...draft,
    labels: {
      work: next(draft.labels.work, 'work'),
      education: next(draft.labels.education, 'education'),
      simulations: next(draft.labels.simulations, 'simulations'),
      hardSkills: next(draft.labels.hardSkills, 'hardSkills'),
      softSkills: next(draft.labels.softSkills, 'softSkills'),
    },
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
    linkedinUrl: '',
    linkedinLabel: '',
    portfolioUrl: '',
    portfolioLabel: '',
    githubUrl: '',
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
    labels: defaultSectionLabels(locale),
  };
}

/**
 * Persona de ejemplo 100% ficticia (densidad junior completa).
 * Perfil tech/UX — sin solaparse con demos de marketing u otros CVs reales.
 */
export function exampleUserCv(locale: Locale): UserCvDraft {
  if (locale === 'en') {
    return {
      version: CV_DRAFT_VERSION,
      fullName: 'Nora Vidal',
      label: 'Junior UX/UI Designer',
      location: 'Córdoba - Argentina',
      summary:
        'Junior UX/UI designer focused on clear flows, accessible interfaces and lightweight front-end handoff. Comfortable in **Figma**, user interviews and turning wireframes into HTML/CSS prototypes. Looking for a product team where research and UI craft meet.',
      linkedinUrl: 'https://linkedin.com/in/nora-vidal-demo',
      linkedinLabel: 'nora-vidal-demo',
      portfolioUrl: 'https://noravidal.demo',
      portfolioLabel: 'noravidal.demo',
      githubUrl: 'https://github.com/nora-vidal-demo',
      githubLabel: 'nora-vidal-demo',
      email: 'nora.vidal.demo@example.com',
      jobs: [
        {
          company: 'Pulseboard Labs',
          title: 'UX/UI Intern',
          startDate: '2025-08-01',
          endDate: '',
          description:
            'Redesigned onboarding for an analytics SaaS: user flows, high-fidelity **Figma** screens and usability checks with 6 participants. Handed off specs to frontend.',
        },
        {
          company: 'Taller Nube',
          title: 'Freelance UI Designer',
          startDate: '2024-02-01',
          endDate: '2025-07-01',
          description:
            'Landing pages and component libraries for two local SMEs. Built clickable prototypes and a small **HTML/CSS** styleguide for developers.',
        },
        {
          company: 'Biblioteca del Parque',
          title: 'Library Desk Assistant',
          startDate: '2022-04-01',
          endDate: '2024-01-01',
          description:
            'Front desk, catalog lookup help and workshop sign-ups. Practiced clear verbal explanations with diverse visitors.',
        },
      ],
      education: [
        {
          title: 'Graphic Design — UNC (FAUD)',
          badge: 'In progress',
          startDate: '2022-03-01',
          endDate: '',
          description: 'Third year. Emphasis on visual systems, typography and digital interfaces.',
        },
        {
          title: 'UX Research Fundamentals — Interaction Design Foundation',
          badge: 'Certificate',
          startDate: '2025-04-01',
          endDate: '2025-05-01',
          description: 'Interviews, affinity mapping and usability test planning.',
        },
        {
          title: 'Accessible Web Design — freeCodeCamp',
          badge: 'Certificate',
          startDate: '2024-09-01',
          endDate: '2024-11-01',
          description: 'WCAG basics, semantic HTML and keyboard-friendly patterns.',
        },
        {
          title: 'Frontend for Designers — CodigoFacilito',
          badge: 'Course',
          startDate: '2024-06-01',
          endDate: '2024-08-01',
          description: 'HTML, CSS layout, responsive breakpoints and handing files to engineering.',
        },
      ],
      simulations: [
        'Case study: redesign of a campus meal-plan app — research plan, 3 iterations and final UI kit.',
        'Open project: design system starter (colors, type scale, 12 components) documented in Figma.',
      ],
      hardSkills:
        'Figma, FigJam, Wireframing, Prototyping, HTML, CSS, Accessibility (WCAG), Design systems, Notion, English B1',
      softSkills: 'Listening, Visual storytelling, Collaboration with developers, Curiosity, Timeboxing, Feedback loops',
      labels: defaultSectionLabels('en'),
    };
  }

  return {
    version: CV_DRAFT_VERSION,
    fullName: 'Nora Vidal',
    label: 'Diseñadora UX/UI Junior',
    location: 'Córdoba - Argentina',
    summary:
      'Diseñadora UX/UI junior enfocada en flujos claros, interfaces accesibles y handoff liviano a front. Cómoda con **Figma**, entrevistas a usuarias y prototipos HTML/CSS. Busco un equipo de producto donde se junten research y oficio visual.',
    linkedinUrl: 'https://linkedin.com/in/nora-vidal-demo',
    linkedinLabel: 'nora-vidal-demo',
    portfolioUrl: 'https://noravidal.demo',
    portfolioLabel: 'noravidal.demo',
    githubUrl: 'https://github.com/nora-vidal-demo',
    githubLabel: 'nora-vidal-demo',
    email: 'nora.vidal.demo@example.com',
    jobs: [
      {
        company: 'Pulseboard Labs',
        title: 'Pasante UX/UI',
        startDate: '2025-08-01',
        endDate: '',
        description:
          'Rediseño del onboarding de un SaaS de analítica: flujos, pantallas en **Figma** y pruebas con 6 personas. Entregué specs al equipo front.',
      },
      {
        company: 'Taller Nube',
        title: 'Diseñadora UI freelance',
        startDate: '2024-02-01',
        endDate: '2025-07-01',
        description:
          'Landings y librerías de componentes para dos PyMEs. Prototipos clickeables y una guía **HTML/CSS** chica para desarrollo.',
      },
      {
        company: 'Biblioteca del Parque',
        title: 'Asistente de mostrador',
        startDate: '2022-04-01',
        endDate: '2024-01-01',
        description:
          'Mostrador, ayuda con catálogo e inscripciones a talleres. Practiqué explicaciones claras con públicos muy distintos.',
      },
    ],
    education: [
      {
        title: 'Diseño Gráfico — UNC (FAUD)',
        badge: 'En curso',
        startDate: '2022-03-01',
        endDate: '',
        description: 'Tercer año. Énfasis en sistemas visuales, tipografía e interfaces digitales.',
      },
      {
        title: 'UX Research Fundamentals — Interaction Design Foundation',
        badge: 'Certificado',
        startDate: '2025-04-01',
        endDate: '2025-05-01',
        description: 'Entrevistas, affinity mapping y planificación de tests de usabilidad.',
      },
      {
        title: 'Accessible Web Design — freeCodeCamp',
        badge: 'Certificado',
        startDate: '2024-09-01',
        endDate: '2024-11-01',
        description: 'Bases WCAG, HTML semántico y patrones usables con teclado.',
      },
      {
        title: 'Frontend para diseñadores — CodigoFacilito',
        badge: 'Curso',
        startDate: '2024-06-01',
        endDate: '2024-08-01',
        description: 'HTML, layout CSS, breakpoints responsive y entrega de archivos a engineering.',
      },
    ],
    simulations: [
      'Case study: rediseño de app de viandas universitarias — plan de research, 3 iteraciones y UI kit final.',
      'Proyecto abierto: design system base (color, tipo, 12 componentes) documentado en Figma.',
    ],
    hardSkills:
      'Figma, FigJam, Wireframes, Prototipos, HTML, CSS, Accesibilidad (WCAG), Design systems, Notion, Inglés B1',
    softSkills: 'Escucha, Narrativa visual, Colaboración con developers, Curiosidad, Timeboxing, Feedback',
    labels: defaultSectionLabels('es'),
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

/** Solo data:image jpeg/png/webp locales (nunca http remoto en el CV del builder). */
export function sanitizePhotoDataUrl(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const value = raw.trim();
  if (value.length > CV_PHOTO_MAX_CHARS) return '';
  if (!/^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/i.test(value)) return '';
  return value;
}

export function readStoredPhoto(): string {
  try {
    return sanitizePhotoDataUrl(localStorage.getItem(CV_BUILDER_PHOTO_KEY) ?? '');
  } catch {
    return '';
  }
}

export function persistPhoto(dataUrl: string): void {
  try {
    const safe = sanitizePhotoDataUrl(dataUrl);
    if (!safe) {
      localStorage.removeItem(CV_BUILDER_PHOTO_KEY);
      return;
    }
    localStorage.setItem(CV_BUILDER_PHOTO_KEY, safe);
  } catch {
    /* quota / private mode */
  }
}

export function clearStoredPhoto(): void {
  try {
    localStorage.removeItem(CV_BUILDER_PHOTO_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Recorta al centro (cover) a cuadrado y comprime a JPEG.
 * La foto no viaja al servidor: queda en memoria / localStorage del navegador.
 */
export async function fileToCvPhotoDataUrl(file: File): Promise<string> {
  if (!/^image\/(jpeg|jpg|png|webp)$/i.test(file.type)) {
    throw new Error('unsupported-image');
  }
  if (file.size > 8_000_000) {
    throw new Error('image-too-large');
  }

  const bitmap = await createImageBitmap(file);
  try {
    const size = CV_PHOTO_SIZE_PX;
    const scale = Math.max(size / bitmap.width, size / bitmap.height);
    const drawW = bitmap.width * scale;
    const drawH = bitmap.height * scale;
    const dx = (size - drawW) / 2;
    const dy = (size - drawH) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(bitmap, dx, dy, drawW, drawH);

    let quality = 0.85;
    let dataUrl = canvas.toDataURL('image/jpeg', quality);
    while (dataUrl.length > CV_PHOTO_MAX_CHARS && quality > 0.45) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL('image/jpeg', quality);
    }
    const safe = sanitizePhotoDataUrl(dataUrl);
    if (!safe) throw new Error('image-too-large');
    return safe;
  } finally {
    bitmap.close();
  }
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
    // [] = sección omitida del CV (p. ej. sin simulaciones laborales).
    simulations,
    hardSkills: clampString(value.hardSkills, CV_DRAFT_LIMITS.long),
    softSkills: clampString(value.softSkills, CV_DRAFT_LIMITS.long),
    labels: {
      work: migrateSectionLabel(labelsRaw.work, 'work'),
      education: migrateSectionLabel(labelsRaw.education, 'education'),
      simulations: migrateSectionLabel(labelsRaw.simulations, 'simulations'),
      hardSkills: clampString(labelsRaw.hardSkills, CV_DRAFT_LIMITS.short) || 'Hard Skills',
      softSkills: clampString(labelsRaw.softSkills, CV_DRAFT_LIMITS.short) || 'Soft Skills',
    },
  };
}

/** Quita el patrón bilingüe legado ("Historial - Work History") de borradores viejos. */
function migrateSectionLabel(
  raw: unknown,
  key: 'work' | 'education' | 'simulations',
): string {
  const value = clampString(raw, CV_DRAFT_LIMITS.medium).trim();
  const legacy: Record<string, string> = {
    'Historial Laboral - Work History': 'Historial Laboral',
    'Work History - Historial Laboral': 'Work History',
    'Formación Académica - Education': 'Formación Académica',
    'Education - Formación Académica': 'Education',
    'Simulaciones Laborales -': 'Simulaciones Laborales',
    'Simulaciones Laborales': 'Simulaciones Laborales',
    'Job Simulations -': 'Job Simulations',
  };
  if (value && legacy[value]) return legacy[value];
  if (value) return value;
  if (key === 'work') return 'Work History';
  if (key === 'education') return 'Education';
  return 'Job Simulations';
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

export type CvContactKind = 'linkedin' | 'portfolio' | 'github' | 'email';

/** Contacto activo si tiene valor usable (no placeholders vacíos tipo https://github.com/). */
export function isContactActive(draft: UserCvDraft, kind: CvContactKind): boolean {
  if (kind === 'email') return Boolean(sanitizeEmail(draft.email));
  const raw =
    kind === 'linkedin'
      ? draft.linkedinUrl || draft.linkedinLabel
      : kind === 'portfolio'
        ? draft.portfolioUrl || draft.portfolioLabel
        : draft.githubUrl || draft.githubLabel;
  const resolved = resolveContactInput(kind, raw);
  if (!resolved.url) return false;
  if (kind === 'portfolio') return true;
  // LinkedIn/GitHub necesitan un slug/usuario, no solo el host.
  return Boolean(resolved.label && resolved.label !== resolved.url);
}

/**
 * Un solo campo en el form → URL + label para el JSON/PDF.
 * Acepta handle (`arceprog`), host/path o URL completa.
 */
export function resolveContactInput(
  kind: Exclude<CvContactKind, 'email'>,
  raw: string,
): { url: string; label: string } {
  const input = clampString(raw, CV_DRAFT_LIMITS.url).trim();
  if (!input) return { url: '', label: '' };

  const withProto = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  if (kind === 'github') {
    if (!input.includes('.') && !input.includes('/') && !input.includes(':')) {
      const user = input.replace(/^@/, '');
      return { url: `https://github.com/${user}`, label: user };
    }
    const url = sanitizeHttpUrl(withProto);
    if (!url) return { url: '', label: '' };
    try {
      const path = new URL(url).pathname.split('/').filter(Boolean)[0] ?? '';
      return { url, label: path || url };
    } catch {
      return { url: '', label: '' };
    }
  }

  if (kind === 'linkedin') {
    if (!input.includes('.') && !input.includes('/') && !input.includes(':')) {
      const slug = input.replace(/^@/, '');
      return { url: `https://www.linkedin.com/in/${slug}`, label: slug };
    }
    const url = sanitizeHttpUrl(withProto);
    if (!url) return { url: '', label: '' };
    try {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      const slug = parts[0] === 'in' || parts[0] === 'company' ? parts[1] ?? parts[0] : parts[0] ?? '';
      return { url, label: slug || url };
    } catch {
      return { url: '', label: '' };
    }
  }

  // portfolio / site
  const url = sanitizeHttpUrl(withProto);
  if (!url) return { url: '', label: '' };
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return { url, label: host || url };
  } catch {
    return { url: '', label: '' };
  }
}

/** Valor a mostrar en el input único del form. */
export function contactInputValue(draft: UserCvDraft, kind: Exclude<CvContactKind, 'email'>): string {
  if (kind === 'linkedin') return draft.linkedinUrl.trim() || draft.linkedinLabel.trim();
  if (kind === 'portfolio') return draft.portfolioUrl.trim() || draft.portfolioLabel.trim();
  return draft.githubUrl.trim() || draft.githubLabel.trim();
}

function contactLink(kind: string, href: string, label: string): string {
  if (!href) return '';
  const text = label.trim() || href.replace(/^https?:\/\//i, '');
  if (!text) return '';
  return `<li><span>${escapeHtml(kind)}:</span> <a href="${escapeHtml(href)}" aria-label="${escapeHtml(kind)}: ${escapeHtml(text)}" rel="noopener noreferrer">${escapeHtml(text)}</a></li>`;
}

export function renderUserCvHtml(
  draftInput: UserCvDraft,
  currentLabel: string,
  photoDataUrl = '',
): string {
  // Defensa en profundidad: coerce + allowlist solo al armar hrefs.
  const draft = coerceUserCvDraft(draftInput);
  const photoSafe = sanitizePhotoDataUrl(photoDataUrl);
  const name = escapeHtml(draft.fullName || 'Tu nombre');
  const label = escapeHtml(draft.label || '');
  const location = escapeHtml(draft.location || '');
  const summary = escapeHtml(draft.summary || '');
  const safeCurrent = clampString(currentLabel, CV_DRAFT_LIMITS.short);
  const linkedin = resolveContactInput('linkedin', draft.linkedinUrl || draft.linkedinLabel);
  const portfolio = resolveContactInput('portfolio', draft.portfolioUrl || draft.portfolioLabel);
  const github = resolveContactInput('github', draft.githubUrl || draft.githubLabel);
  const emailSafe = sanitizeEmail(draft.email);

  const contacts = [
    contactLink(
      'Linkedin',
      sanitizeHttpUrl(draft.linkedinUrl) || linkedin.url,
      draft.linkedinLabel || linkedin.label,
    ),
    contactLink(
      'Portfolio',
      sanitizeHttpUrl(draft.portfolioUrl) || portfolio.url,
      draft.portfolioLabel || portfolio.label,
    ),
    contactLink(
      'Github',
      sanitizeHttpUrl(draft.githubUrl) || github.url,
      draft.githubLabel || github.label,
    ),
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
  const hasSkills = Boolean(draft.hardSkills.trim() || draft.softSkills.trim());

  const workSection = jobs
    ? `<section class="cv-section" aria-labelledby="${workId}">
    <h2 id="${workId}">${escapeHtml(draft.labels.work)}</h2>
    <ul class="cv-entries">${jobs}</ul>
  </section>`
    : '';

  const eduSection = education
    ? `<section class="cv-section" aria-labelledby="${eduId}">
    <h2 id="${eduId}">${escapeHtml(draft.labels.education)}</h2>
    <ul class="cv-entries">${education}</ul>
  </section>`
    : '';

  const simsSection = sims
    ? `<section class="cv-section" aria-labelledby="${simsId}">
    <h2 id="${simsId}">${escapeHtml(draft.labels.simulations)}</h2>
    <ul class="cv-simulations">${sims}</ul>
  </section>`
    : '';

  const skillsFooter = hasSkills
    ? `<footer class="cv-skills" aria-labelledby="${skillsId}">
    <h2 id="${skillsId}" class="visually-hidden">${escapeHtml(draft.labels.hardSkills)} / ${escapeHtml(draft.labels.softSkills)}</h2>
    ${draft.hardSkills.trim() ? `<p><strong>${escapeHtml(draft.labels.hardSkills)} :</strong> ${escapeHtml(draft.hardSkills)}</p>` : ''}
    ${draft.softSkills.trim() ? `<p><strong>${escapeHtml(draft.labels.softSkills)} :</strong> ${escapeHtml(draft.softSkills)}</p>` : ''}
  </footer>`
    : '';

  const photoBlock = photoSafe
    ? `<div class="cv-photo-wrap"><img class="cv-photo" src="${photoSafe}" alt="" width="96" height="96" decoding="async" /></div>`
    : '';

  return `<article class="cv-doc" aria-labelledby="user-cv-name">
  <header class="cv-header">
    ${photoBlock}
    <div class="cv-identity">
      <h1 id="user-cv-name">${name}</h1>
      <p class="cv-label">${label}</p>
      <p class="cv-location">${location}</p>
    </div>
    <ul class="cv-contacts" aria-label="Contact">${contacts}</ul>
  </header>
  ${summary ? `<p class="cv-summary">${summary}</p>` : ''}
  ${workSection}
  ${eduSection}
  ${simsSection}
  ${skillsFooter}
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

function slugifyNamePart(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/** Stem para JSON: Nora_Vidal_CV */
export function draftFileStem(draft: UserCvDraft): string {
  const slug =
    draft.fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_|_$/g, '') || 'mi_cv';
  return `${slug}_CV`;
}

/**
 * Nombre sugerido al “Guardar como PDF” (via document.title):
 * apellido-nombre-2026-11-09-20-15-30
 * Última palabra = apellido; el resto = nombre.
 */
export function draftPdfPrintTitle(draft: UserCvDraft, now = new Date()): string {
  const parts = draft.fullName
    .trim()
    .split(/\s+/)
    .map(slugifyNamePart)
    .filter(Boolean);
  let nameStem = 'cv';
  if (parts.length === 1) {
    nameStem = parts[0]!;
  } else if (parts.length > 1) {
    const apellido = parts[parts.length - 1]!;
    const nombre = parts.slice(0, -1).join('-');
    nameStem = `${apellido}-${nombre}`;
  }
  const pad = (value: number) => String(value).padStart(2, '0');
  const date = [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join('-');
  const time = [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join('-');
  return `${nameStem}-${date}-${time}`;
}
