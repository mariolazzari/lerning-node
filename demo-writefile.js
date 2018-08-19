const fs = require("fs");

const data = {
  name: "Mario"
};

fs.writeFile("data.json", JSON.stringify(data), err => {
  if (err) return console.log(err);
  console.log("data.json created");
});
