import {
  CV_BUILDER_PREVIEW_KEY,
  CV_BUILDER_STORAGE_KEY,
  CV_DRAFT_LIMITS,
  clearStoredPhoto,
  contactInputValue,
  downloadJsonFile,
  draftFileStem,
  emptyUserCv,
  escapeHtml,
  exampleUserCv,
  coerceUserCvDraft,
  fileToCvPhotoDataUrl,
  isContactActive,
  normalizeUserCvDraft,
  parseUserCvJson,
  persistPhoto,
  readStoredPhoto,
  renderUserCvHtml,
  resolveContactInput,
  type CvContactKind,
  type UserCvDraft,
  type UserCvEdu,
  type UserCvJob,
} from '@/lib/cv-builder';
import { getCvBuilderUi, type CvBuilderUi } from '@/lib/cv-builder-ui';
import type { Locale } from '@/lib/i18n';

type Mode = 'form' | 'json';

function readStored(locale: Locale): UserCvDraft {
  try {
    const raw = localStorage.getItem(CV_BUILDER_STORAGE_KEY);
    if (!raw) return emptyUserCv(locale);
    return parseUserCvJson(raw);
  } catch {
    return emptyUserCv(locale);
  }
}

function persist(draft: UserCvDraft): void {
  const safe = coerceUserCvDraft(draft);
  localStorage.setItem(CV_BUILDER_STORAGE_KEY, JSON.stringify(safe));
}

export function mountCvBuilder(root: HTMLElement, locale: Locale): void {
  const ui = getCvBuilderUi(locale);
  let draft = readStored(locale);
  let mode: Mode = 'form';
  let status = '';
  let photoDataUrl = readStoredPhoto();
  /** Slots de contacto abiertos aunque aún estén vacíos. */
  const pendingContacts = new Set<CvContactKind>();

  const render = () => {
    persist(draft);
    persistPhoto(photoDataUrl);
    root.innerHTML = buildChrome(ui, locale, mode, draft, status, pendingContacts, photoDataUrl);
    bind(root, locale, ui, {
      getDraft: () => draft,
      setDraft: (next) => {
        draft = next;
      },
      getMode: () => mode,
      setMode: (next) => {
        mode = next;
      },
      setStatus: (next) => {
        status = next;
      },
      getPendingContacts: () => pendingContacts,
      getPhoto: () => photoDataUrl,
      setPhoto: (next) => {
        photoDataUrl = next;
        if (next) persistPhoto(next);
        else clearStoredPhoto();
      },
      rerender: render,
    });
    const preview = root.querySelector<HTMLElement>('[data-preview]');
    if (preview) {
      preview.innerHTML = renderUserCvHtml(draft, ui.current, photoDataUrl);
    }
  };

  render();
}

function buildChrome(
  ui: CvBuilderUi,
  locale: Locale,
  mode: Mode,
  draft: UserCvDraft,
  status: string,
  pendingContacts: Set<CvContactKind>,
  photoDataUrl: string,
): string {
  const home = locale === 'en' ? '/en/' : '/';
  const myCvs = locale === 'en' ? '/en/cv/' : '/cv/';
  const printPath = locale === 'en' ? '/en/crear-cv/vista/' : '/crear-cv/vista/';

  const statusText = status ? ` · <strong>${escapeHtml(status)}</strong>` : '';

  return `
  <div class="builder">
    <a class="skip-link builder-skip" href="#builder-editor">${ui.skipToEditor}</a>
    <a class="skip-link builder-skip" href="#builder-preview">${ui.skipToPreview}</a>

    <header class="builder-top">
      <nav class="builder-nav" aria-label="breadcrumb">
        <a href="${home}" title="${ui.back}">${ui.back}</a>
        <span class="builder-nav-sep" aria-hidden="true">/</span>
        <a href="${myCvs}" title="${ui.myCvs}">${ui.myCvs}</a>
      </nav>
      <h1 id="builder-title">${ui.title}</h1>
      <p id="builder-subtitle">${ui.subtitle}</p>
    </header>

    <div class="builder-toolbar" role="group" aria-label="${ui.actionsRegion}">
      <div class="builder-toolbar-secondary">
        <div class="builder-action-group" role="group" aria-label="${ui.draftActions}">
          <button type="button" class="btn btn-secondary" data-action="example">${ui.loadExample}</button>
          <button type="button" class="btn btn-ghost" data-action="reset">${ui.reset}</button>
        </div>
        <div class="builder-action-group" role="group" aria-label="${ui.fileActions}">
          <button type="button" class="btn btn-secondary" data-action="download">${ui.downloadJson}</button>
          <label class="btn btn-secondary file-btn">${ui.importJson}<input type="file" accept="application/json,.json" data-import hidden /></label>
        </div>
      </div>
      <a class="btn btn-primary builder-cta" data-action="print" href="${printPath}">${ui.printPdf}</a>
    </div>

    <p class="builder-hint" id="builder-status" role="status" aria-live="polite" aria-atomic="true">
      <span class="visually-hidden">${ui.statusLabel}: </span>${ui.saveHint}${statusText}
    </p>

    <div class="builder-grid">
      <section class="builder-editor" id="builder-editor" aria-label="${ui.editorRegion}" tabindex="-1">
        <div class="tabs" role="tablist" aria-label="${ui.tabsLabel}">
          <button type="button" role="tab" id="tab-form" data-mode="form" aria-selected="${mode === 'form'}" aria-controls="builder-panel" class="${mode === 'form' ? 'active' : ''}">${ui.tabForm}</button>
          <button type="button" role="tab" id="tab-json" data-mode="json" aria-selected="${mode === 'json'}" aria-controls="builder-panel" class="${mode === 'json' ? 'active' : ''}">${ui.tabJson}</button>
        </div>
        <div role="tabpanel" id="builder-panel" aria-labelledby="${mode === 'form' ? 'tab-form' : 'tab-json'}">
          ${mode === 'json' ? renderJsonEditor(ui, draft) : renderForm(ui, draft, pendingContacts, photoDataUrl)}
        </div>
      </section>
      <section class="builder-preview-wrap" id="builder-preview" aria-label="${ui.previewRegion}" tabindex="-1">
        <div class="builder-preview-head">
          <h2 id="preview-heading">${ui.previewTitle}</h2>
          <a class="btn btn-primary btn-compact builder-preview-print" data-action="print" href="${printPath}">${ui.printPdf}</a>
        </div>
        <div class="builder-preview-scroll">
          <div class="builder-preview-paper" data-preview aria-labelledby="preview-heading"></div>
        </div>
      </section>
    </div>

    <div class="builder-mobile-cta no-print">
      <a class="btn btn-primary" data-action="print" href="${printPath}">${ui.printPdf}</a>
    </div>
  </div>`;
}

function renderJsonEditor(ui: CvBuilderUi, draft: UserCvDraft): string {
  return `<label class="json-label" for="cv-json-editor">${ui.jsonLabel}</label>
  <textarea id="cv-json-editor" data-json rows="28" spellcheck="false" aria-label="${ui.jsonLabel}">${escapeHtml(JSON.stringify(draft, null, 2))}</textarea>`;
}

function renderPhotoField(ui: CvBuilderUi, photoDataUrl: string): string {
  const hasPhoto = Boolean(photoDataUrl);
  return `<div class="photo-field">
      <p class="photo-label">${ui.photo}</p>
      <p class="contact-hint">${ui.photoHint}</p>
      <div class="photo-row">
        ${
          hasPhoto
            ? `<img class="photo-thumb" src="${photoDataUrl}" alt="" width="72" height="72" />`
            : `<div class="photo-thumb photo-thumb--empty" aria-hidden="true"></div>`
        }
        <div class="photo-actions">
          <label class="btn btn-secondary file-btn">${hasPhoto ? ui.photoChange : ui.photoAdd}<input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" data-photo-input hidden /></label>
          ${hasPhoto ? `<button type="button" class="btn btn-danger" data-remove-photo>${ui.photoRemove}</button>` : ''}
        </div>
      </div>
    </div>`;
}

function renderForm(
  ui: CvBuilderUi,
  draft: UserCvDraft,
  pendingContacts: Set<CvContactKind>,
  photoDataUrl: string,
): string {
  const jobs = draft.jobs
    .map(
      (job, index) => `
    <fieldset class="card" data-job="${index}">
      <legend>${ui.experience} #${index + 1}</legend>
      <label>${ui.company}<input name="jobs.${index}.company" value="${escapeHtml(job.company)}" /></label>
      <label>${ui.jobTitle}<input name="jobs.${index}.title" value="${escapeHtml(job.title)}" /></label>
      <div class="field-row">
        <label>${ui.startDate}<input name="jobs.${index}.startDate" value="${escapeHtml(job.startDate)}" autocomplete="off" inputmode="numeric" /></label>
        <label>${ui.endDate}<input name="jobs.${index}.endDate" value="${escapeHtml(job.endDate)}" autocomplete="off" inputmode="numeric" /></label>
      </div>
      <label>${ui.description}<textarea name="jobs.${index}.description" rows="3">${escapeHtml(job.description)}</textarea></label>
      <button type="button" class="btn btn-danger" data-remove-job="${index}" aria-label="${ui.removeJob} #${index + 1}">${ui.remove}</button>
    </fieldset>`,
    )
    .join('');

  const education = draft.education
    .map(
      (item, index) => `
    <fieldset class="card" data-edu="${index}">
      <legend>${ui.education} #${index + 1}</legend>
      <label>${ui.eduTitle}<input name="education.${index}.title" value="${escapeHtml(item.title)}" /></label>
      <label>${ui.badge}<input name="education.${index}.badge" value="${escapeHtml(item.badge)}" /></label>
      <div class="field-row">
        <label>${ui.startDate}<input name="education.${index}.startDate" value="${escapeHtml(item.startDate)}" autocomplete="off" inputmode="numeric" /></label>
        <label>${ui.endDate}<input name="education.${index}.endDate" value="${escapeHtml(item.endDate)}" autocomplete="off" inputmode="numeric" /></label>
      </div>
      <label>${ui.description}<textarea name="education.${index}.description" rows="2">${escapeHtml(item.description)}</textarea></label>
      <button type="button" class="btn btn-danger" data-remove-edu="${index}" aria-label="${ui.removeEdu} #${index + 1}">${ui.remove}</button>
    </fieldset>`,
    )
    .join('');

  const sims = draft.simulations
    .map(
      (line, index) => `
      <div class="sim-row">
        <label class="sim-label">
          <span class="visually-hidden">${ui.simLine} ${index + 1}</span>
          <input name="simulations.${index}" value="${escapeHtml(line)}" aria-label="${ui.simLine} ${index + 1}" />
        </label>
        <button type="button" class="btn btn-danger" data-remove-sim="${index}" aria-label="${ui.removeSim} ${index + 1}">${ui.remove}</button>
      </div>`,
    )
    .join('');

  return `
  <form data-form class="form">
    <fieldset class="card">
      <legend>${ui.identity}</legend>
      ${renderPhotoField(ui, photoDataUrl)}
      <label>${ui.fullName}<input name="fullName" value="${escapeHtml(draft.fullName)}" /></label>
      <label>${ui.label}<input name="label" value="${escapeHtml(draft.label)}" /></label>
      <label>${ui.location}<input name="location" value="${escapeHtml(draft.location)}" /></label>
      <label>${ui.summary}<textarea name="summary" rows="4">${escapeHtml(draft.summary)}</textarea></label>
    </fieldset>

    <fieldset class="card">
      <legend>${ui.contacts}</legend>
      <p class="contact-hint">${ui.contactHint}</p>
      ${renderContactRows(ui, draft, pendingContacts)}
      ${renderAddContactButtons(ui, draft, pendingContacts)}
    </fieldset>

    <div class="stack">
      <fieldset class="card">
        <legend>${ui.experience}</legend>
        <label>${ui.sectionTitle}<input name="labels.work" value="${escapeHtml(draft.labels.work)}" /></label>
      </fieldset>
      ${jobs}
      <button type="button" class="btn btn-secondary" data-add-job>${ui.addJob}</button>
    </div>

    <div class="stack">
      <fieldset class="card">
        <legend>${ui.education}</legend>
        <label>${ui.sectionTitle}<input name="labels.education" value="${escapeHtml(draft.labels.education)}" /></label>
      </fieldset>
      ${education}
      <button type="button" class="btn btn-secondary" data-add-edu>${ui.addEdu}</button>
    </div>

    ${
      draft.simulations.length > 0
        ? `<fieldset class="card" data-sim-section>
      <legend>${ui.simulations}</legend>
      <div class="section-head">
        <label>${ui.sectionTitle}<input name="labels.simulations" value="${escapeHtml(draft.labels.simulations)}" /></label>
        <button type="button" class="btn btn-danger" data-remove-sim-section>${ui.removeSection}</button>
      </div>
      ${sims}
      <button type="button" class="btn btn-secondary" data-add-sim>${ui.addSim}</button>
    </fieldset>`
        : `<div class="stack">
      <button type="button" class="btn btn-secondary" data-add-sim-section>${ui.addSimSection}</button>
    </div>`
    }

    <fieldset class="card">
      <legend>${ui.skills}</legend>
      <label>${ui.sectionTitle} (${ui.hardSkills})<input name="labels.hardSkills" value="${escapeHtml(draft.labels.hardSkills)}" /></label>
      <label>${ui.hardSkills}<textarea name="hardSkills" rows="2">${escapeHtml(draft.hardSkills)}</textarea></label>
      <label>${ui.sectionTitle} (${ui.softSkills})<input name="labels.softSkills" value="${escapeHtml(draft.labels.softSkills)}" /></label>
      <label>${ui.softSkills}<textarea name="softSkills" rows="2">${escapeHtml(draft.softSkills)}</textarea></label>
    </fieldset>
  </form>`;
}

const CONTACT_KINDS: CvContactKind[] = ['linkedin', 'portfolio', 'github', 'email'];

function contactKindLabel(ui: CvBuilderUi, kind: CvContactKind): string {
  if (kind === 'linkedin') return ui.contactLinkedin;
  if (kind === 'portfolio') return ui.contactPortfolio;
  if (kind === 'github') return ui.contactGithub;
  return ui.contactEmail;
}

function contactVisible(
  draft: UserCvDraft,
  kind: CvContactKind,
  pending: Set<CvContactKind>,
): boolean {
  return isContactActive(draft, kind) || pending.has(kind);
}

function renderContactRows(
  ui: CvBuilderUi,
  draft: UserCvDraft,
  pending: Set<CvContactKind>,
): string {
  return CONTACT_KINDS.filter((kind) => contactVisible(draft, kind, pending))
    .map((kind) => {
      if (kind === 'email') {
        return `<div class="contact-row" data-contact="email">
        <label>${ui.contactEmail}<input name="email" type="email" value="${escapeHtml(draft.email)}" autocomplete="email" /></label>
        <button type="button" class="btn btn-danger" data-remove-contact="email">${ui.removeContact}</button>
      </div>`;
      }
      const name = kind === 'linkedin' ? 'linkedin' : kind === 'portfolio' ? 'portfolio' : 'github';
      return `<div class="contact-row" data-contact="${kind}">
        <label>${contactKindLabel(ui, kind)}<input name="${name}" value="${escapeHtml(contactInputValue(draft, kind))}" autocomplete="url" /></label>
        <button type="button" class="btn btn-danger" data-remove-contact="${kind}">${ui.removeContact}</button>
      </div>`;
    })
    .join('');
}

function renderAddContactButtons(
  ui: CvBuilderUi,
  draft: UserCvDraft,
  pending: Set<CvContactKind>,
): string {
  const missing = CONTACT_KINDS.filter((kind) => !contactVisible(draft, kind, pending));
  if (missing.length === 0) return '';
  return `<div class="contact-add">
    <span class="contact-add-label">${ui.addContact}</span>
    ${missing
      .map(
        (kind) =>
          `<button type="button" class="btn btn-secondary" data-add-contact="${kind}">${contactKindLabel(ui, kind)}</button>`,
      )
      .join('')}
  </div>`;
}

function clearContact(draft: UserCvDraft, kind: CvContactKind): void {
  if (kind === 'email') {
    draft.email = '';
    return;
  }
  if (kind === 'linkedin') {
    draft.linkedinUrl = '';
    draft.linkedinLabel = '';
    return;
  }
  if (kind === 'portfolio') {
    draft.portfolioUrl = '';
    draft.portfolioLabel = '';
    return;
  }
  draft.githubUrl = '';
  draft.githubLabel = '';
}

interface BuilderApi {
  getDraft: () => UserCvDraft;
  setDraft: (draft: UserCvDraft) => void;
  getMode: () => Mode;
  setMode: (mode: Mode) => void;
  setStatus: (status: string) => void;
  getPendingContacts: () => Set<CvContactKind>;
  getPhoto: () => string;
  setPhoto: (dataUrl: string) => void;
  rerender: () => void;
}

function bind(
  root: HTMLElement,
  locale: Locale,
  ui: CvBuilderUi,
  api: BuilderApi,
): void {
  root.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      syncFromDom(root, api);
      const nextMode = btn.dataset.mode;
      if (nextMode !== 'form' && nextMode !== 'json') return;
      api.setMode(nextMode);
      api.rerender();
    });
  });

  root.querySelector('[data-action="example"]')?.addEventListener('click', () => {
    api.getPendingContacts().clear();
    api.setDraft(exampleUserCv(locale));
    api.setStatus(ui.importOk);
    api.rerender();
  });

  root.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
    api.getPendingContacts().clear();
    api.setPhoto('');
    api.setDraft(emptyUserCv(locale));
    api.setStatus('');
    api.rerender();
  });

  const photoInput = root.querySelector<HTMLInputElement>('[data-photo-input]');
  photoInput?.addEventListener('change', async () => {
    const file = photoInput.files?.[0];
    photoInput.value = '';
    if (!file) return;
    try {
      const dataUrl = await fileToCvPhotoDataUrl(file);
      api.setPhoto(dataUrl);
      api.setStatus('');
      api.rerender();
    } catch {
      api.setStatus(ui.photoError);
      api.rerender();
    }
  });

  root.querySelector('[data-remove-photo]')?.addEventListener('click', () => {
    api.setPhoto('');
    api.rerender();
  });

  root.querySelector('[data-action="download"]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = api.getDraft();
    downloadJsonFile(draft, draftFileStem(draft));
  });

  root.querySelectorAll('[data-action="print"]').forEach((el) => {
    el.addEventListener('click', () => {
      syncFromDom(root, api);
      const safe = normalizeUserCvDraft(api.getDraft());
      api.setDraft(safe);
      sessionStorage.setItem(CV_BUILDER_PREVIEW_KEY, JSON.stringify(safe));
    });
  });

  const fileInput = root.querySelector<HTMLInputElement>('[data-import]');
  fileInput?.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    if (file.size > CV_DRAFT_LIMITS.jsonChars) {
      api.setStatus(ui.jsonError);
      api.rerender();
      return;
    }
    try {
      const text = await file.text();
      api.getPendingContacts().clear();
      api.setDraft(parseUserCvJson(text));
      api.setStatus(ui.importOk);
      api.rerender();
    } catch {
      api.setStatus(ui.jsonError);
      api.rerender();
    } finally {
      fileInput.value = '';
    }
  });

  const form = root.querySelector<HTMLFormElement>('[data-form]');
  form?.addEventListener('input', () => {
    syncFromDom(root, api);
    const preview = root.querySelector<HTMLElement>('[data-preview]');
    if (preview) preview.innerHTML = renderUserCvHtml(api.getDraft(), ui.current, api.getPhoto());
  });

  const jsonArea = root.querySelector<HTMLTextAreaElement>('[data-json]');
  jsonArea?.addEventListener('input', () => {
    try {
      api.setDraft(parseUserCvJson(jsonArea.value));
      api.setStatus('');
      const preview = root.querySelector<HTMLElement>('[data-preview]');
      if (preview) preview.innerHTML = renderUserCvHtml(api.getDraft(), ui.current, api.getPhoto());
      persist(api.getDraft());
    } catch {
      api.setStatus(ui.jsonError);
    }
  });

  root.querySelector('[data-add-job]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = structuredClone(api.getDraft());
    draft.jobs.push(blankJob(locale));
    api.setDraft(draft);
    api.rerender();
  });

  root.querySelector('[data-add-edu]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = structuredClone(api.getDraft());
    draft.education.push(blankEdu(locale));
    api.setDraft(draft);
    api.rerender();
  });

  root.querySelectorAll<HTMLButtonElement>('[data-add-contact]').forEach((btn) => {
    btn.addEventListener('click', () => {
      syncFromDom(root, api);
      const kind = btn.dataset.addContact as CvContactKind | undefined;
      if (!kind || !CONTACT_KINDS.includes(kind)) return;
      api.getPendingContacts().add(kind);
      api.rerender();
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-remove-contact]').forEach((btn) => {
    btn.addEventListener('click', () => {
      syncFromDom(root, api);
      const kind = btn.dataset.removeContact as CvContactKind | undefined;
      if (!kind || !CONTACT_KINDS.includes(kind)) return;
      const draft = structuredClone(api.getDraft());
      clearContact(draft, kind);
      api.getPendingContacts().delete(kind);
      api.setDraft(draft);
      api.rerender();
    });
  });

  root.querySelector('[data-add-sim]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = structuredClone(api.getDraft());
    draft.simulations.push('');
    api.setDraft(draft);
    api.rerender();
  });

  root.querySelector('[data-add-sim-section]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = structuredClone(api.getDraft());
    if (draft.simulations.length === 0) draft.simulations.push('');
    api.setDraft(draft);
    api.rerender();
  });

  root.querySelector('[data-remove-sim-section]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = structuredClone(api.getDraft());
    draft.simulations = [];
    api.setDraft(draft);
    api.rerender();
  });

  root.querySelectorAll<HTMLButtonElement>('[data-remove-job]').forEach((btn) => {
    btn.addEventListener('click', () => {
      syncFromDom(root, api);
      const index = Number(btn.dataset.removeJob);
      const draft = structuredClone(api.getDraft());
      draft.jobs.splice(index, 1);
      if (draft.jobs.length === 0) draft.jobs.push(blankJob(locale));
      api.setDraft(draft);
      api.rerender();
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-remove-edu]').forEach((btn) => {
    btn.addEventListener('click', () => {
      syncFromDom(root, api);
      const index = Number(btn.dataset.removeEdu);
      const draft = structuredClone(api.getDraft());
      draft.education.splice(index, 1);
      if (draft.education.length === 0) draft.education.push(blankEdu(locale));
      api.setDraft(draft);
      api.rerender();
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-remove-sim]').forEach((btn) => {
    btn.addEventListener('click', () => {
      syncFromDom(root, api);
      const index = Number(btn.dataset.removeSim);
      const draft = structuredClone(api.getDraft());
      draft.simulations.splice(index, 1);
      api.setDraft(draft);
      api.rerender();
    });
  });
}

function blankJob(locale: Locale): UserCvJob {
  return {
    company: '',
    title: '',
    startDate: '2024-01-01',
    endDate: '',
    description: locale === 'es' ? '**React**, **TypeScript**…' : '**React**, **TypeScript**…',
  };
}

function blankEdu(locale: Locale): UserCvEdu {
  return {
    title: '',
    badge: locale === 'es' ? 'Certificado' : 'Certificate',
    startDate: '2022-01-01',
    endDate: '2023-01-01',
    description: '',
  };
}

function syncFromDom(root: HTMLElement, api: BuilderApi): void {
  if (api.getMode() === 'json') {
    const area = root.querySelector<HTMLTextAreaElement>('[data-json]');
    if (!area) return;
    try {
      api.setDraft(parseUserCvJson(area.value));
    } catch {
      /* keep last good draft */
    }
    return;
  }

  const form = root.querySelector<HTMLFormElement>('[data-form]');
  if (!form) return;
  const data = new FormData(form);
  const draft = structuredClone(api.getDraft());

  const str = (key: string) => String(data.get(key) ?? '');

  draft.fullName = str('fullName');
  draft.label = str('label');
  draft.location = str('location');
  draft.summary = str('summary');
  draft.hardSkills = str('hardSkills');
  draft.softSkills = str('softSkills');

  if (root.querySelector('[data-contact="linkedin"]')) {
    const linkedin = resolveContactInput('linkedin', str('linkedin'));
    draft.linkedinUrl = linkedin.url;
    draft.linkedinLabel = linkedin.label;
  } else {
    draft.linkedinUrl = '';
    draft.linkedinLabel = '';
  }

  if (root.querySelector('[data-contact="portfolio"]')) {
    const portfolio = resolveContactInput('portfolio', str('portfolio'));
    draft.portfolioUrl = portfolio.url;
    draft.portfolioLabel = portfolio.label;
  } else {
    draft.portfolioUrl = '';
    draft.portfolioLabel = '';
  }

  if (root.querySelector('[data-contact="github"]')) {
    const github = resolveContactInput('github', str('github'));
    draft.githubUrl = github.url;
    draft.githubLabel = github.label;
  } else {
    draft.githubUrl = '';
    draft.githubLabel = '';
  }

  if (root.querySelector('[data-contact="email"]')) {
    draft.email = str('email');
  } else {
    draft.email = '';
  }

  const labelOr = (key: keyof UserCvDraft['labels'], fallback: string) => {
    const next = str(`labels.${key}`).trim();
    return next || fallback;
  };
  draft.labels = {
    work: labelOr('work', draft.labels.work),
    education: labelOr('education', draft.labels.education),
    simulations: labelOr('simulations', draft.labels.simulations),
    hardSkills: labelOr('hardSkills', draft.labels.hardSkills),
    softSkills: labelOr('softSkills', draft.labels.softSkills),
  };

  draft.jobs = draft.jobs.map((_, index) => ({
    company: str(`jobs.${index}.company`),
    title: str(`jobs.${index}.title`),
    startDate: str(`jobs.${index}.startDate`),
    endDate: str(`jobs.${index}.endDate`),
    description: str(`jobs.${index}.description`),
  }));

  draft.education = draft.education.map((_, index) => ({
    title: str(`education.${index}.title`),
    badge: str(`education.${index}.badge`),
    startDate: str(`education.${index}.startDate`),
    endDate: str(`education.${index}.endDate`),
    description: str(`education.${index}.description`),
  }));

  const simSectionPresent = Boolean(root.querySelector('[data-sim-section]'));
  draft.simulations = simSectionPresent
    ? draft.simulations.map((_, index) => str(`simulations.${index}`))
    : [];

  const safe = coerceUserCvDraft(draft);
  api.setDraft(safe);
  persist(safe);
}

export function mountCvBuilderPrint(root: HTMLElement, locale: Locale): void {
  const ui = getCvBuilderUi(locale);
  const editorPath = locale === 'en' ? '/en/crear-cv/' : '/crear-cv/';
  let draft: UserCvDraft | null = null;
  try {
    const raw = sessionStorage.getItem(CV_BUILDER_PREVIEW_KEY) ?? localStorage.getItem(CV_BUILDER_STORAGE_KEY);
    if (raw) draft = parseUserCvJson(raw);
  } catch {
    draft = null;
  }

  if (!draft) {
    root.innerHTML = `<p class="empty" role="alert">${ui.noDraft}</p><p><a href="${editorPath}" title="${ui.backEditor}">${ui.backEditor}</a></p>`;
    return;
  }

  const pageTitle = document.title;
  const printFileTitle = `${draftFileStem(draft)}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}`;

  root.innerHTML = `
    <header class="print-bar no-print" aria-label="${ui.printToolbar}">
      <a href="${editorPath}" title="${ui.backEditor}">${ui.backEditor}</a>
      <button type="button" id="cv-print-btn" title="${ui.printPdf}" aria-describedby="cv-builder-print-hint">${ui.printPdf}</button>
      <p id="cv-builder-print-hint">${ui.printHint}</p>
    </header>
    <div class="print-paper">${renderUserCvHtml(draft, ui.current, readStoredPhoto())}</div>
  `;

  const trigger = () => {
    document.title = printFileTitle;
    const restore = () => {
      document.title = pageTitle;
    };
    window.addEventListener('afterprint', restore, { once: true });
    window.print();
    window.setTimeout(restore, 1000);
  };
  root.querySelector('#cv-print-btn')?.addEventListener('click', trigger);
  if (new URLSearchParams(location.search).has('print')) {
    window.setTimeout(trigger, 280);
  }
}
