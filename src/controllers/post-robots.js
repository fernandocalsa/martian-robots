const World = require("../models/World");
const Robot = require("../models/Robot");

function postRobots(req, res) {
  const { body } = req;

  const {
    world: worldCoordinates,
    robots,
  } = body;

  let world;
  try {
    world = new World(worldCoordinates.x, worldCoordinates.y);
  } catch(err) {
    return res.status(400).json({
      error: "Invalid world coordinates",
    });
  }

  if (!Array.isArray(robots) || robots.length === 0) {
    return res.status(400).json({
      error: "robots need to be a not empty array",
    });
  }
  const robotsFinalPositions = robots.map(({init, steps}) => {
    try {
      const robot = new Robot(init.x, init.y, init.orientation, world);
      robot.executeSteps(steps);
      return robot.getCurrentPosition();
    } catch(err) {
      return;
    }
  })

  res.json({
    robots: robotsFinalPositions,
  });
}

module.exports = postRobots;
