export const generateChapterIdFromName = (index: Number, name: string) => `${index}-${name.replace(/\s/g, '')}`;
