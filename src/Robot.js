const orientations = ["N", "E", "S", "W"];

class Robot {
  constructor(x = 0, y = 0, orientation = "N", world) {
    if (x < 0 || y < 0 || !orientations.includes(orientation) || !world) {
      throw new Error("No valid parameters");
    }
    this.x = x;
    this.y = y;
    this.orientationId = orientations.indexOf(orientation);
    this.world = world;
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
    let newX = this.x;
    let newY = this.y;
    switch (this.orientationId) {
      case 0:
        newY++
        break;
      case 1:
        newX++;
        break;
      case 2:
        newY--;
        break;
      case 3:
        newX--;
        break;
    }
    if (!this.world.canMove(newX, newY)) {
      return;
    }

    if (!this.world.isInWorld(newX, newY)) {
      this.world.registerScent(this.x, this.y);
      this.x = null;
      this.y = null;
      this.orientationId = null;
      return;
    }
    this.x = newX;
    this.y = newY;
  }
}

module.exports = Robot;
