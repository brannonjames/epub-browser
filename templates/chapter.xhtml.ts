import {IChapter} from "../types";

export default (chapter: IChapter) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>${chapter.title}</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
    <body>
    
        <h1>${chapter.title}</h1>
        <p class='epub-author'>${chapter.author}</p>
        
        ${chapter.htmlString}
    
    </body />
    </html>
  `
}