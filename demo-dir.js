const fs = require("fs");

fs.readdir("c:/", (err, data) => {
  if (err) return console.log(err);

  console.log(data);
});
