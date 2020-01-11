const World = require("../World");

describe("World class", () => {
  test("creates a new world with the coordinates limits", () => {
    const world = new World(20, 30);
    expect(world.limitX).toBe(20);
    expect(world.limitY).toBe(30);
    expect(world.scents).toEqual([]);
  });

  test("fails if one of the coordinate limits is greater than 50", () => {
    const createFailedWorldX = () => {
      new World(51, 20);
    }

    const createFailedWorldY = () => {
      new World(20, 55);
    }

    expect(createFailedWorldX).toThrow();
    expect(createFailedWorldY).toThrow();
  });

  test("fails if one of the coordinate limits is less than 1", () => {
    const createFailedWorldX = () => {
      new World(0, 20);
    }

    const createFailedWorldY = () => {
      new World(20, -5);
    }

    expect(createFailedWorldX).toThrow();
    expect(createFailedWorldY).toThrow();
  });

  test("fails if one of the coordinates is not set", () => {
    const createFailedWorldX = () => {
      new World(undefined, 20);
    }

    const createFailedWorldY = () => {
      new World(undefined, 5);
    }

    expect(createFailedWorldX).toThrow();
    expect(createFailedWorldY).toThrow();
  });
});
