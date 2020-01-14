# Martian robots

This project is able to move a bunch of robots through Mars!

Mars is a rectangular grid. Robots can move around, but if a robot cross the limits it will be lost. Good news is that wherever a robot is lost, no other robot will be lost again.

## API
There is an API where you can send the instructions. The API will return the final position for each robot sent.

In order to start the API you can run `npm start` or create a Docker container:
```
docker build -t martian-robots .
docker run -p 8080:8080 -d martian-robots
```
This will create a docker image `martian-robots` and then a container.

With either of the options you'll have access to the API through http://localhost:8080

There is only one endpoint:

### POST /
body:
```
{
	"world": {
		"x": 20,
		"y": 50
	},
	"robots": [{
		"init": {
			"x": 3,
			"y": 50,
			"orientation": "N"
		},
		"steps": ["F", "R"]
	}]
}
```
Response:
```
{
  "robots": [
    {
      "x": 3,
      "y": 50,
      "orientation": "N",
      "isLost": true
    }
  ]
}
```

## CLI
There is also the option to execute the steps from the CLI.

You'll need a file where to describe how Mars is and how the robots move around. The file format is like this:

```
10 20 // Limits for Mars: X Y
1 2 E // starting point for the first robot: X Y Orientation
RRLFF // list of instructions for the first robot: Front, Right, Left
2 2 N // second robot
LFRRL // second robot instructions
```

You'll see the final position for each robot as the output:
```
2 3 N
3 5 E LOST
```

If you want to run the app you'll need to execute
```
node src/index.js filePath
```

There is a sample file in the root, so you can run `node src/index.js steps`

## Tests

```
npm t
```

