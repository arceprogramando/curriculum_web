import {
  CV_BUILDER_PREVIEW_KEY,
  CV_BUILDER_STORAGE_KEY,
  downloadJsonFile,
  draftFileStem,
  emptyUserCv,
  escapeHtml,
  exampleUserCv,
  parseUserCvJson,
  renderUserCvHtml,
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
  localStorage.setItem(CV_BUILDER_STORAGE_KEY, JSON.stringify(draft));
}

export function mountCvBuilder(root: HTMLElement, locale: Locale): void {
  const ui = getCvBuilderUi(locale);
  let draft = readStored(locale);
  let mode: Mode = 'form';
  let status = '';

  const render = () => {
    persist(draft);
    root.innerHTML = buildChrome(ui, locale, mode, draft, status);
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
      rerender: render,
    });
    const preview = root.querySelector<HTMLElement>('[data-preview]');
    if (preview) {
      preview.innerHTML = renderUserCvHtml(draft, ui.current);
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
          ${mode === 'json' ? renderJsonEditor(ui, draft) : renderForm(ui, draft)}
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

function renderForm(ui: CvBuilderUi, draft: UserCvDraft): string {
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
      <label>${ui.fullName}<input name="fullName" value="${escapeHtml(draft.fullName)}" /></label>
      <label>${ui.label}<input name="label" value="${escapeHtml(draft.label)}" /></label>
      <label>${ui.location}<input name="location" value="${escapeHtml(draft.location)}" /></label>
      <label>${ui.summary}<textarea name="summary" rows="4">${escapeHtml(draft.summary)}</textarea></label>
    </fieldset>

    <fieldset class="card">
      <legend>${ui.contacts}</legend>
      <label>LinkedIn URL<input name="linkedinUrl" value="${escapeHtml(draft.linkedinUrl)}" /></label>
      <label>LinkedIn label<input name="linkedinLabel" value="${escapeHtml(draft.linkedinLabel)}" /></label>
      <label>Portfolio URL<input name="portfolioUrl" value="${escapeHtml(draft.portfolioUrl)}" /></label>
      <label>Portfolio label<input name="portfolioLabel" value="${escapeHtml(draft.portfolioLabel)}" /></label>
      <label>GitHub URL<input name="githubUrl" value="${escapeHtml(draft.githubUrl)}" /></label>
      <label>GitHub label<input name="githubLabel" value="${escapeHtml(draft.githubLabel)}" /></label>
      <label>Email<input name="email" value="${escapeHtml(draft.email)}" /></label>
    </fieldset>

    <div class="stack">
      ${jobs}
      <button type="button" class="btn btn-secondary" data-add-job>${ui.addJob}</button>
    </div>

    <div class="stack">
      ${education}
      <button type="button" class="btn btn-secondary" data-add-edu>${ui.addEdu}</button>
    </div>

    <fieldset class="card">
      <legend>${ui.simulations}</legend>
      ${sims}
      <button type="button" class="btn btn-secondary" data-add-sim>${ui.addSim}</button>
    </fieldset>

    <fieldset class="card">
      <legend>${ui.skills}</legend>
      <label>${ui.hardSkills}<textarea name="hardSkills" rows="2">${escapeHtml(draft.hardSkills)}</textarea></label>
      <label>${ui.softSkills}<textarea name="softSkills" rows="2">${escapeHtml(draft.softSkills)}</textarea></label>
    </fieldset>
  </form>`;
}

interface BuilderApi {
  getDraft: () => UserCvDraft;
  setDraft: (draft: UserCvDraft) => void;
  getMode: () => Mode;
  setMode: (mode: Mode) => void;
  setStatus: (status: string) => void;
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
    api.setDraft(exampleUserCv(locale));
    api.setStatus(ui.importOk);
    api.rerender();
  });

  root.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
    api.setDraft(emptyUserCv(locale));
    api.setStatus('');
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
      sessionStorage.setItem(CV_BUILDER_PREVIEW_KEY, JSON.stringify(api.getDraft()));
    });
  });

  const fileInput = root.querySelector<HTMLInputElement>('[data-import]');
  fileInput?.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      api.setDraft(parseUserCvJson(text));
      api.setStatus(ui.importOk);
      api.rerender();
    } catch {
      api.setStatus(ui.jsonError);
      api.rerender();
    }
  });

  const form = root.querySelector<HTMLFormElement>('[data-form]');
  form?.addEventListener('input', () => {
    syncFromDom(root, api);
    const preview = root.querySelector<HTMLElement>('[data-preview]');
    if (preview) preview.innerHTML = renderUserCvHtml(api.getDraft(), ui.current);
  });

  const jsonArea = root.querySelector<HTMLTextAreaElement>('[data-json]');
  jsonArea?.addEventListener('input', () => {
    try {
      api.setDraft(parseUserCvJson(jsonArea.value));
      api.setStatus('');
      const preview = root.querySelector<HTMLElement>('[data-preview]');
      if (preview) preview.innerHTML = renderUserCvHtml(api.getDraft(), ui.current);
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

  root.querySelector('[data-add-sim]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    const draft = structuredClone(api.getDraft());
    draft.simulations.push('');
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
      if (draft.simulations.length === 0) draft.simulations.push('');
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
  draft.linkedinUrl = str('linkedinUrl');
  draft.linkedinLabel = str('linkedinLabel');
  draft.portfolioUrl = str('portfolioUrl');
  draft.portfolioLabel = str('portfolioLabel');
  draft.githubUrl = str('githubUrl');
  draft.githubLabel = str('githubLabel');
  draft.email = str('email');
  draft.hardSkills = str('hardSkills');
  draft.softSkills = str('softSkills');

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

  draft.simulations = draft.simulations.map((_, index) => str(`simulations.${index}`));

  api.setDraft(draft);
  persist(draft);
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
    <div class="print-paper">${renderUserCvHtml(draft, ui.current)}</div>
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
