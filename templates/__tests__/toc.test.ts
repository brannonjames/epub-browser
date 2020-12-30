import getTocTemplate from '../toc';
import {IChapter} from "../../types";

describe('Table of Contents parsing tests', () => {

  const content: IChapter[] = [
    {
      title: 'My new eBook',
      author: 'Jimmy',
      href: 'new-book.xhtml'
    },
    {
      title: 'My new eBook 2',
      author: 'Sam',
      href: 'new-book2.xhtml'
    }
  ];

  let result: string;
  let doc: Document;


  beforeAll(() => {
    result = getTocTemplate(content);
    const parser = new DOMParser();
    doc = parser.parseFromString(result, 'text/html');
  });

  it('returns a string without failing', () => {
    expect(result).toBeTruthy();
  });

  it('generates the correct number of list items', () => {
    const chapterListItems = doc.querySelectorAll('.table-of-content');
    expect(chapterListItems.length).toEqual(3);
  });

});

