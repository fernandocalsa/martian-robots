const fs = require('fs');
const World = require("./models/World");
const Robot = require("./models/Robot");

function runFromFile(filePath) {
  return new Promise((res, rej) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        return rej(err);
      }
  
      const [worldLimits, ...steps] = content.split("\n");
  
      const [worldX, worldY] = worldLimits.split(" ");
  
      const world = new World(parseInt(worldX), parseInt(worldY));
  
      const robotFinalPositions = steps.reduce((robots, lineData, lineI) => {
        const isInitRobot = lineI%2 === 0;
        if (!isInitRobot) {
          return robots;
        }
        const [ initX, initY, orientation ] = lineData.split(" ");
        const robotSteps = steps[lineI+1].split("");
        const robot = new Robot(parseInt(initX), parseInt(initY), orientation, world);
        robot.executeSteps(robotSteps);
        const finalPosition = robot.getCurrentPosition();
        return [
          ...robots,
          `${finalPosition.x} ${finalPosition.y} ${finalPosition.orientation}${finalPosition.isLost ? " LOST" : ""}`,
        ];
      }, []);
      
      res(robotFinalPositions);
    });
  });
}

module.exports = runFromFile;
