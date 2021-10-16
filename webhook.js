const { createServer } = require('http');

const server = createServer((req, res) => {
  const { url, method } = req;
  console.log(`method: ${method} -- url: ${url}`);
  if (method.toUpperCase() === 'POST' && url === '/webhook') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
    console.log('hello webhook');
  } else {
    res.end('Not Found！！！');
  }
});

server.listen(5005, () => {
  console.log('server is running 5005 port');
});
