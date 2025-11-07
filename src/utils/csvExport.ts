export function downloadCSV(content: string, filename: string): void {
  const encoder = new TextEncoder();
  const uint8array = encoder.encode(content);
  const blob = new Blob([uint8array], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
