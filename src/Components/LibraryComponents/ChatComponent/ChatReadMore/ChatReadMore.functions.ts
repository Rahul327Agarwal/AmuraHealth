export const urlRegex =
  /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

export const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gim;

export const mobileRegex = /\+\d{2,}/gim;

export const createStringWithLinks = (string) => {
  return string
    ?.replace(urlRegex, (match) => {
      let pattern = /^(?!https?:\/\/).*$/;
      return `<a href=${pattern.test(match) ? '//' + match : match} target="_blank">${match}</a>`;
    })
    ?.replace(emailRegex, (match) => {
      let pattern = /^(?!https?:\/\/).*$/;
      return `<a href=${pattern.test(match) ? 'mailto:' + match : match} target="_blank">${match}</a>`;
    })
    ?.replace(mobileRegex, (match) => {
      let pattern = /^(?!https?:\/\/).*$/;
      return `<a href=${pattern.test(match) ? 'tel:' + match : match} target="_blank">${match}</a>`;
    });
};

export function findMatchingRegexEndIndex(inputString, index) {
  const regexObj =
    /((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])) | ([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}) | \+\d{2,}/gim;
  let match;

  while ((match = regexObj.exec(inputString)) !== null) {
    if (match.index <= index && index < match.index + match[0].length) {
      return match.index + match[0].length - 1;
    }
  }

  return -1; // Not found
}
