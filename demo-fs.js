const fs = require("fs");

fs.readFile(",/data.json", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});
