const Robot = require("../Robot");

const world = {
  canMove: jest.fn().mockReturnValue(true),
  isInWorld: jest.fn().mockReturnValue(true),
  registerScent: jest.fn(),
};

describe("Robot class", () => {
  beforeEach(() => {
    world.canMove.mockClear();
    world.isInWorld.mockClear();
    world.registerScent.mockClear();
  });

  test("should create a robot with default start coordinates", () => {
    const robot = new Robot(undefined, undefined, undefined, world);
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.orientationId).toBe(0);
    expect(robot.isLost).toBe(false);
  });

  test("accepts x, y and orientation as parameters", () => {
    const robot = new Robot(10, 20, "S", world);
    expect(robot.x).toBe(10);
    expect(robot.y).toBe(20);
    expect(robot.orientationId).toBe(2);
  });

  test("saves the fourth parameter as world", () => {
    const robot = new Robot(2, 3, "N", world);
    expect(robot.world).toBe(world);
  });

  test("fails if orientation is not one of N E S W", () => {
    const createFailedRobot = () => {
      new Robot(10, 10, "T", world);
    }
    expect(createFailedRobot).toThrow();
  });

  test("moves from E to S when moveRight is executed", () => {
    const robot = new Robot(2, 3, "E", world);
    robot.moveRight();
    expect(robot.orientationId).toBe(2);
  });

  test("moves from W to N when moveRight is executed", () => {
    const robot = new Robot(2, 3, "W", world);
    robot.moveRight();
    expect(robot.orientationId).toBe(0);
  });

  test("moves from S to E when moveLeft is executed", () => {
    const robot = new Robot(2, 3, "S", world);
    robot.moveLeft();
    expect(robot.orientationId).toBe(1);
  });

  test("moves from N to W when moveLeft is executed", () => {
    const robot = new Robot(2, 3, "N", world);
    robot.moveLeft();
    expect(robot.orientationId).toBe(3);
  });

  test("moves from 2,2 to 2,3 when moveFront is executed and orientation is North", () => {
    const robot = new Robot(2, 2, "N", world);
    robot.moveFront();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(3);
  });

  test("moves from 2,2 to 3,2 when moveFront is executed and orientation is East", () => {
    const robot = new Robot(2, 2, "E", world);
    robot.moveFront();
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
  });

  test("moves from 2,2 to 2,1 when moveFront is executed and orientation is South", () => {
    const robot = new Robot(2, 2, "S", world);
    robot.moveFront();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
  });

  test("moves from 2,2 to 1,2 when moveFront is executed and orientation is W", () => {
    const robot = new Robot(2, 2, "W", world);
    robot.moveFront();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
  });

  test("does not move if it can not move", () => {
    const robot = new Robot(2, 2, "W", world);
    world.canMove.mockReturnValueOnce(false);
    robot.moveFront();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(2);
  });

  test("set robot to lost state if new coordinates are not in the world", () => {
    const robot = new Robot(10, 5, "E", world);
    world.isInWorld.mockReturnValueOnce(false);
    robot.moveFront();
    expect(robot.x).toBe(10);
    expect(robot.y).toBe(5);
    expect(robot.orientationId).toBe(1);
    expect(robot.isLost).toBe(true);
    expect(world.registerScent).toHaveBeenCalledWith(10, 5);
  });

  test("lost robot does not move", () => {
    const robot = new Robot(10, 5, "E", world);
    world.isInWorld.mockReturnValueOnce(false);
    robot.moveFront();
    expect(robot.isLost).toBe(true);
    expect(robot.x).toBe(10);
    expect(robot.y).toBe(5);
    robot.moveFront();
    expect(robot.x).toBe(10);
    expect(robot.y).toBe(5);
  });

  test("getCurrentPosition returns an object with the current position", () => {
    const robot1 = new Robot(2, 4, "E", world);
    expect(robot1.getCurrentPosition({
      x: 2,
      y: 4,
      orientation: "E",
      isLost: false,
    }));

    const robot2 = new Robot(2, 4, "E", world);
    world.isInWorld.mockReturnValueOnce(false);
    robot2.moveFront();
    expect(robot2.getCurrentPosition({
      x: 2,
      y: 4,
      orientation: "E",
      isLost: true,
    }));
  });
});
