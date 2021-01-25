import {ChapterOption, Directory, EpubOptions, Extension, IChapter, MediaType} from "../types";
import {generateChapterIdFromName} from "./utilities";

class Epub {

  title: string;
  author: string;
  chapters: IChapter[];

  constructor(options: EpubOptions) {
    this.title = options.title;
    this.author = options.author;

    this.chapters = options.chapters.map((chapter: ChapterOption, index) => {
      const { title, author } = chapter;
      const id = generateChapterIdFromName(index, title);
      return {
        id,
        title,
        author,
        dir: Directory.CHAPTERS,
        extension: Extension.XHTML,
        mediaType: MediaType.APPLICATION_XHTML_XML,
        get href() {
          return `${this.dir}/${this.id}.${this.extension}`
        }
      }
    })
  }
}

export default Epub;