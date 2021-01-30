import {IContent, IContentTemplateProps} from "../types";

export default (options: IContentTemplateProps) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const stringDate = `${year}-${month}-${day}`;
  const lang = options.lang || 'en';
  const publisher = options.publisher || 'anonymous';
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <package xmlns="http://www.idpf.org/2007/opf"
             version="3.0"
             unique-identifier="BookId"
             xmlns:dc="http://purl.org/dc/elements/1.1/"
             xmlns:dcterms="http://purl.org/dc/terms/"
             xml:lang="en"
             xmlns:media="http://www.idpf.org/epub/vocab/overlays/#"
             prefix="ibooks: http://vocabulary.itunes.apple.com/rdf/ibooks/vocabulary-extensions-1.0/">
    
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/"
                  xmlns:opf="http://www.idpf.org/2007/opf">
    
            <dc:identifier id="BookId">${options.id}</dc:identifier>
            <meta refines="#BookId" property="identifier-type" scheme="onix:codelist5">22</meta>
            <meta property="dcterms:identifier" id="meta-identifier">BookId</meta>
            <dc:title>${options.title}</dc:title>
            <meta property="dcterms:title" id="meta-title">${options.title}</meta>
            <dc:language>${lang}</dc:language>
            <meta property="dcterms:language" id="meta-language">${lang}</meta>
            <meta property="dcterms:modified">${date.toISOString().split(".")[0]+ "Z"}</meta>
            <dc:creator id="creator"><%= author.length ? author.join(",") : author %></dc:creator>
            <meta refines="#creator" property="file-as">${options.author}</meta>
            <meta property="dcterms:publisher">${publisher}</meta>
            <dc:publisher>${publisher}</dc:publisher>          
            <meta property="dcterms:date">${stringDate}</meta>
            <dc:date>${stringDate}</dc:date>
            <meta property="dcterms:rights">All rights reserved</meta>
            <dc:rights>Copyright &#x00A9; ${date.getFullYear()} by ${publisher}</dc:rights>
            <meta name="cover" content="image_cover"/>
            <meta name="generator" content="epub-gen" />
            <meta property="ibooks:specified-fonts">true</meta>
    
        </metadata>
    
        <manifest>
            <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
            <item id="toc" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav"/>
            <item id="css" href="style.css" media-type="text/css" />
            
            ${
              options.cover && (
                `<item id="image_cover" href="${options.cover.href}" media-type="${options.cover.mediaType}" />`
              )
            }
    
            ${
              options.images.map((image, index) => (
                `<item id="image_${index}" href="${image.href}" media-type="${image.mediaType}" />`
              ))
            }

            ${
              options.content.map((content, index) => (
                `<item id="content_${index}_${content.id}" href="${content.href}" media-type="${content.mediaType}" />`
              ))
            }
            
            ${
              options.fonts.map((font, index) => (
                `<item id="font_${index}" href="${font.href}" media-type="${font.mediaType}" />`
              ))
            }
            
        </manifest>
    
        <spine toc="ncx">
          <itemref idref="toc" />
            ${
              options.content.map((content, index) => (
                `<itemref idref="content_${index}_${content.id}"/>`
              ))
            }
        
        </spine>
        <guide>
            <reference type="text" title="Table of Content" href="toc.xhtml"/>
        </guide>
    </package>
  `;
}