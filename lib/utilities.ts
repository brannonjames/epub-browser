export const generateChapterIdFromName = (index: Number, name: string) => `${index}-${name.replace(/\s/g, '')}`;

export const parseHTMLString = (html: string, parser: DOMParser) : Document => {
  const document = parser.parseFromString(html, 'text/html');
  const [parseError] = document.getElementsByTagName('parsererror');
  if (parseError) {
    throw Error('Error when trying to parse HTML');
  }
  return document;
};
