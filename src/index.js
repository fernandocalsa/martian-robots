const runFromFile = require("./run-from-file");

const path = process.argv[2];

if (!path) {
  console.log("Please, pass a file path as the first argument");
  process.exit();
}

runFromFile(path).then(results => {
  console.log(results.join("\n"))
});
