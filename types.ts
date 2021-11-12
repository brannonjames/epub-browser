export interface IChapter extends IContent {
  title: string
  author?: string
  html: HTMLDocument
  htmlString: string
}

export enum Directory {
  OEBPS = './OEBPS',
  METAINF = './META-INF',
  CHAPTERS = './chapters',
}

export enum MediaType {
  IMAGE_PNG = 'image/png',
  APPLICATION_XHTML_XML = 'application/xhtml+xml'
}

export enum Extension {
  PNG = 'png',
  XHTML = 'xhtml'
}

export interface IContent {
  id: string
  dir: string
  extension: Extension
  mediaType: MediaType
  readonly href: string
}

export interface IImage extends IContent {}
export interface IFont extends IContent {}

export interface IContentTemplateProps {
  id: string
  title: string
  lang?: string
  author: string
  publisher?: string
  images: IImage[]
  cover?: IImage
  content: IChapter[]
  fonts: IFont[]
}

export interface ChapterOption {
  title: string
  author?: string
  html: string
}

export interface EpubOptions {
  title: string
  author: string
  chapters: ChapterOption[]
}