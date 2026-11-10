import { expect, test, type Page } from '@playwright/test';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'demo-output');
const PORTRAIT = join(ROOT, 'e2e/fixtures/demo-portrait.png');

async function pause(page: Page, ms = 550): Promise<void> {
  await page.waitForTimeout(ms);
}

/** Cursor visible en el video (Playwright no graba el mouse del SO). */
async function installDemoCursor(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const draw = () => {
      if (document.getElementById('demo-cursor')) return;
      const el = document.createElement('div');
      el.id = 'demo-cursor';
      el.setAttribute('aria-hidden', 'true');
      Object.assign(el.style, {
        position: 'fixed',
        width: '22px',
        height: '22px',
        marginLeft: '-4px',
        marginTop: '-4px',
        borderRadius: '50%',
        border: '2px solid #111',
        background: 'rgb(11 87 208 / 0.35)',
        boxShadow: '0 0 0 3px rgb(255 255 255 / 0.85), 0 2px 10px rgb(0 0 0 / 0.35)',
        pointerEvents: 'none',
        zIndex: '2147483647',
        left: '0px',
        top: '0px',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.08s ease-out',
      });
      document.documentElement.appendChild(el);
      window.addEventListener(
        'mousemove',
        (event) => {
          el.style.left = `${event.clientX}px`;
          el.style.top = `${event.clientY}px`;
        },
        { passive: true },
      );
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', draw, { once: true });
    } else {
      draw();
    }
  });
}

async function ensureDemoCursor(page: Page): Promise<void> {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const el = document.createElement('div');
    el.id = 'demo-cursor';
    el.setAttribute('aria-hidden', 'true');
    Object.assign(el.style, {
      position: 'fixed',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      border: '2px solid #111',
      background: 'rgb(11 87 208 / 0.35)',
      boxShadow: '0 0 0 3px rgb(255 255 255 / 0.85), 0 2px 10px rgb(0 0 0 / 0.35)',
      pointerEvents: 'none',
      zIndex: '2147483647',
      left: '40px',
      top: '40px',
      transform: 'translate(-50%, -50%)',
    });
    document.documentElement.appendChild(el);
  });
}

async function clickWithVisibleMouse(
  page: Page,
  locator: ReturnType<Page['locator']>,
  steps = 48,
): Promise<void> {
  await ensureDemoCursor(page);
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error('No bounding box for click target');
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y, { steps });
  await pause(page, 450);
  await page.mouse.down();
  await page.evaluate(() => {
    const el = document.getElementById('demo-cursor');
    if (el) el.style.transform = 'translate(-50%, -50%) scale(0.82)';
  });
  await pause(page, 120);
  await page.mouse.up();
  await page.evaluate(() => {
    const el = document.getElementById('demo-cursor');
    if (el) el.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

async function typeSlow(
  page: Page,
  locator: ReturnType<Page['locator']>,
  value: string,
  delay = 22,
): Promise<void> {
  await locator.click();
  await locator.fill('');
  await locator.pressSequentially(value, { delay });
}

async function zoomPreview(page: Page): Promise<void> {
  const preview = page.locator('[data-preview] .cv-doc');
  await preview.scrollIntoViewIfNeeded();
  await pause(page, 400);
  await page.evaluate(() => {
    const paper = document.querySelector<HTMLElement>('.builder-preview-paper');
    if (!paper) return;
    paper.style.transition = 'transform 0.6s ease';
    paper.style.transformOrigin = 'top center';
    paper.style.transform = 'scale(1.14)';
  });
  await pause(page, 1600);
  await page.evaluate(() => {
    const paper = document.querySelector<HTMLElement>('.builder-preview-paper');
    if (!paper) return;
    paper.style.transform = 'scale(1)';
  });
  await pause(page, 400);
}

test.describe('Demo crear-cv', () => {
  test('rellena Nora Vidal a mano, foto, zoom y PDF', async ({ page }) => {
    test.setTimeout(240_000);
    mkdirSync(OUT, { recursive: true });
    await installDemoCursor(page);

    await page.goto('/crear-cv/');
    await expect(page.getByRole('heading', { name: 'Armá tu CV online gratis' })).toBeVisible();
    await ensureDemoCursor(page);
    await page.getByRole('button', { name: 'Empezar vacío' }).click();
    await pause(page, 700);

    // Foto primero (queda visible mientras se rellena)
    await page.locator('[data-photo-input]').setInputFiles(PORTRAIT);
    await expect(page.locator('.photo-thumb:not(.photo-thumb--empty)')).toBeVisible();
    await pause(page, 800);

    // Identidad
    await typeSlow(page, page.getByLabel('Nombre completo'), 'Nora Vidal');
    await typeSlow(page, page.getByLabel('Título / rol'), 'Diseñadora UX/UI Junior');
    await typeSlow(page, page.getByLabel('Ubicación'), 'Córdoba - Argentina');
    await typeSlow(
      page,
      page.getByLabel('Resumen'),
      'Diseñadora UX/UI junior enfocada en flujos claros, interfaces accesibles y handoff liviano a front. Cómoda con Figma, entrevistas y prototipos HTML/CSS.',
      16,
    );
    await pause(page);

    // Contactos
    await page.getByRole('button', { name: 'Email' }).click();
    await typeSlow(page, page.getByLabel('Email'), 'nora.vidal.demo@example.com');
    await page.getByRole('button', { name: 'LinkedIn' }).click();
    await typeSlow(page, page.getByLabel('LinkedIn'), 'nora-vidal-demo');
    await page.getByRole('button', { name: 'Portfolio' }).click();
    await typeSlow(page, page.getByLabel('Portfolio'), 'https://noravidal.demo');
    await page.getByRole('button', { name: 'GitHub' }).click();
    await typeSlow(page, page.getByLabel('GitHub'), 'nora-vidal-demo');
    await pause(page);

    // Experiencia 1 (slot inicial)
    await typeSlow(page, page.locator('input[name="jobs.0.company"]'), 'Pulseboard Labs');
    await typeSlow(page, page.locator('input[name="jobs.0.title"]'), 'Pasante UX/UI');
    await page.locator('input[name="jobs.0.startDate"]').fill('2025-08-01');
    await page.locator('input[name="jobs.0.endDate"]').fill('');
    await typeSlow(
      page,
      page.locator('textarea[name="jobs.0.description"]'),
      'Rediseño del onboarding de un SaaS de analítica: flujos, pantallas en **Figma** y pruebas con 6 personas.',
      16,
    );

    // Experiencia 2
    await page.getByRole('button', { name: 'Agregar trabajo' }).click();
    await typeSlow(page, page.locator('input[name="jobs.1.company"]'), 'Taller Nube');
    await typeSlow(page, page.locator('input[name="jobs.1.title"]'), 'Diseñadora UI freelance');
    await page.locator('input[name="jobs.1.startDate"]').fill('2024-02-01');
    await page.locator('input[name="jobs.1.endDate"]').fill('2025-07-01');
    await typeSlow(
      page,
      page.locator('textarea[name="jobs.1.description"]'),
      'Landings y librerías de componentes para PyMEs. Prototipos clickeables y guía **HTML/CSS** para desarrollo.',
      16,
    );

    // Experiencia 3
    await page.getByRole('button', { name: 'Agregar trabajo' }).click();
    await typeSlow(page, page.locator('input[name="jobs.2.company"]'), 'Biblioteca del Parque');
    await typeSlow(page, page.locator('input[name="jobs.2.title"]'), 'Asistente de mostrador');
    await page.locator('input[name="jobs.2.startDate"]').fill('2022-04-01');
    await page.locator('input[name="jobs.2.endDate"]').fill('2024-01-01');
    await typeSlow(
      page,
      page.locator('textarea[name="jobs.2.description"]'),
      'Mostrador, catálogo e inscripciones a talleres. Explicaciones claras con públicos diversos.',
      16,
    );
    await pause(page);

    // Formación (varias)
    await typeSlow(page, page.locator('input[name="education.0.title"]'), 'Diseño Gráfico — UNC (FAUD)');
    await typeSlow(page, page.locator('input[name="education.0.badge"]'), 'En curso');
    await page.locator('input[name="education.0.startDate"]').fill('2022-03-01');
    await page.locator('input[name="education.0.endDate"]').fill('');
    await typeSlow(
      page,
      page.locator('textarea[name="education.0.description"]'),
      'Tercer año. Sistemas visuales, tipografía e interfaces digitales.',
      16,
    );

    await page.getByRole('button', { name: 'Agregar formación' }).click();
    await typeSlow(
      page,
      page.locator('input[name="education.1.title"]'),
      'UX Research Fundamentals — IDF',
    );
    await typeSlow(page, page.locator('input[name="education.1.badge"]'), 'Certificado');
    await page.locator('input[name="education.1.startDate"]').fill('2025-04-01');
    await page.locator('input[name="education.1.endDate"]').fill('2025-05-01');
    await typeSlow(
      page,
      page.locator('textarea[name="education.1.description"]'),
      'Entrevistas, affinity mapping y tests de usabilidad.',
      16,
    );

    await page.getByRole('button', { name: 'Agregar formación' }).click();
    await typeSlow(
      page,
      page.locator('input[name="education.2.title"]'),
      'Accessible Web Design — freeCodeCamp',
    );
    await typeSlow(page, page.locator('input[name="education.2.badge"]'), 'Certificado');
    await page.locator('input[name="education.2.startDate"]').fill('2024-09-01');
    await page.locator('input[name="education.2.endDate"]').fill('2024-11-01');
    await typeSlow(
      page,
      page.locator('textarea[name="education.2.description"]'),
      'WCAG, HTML semántico y patrones con teclado.',
      16,
    );
    await pause(page);

    // Proyectos / simulaciones (renombrar sección + líneas)
    await typeSlow(page, page.locator('input[name="labels.simulations"]'), 'Proyectos');
    await typeSlow(
      page,
      page.locator('input[name="simulations.0"]'),
      'Case study: app de viandas universitarias — research, 3 iteraciones y UI kit.',
      16,
    );
    await page.getByRole('button', { name: 'Agregar línea' }).click();
    await typeSlow(
      page,
      page.locator('input[name="simulations.1"]'),
      'Design system base en Figma: color, tipo y 12 componentes documentados.',
      16,
    );
    await pause(page);

    // Skills
    await page
      .locator('textarea[name="hardSkills"]')
      .fill('Figma, FigJam, Wireframes, Prototipos, HTML, CSS, Accesibilidad (WCAG), Design systems, Notion, Inglés B1');
    await page
      .locator('textarea[name="softSkills"]')
      .fill('Escucha, Narrativa visual, Colaboración con developers, Curiosidad, Timeboxing, Feedback');
    await pause(page, 900);

    await zoomPreview(page);

    // Mouse visible hacia “Imprimir PDF”
    const printLink = page.getByRole('link', { name: 'Imprimir PDF' }).first();
    await printLink.scrollIntoViewIfNeeded();
    await pause(page, 400);
    await Promise.all([
      page.waitForURL('**/crear-cv/vista/**'),
      clickWithVisibleMouse(page, printLink, 56),
    ]);
    await ensureDemoCursor(page);
    await expect(page.locator('#user-cv-name')).toHaveText('Nora Vidal');
    await expect(page.locator('.cv-photo')).toBeVisible();
    await pause(page, 1000);

    await page.evaluate(() => {
      const doc = document.querySelector<HTMLElement>('.cv-doc');
      if (!doc) return;
      doc.style.transition = 'transform 0.7s ease';
      doc.style.transformOrigin = 'top center';
      doc.style.transform = 'scale(1.08)';
    });
    await pause(page, 1500);

    await page.pdf({
      path: join(OUT, 'crear-cv-demo.pdf'),
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.4in', right: '0.5in', bottom: '0.4in', left: '0.5in' },
    });

    writeFileSync(
      join(OUT, 'README.txt'),
      [
        'Demo Playwright — crear-cv',
        'Persona ficticia: Nora Vidal (UX/UI). Sin datos de otras personas reales.',
        '',
        '- crear-cv-demo.pdf / crear-cv-demo.webm',
        '- Foto: e2e/fixtures/demo-portrait.png',
        '',
        'npm run build && npm run demo:crear-cv',
        '',
      ].join('\n'),
      'utf8',
    );

    await pause(page, 500);
  });

  test.afterEach(async ({}, testInfo) => {
    const video = testInfo.attachments.find((item) => item.name === 'video' && item.path);
    if (video?.path) {
      mkdirSync(OUT, { recursive: true });
      copyFileSync(video.path, join(OUT, 'crear-cv-demo.webm'));
    }
  });
});
