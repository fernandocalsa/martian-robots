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

  test("returns true if the coordinates are in the limit of the world", () => {
    const world = new World(20, 30);
    expect(world.isInWorld(10, 10)).toBe(true);
    expect(world.isInWorld(10, 30)).toBe(true);
    expect(world.isInWorld(20, 10)).toBe(true);
  });

  test("returns false if the coordinates are not in the world limit", () => {
    const world = new World(20, 30);
    expect(world.isInWorld(40, 40)).toBe(false);
    expect(world.isInWorld(21, 10)).toBe(false);
    expect(world.isInWorld(10, 31)).toBe(false);
    expect(world.isInWorld(-5, 10)).toBe(false);
  });

  test("registers scent if the coordinates are in the edge", () => {
    const world = new World(30, 30);
    world.registerScent(30, 10);
    expect(world.scents.length).toBe(1);
    expect(world.scents).toEqual(expect.arrayContaining([{
      x: 30,
      y: 10,
    }]));
    world.registerScent(10, 30);
    expect(world.scents.length).toBe(2);
    expect(world.scents).toEqual(expect.arrayContaining([{
      x: 10,
      y: 30,
    }]));
  });

  test("does not register the scent if the coordinate is not in the world edge", () => {
    const world = new World(30, 30);
    world.registerScent(10, 10);
    expect(world.scents.length).toBe(0);

    world.registerScent(30, 40);
    expect(world.scents.length).toBe(0);
  });

  test("does not register the scent if it is already registered", () => {
    const world = new World(20, 30);
    world.registerScent(10, 30);
    expect(world.scents.length).toBe(1);
    world.registerScent(10, 30);
    expect(world.scents.length).toBe(1);
  });
});
