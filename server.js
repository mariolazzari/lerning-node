const express = require("express");
const bodyParser = require("body-parser");

// express settings
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(bodyParser.json());

// server routes
const messages = [
  {
    name: "Mario",
    message: "Hi"
  },
  {
    name: "Mary",
    message: "Hello"
  }
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  messages.push(req.body);

  console.log(req.body);

  io.emit("message", req.body);
  res.sendStatus(200);
});

// start server
const server = http.listen(3000, () =>
  console.log("Server started on port " + server.address().port)
);
