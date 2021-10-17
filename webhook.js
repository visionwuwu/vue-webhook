const { createServer } = require('http');
const crypto = require('crypto')
// 添加github的webhook配置的密钥
const SECRET = '123456'

// 加密签名 用的是hash算法 用SECRET密钥加密 body文本 最后输出16进制的文本 sha1=xxx 这是github传来的格式
function sign(body) {
  return `sha1=${crypto.createHmac('sha1', SECRET).update(body).digest('hex')}`
}

// 创建一个web服务器
const server = createServer((req, res) => {
  const { url, method } = req;
  console.log(`method: ${method} -- url: ${url}`);
  if (method.toUpperCase() === 'POST' && url === '/webhook') {
    // 设置响应体位json与github的webhook相对应
    let buffers = []; // 明确这个buffer是干嘛的
    // 监听数据是啥
    req.on('data', (buffer) => {
      buffers.push(buffer);
    });
    req.on('end', () => {
      // 拼接一个大的buffer
      const body = Buffer.concat(buffers);
      const event = req.headers['x-github-event'] //event=xxx
      const signature = req.headers['x-hub-signature'] //拿到签名的密钥
      // git触发push事件，或者密钥不正确
      if (sign(JSON.stringify(body)) !== signature) {
        return res.end('Not Allow！！！');
      }
      // 所有的验证都成功了接下来就是CI、CD的流程，在使用docker进行部署
      /**
       * 1.拉取最新的代码下来
       * 2. 重新构建 重新部署 重新启动项目
       */
    })
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
