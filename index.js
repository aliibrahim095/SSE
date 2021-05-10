const { response } = require("express");
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

subscribers = {};

app.get("/subscribe", (req, res, next) => {
  subscribers[ID] = res;
  const ID = Math.ceil(Math.random() * 10000000);
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  req.on("close", () => {
    delete subscribers[ID];
  });
});

app.post("/subscribe", (req, res, next) => {
  Object.keys(subscribers).forEach((ID) => {
    subscribers[ID].write(`data: ${JSON.stringify(req.body)}\n\n`);
  });
});

app.listen(3001, () => {
  console.log("Server is up and running! on : http://localhost:"+3001);
});
