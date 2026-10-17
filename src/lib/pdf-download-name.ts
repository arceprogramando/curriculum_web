/** Nombre único por descarga: archivo-2026_10_17-19-18-05.pdf */
export function datedPdfName(path: string, now = new Date()): string {
  const base = path.split('/').pop() ?? 'CV.pdf';
  const dot = base.lastIndexOf('.');
  const stem = dot > 0 ? base.slice(0, dot) : base;
  const ext = dot > 0 ? base.slice(dot) : '.pdf';
  const pad = (value: number) => String(value).padStart(2, '0');
  const stamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
  ].join('_');
  const time = [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join('-');

  return `${stem}-${stamp}-${time}${ext}`;
}

/** Dispara la descarga con nombre fechado. */
export function downloadDatedPdf(path: string): void {
  const link = document.createElement('a');
  link.href = path;
  link.download = datedPdfName(path);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
