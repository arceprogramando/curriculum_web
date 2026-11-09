# Demo Playwright — crear CV

Graba un recorrido de ejemplo de `/crear-cv/`: rellenar datos, zoom a la preview, abrir la vista de impresión y exportar un PDF.

## Requisitos

```bash
npm install
npx playwright install chromium
npm run build
```

## Correr

```bash
# headless + video en test-results/
npm run demo:crear-cv

# con ventana visible
npm run demo:crear-cv:headed
```

## Salidas

| Archivo | Dónde |
|---------|--------|
| Video (webm) | `test-results/**/video.webm` |
| PDF de ejemplo | `demo-output/crear-cv-demo.pdf` |

El flujo real de la web usa “Imprimir → Guardar como PDF”. En la demo, el PDF se genera con la API de Chromium para no depender del diálogo del sistema operativo.
