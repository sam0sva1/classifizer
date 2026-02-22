export function stylize(
  styles: Record<string, string>,
  classes: string
): string {
  if (typeof classes !== 'string') {
    return '';
  }

  if (classes === '') {
    return '';
  }

  const parts = classes.split(' ');
  const styled = parts.map(
    (oneClass: string) => styles[oneClass] || oneClass
  );
  const joined = styled.join(' ');

  return joined;
}
