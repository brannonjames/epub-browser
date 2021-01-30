import {IContentTemplateProps} from "../types";

export default (options: IContentTemplateProps) => {
  let playOrderIndex = 0;
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
      <head>
          <meta name="dtb:uid" content="${options.id}" />
          <meta name="dtb:generator" content="epub-gen"/>
          <meta name="dtb:depth" content="1"/>
          <meta name="dtb:totalPageCount" content="0"/>
          <meta name="dtb:maxPageNumber" content="0"/>
      </head>
      <docTitle>
          <text>${options.title}</text>
      </docTitle>
      <docAuthor>
          <text>${options.author}</text>
      </docAuthor>
      <navMap>
          <navPoint id="toc" playOrder="${playOrderIndex++}" class="chapter">
              <navLabel>
                  <text>Table of Content</text>
              </navLabel>
              <content src="toc.xhtml"/>
          </navPoint>
        
          ${options.content.map((chapter, index) => (`
            <navPoint id="content_${index}_${chapter.id}" playOrder="${playOrderIndex++}" class="chapter">
                <navLabel>                 
                    <text>${index + 1}. ${chapter.title || 'Chapter ' + index + 1}</text>
                </navLabel>
                <content src="${chapter.href}"/>
             </navPoint>
          `))}
                                  
      </navMap>
    </ncx>
`};