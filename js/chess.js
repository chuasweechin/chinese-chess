var generatePossibleMoveBasedOnMovePattern = function () {
    let possibleMoves = [];
    let flyingGeneralCheck = false;

    let chessPieceName = this.name;
    let chessPieceColor = this.color;
    let chessPieceYCoordinate = this.yCoordinate;
    let chessPieceXCoordinate = this.xCoordinate;
    let chessPieceMoveDistance = this.moveDistance;

    this.movePattern.forEach(function(pattern, index) {
        let yCoordinatePattern = pattern[0];
        let xCoordinatePattern = pattern[1];
        let somethingInBetweenCannon = false;

        for (let d = 1; d <= chessPieceMoveDistance; d++) {
            let computedYCoordinate = chessPieceYCoordinate + yCoordinatePattern * d;
            let computedXCoordinate = chessPieceXCoordinate + xCoordinatePattern * d;

            // make sure that the move is constraint within the chess board
            if (chessBoardBoundaryCheck(computedYCoordinate, computedXCoordinate) === true) {
                if (chessPieceName === "general") {
                    // make sure that the move is constraint within the camp
                    if (campBoundaryCheck(computedYCoordinate, computedXCoordinate, chessPieceColor) === true) {
                        // disable move that attack player own piece
                        if (chessPieceColor !== playerChessBoard[computedYCoordinate][computedXCoordinate].color || playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                            possibleMoves.push({
                                possibleYCoordinate: computedYCoordinate,
                                possibleXCoordinate: computedXCoordinate
                            });
                        }

                        // check for flying general move
                        if (flyingGeneralCheck === false) {
                            let somethingInBetweenGeneral = false;
                            let redGeneralYCoordinate, redGeneralXCoordinate;
                            let blueGeneralYCoordinate, blueGeneralXCoordinate;

                            // get the position of both general
                            for (let a = 0; a < playerChessBoard.length; a++) {
                                for (let b = 0; b < playerChessBoard[a].length; b++) {
                                    let temp = playerChessBoard[a][b];

                                    if (temp.name === "general" && temp.color === "red") {
                                        redGeneralYCoordinate = temp.yCoordinate;
                                        redGeneralXCoordinate = temp.xCoordinate;
                                    } else if (temp.name === "general" && temp.color === "blue") {
                                        blueGeneralYCoordinate = temp.yCoordinate;
                                        blueGeneralXCoordinate = temp.xCoordinate;
                                    }
                                }
                            }

                            // check if both general are align vertically using X axis
                            if (redGeneralXCoordinate === blueGeneralXCoordinate) {
                                for (let i = blueGeneralYCoordinate + 1; i < redGeneralYCoordinate; i++) {
                                    // check if there is something in between them if they are aligned
                                    if (playerChessBoard[i][blueGeneralXCoordinate] !== "") {
                                        somethingInBetweenGeneral = true;
                                        break;
                                    }
                                }

                                // add in the coordinates of the enemy general as a possible move
                                if (somethingInBetweenGeneral === false) {
                                    if (chessPieceColor === "red") {
                                        possibleMoves.push({
                                            possibleYCoordinate: blueGeneralYCoordinate,
                                            possibleXCoordinate: blueGeneralXCoordinate
                                        });
                                    } else if (chessPieceColor === "blue") {
                                         possibleMoves.push({
                                            possibleYCoordinate: redGeneralYCoordinate,
                                            possibleXCoordinate: redGeneralXCoordinate
                                        });
                                    }
                                }
                            }

                            // this is to ensure this check is only done once
                            flyingGeneralCheck = true;
                        }

                        // break the loop if a collision is detected
                        if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                            break;
                        }

                    }
                } else if (chessPieceName === "advisor") {
                    // make sure that the move is constraint within the camp
                    if (campBoundaryCheck(computedYCoordinate, computedXCoordinate, chessPieceColor) === true) {

                        // disable move that attack player own piece
                       if (chessPieceColor !== playerChessBoard[computedYCoordinate][computedXCoordinate].color || playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                            possibleMoves.push({
                                possibleYCoordinate: computedYCoordinate,
                                possibleXCoordinate: computedXCoordinate
                            });
                        }

                        // break the loop if a collision is detected
                        if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                            break;
                        }
                    }
                } else if (chessPieceName === "elephant") {
                    // get the coordinates that block movement for elephant
                    let blockYCoordinate = chessPieceYCoordinate + pattern[2];
                    let blockXCoordinate = chessPieceXCoordinate + pattern[3];

                    // make sure that the move is constraint within the camp
                    if (landBoundaryCheck(computedYCoordinate, computedXCoordinate, chessPieceColor) === true) {

                        // disable move that attack player own piece
                       if (chessPieceColor !== playerChessBoard[computedYCoordinate][computedXCoordinate].color || playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                            possibleMoves.push({
                                possibleYCoordinate: computedYCoordinate,
                                possibleXCoordinate: computedXCoordinate
                            });
                        }

                        // remove the possible move if block move is detected
                        if (playerChessBoard[blockYCoordinate][blockXCoordinate] !== "") {
                            possibleMoves.pop();
                            break;
                        }

                        // break the loop if a collision is detected
                        if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                            break;
                        }

                    }
                } else if (chessPieceName === "horse") {
                    // get the coordinates that block movement for horse
                    let blockYCoordinate = chessPieceYCoordinate + pattern[2];
                    let blockXCoordinate = chessPieceXCoordinate + pattern[3];

                    // disable move that attack player own piece
                    if (chessPieceColor !== playerChessBoard[computedYCoordinate][computedXCoordinate].color || playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                        possibleMoves.push({
                            possibleYCoordinate: computedYCoordinate,
                            possibleXCoordinate: computedXCoordinate
                        });
                    }

                    // remove the possible move if block move is detected
                    if (playerChessBoard[blockYCoordinate][blockXCoordinate] !== "") {
                        possibleMoves.pop();
                        break;
                    }

                    // break the loop if a collision is detected
                    if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                        break;
                    }
                } else if (chessPieceName === "chariot") {
                        // disable move that attack player own piece
                        if (chessPieceColor !== playerChessBoard[computedYCoordinate][computedXCoordinate].color || playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                            possibleMoves.push({
                                possibleYCoordinate: computedYCoordinate,
                                possibleXCoordinate: computedXCoordinate
                            });
                        }

                        // break the loop if a collision is detected
                        if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                            break;
                        }
                } else if (chessPieceName === "cannon") {
                    possibleMoves.push({
                        possibleYCoordinate: computedYCoordinate,
                        possibleXCoordinate: computedXCoordinate
                    });

                    if (chessPieceColor === playerChessBoard[computedYCoordinate][computedXCoordinate].color
                        && playerChessBoard[computedYCoordinate][computedXCoordinate] !== ""
                        && somethingInBetweenCannon === true) {
                        // disable move that attack player own piece
                        possibleMoves.pop();

                    } else if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== ""
                        && somethingInBetweenCannon === false) {
                        // remove the in between chess piece as this cannot be attacked
                        possibleMoves.pop();
                        somethingInBetweenCannon = true;

                    } else if (playerChessBoard[computedYCoordinate][computedXCoordinate] === ""
                        && somethingInBetweenCannon === true) {
                        //remove the empty spaces from the move zone as this is not allowed
                        possibleMoves.pop();

                    } else if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== ""
                        && somethingInBetweenCannon === true) {
                        break;
                    }
                } else if (chessPieceName === "soldier") {
                    // if the soldier is in enemy land, allow all move for solder
                    if (landBoundaryCheck(computedYCoordinate, computedXCoordinate, chessPieceColor) === false) {
                        // disable move that attack player own piece
                        if (chessPieceColor !== playerChessBoard[computedYCoordinate][computedXCoordinate].color || playerChessBoard[computedYCoordinate][computedXCoordinate] === "") {
                            possibleMoves.push({
                                possibleYCoordinate: computedYCoordinate,
                                possibleXCoordinate: computedXCoordinate
                            });
                        }

                        // break the loop if a collision is detected
                        if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                            break;
                        }
                    }
                    // if solder is not in enemy land, limit soldier mobility to only index 1
                    else if (index === 0){
                        possibleMoves.push({
                            possibleYCoordinate: computedYCoordinate,
                            possibleXCoordinate: computedXCoordinate
                        });

                        // break the loop if a collision is detected
                        if (playerChessBoard[computedYCoordinate][computedXCoordinate] !== "") {
                            break;
                        }
                    }
                }
            }
        }
    });

    return possibleMoves;
}

var chessBoardBoundaryCheck = function (computedYCoordinate, computedXCoordinate) {
    let yAxisLowerBoundary = 0;
    let yAxisUpperBoundary = 9;

    let xAxisLowerBoundary = 0;
    let xAxisUpperBoundary = 8;

    // return true if the coordinates are within the chess board boundary
    if (computedYCoordinate >= yAxisLowerBoundary && computedYCoordinate <= yAxisUpperBoundary
            && computedXCoordinate >= xAxisLowerBoundary && computedXCoordinate <= xAxisUpperBoundary) {
        return true;
    }

    return false;
}

var campBoundaryCheck = function (computedYCoordinate, computedXCoordinate, chessPieceColor) {
    let xAxisLowerBoundary = 3;
    let xAxisUpperBoundary= 5;
    let yAxisLowerBoundary, yAxisUpperBoundary;

    // different color has different camp boundary
    if (chessPieceColor === "red") {
        yAxisLowerBoundary = 7;
        yAxisUpperBoundary = 9;
    } else if (chessPieceColor === "blue") {
        yAxisLowerBoundary = 0;
        yAxisUpperBoundary = 2;
    }

    // return true if the coordinates are within the camp site boundary
    if (computedYCoordinate >= yAxisLowerBoundary && computedYCoordinate <= yAxisUpperBoundary
            && computedXCoordinate >= xAxisLowerBoundary && computedXCoordinate <= xAxisUpperBoundary) {
        return true;
    }

    return false;
}

var landBoundaryCheck = function (computedYCoordinate, computedXCoordinate, chessPieceColor) {
    let xAxisLowerBoundary = 0;
    let xAxisUpperBoundary= 8;
    let yAxisLowerBoundary, yAxisUpperBoundary;

    // different color has different land boundary
    if (chessPieceColor === "red") {
        yAxisLowerBoundary = 5;
        yAxisUpperBoundary = 9;
    } else if (chessPieceColor === "blue") {
        yAxisLowerBoundary = 0;
        yAxisUpperBoundary = 4;
    }

    // return true if the coordinates are within the camp site boundary
    if (computedYCoordinate >= yAxisLowerBoundary && computedYCoordinate <= yAxisUpperBoundary
            && computedXCoordinate >= xAxisLowerBoundary && computedXCoordinate <= xAxisUpperBoundary) {
        return true;
    }

    return false;
}

let playerChessBoard = "";
let imageFilePath = "img/";
let selectedChessPieceElement = "";

let redPlayer = {
    name: "Human Red",
    color: "red",
    turn: true,
    win: 0,
    lose: 0,
    chessPieces:
    [{
        id: "r-g-1", // naming convention: color-name-id
        color: "red",
        name: "general",
        displayName: "General", // for display purposes
        yCoordinate: 9,
        xCoordinate: 4,
        moveDistance: 1, // define how far the chess piece can move from its position
        movePattern: [[-1,0], [0,1], [1,0], [0,-1]], // formula to compute possible move
        possibleMoves: generatePossibleMoveBasedOnMovePattern, // function to calculate move
        image: imageFilePath + "red-general.svg",
        killed: false,
        weightage: 900
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
        killed: false,
        weightage: 20
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
        killed: false,
        weightage: 20
    },
    {
        id: "r-e-1",
        color: "red",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 9,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern: [[-2,-2,-1,-1], [-2,2,-1,1], [2,2,1,1], [2,-2,1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-elephant.svg",
        killed: false,
        weightage: 30
    },
    {
        id: "r-e-2",
        color: "red",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 9,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern: [[-2,-2,-1,-1], [-2,2,-1,1], [2,2,1,1], [2,-2,1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-elephant.svg",
        killed: false,
        weightage: 30
    },
    {
        id: "r-h-1",
        color: "red",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 9,
        xCoordinate: 1,
        moveDistance: 1,
        movePattern: [[-2,-1,-1,0], [-2,1,-1,0], [-1,2,0,1], [1,2,0,1], [2,1,1,0], [2,-1,1,0], [-1,-2,0,-1], [1,-2,0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-horse.svg",
        killed: false,
        weightage: 40
    },
    {
        id: "r-h-2",
        color: "red",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 9,
        xCoordinate: 7,
        moveDistance: 1,
        movePattern: [[-2,-1,-1,0], [-2,1,-1,0], [-1,2,0,1], [1,2,0,1], [2,1,1,0], [2,-1,1,0], [-1,-2,0,-1], [1,-2,0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-horse.svg",
        killed: false,
        weightage: 40
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
        killed: false,
        weightage: 50
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
        killed: false,
        weightage: 50
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
        killed: false,
        weightage: 50
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
        killed: false,
        weightage: 50
    },
    {
        id: "r-s-1",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 6,
        xCoordinate: 0,
        moveDistance: 1,
        movePattern:[[-1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "r-s-2",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 6,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern:[[-1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "r-s-3",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 6,
        xCoordinate: 4,
        moveDistance: 1,
        movePattern:[[-1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "r-s-4",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 6,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern:[[-1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "r-s-5",
        color: "red",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 6,
        xCoordinate: 8,
        moveDistance: 1,
        movePattern:[[-1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "red-soldier.svg",
        killed: false,
        weightage: 10
    }]
}

let bluePlayer = {
    name: "Computer Blue",
    color: "blue",
    turn: false,
    win: 0,
    lose: 0,
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
        killed: false,
        weightage: 900
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
        killed: false,
        weightage: 20
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
        killed: false,
        weightage: 20
    },
    {
        id: "b-e-1",
        color: "blue",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 0,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern: [[-2,-2,-1,-1], [-2,2,-1,1], [2,2,1,1], [2,-2,1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-elephant.svg",
        killed: false,
        weightage: 30
    },
    {
        id: "b-e-2",
        color: "blue",
        name: "elephant",
        displayName: "Elephant",
        yCoordinate: 0,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern: [[-2,-2,-1,-1], [-2,2,-1,1], [2,2,1,1], [2,-2,1,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-elephant.svg",
        killed: false,
        weightage: 30
    },
    {
        id: "b-h-1",
        color: "blue",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 0,
        xCoordinate: 1,
        moveDistance: 1,
        movePattern: [[-2,-1,-1,0], [-2,1,-1,0], [-1,2,0,1], [1,2,0,1], [2,1,1,0], [2,-1,1,0], [-1,-2,0,-1], [1,-2,0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-horse.svg",
        killed: false,
        weightage: 40
    },
    {
        id: "b-h-2",
        color: "blue",
        name: "horse",
        displayName: "Horse",
        yCoordinate: 0,
        xCoordinate: 7,
        moveDistance: 1,
        movePattern: [[-2,-1,-1,0], [-2,1,-1,0], [-1,2,0,1], [1,2,0,1], [2,1,1,0], [2,-1,1,0], [-1,-2,0,-1], [1,-2,0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-horse.svg",
        killed: false,
        weightage: 40
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
        killed: false,
        weightage: 50
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
        killed: false,
        weightage: 50
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
        killed: false,
        weightage: 50
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
        killed: false,
        weightage: 50
    },
    {
        id: "b-s-1",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 3,
        xCoordinate: 0,
        moveDistance: 1,
        movePattern:[[1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "b-s-2",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 3,
        xCoordinate: 2,
        moveDistance: 1,
        movePattern:[[1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "b-s-3",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 3,
        xCoordinate: 4,
        moveDistance: 1,
        movePattern:[[1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "b-s-4",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 3,
        xCoordinate: 6,
        moveDistance: 1,
        movePattern:[[1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false,
        weightage: 10
    },
    {
        id: "b-s-5",
        color: "blue",
        name: "soldier",
        displayName: "Soldier",
        yCoordinate: 3,
        xCoordinate: 8,
        moveDistance: 1,
        movePattern:[[1,0], [0,1], [0,-1]],
        possibleMoves: generatePossibleMoveBasedOnMovePattern,
        image: imageFilePath + "blue-soldier.svg",
        killed: false,
        weightage: 10
    }]
}