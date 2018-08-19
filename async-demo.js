const fs = require("fs");

fs.readdir("c:/", (err, data) => {
  if (err) console.log(err);
  console.log("data:", data);
});

console.log("This comes after");
