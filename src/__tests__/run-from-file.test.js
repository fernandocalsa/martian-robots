jest.mock('fs');
const fs = require("fs");
const runFromFile = require("../run-from-file");

jest.mock("../models/World", () => jest.fn(function(x, y) {
  this.limitX = x;
  this.limitY = y;
}));

jest.mock("../models/Robot", () => jest.fn(function(x, y, orientation, world) {
  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.world = world;
}));

jest.mock("../execute-robots-steps", () => jest.fn().mockReturnValue([{
  x: 1,
  y: 3,
  orientation: "E",
  isLost: true,
}]));

const World = require("../models/World");
const Robot = require("../models/Robot");
const executeRobotsSteps = require("../execute-robots-steps");

describe("run from file", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Reads file and execute a robot steps", async () => {
    fs.__setMockFiles({
      file: "10 20\n1 3 N\nFRRLLF",
    });
    const result = await runFromFile("file");
    expect(World).toHaveBeenCalledWith(10, 20);
    expect(Robot).toHaveBeenCalledWith(1, 3, "N", expect.any(World));
    expect(executeRobotsSteps).toHaveBeenCalledWith(
      [{
        robot: expect.any(Robot),
        steps: ["F", "R", "R", "L", "L", "F"],
      }],
      expect.any(World),
    );
    expect(result).toEqual([{
      x: 1,
      y: 3,
      orientation: "E",
      isLost: true,
    }]);
  });

  test("Reads file and execute all robots steps", async () => {
    fs.__setMockFiles({
      file: "10 20\n1 3 N\nFRRLLF\n2 5 E\nRLFF",
    });
    const result = await runFromFile("file");
    expect(World).toHaveBeenCalledWith(10, 20);
    expect(Robot).toHaveBeenCalledWith(1, 3, "N", expect.any(World));
    expect(Robot).toHaveBeenCalledWith(2, 5, "E", expect.any(World));
    expect(executeRobotsSteps).toHaveBeenCalledWith(
      [
        {
          robot: expect.any(Robot),
          steps: ["F", "R", "R", "L", "L", "F"],
        },
        {
          robot: expect.any(Robot),
          steps: ["R", "L", "F", "F"],
        }
      ],
      expect.any(World),
    );
  });
});
