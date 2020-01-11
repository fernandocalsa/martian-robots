const orientations = ["N", "E", "S", "W"];

class Robot {
  constructor(x = 0, y = 0, orientation = "N") {
    if (x < 0 || y < 0 || !orientations.includes(orientation)) {
      throw new Error("No valid parameters");
    }
    this.x = x;
    this.y = y;
    this.orientationId = orientations.indexOf(orientation);
  }

  moveRight() {
    let nextOrientationId = this.orientationId + 1;
    if (nextOrientationId >= orientations.length) {
      nextOrientationId = 0;
    }
    this.orientationId = nextOrientationId;
  }
}

module.exports = Robot;
