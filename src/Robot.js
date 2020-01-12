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
    this.isLost = false;
  }

  moveRight() {
    if (this.isLost) {
      return;
    }
    let nextOrientationId = this.orientationId + 1;
    if (nextOrientationId >= orientations.length) {
      nextOrientationId = 0;
    }
    this.orientationId = nextOrientationId;
  }

  moveLeft() {
    if (this.isLost) {
      return;
    }
    let nextOrientationId = this.orientationId - 1;
    if (nextOrientationId < 0) {
      nextOrientationId = orientations.length - 1;
    }
    this.orientationId = nextOrientationId;
  }

  moveFront() {
    if (this.isLost) {
      return;
    }
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
      this.isLost = true;
      return;
    }
    this.x = newX;
    this.y = newY;
  }

  getCurrentPosition() {
    return {
      x: this.x,
      y: this.y,
      orientation: orientations[this.orientationId],
      isLost: this.isLost,
    };
  }
}

module.exports = Robot;
