import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {ChapterOption, Directory, EpubOptions, Extension, IChapter, IFont, IImage, MediaType} from "../types";
import {generateChapterIdFromName, parseHTMLString} from "./utilities";
import getContentTemplate from '../templates/content.opf';
import getTOCNCXTemplate from '../templates/toc.ncx';
import getTOCTemplate from '../templates/toc.xhtml';

class Epub {

  private zip = new JSZip();
  private parser = new DOMParser();
  private serializer = new XMLSerializer();

  title: string;
  author: string;
  chapters: IChapter[];

  constructor(options: EpubOptions) {
    this.title = options.title;
    this.author = options.author;

    this.chapters = options.chapters.map(this.createChapter);

    this.generateFiles();
  }

  public download = async () => {
    const blob = await this.zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
    saveAs(blob);
  }

  private createChapter = (chapter: ChapterOption, index: number) => {
    const { title, author } = chapter;
    const id = generateChapterIdFromName(index, title);
    const serrializer = this.serializer;
    return {
      id,
      title,
      author,
      html: parseHTMLString(chapter.html, this.parser),
      dir: Directory.OEBPS,
      extension: Extension.XHTML,
      mediaType: MediaType.APPLICATION_XHTML_XML,
      get href() {
        return `${this.dir}/${this.id}.${this.extension}`
      },
      get htmlString() {
        return serrializer.serializeToString(this.html);
      }
    }
  }

  private generateFiles = () => {

    const options = {
      id: 'testId',
      title: this.title,
      lang: 'en',
      author: 'Jimmy',
      images: [],
      fonts: [],
      content: this.chapters
    };

    this.zip.file(`${Directory.METAINF}/container.xml`, '<?xml version="1.0" encoding="UTF-8" ?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>')

    this.zip.file(`${Directory.OEBPS}/content.opf`, getContentTemplate(options));

    this.zip.file(`${Directory.OEBPS}/toc.ncx`, getTOCNCXTemplate(options));

    this.zip.file(`${Directory.OEBPS}/toc.xhtml`, getTOCTemplate(this.chapters));

    this.chapters.forEach(chapter => {
      this.zip.file(chapter.href, chapter.htmlString);
    });


  }

}

export default Epub;