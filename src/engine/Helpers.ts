export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const lowerFirstLetter = (string: string): string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
