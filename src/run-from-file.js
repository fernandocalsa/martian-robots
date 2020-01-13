const fs = require('fs');
const World = require("./World");
const Robot = require("./Robot");
const executeRobotsSteps = require("./execute-robots-steps");

function runFromFile(filePath) {
  return new Promise((res) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        throw err;
      }
  
      const [worldLimits, ...steps] = content.split("\n");
  
      const [worldX, worldY] = worldLimits.split(" ");
  
      const world = new World(parseInt(worldX), parseInt(worldY));
  
      const robots = steps.reduce((robots, lineData, lineI) => {
        const isInitRobot = lineI%2 === 0;
        if (isInitRobot) {
          const [ initX, initY, orientation ] = lineData.split(" ");
          const robotSteps = steps[lineI+1].split("");
          robots.push({
            robot: new Robot(parseInt(initX), parseInt(initY), orientation, world),
            steps: robotSteps,
          });
        }
        return robots;
      }, []);
      const result = executeRobotsSteps(robots, world);  
      res(result);
    });
  })
}

module.exports = runFromFile;
