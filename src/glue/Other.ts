export function isoToDate (date: string): string {
  try {
    return new Date(date).toISOString().substring(0, 10);
  } catch {
    return undefined;
  }
}
