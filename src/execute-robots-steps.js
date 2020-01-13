function executeRobotsSteps(robots) {
  return robots.map(({robot, steps}) => {
    steps.forEach(step => {
      switch (step) {
        case "R":
          robot.moveRight()
          break;
        case "L":
          robot.moveLeft();
          break;
        case "F":
          robot.moveFront();
          break;
      }
    });
    return robot.getCurrentPosition();
  });
}

module.exports = executeRobotsSteps;
