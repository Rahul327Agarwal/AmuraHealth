export const isValidSize = (actualSize, expectedSize) => {
  const ONE_BYTE_TO_KB = 1000;
  if (Number(actualSize / ONE_BYTE_TO_KB) <= expectedSize) {
    return true;
  }
  return false;
};
export const isValidType = (actualType, acceptedFiles) => acceptedFiles?.includes(actualType);
