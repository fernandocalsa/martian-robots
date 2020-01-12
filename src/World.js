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

  registerScent(x, y) {
    if (!this.isInWorld(x, y)) {
      return;
    }
    if (x !== this.limitX && y !== this.limitY) {
      return;
    }
    const scentExists = !!this.scents.find(scent => (scent.x === x && scent.y === y));
    if (scentExists) {
      return;
    }
    this.scents.push({
      x,
      y,
    });
  }
}

module.exports = World;
