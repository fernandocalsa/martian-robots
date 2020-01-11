class World {
  constructor(limitX, limitY) {
    if (!limitX || limitX > 50 || limitX < 1 || !limitY || limitY > 50 || limitY < 1) {
      throw new Error("No valid parameters");
    }
    this.limitX = limitX;
    this.limitY = limitY;
    this.scents = [];
  }
}

module.exports = World;
