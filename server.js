const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// db connection
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/learning-node",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log("MongoDB connection error:", err));

// express settings
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// message model
const Message = mongoose.model("Message", {
  name: String,
  message: String
});

// server routes
app.get("/messages", (req, res) => {
  Message.find({})
    .then(messages => res.send(messages))
    .catch(err => console.log(err));
});

// async version
app.post("/messages", async (req, res) => {
  try {
    const message = new Message(req.body);
    // save
    console.log("Message saved");
    await message.save();
    // censored
    console.log("Check for bad words");
    const censored = await Message.findOne({ message: "badword" });

    if (censored) {
      console.log("Censored word found", censored);
      await Message.findOneAndDelete({ _id: censored._id });
    } else {
      io.emit("message", req.body);
    }
    res.sendStatus(200);
  } catch (error) {
    sendStatus(500);
    return console.err(error);
  } finally {
    console.log("Post called succesfully");
  }
});

/*
app.post("/messages", (req, res) => {
  const msg = new Message(req.body);
  msg
    .save()
    .then(() => {
      console.log("Check for bad words");
      return Message.findOne({ message: "badword" });
    })
    .then(censored => {
      if (censored) {
        console.log("Censored word found", censored);
        return Message.findOneAndDelete({ _id: censored._id });
      }
      console.log("Message saved");
      io.emit("message", req.body);
      res.sendStatus(200);
    })
    .then(deleted => console.log("Deleted censored word", deleted))
    .catch(err => res.sendStatus(500));
});
*/

// start server
const server = http.listen(3000, () =>
  console.log("Server started on port " + server.address().port)
);
