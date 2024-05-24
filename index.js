import { createServer } from "http";
import url from "url";
import path from "path";
import fs from "fs/promises";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    let filePath;
    if (req.url === "/" && req.method === "GET") {
      filePath = path.join(__dirname, "pages", "index.html");
    } else if (req.url === "/about" && req.method === "GET") {
      filePath = path.join(__dirname, "pages", "about.html");
    } else if (req.url === "/contact-me" && req.method === "GET") {
      filePath = path.join(__dirname, "pages", "contact-me.html");
    } else {
      res.statusCode = 404;
      filePath = path.join(__dirname, "pages", "404.html");
    }
    const data = await fs.readFile(filePath);
    res.setHeader("Content-type", "text/html");
    res.write(data);
    res.end();
  } catch (error) {
    res.writeHead(500, { "Content-type": "text/html" });
    res.end("Server Error");
  }
});

server.listen(8080);
