var http = require("http");
var fs = require("fs");

var path = require("path");

const PORT = 5001;

const server = http.createServer((req, res) => {
  var filePath = "." + req.url;
  if (filePath == "./") filePath = "./index.html";

  var extname = path.extname(filePath);
  var contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
  }

  res.writeHead(200, { "content-type": contentType });
  fs.createReadStream("index.html").pipe(res);
});

server.listen(PORT);

console.log(`Server started on port ${PORT}`);
