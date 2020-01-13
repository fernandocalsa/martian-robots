const runFromFile = require("./run-from-file");

const path = process.argv[2];

if (!path) {
  console.log("Please, pass a file path as the first argument");
  process.exit();
}

runFromFile(path).then(results => {
  const resultString = results.map(({x, y, orientation, isLost}) => (
    `${x} ${y} ${orientation} ${isLost ? "LOST" : ""}`
  )).join("\n");
  console.log(resultString)
});
