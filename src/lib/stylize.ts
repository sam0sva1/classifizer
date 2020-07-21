export function stylize(styles: Record<string, string>, classes: string): string {
  if (typeof classes !== 'string') {
    return '';
  }

  if (classes === '') {
    return '';
  }

  const splited = classes.split(' ');
  const styled = splited.map((oneClass: string) => styles[oneClass] || oneClass);
  const joined = styled.join(' ');

  return joined;
}
