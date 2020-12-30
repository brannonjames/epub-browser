export interface IChapter {
  title: string
  author: string
  href: string
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