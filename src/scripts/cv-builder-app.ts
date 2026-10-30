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

  return `
  <div class="builder">
    <header class="builder-top">
      <div>
        <a href="${home}">${ui.back}</a>
        <a class="secondary" href="${myCvs}">${ui.myCvs}</a>
      </div>
      <h1>${ui.title}</h1>
      <p>${ui.subtitle}</p>
    </header>

    <div class="builder-actions">
      <button type="button" data-action="example">${ui.loadExample}</button>
      <button type="button" data-action="reset" class="ghost">${ui.reset}</button>
      <button type="button" data-action="download">${ui.downloadJson}</button>
      <label class="file-btn">${ui.importJson}<input type="file" accept="application/json,.json" data-import hidden /></label>
      <a class="primary" data-action="print" href="${printPath}">${ui.printPdf}</a>
    </div>
    <p class="builder-hint">${ui.saveHint}${status ? ` · <strong>${status}</strong>` : ''}</p>

    <div class="builder-grid">
      <section class="builder-editor">
        <div class="tabs">
          <button type="button" data-mode="form" class="${mode === 'form' ? 'active' : ''}">${ui.tabForm}</button>
          <button type="button" data-mode="json" class="${mode === 'json' ? 'active' : ''}">${ui.tabJson}</button>
        </div>
        ${mode === 'json' ? renderJsonEditor(draft) : renderForm(ui, draft)}
      </section>
      <section class="builder-preview-wrap">
        <h2>${ui.previewTitle}</h2>
        <div class="builder-preview-scroll">
          <div class="builder-preview-paper" data-preview></div>
        </div>
      </section>
    </div>
  </div>`;
}

function renderJsonEditor(draft: UserCvDraft): string {
  return `<textarea data-json rows="28" spellcheck="false">${escapeHtml(JSON.stringify(draft, null, 2))}</textarea>`;
}

function renderForm(ui: CvBuilderUi, draft: UserCvDraft): string {
  const jobs = draft.jobs
    .map(
      (job, index) => `
    <fieldset class="card" data-job="${index}">
      <legend>${ui.experience} #${index + 1}</legend>
      <label>${ui.company}<input name="jobs.${index}.company" value="${escapeHtml(job.company)}" /></label>
      <label>${ui.jobTitle}<input name="jobs.${index}.title" value="${escapeHtml(job.title)}" /></label>
      <label>${ui.startDate}<input name="jobs.${index}.startDate" value="${escapeHtml(job.startDate)}" /></label>
      <label>${ui.endDate}<input name="jobs.${index}.endDate" value="${escapeHtml(job.endDate)}" /></label>
      <label>${ui.description}<textarea name="jobs.${index}.description" rows="3">${escapeHtml(job.description)}</textarea></label>
      <button type="button" class="ghost danger" data-remove-job="${index}">${ui.remove}</button>
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
      <label>${ui.startDate}<input name="education.${index}.startDate" value="${escapeHtml(item.startDate)}" /></label>
      <label>${ui.endDate}<input name="education.${index}.endDate" value="${escapeHtml(item.endDate)}" /></label>
      <label>${ui.description}<textarea name="education.${index}.description" rows="2">${escapeHtml(item.description)}</textarea></label>
      <button type="button" class="ghost danger" data-remove-edu="${index}">${ui.remove}</button>
    </fieldset>`,
    )
    .join('');

  const sims = draft.simulations
    .map(
      (line, index) => `
      <div class="sim-row">
        <input name="simulations.${index}" value="${escapeHtml(line)}" />
        <button type="button" class="ghost danger" data-remove-sim="${index}">${ui.remove}</button>
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
      <button type="button" data-add-job>${ui.addJob}</button>
    </div>

    <div class="stack">
      ${education}
      <button type="button" data-add-edu>${ui.addEdu}</button>
    </div>

    <fieldset class="card">
      <legend>${ui.simulations}</legend>
      ${sims}
      <button type="button" data-add-sim>${ui.addSim}</button>
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

  root.querySelector('[data-action="print"]')?.addEventListener('click', () => {
    syncFromDom(root, api);
    sessionStorage.setItem(CV_BUILDER_PREVIEW_KEY, JSON.stringify(api.getDraft()));
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
    root.innerHTML = `<p class="empty">${ui.noDraft}</p><p><a href="${editorPath}">${ui.backEditor}</a></p>`;
    return;
  }

  const printTitle = `${draftFileStem(draft)}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}`;
  document.title = printTitle;

  root.innerHTML = `
    <header class="print-bar no-print">
      <a href="${editorPath}">${ui.backEditor}</a>
      <button type="button" id="cv-print-btn">${ui.printPdf}</button>
      <p>${ui.printHint}</p>
    </header>
    <div class="print-paper">${renderUserCvHtml(draft, ui.current)}</div>
  `;

  const trigger = () => {
    document.title = printTitle;
    window.print();
  };
  root.querySelector('#cv-print-btn')?.addEventListener('click', trigger);
  if (new URLSearchParams(location.search).has('print')) {
    window.setTimeout(trigger, 280);
  }
}
