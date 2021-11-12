import getTocTemplate from '../toc.ncx';
import {Directory, Extension, IChapter, MediaType} from "../../types";

describe('Table of Contents parsing tests', () => {

  const content: IChapter[] = [
    {
      id: 'new-book1',
      title: 'New Book 1',
      dir: Directory.CHAPTERS,
      extension: Extension.XHTML,
      mediaType: MediaType.APPLICATION_XHTML_XML,
      html: new HTMLDocument(),
      htmlString: '',
      get href() {
        return `${this.dir}/${this.id}.${this.extension}`
      }
    },
    {
      id: 'new-book2',
      title: 'New Book 2',
      dir: Directory.CHAPTERS,
      extension: Extension.XHTML,
      mediaType: MediaType.APPLICATION_XHTML_XML,
      html: new HTMLDocument(),
      htmlString: '',
      get href() {
        return `${this.dir}/${this.id}.${this.extension}`
      }
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

