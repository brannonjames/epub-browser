import {IChapter} from "../types";

export default (content: IChapter[]) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
    <head>
        <title>New eBook 761768</title>
        <meta charset="UTF-8" />
        <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
    <body>
    
      <h1 class="h1">Table Of Contents</h1>
      
      <nav id="toc" epub:type="toc">
          <ol>
                       
              <li class="table-of-content">
                  <a href="toc.xhtml">- Table Of Contents -</a>
              </li>
              
              ${content.map(chapter => (`
                <li class="table-of-content">
                  <a href="${chapter.href}">${chapter.title} - <span class="toc-author">${chapter.author}</span></a>
                </li>
              `))}                
              
          </ol>
      </nav>
    
    </body>
    </html>
  `
}