const fs = require("fs");
const data = require("./data");

fs.readFile("./data.json", "utf-8", (err, data) => {
  if (err) return console.log(err.message);

  // this is a string
  console.log("readFile:", data);
  console.log("readFile name:", data.name);

  // convert to json
  const json = JSON.parse(data);
  console.log("readFile JSON parsed Name:", json.name);
});

// from require directly
console.log("From require:", data);
console.log("From require name:", data.name);
