var http = require("http");
var fs = require("fs");

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
});

server.listen(PORT);
