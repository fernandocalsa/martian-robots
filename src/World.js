class World {
  constructor(limitX, limitY) {
    if (!limitX || limitX > 50 || limitX < 1 || !limitY || limitY > 50 || limitY < 1) {
      throw new Error("No valid parameters");
    }
    this.limitX = limitX;
    this.limitY = limitY;
    this.scents = [];
  }

  isInWorld(x, y) {
    if (x >= 0 && x <= this.limitX && y >= 0 && y <= this.limitY) {
      return true;
    }
    return false;
  }
}

module.exports = World;
