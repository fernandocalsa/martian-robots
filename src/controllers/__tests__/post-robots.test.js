const postRobots = require("../post-robots");
jest.mock("../../models/World");
jest.mock("../../models/Robot");
const World = require("../../models/World");
const Robot = require("../../models/Robot");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {
  body: {
    world: {
      x: 20,
      y: 30,
    },
    robots: [
      {
        init: {
          x: 2,
          y: 5,
          orientation: "N",
        },
        steps: ["F", "R", "L", "F"],
      },
      {
        init: {
          x: 1,
          y: 2,
          orientation: "S",
        },
        steps: ["L", "F", "R", "F"],
      },
    ],
  },
};

describe("post robots endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the final positions for the robots", () => {
    postRobots(req, res);
    expect(World).toHaveBeenCalledWith(20, 30)
    expect(Robot).toHaveBeenCalledTimes(2);
    expect(Robot).toHaveBeenNthCalledWith(1, 2, 5, "N", expect.any(World));
    expect(Robot).toHaveBeenNthCalledWith(2, 1, 2, "S", expect.any(World));
    expect(Robot._executeSteps).toHaveBeenCalledTimes(2);
    expect(Robot._executeSteps).toHaveBeenNthCalledWith(1, ["F", "R", "L", "F"]);
    expect(Robot._executeSteps).toHaveBeenNthCalledWith(2, ["L", "F", "R", "F"]);
    expect(res.json).toHaveBeenCalledWith({
      robots: [
        {
          x: 10,
          y: 10,
          orientation: "N",
          isLost: false,
        },
        {
          x: 10,
          y: 10,
          orientation: "N",
          isLost: false,
        },
      ],
    });
  });

  test("returns a 400 if world can not be created", () => {
    World.mockImplementationOnce(() => {
      throw new Error("error creating world");
    });
    postRobots(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid world coordinates",
    });
  });

  test("returns an object as undefined if can't calculate the final position", () => {
    Robot.mockImplementationOnce(() => {
      throw new Error("error creating robot");
    });
    postRobots(req, res);
    expect(res.json).toHaveBeenCalledWith({
      robots: [
        undefined,
        {
          x: 10,
          y: 10,
          orientation: "N",
          isLost: false,
        },
      ],
    });
  });
});
