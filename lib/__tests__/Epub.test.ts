import {Directory, EpubOptions, Extension, IChapter} from "../../types";
import Epub from "../index";

describe('Tests around main class', () => {
  describe('Tests around property initizilation', () => {

    let options: EpubOptions;
    let ePub: Epub;

    beforeAll(() => {
      options = {
        title: 'Test eBook',
        author: 'Readdit',
        chapters: [
          { title: 'New Chapter 1', data: '' },
          { title: 'New Chapter 2', author: 'Jimmy', data: '' }
        ]
      };

      ePub = new Epub(options);

    });


    it('creates computed href property for chapter', () => {
      const index = 1;
      const chapter2 = ePub.chapters[index];

      expect(chapter2).toBeTruthy();

      const href = chapter2.href;

      expect(href).toEqual(`${Directory.CHAPTERS}/${index}-NewChapter2.${Extension.XHTML}`);
    });

  });
});