'use strict';
const http = require('http');
const pug = require('pug');
const fs = require('fs');
const ggl = require('googlee');

const server = http
  .createServer((req, res) => {
    switch (req.method) {
      case 'GET':
        switch (req.url) {
          case '/':
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(pug.renderFile('./view/view.pug'));
            break;
          case '/style.css':
            res.writeHead(200, {
              'Content-Type': 'text/css; charset=utf-8'
            });
            res.end(fs.readFileSync('view/style.css'));
            break;
          case '/script.js':
            res.writeHead(200, {
              'Content-Type': 'text/javascript; charset=utf-8'
            });
            res.end(fs.readFileSync('view/script.js'));
            break;
          case '/gif.gif':
            res.writeHead(200, {
              'Content-Type': 'image/gif; charset=utf-8'
            });
            res.end(fs.readFileSync('view/img/s.gif'));
            // shocking
            // res.end(fs.readFileSync('view/img/bg.gif'));
            break;
          default:
            res.writeHead(404, {
              'Content-Type': 'text/plain; charset=utf-8'
            });
            res.end('ページが見つかりません');
            break;
        }
        break;
      case 'POST':
        let body = [];
        req.on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          const decoded = decodeURIComponent(body.toString());
          const content = decoded.replace(/　/g, '+').split('content=')[1];
          console.info('submit:' + content);

          redirect(req, res, content);
        });
        break;
      default:
        break;
    }
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });

const port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});

function redirect(req, res, content) {
  const word = encodeURI(ggl.pushSearchText(content));
  res.writeHead(303, {
    'Location': 'https://www.google.com/search?googlee-ReDiReCtS=showed+this+page&isnt=cool&huh&q=' + word + '&hl=ja&safe=high&filter=1'
  });
  res.end();
}