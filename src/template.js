const serialize = require("serialize-javascript");

export default ({ markup, helmet, storeState, schema }) => {
  return `
        <!DOCTYPE html>
        <html lang="fa" ${helmet.htmlAttributes.toString()}>
            <head>
                 <meta charset="utf-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                 ${helmet.title.toString()}
                 ${helmet.meta.toString()}
                 ${helmet.link.toString()}  

            </head>
            <body ${helmet.bodyAttributes.toString()}>
                <div id="ssrkeleton">${markup}</div>
            </body>
        </html>
        `;
};
