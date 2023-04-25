export function isoToDate(date: string) {
  try {
    return new Date(date).toISOString().substring(0, 10);
  } catch {
    return "";
  }
}
