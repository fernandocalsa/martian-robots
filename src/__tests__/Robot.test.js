const Robot = require("../Robot");

const world = {};

describe("Robot class", () => {
  test("should create a robot with default start coordinates", () => {
    const robot = new Robot(undefined, undefined, undefined, world);
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.orientationId).toBe(0);
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
});
