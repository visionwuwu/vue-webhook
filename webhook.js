const { createServer } = require('http');

const server = createServer((req, res) => {
  const { url, method } = req;
  if (method.toUpperCase() === 'POST' && url === '/webhook') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
    console.log('hello webhook');
  } else {
    res.end('Not Found！！！');
  }
});

server.listen(5000, () => {
  console.log('server is running 5000 port');
});
