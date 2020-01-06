export default (value: string | number): number =>
  typeof value === 'string' ? parseInt(value) : value;
