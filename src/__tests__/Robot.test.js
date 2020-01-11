const Robot = require("../Robot");

describe("Robot class", () => {
  test("should create a robot with default start coordinates", () => {
    const robot = new Robot();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.orientation).toBe("N");
  });

  test("accepts x, y and orientation as parameters", () => {
    const robot = new Robot(10, 20, "S");
    expect(robot.x).toBe(10);
    expect(robot.y).toBe(20);
    expect(robot.orientation).toBe("S");
  });

  test("fails if orientation is not one of N E S W", () => {
    const createFailedRobot = () => {
      new Robot(10, 10, "T");
    }
    expect(createFailedRobot).toThrow();
  });
});
