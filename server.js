var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];
var md5 = require('md5');

if (!port) {
  console.log('请指定端口号\n例如node server.js 8888');
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = '';
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log('含查询字符串的路径\n' + pathWithQuery);

  if (path === '/') {
    let string = fs.readFileSync('./source/index.html', 'utf8');
    response.setHeader('Content-Type', 'text/html;charset=utf8')
    response.write(string)
    response.end()
  } else if (path === '/source/jquery.js') {
    let string = fs.readFileSync('./source/jquery.js', 'utf8');
    response.setHeader('Content-Type', 'application/javascript;charset=utf8')
    // response.setHeader('Cache-Control', 'max-age=3000')
    response.write(string)
    response.end()
  } else if(path === '/source/react.js'){
    let string = fs.readFileSync('./source/react.js', 'utf8');
    response.setHeader('Content-Type', 'application/javascript;charset=utf8')
    // response.setHeader('Expires', 'Sun, 04 Feb 2019 14:01:05 GM')
    response.write(string)
    response.end()
  } else if (path === '/source/vue.js') {
    let string = fs.readFileSync('./source/vue.js', 'utf8');
    response.setHeader('Content-Type', 'application/javascript;charset=utf8')
    // let fileMd5 = md5(string)
    // response.setHeader('ETag', fileMd5)
    // if (request.headers['if-none-match'] === fileMd5) {
    //   response.statusCode = 304
    // } else {
    //   response.write(string)
    // }
    response.write(string)
    response.end()

  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write('出错了');
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
});

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    })
  })
}

server.listen(port);
console.log('监听 ' + port + ' 成功\n请做完一套托马斯全旋打开 http://localhost:' + port);