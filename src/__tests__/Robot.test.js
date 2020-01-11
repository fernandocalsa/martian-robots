const Robot = require("../Robot");

describe("Robot class", () => {
  test("should create a robot with default start coordinates", () => {
    const robot = new Robot();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.orientationId).toBe(0);
  });

  test("accepts x, y and orientation as parameters", () => {
    const robot = new Robot(10, 20, "S");
    expect(robot.x).toBe(10);
    expect(robot.y).toBe(20);
    expect(robot.orientationId).toBe(2);
  });

  test("fails if orientation is not one of N E S W", () => {
    const createFailedRobot = () => {
      new Robot(10, 10, "T");
    }
    expect(createFailedRobot).toThrow();
  });

  test("moves from E to S when moveRight is executed", () => {
    const robot = new Robot(2, 3, "E");
    robot.moveRight();
    expect(robot.orientationId).toBe(2);
  });

  test("moves from W to N when moveRight is executed", () => {
    const robot = new Robot(2, 3, "W");
    robot.moveRight();
    expect(robot.orientationId).toBe(0);
  });

  test("moves from S to E when moveLeft is executed", () => {
    const robot = new Robot(2, 3, "S");
    robot.moveLeft();
    expect(robot.orientationId).toBe(1);
  });

  test("moves from N to W when moveLeft is executed", () => {
    const robot = new Robot(2, 3, "N");
    robot.moveLeft();
    expect(robot.orientationId).toBe(3);
  });

  test("moves from 2,2 to 2,3 when moveFront is executed and orientation is North", () => {
    const robot = new Robot(2, 2, "N");
    robot.moveFront();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(3);
  });

  test("moves from 2,2 to 3,2 when moveFront is executed and orientation is East", () => {
    const robot = new Robot(2, 2, "E");
    robot.moveFront();
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
  });

  test("moves from 2,2 to 2,1 when moveFront is executed and orientation is South", () => {
    const robot = new Robot(2, 2, "S");
    robot.moveFront();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
  });

  test("moves from 2,2 to 1,2 when moveFront is executed and orientation is W", () => {
    const robot = new Robot(2, 2, "W");
    robot.moveFront();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
  });
});
