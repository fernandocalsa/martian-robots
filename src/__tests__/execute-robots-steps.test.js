const executeRobotsSteps = require("../execute-robots-steps");

const robot1 = {
  moveRight: jest.fn(),
  moveLeft: jest.fn(),
  moveFront: jest.fn(),
  getCurrentPosition: jest.fn().mockReturnValue({x: 2, y: 1}),
};

const robot2 = {
  moveRight: jest.fn(),
  moveLeft: jest.fn(),
  moveFront: jest.fn(),
  getCurrentPosition: jest.fn().mockReturnValue({x: 3, y: 3}),
};

describe("Execute robots steps", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("executes steps for one robot and return last position", () => {
    const result = executeRobotsSteps([
      {
        robot: robot1,
        steps: ["L","R","F"],
      },
    ]);
    expect(result).toEqual([{
      x: 2,
      y: 1
    }]);
    expect(robot1.moveLeft).toHaveBeenCalled();
    expect(robot1.moveRight).toHaveBeenCalled();
    expect(robot1.moveFront).toHaveBeenCalled();
  });

  test("executes steps for two robots and return last position", () => {
    const result = executeRobotsSteps([
      {
        robot: robot1,
        steps: ["L","R","F"],
      },
      {
        robot: robot2,
        steps: ["F","L","R"],
      },
    ]);
    expect(result).toEqual([
      {
        x: 2,
        y: 1
      },
      {
        x: 3,
        y: 3,
      },
    ]);
    expect(robot1.moveLeft).toHaveBeenCalled();
    expect(robot1.moveRight).toHaveBeenCalled();
    expect(robot1.moveFront).toHaveBeenCalled();
    expect(robot2.moveFront).toHaveBeenCalled();
    expect(robot2.moveLeft).toHaveBeenCalled();
    expect(robot2.moveRight).toHaveBeenCalled();
  });
});
