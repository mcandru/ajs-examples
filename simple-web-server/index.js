import http from "http";

const app = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
