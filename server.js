const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || "localhost";

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server running non http://${hostname}:${port}`);
});