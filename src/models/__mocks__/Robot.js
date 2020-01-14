const Robot = jest.fn(function(x, y, orientation, world) {
  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.world = world;
  this.executeSteps = _executeSteps;
  this.getCurrentPosition = _getCurrentPosition;
});

const _executeSteps = jest.fn();
const _getCurrentPosition = jest.fn().mockReturnValue({
  x: 10,
  y: 10,
  orientation: "N",
  isLost: false,
});
Robot._executeSteps = _executeSteps;
Robot._getCurrentPosition = _getCurrentPosition;

module.exports = Robot;
