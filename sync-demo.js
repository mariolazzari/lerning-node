const fs = require("fs");

const data = fs.readdirSync("c:/");
console.log("data:", data);
console.log("This comes after");
