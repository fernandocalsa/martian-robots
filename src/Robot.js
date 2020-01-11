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

  moveLeft() {
    let nextOrientationId = this.orientationId - 1;
    if (nextOrientationId < 0) {
      nextOrientationId = orientations.length - 1;
    }
    this.orientationId = nextOrientationId;
  }

  moveFront() {
    switch (this.orientationId) {
      case 0:
        this.y++
        break;
      case 1:
        this.x++;
        break;
      case 2:
        this.y--;
        break;
      case 3:
        this.x--;
        break;
    }
  }
}

module.exports = Robot;
