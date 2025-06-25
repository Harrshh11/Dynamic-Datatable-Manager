export const isValidAge = (value: string) => {
  const num = parseInt(value);
  return !isNaN(num) && num > 0 && num < 120;
};
