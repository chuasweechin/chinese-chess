var generatePossibleMoveBasedOnMovePattern = function () {
    let possibleMoves = [];
    let chessPieceYCoordinate = this.yCoordinate;
    let chessPieceXCoordinate = this.xCoordinate;
    let chessPieceMoveDistance = this.moveDistance;

    this.movePattern.forEach(function(pattern) {
        let yCoordinatePattern = pattern[0];
        let xCoordinatePattern = pattern[1];

        for (let d = 1; d <= chessPieceMoveDistance; d++) {
            let computedYCoordinate = chessPieceYCoordinate + yCoordinatePattern * d;
            let computedXCoordinate = chessPieceXCoordinate + xCoordinatePattern * d;

            // check for upper bound for the board
            if (computedYCoordinate < yAxisUpperBoundary) {
                if (computedXCoordinate < xAxisUpperBoundary) {

                    // check for lower bound for the board
                    if (computedYCoordinate >= yxAxisLowerBoundary) {
                        if (computedXCoordinate >= yxAxisLowerBoundary) {

                            // check for collision with other pieces
                            if (playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                                possibleMoves.push({
                                    possibleYCoordinate: computedYCoordinate,
                                    possibleXCoordinate: computedXCoordinate
                                });
                            } else {
                                possibleMoves.push({
                                    possibleYCoordinate: computedYCoordinate,
                                    possibleXCoordinate: computedXCoordinate
                                });

                                break;
                            }
                        }
                    }
                }
            }
        }
    });

    return possibleMoves;
}

let yxAxisLowerBoundary = 0;

let yAxisUpperBoundary = 10;
let xAxisUpperBoundary = 9;

let playerChessBoard = "";
let imageFilePath = "img/";
let selectedChessPieceElement = "";

let redPlayer = {
    name: "Red",
    color: "red",
    turn: true,
    win: 0,
    loss: 0,
    chessPieces:
    [{
        id: "r-g-1", // naming convention: color-name-id
        color: "red",
        name: "general",
        displayName: "General",
        yCoordinate: 9,
        xCoordinate: 4,
        moveDistance: 1, // distance define how far the chess piece can move from itself
        movePattern: [[-1,0], [0,1], [1,0], [0,-1]], // formula to compute possible move
        possibleMoves: generatePossibleMoveBasedOnMovePattern, // method to calculate move
        image: imageFilePath + "red-general.svg",
        killed: false
    },
    {
        id: "r-a-1",
        color: "red",
        name: "advisor",
        displayName: "Advisor",
        yCoordinate: 9,
        xCoordinate: 3,
        moveDistance: 1,
        movePattern: [[-1,-1], [-1,1], [1,1], [1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-advisor.svg",
        killed: false
    },
    {
        id: "r-a-2",
        color: "red",
        name: "advisor",
        displayName: "Advisor",
        yCoordinate: 9,
        xCoordinate: 5,
        moveDistance: 1,
        movePattern: [[-1,-1], [-1,1], [1,1], [1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-advisor.svg",
        killed: false
    },
    {
        id: "r-e-1",
        color: "red",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 9,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern: [[-2,-2], [-2,2], [2,2], [2,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-elephant.svg",
        killed: false
    },
    {
        id: "r-e-2",
        color: "red",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 9,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern: [[-2,-2], [-2,2], [2,2], [2,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-elephant.svg",
        killed: false
    },
    {
        id: "r-h-1",
        color: "red",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 9,
        xCoordinate: 1,
        moveDistance: 1,
        movePattern: [[-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1],[-1,-2], [1,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-horse.svg",
        killed: false
    },
    {
        id: "r-h-2",
        color: "red",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 9,
        xCoordinate: 7,
        moveDistance: 1,
        movePattern:[[-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1],[-1,-2], [1,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-horse.svg",
        killed: false
    },
    {
        id: "r-ch-1",
        color: "red",
        name: "chariot",
        displayName: "Chariot",
        yCoordinate: 9,
        xCoordinate: 0,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-chariot.svg",
        killed: false
    },
    {
        id: "r-ch-2",
        color: "red",
        name: "chariot",
        displayName: "Chariot",
        yCoordinate: 9,
        xCoordinate: 8,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-chariot.svg",
        killed: false
    },
    {
        id: "r-ca-1",
        color: "red",
        name: "cannon",
        displayName: "Cannon",
        yCoordinate: 7,
        xCoordinate: 1,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-cannon.svg",
        killed: false
    },
    {
        id: "r-ca-2",
        color: "red",
        name: "cannon",
        displayName: "Cannon",
        yCoordinate: 7,
        xCoordinate: 7,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-cannon.svg",
        killed: false
    },
    {
        id: "r-s-1",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 6,
        xCoordinate: 0,
        moveDistance: 1,
        movePattern:[[-1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-s-2",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 6,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern:[[-1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-s-3",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 6,
        xCoordinate: 4,
        moveDistance: 1,
        movePattern:[[-1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-s-4",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 6,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern:[[-1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-s-5",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 6,
        xCoordinate: 8,
        moveDistance: 1,
        movePattern:[[-1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false
    }]
}

let bluePlayer = {
    name: "Blue",
    color: "blue",
    turn: false,
    win: 0,
    loss: 0,
    chessPieces:
    [{
        id: "b-g-1",
        color: "blue",
        name: "general",
        displayName: "General",
        yCoordinate: 0,
        xCoordinate: 4,
        moveDistance: 1,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-general.svg",
        killed: false
    },
    {
        id: "b-a-1",
        color: "blue",
        name: "advisor",
        displayName: "Advisor",
        yCoordinate: 0,
        xCoordinate: 3,
        moveDistance: 1,
        movePattern:[[-1,-1], [-1,1], [1,1], [1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-advisor.svg",
        killed: false
    },
    {
        id: "b-a-2",
        color: "blue",
        name: "advisor",
        displayName: "Advisor",
        yCoordinate: 0,
        xCoordinate: 5,
        moveDistance: 1,
        movePattern:[[-1,-1], [-1,1], [1,1], [1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-advisor.svg",
        killed: false
    },
    {
        id: "b-e-1",
        color: "blue",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 0,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern:[[-2,-2], [-2,2], [2,2], [2,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-elephant.svg",
        killed: false
    },
    {
        id: "b-e-2",
        color: "blue",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 0,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern:[[-2,-2], [-2,2], [2,2], [2,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-elephant.svg",
        killed: false
    },
    {
        id: "b-h-1",
        color: "blue",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 0,
        xCoordinate: 1,
        moveDistance: 1,
        movePattern:[[-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1],[-1,-2], [1,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-horse.svg",
        killed: false
    },
    {
        id: "b-h-2",
        color: "blue",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 0,
        xCoordinate: 7,
        moveDistance: 1,
        movePattern:[[-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1],[-1,-2], [1,-2]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-horse.svg",
        killed: false
    },
    {
        id: "b-ch-1",
        color: "blue",
        name: "chariot",
        displayName: "Chariot",
        yCoordinate: 0,
        xCoordinate: 0,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-chariot.svg",
        killed: false
    },
    {
        id: "b-ch-2",
        color: "blue",
        name: "chariot",
        displayName: "Chariot",
        yCoordinate: 0,
        xCoordinate: 8,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-chariot.svg",
        killed: false
    },
    {
        id: "b-ca-1",
        color: "blue",
        name: "cannon",
        displayName: "Cannon",
        yCoordinate: 2,
        xCoordinate: 1,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-cannon.svg",
        killed: false
    },
    {
        id: "b-ca-2",
        color: "blue",
        name: "cannon",
        displayName: "Cannon",
        yCoordinate: 2,
        xCoordinate: 7,
        moveDistance: 9,
        movePattern:[[-1,0], [0,1], [1,0], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-cannon.svg",
        killed: false
    },
    {
        id: "b-s-1",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 3,
        xCoordinate: 0,
        moveDistance: 1,
        movePattern:[[1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-s-2",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 3,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern:[[1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-s-3",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 3,
        xCoordinate: 4,
        moveDistance: 1,
        movePattern:[[1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-s-4",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 3,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern:[[1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-s-5",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        rankUp: false,
        yCoordinate: 3,
        xCoordinate: 8,
        moveDistance: 1,
        movePattern:[[1,0]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    }]
}