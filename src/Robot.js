const orientations = ["N", "E", "S", "W"];

class Robot {
  constructor(x = 0, y = 0, orientation = "N") {
    if (x < 0 || y < 0 || !orientations.includes(orientation)) {
      throw new Error("No valid parameters");
    }
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }
}

module.exports = Robot;
