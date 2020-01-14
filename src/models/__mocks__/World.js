module.exports = jest.fn(function World(x, y) {
  this.limitX = x;
  this.limitY = y;
});
