export function formatReadingDiaryDateToApi(date: string): string {
  const [ano, mes, dia] = date.split('-');

  return `${dia}/${mes}/${ano} 00:00:00`;
}
