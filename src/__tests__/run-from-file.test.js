const runFromFile = require("../run-from-file");
jest.mock('fs');
jest.mock("../models/World");
jest.mock("../models/Robot");
const fs = require("fs");
const World = require("../models/World");
const Robot = require("../models/Robot");

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
    expect(Robot._executeSteps).toHaveBeenCalledWith(["F", "R", "R", "L", "L", "F"]);
    expect(result).toEqual(["10 10 N"]);
  });

  test("Reads file and execute all robots steps", async () => {
    fs.__setMockFiles({
      file: "10 20\n1 3 N\nFRRLLF\n2 5 E\nRLFF",
    });
    Robot._getCurrentPosition.mockReturnValueOnce({
      x: 2,
      y: 2,
      orientation: "S",
      isLost: true,
    });
    const result = await runFromFile("file");
    expect(World).toHaveBeenCalledWith(10, 20);
    expect(Robot).toHaveBeenCalledWith(1, 3, "N", expect.any(World));
    expect(Robot).toHaveBeenCalledWith(2, 5, "E", expect.any(World));
    expect(Robot._executeSteps).toHaveBeenNthCalledWith(1, ["F", "R", "R", "L", "L", "F"]);
    expect(Robot._executeSteps).toHaveBeenNthCalledWith(2, ["R", "L", "F", "F"]);
    expect(result).toEqual([
      "2 2 S LOST",
      "10 10 N",
    ]);
  });
});
