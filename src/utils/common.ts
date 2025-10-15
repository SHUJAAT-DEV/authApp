export const isEmptyObject = (data: {[key: string]: any}) => {
  for (const key in data) {
    if (data?.[key]) return false;
  }
  return true;
};
