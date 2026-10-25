export function genStyle(
  ...classes: Array<string | false | undefined | null>
): string {
  return classes.filter(Boolean).join(" ");
}
