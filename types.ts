export interface IChapter extends IContent {
  title: string
  author?: string
}

export enum Directory {
  CHAPTERS = 'chapters'
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
  content: IContent[]
  fonts: IFont[]
}

export interface ChapterOption {
  title: string
  author?: string
  data: string
}

export interface EpubOptions {
  title: string
  author: string
  chapters: ChapterOption[]
}