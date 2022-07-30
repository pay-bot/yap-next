export function shortSentence(sentence, len = 10) {
  if (sentence != null) {
    const splitString = sentence.split(' ');
    splitString.length = len;
    const shortContent = splitString.join(' ');
    return shortContent;
  }
  return sentence;
}

export function shortChar(string, len = 10) {
  if (string != null) {
    const splitString = string.split('');
    splitString.length = len;
    const shortContent = splitString.join('');
    return shortContent;
  }
  return string;
}

export function shortText(sentence, len) {
  if (sentence != null) {
    const shortContent = sentence.length > len ? `${sentence.slice(0, len)}... ` : sentence;
    return shortContent;
  }
  return sentence;
}
