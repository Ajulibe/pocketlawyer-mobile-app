export const getFirstLetterFromName = (name: string) => {
  return name?.charAt(0).toUpperCase();
};

//--> capitalize the first letter of the name
export const capitalizeFirstLetter = (name: string) => {
  const lower = name?.toLowerCase();
  return getFirstLetterFromName(name) + lower?.slice(1);
};
