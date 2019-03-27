/*
================================
= function to setup the game   =
================================
*/
// create back end 10 x 9 chess board
var createChessBoardBackEnd = function () {
    let chessBoard = [];

    for (let a = 0; a < 10; a++) {
        let row = [];

        for (let b = 0; b < 9; b++) {
            row.push("");
        }
        chessBoard.push(row);
    }
    return chessBoard;
}

// generate chess board UI using the back end chess board
var renderChessBoardUI = function (chessBoard) {
    let tableElement = document.createElement("table");
    tableElement.className = "board";

    for (let a = 0; a < chessBoard.length; a++) {
        let rowElement = document.createElement("tr");

        for (let b = 0; b < chessBoard[a].length; b++) {
            let cellElement = document.createElement("td");

            cellElement.setAttribute("yCoordinate" , a);
            cellElement.setAttribute("xCoordinate" , b);
            cellElement.textContent = "";

            rowElement.appendChild(cellElement);
        }

        tableElement.appendChild(rowElement);
    }

    document.querySelector(".chessBoard").appendChild(tableElement);
    createScoreBoard();
}

// set the starting position for on the chess board
var placeChessPiecesAtStartingPosition = function (player) {
    player.chessPieces.forEach (function (chessPiece) {
        let cellElement = document.querySelector('[yCoordinate="' + chessPiece.yCoordinate + '"][xCoordinate="' + chessPiece.xCoordinate + '"]');
        let imgElement = document.createElement("img");

        // red always start first, add hover effect for red chess piece
        if (chessPiece.color === "red") {
            imgElement.className = "chessPiece";
        }

        imgElement.setAttribute("id", chessPiece.id);
        imgElement.setAttribute("displayName", chessPiece.displayName);
        imgElement.setAttribute("src", chessPiece.image);
        imgElement.setAttribute("color", chessPiece.color);

        imgElement.addEventListener("click", chessPieceClickEvent);

        cellElement.appendChild(imgElement);

        // place the chess pieces into the back end
        playerChessBoard[chessPiece.yCoordinate][chessPiece.xCoordinate] = chessPiece;
    });
}

var createScoreBoard = function () {
    // create score board for red
    let redDivWinStatslement = document.createElement("div");
    let redDivLoseStatslement = document.createElement("div");
    let redDivKilledLabelElement = document.createElement("div");
    let redDivKilledElement = document.createElement("div");

    redDivWinStatslement.className = "winStats";
    redDivLoseStatslement.className = "loseStats";
    redDivKilledLabelElement.className = "killedLabel";
    redDivKilledElement.className = "killed";

    document.querySelector(".redPlayerStats").appendChild(redDivWinStatslement);
    document.querySelector(".redPlayerStats").appendChild(redDivLoseStatslement);
    document.querySelector(".redPlayerStats").appendChild(redDivKilledLabelElement);
    document.querySelector(".redPlayerStats").appendChild(redDivKilledElement);

    // create score board for blue
    let blueDivWinStatslement = document.createElement("div");
    let blueDivLoseStatslement = document.createElement("div");
    let blueDivKilledLabelElement = document.createElement("div");
    let blueDivKilledElement = document.createElement("div");

    blueDivWinStatslement.className = "winStats";
    blueDivLoseStatslement.className = "loseStats";
    blueDivKilledLabelElement.className = "killedLabel";
    blueDivKilledElement.className = "killed";

    document.querySelector(".bluePlayerStats").appendChild(blueDivWinStatslement);
    document.querySelector(".bluePlayerStats").appendChild(blueDivLoseStatslement);
    document.querySelector(".bluePlayerStats").appendChild(blueDivKilledLabelElement);
    document.querySelector(".bluePlayerStats").appendChild(blueDivKilledElement);
}

var updateScoreBoard = function () {
    document.querySelector(".redPlayer > .name").innerHTML = redPlayer.name;
    document.querySelector(".redPlayerStats > .winStats").innerHTML = "<b>Win: </b>" + redPlayer.win;
    document.querySelector(".redPlayerStats > .loseStats").innerHTML = " <b>Lose: </b>" + redPlayer.lose;
    document.querySelector(".redPlayerStats > .killedLabel").innerHTML = " <b>Enemy Chess Piece Killed:</b>";
    document.querySelector(".redPlayerStats > .killed").innerHTML = ""; //reset img for killed

    bluePlayer.chessPieces.filter(function(chessPiece) {
        if (chessPiece.killed === true) {
            return chessPiece;
        }
    }).forEach(function(chessPiece){
        let img = document.createElement("img");
        img.setAttribute("src", chessPiece.image);
        document.querySelector(".redPlayerStats > .killed").appendChild(img)
    });

    document.querySelector(".bluePlayer > .name").innerHTML = bluePlayer.name;
    document.querySelector(".bluePlayerStats > .winStats").innerHTML = "<b>Win: </b>" + bluePlayer.win;
    document.querySelector(".bluePlayerStats > .loseStats").innerHTML = " <b>Lose: </b>" + bluePlayer.lose;
    document.querySelector(".bluePlayerStats > .killedLabel").innerHTML = " <b>Enemy Chess Piece Killed:</b>";
    document.querySelector(".bluePlayerStats > .killed").innerHTML = ""; //reset img for killed

    redPlayer.chessPieces.filter(function(chessPiece) {
        if (chessPiece.killed === true) {
            return chessPiece;
        }
    }).forEach(function(chessPiece){
        let img = document.createElement("img");
        img.setAttribute("src", chessPiece.image);
        document.querySelector(".bluePlayerStats > .killed").appendChild(img)
    });
}

var generateGame = function () {
    playerChessBoard = createChessBoardBackEnd();
    renderChessBoardUI(playerChessBoard);

    placeChessPiecesAtStartingPosition(redPlayer);
    placeChessPiecesAtStartingPosition(bluePlayer);

    // disable blue chess piece because red always start first
    document.querySelectorAll('tr > td > img[color="blue"]').forEach(function(chessPieceElement) {
        chessPieceElement.removeEventListener("click", chessPieceClickEvent);
    });

    document.querySelector('.bluePlayer > .switch').addEventListener("click", buttonClickEvent);
    document.querySelector(".redPlayer > .turn").style.visibility = "visible";

    updateScoreBoard();
}

/*
=======================================
= helper function to support the game =
=======================================
*/
// determine whose turn is it and disable the enemy chess pieces
var endPlayerTurn = function () {
    if (redPlayer.turn === true) {
        // disable red chess pieces once red turn is over
        document.querySelectorAll('tr > td > img[color="red"]').forEach(function(chessPieceElement) {
            chessPieceElement.removeEventListener("click", chessPieceClickEvent);
        });

        redPlayer.turn = false;
        removeHoverEffectForChessPieces(redPlayer.color);
        document.querySelector(".redPlayer > .turn").style.visibility = "hidden";

        // enable blue chess pieces once his turn is over
        document.querySelectorAll('tr > td > img[color="blue"]').forEach(function(chessPieceElement) {
            chessPieceElement.addEventListener("click", chessPieceClickEvent);
        });

        bluePlayer.turn = true;
        addHoverEffectForChessPieces(bluePlayer.color);
        document.querySelector(".bluePlayer > .turn").style.visibility = "visible";

        updateScoreBoard();

    } else if (bluePlayer.turn === true) {
       // disable blue chess pieces once blue turn is over
        document.querySelectorAll('tr > td > img[color="blue"]').forEach(function(chessPieceElement) {
            chessPieceElement.removeEventListener("click", chessPieceClickEvent);
        });

        bluePlayer.turn = false;
        removeHoverEffectForChessPieces(bluePlayer.color);
        document.querySelector(".bluePlayer > .turn").style.visibility = "hidden";

        // enable red chess pieces once his turn is over
        document.querySelectorAll('tr > td > img[color="red"]').forEach(function(chessPieceElement) {
            chessPieceElement.addEventListener("click", chessPieceClickEvent);
        });

        redPlayer.turn = true;
        addHoverEffectForChessPieces(redPlayer.color);
        document.querySelector(".redPlayer > .turn").style.visibility = "visible";

        updateScoreBoard();
    }
}

var movePlayerChessPiece = function (cellElement) {
    selectedChessPieceElement.classList.remove("selected");
    selectedChessPieceElement.removeEventListener("click", chessPieceDeselectEvent);

    // update chess piece x and y coordinate and position for back end
    if (selectedChessPieceColor === "red") {
        movePlayerChessPieceUpdateBackEnd(redPlayer, cellElement)
    } else {
        movePlayerChessPieceUpdateBackEnd(bluePlayer, cellElement);
    }

    // move selected chess piece to this cell
    cellElement.appendChild(selectedChessPieceElement);

    //addEventForChessPieces(this);
    removeEventFromCells();

    selectedChessPieceElement = null;
}

// check if player win by checking if the enemy general is killed
var checkForWin = function (attackingPlayer, defendingPlayer) {
    defendingPlayer.chessPieces.forEach (function (chessPiece) {
        if (chessPiece.name === "general" && chessPiece.killed === true) {
            // disable the chess board since a player has been determined
            removeEventFromChessPieces();


            if (attackingPlayer.color === "red") {
                removeHoverEffectForChessPieces(defendingPlayer.color);

                setTimeout(function () {
                    alert(attackingPlayer.name + ", you have won the game :)");
                }, 250);
            } else if (attackingPlayer.color === "blue") {
                removeHoverEffectForChessPieces(defendingPlayer.color);

                setTimeout(function () {
                    alert(defendingPlayer.name + ", you have lose the game :(");
                }, 250);
            }

            attackingPlayer.win += 1;
            defendingPlayer.lose += 1;
            updateScoreBoard();

            return true;
        }
    });

    return false;
}

// alert player that he has been checkmate if the player general is in danger
var checkForCheckmate = function (attackingPlayer, defendingPlayer) {
    let defendingPlayerGeneralYCoordinate = "";
    let defendingPlayerGeneralXCoordinate = "";

    // get defending player general position
    defendingPlayer.chessPieces.forEach(function(chessPiece) {
        if (chessPiece.name === "general" && chessPiece.killed === false) {
            defendingPlayerGeneralYCoordinate = chessPiece.yCoordinate;
            defendingPlayerGeneralXCoordinate = chessPiece.xCoordinate;
        }
    });

    // check if the attacking player can win the game the next round based on all the possible move
    attackingPlayer.chessPieces.forEach(function(chessPiece) {
        let temp = chessPiece.possibleMoves();

        // there is no need to check for possible move for killed chess pieces
        // it is not possible to checkmate using general
        if (chessPiece.killed === false && chessPiece.name !== "general") {
            for (let i = 0; i < temp.length; i++) {
                let possibleMove = temp[i];

                if (defendingPlayerGeneralYCoordinate === possibleMove.possibleYCoordinate
                    && defendingPlayerGeneralXCoordinate === possibleMove.possibleXCoordinate) {

                        setTimeout(function () {
                            alert(defendingPlayer.name + ", you have been checkmate!");
                        }, 250);

                        break;
                }
            }
        }

    });
}

/*
================================
= helper function for elements =
================================
*/
// update the UI chess piece activity onto the back end array and chess piece data
var movePlayerChessPieceUpdateBackEnd = function (player, cellElement) {
    let chessPieceId = selectedChessPieceElement.getAttribute("id");

    let elementYCoordinate = cellElement.getAttribute("yCoordinate");
    let elementXCoordinate = cellElement.getAttribute("xCoordinate");

    player.chessPieces.forEach (function (chessPiece) {
        if (chessPiece.id === chessPieceId) {
            playerChessBoard[chessPiece.yCoordinate][chessPiece.xCoordinate] = "";

            // update the chess piece coordinate data
            chessPiece.yCoordinate = Number(elementYCoordinate);
            chessPiece.xCoordinate = Number(elementXCoordinate);

            playerChessBoard[elementYCoordinate][elementXCoordinate] = chessPiece;
        }
    });
}

var killEnemyChessPiece = function (cellElement) {
    if (selectedChessPieceColor === "red") {
        killEnemyChessPieceUpdateBackEnd(bluePlayer, cellElement.childNodes[0]);
    } else {
        killEnemyChessPieceUpdateBackEnd(redPlayer, cellElement.childNodes[0]);
    }

    cellElement.childNodes[0].remove();
}

var killEnemyChessPieceUpdateBackEnd = function (player, chessPieceToBeKilled) {
    let chessPieceToBeKilledId = chessPieceToBeKilled.getAttribute("id");
    player.chessPieces.forEach (function (chessPiece) {
        if (chessPiece.id === chessPieceToBeKilledId) {
            chessPiece.killed = true;
        }
    });
}

// add chess piece click event for all the chess pieces
var addEventForChessPieces = function (chessPieceElement) {
    let color = chessPieceElement.getAttribute("color");

    document.querySelectorAll('tr > td > img[color="' + color + '"]').forEach(function (chessPieceElement) {
        chessPieceElement.addEventListener("click", chessPieceClickEvent);
    });
}
// remove chess piece click event for all the chess pieces
var removeEventFromChessPieces = function () {
    document.querySelectorAll("table > tr > td > img").forEach(function (chessPieceElement) {
        chessPieceElement.removeEventListener("click", chessPieceClickEvent);
    });
}

// add chess piece hover css effect for all the chess pieces
var addHoverEffectForChessPieces = function (chessPieceColor) {
    document.querySelectorAll('.chessBoard > table > tr > td > img[color="' + chessPieceColor + '"]')
        .forEach(function(element) {
            element.className += "chessPiece";
        });
}

// remove chess piece hover css effect for all the chess pieces
var removeHoverEffectForChessPieces = function (chessPieceColor) {
    document.querySelectorAll('.chessBoard > table > tr > td > .chessPiece[color="' + chessPieceColor + '"]').forEach(function(element) {
            element.classList.remove("chessPiece");
        });
}

// add cell click event based on the possible movement by chess piece
var addEventForCells = function () {
    let yAxis = selectedChessPieceElement.parentElement.getAttribute("yCoordinate");
    let xAxis = selectedChessPieceElement.parentElement.getAttribute("xCoordinate");

    // get chess piece object from back end
    playerChessBoard[yAxis][xAxis].possibleMoves().forEach(function(move) {
        let cellElement = document.querySelector('[yCoordinate="' + move.possibleYCoordinate + '"][xCoordinate="' + move.possibleXCoordinate + '"]');

        if (redPlayer.turn === true) {
            cellElement.style.backgroundColor = "rgb(158, 0, 0, 0.3)";
        } else {
            cellElement.style.backgroundColor = "rgb(0, 94, 146, 0.3)";
        }

        cellElement.addEventListener("click", cellClickEvent);
    });
}

// remove cell click event for applicable cells
var removeEventFromCells = function () {
    document.querySelectorAll("table > tr > td").forEach(function (cellElement) {
        cellElement.style.backgroundColor = "";
        cellElement.removeEventListener("click", cellClickEvent);
    });
}

/*
=======================================
= event handler function for elements =
=======================================
*/
// click event for each chess piece
var chessPieceClickEvent = function (event) {
    selectedChessPieceElement = this;
    selectedChessPieceElement.className += " selected";

    this.addEventListener("click", chessPieceDeselectEvent);

    // remove hover css effect on other chess pieces
    removeHoverEffectForChessPieces(this.getAttribute("color"));

    removeEventFromChessPieces();
    addEventForCells();
}

// click event for selected chess piece to allow player to deselect
var chessPieceDeselectEvent = function (event) {
    this.classList.remove("selected");
    this.removeEventListener("click", chessPieceDeselectEvent);

    // add  hover css effect on other chess pieces when the chess piece has been deselected
    addHoverEffectForChessPieces(this.getAttribute("color"));

    addEventForChessPieces(this);
    removeEventFromCells();

    selectedChessPieceElement = null;
}

// click event for each cell when a chess piece event is triggered
var cellClickEvent = function (event) {
    selectedChessPieceColor = selectedChessPieceElement.getAttribute("color");

    if (this.childNodes.length > 0) {
        let cellChessPieceColor = this.childNodes[0].getAttribute("color");

        movePlayerChessPiece(this);
        killEnemyChessPiece(this);

        // add  hover css effect on other chess pieces when the chess piece has been deselected
        addHoverEffectForChessPieces(selectedChessPieceColor);
        endPlayerTurn();

        // check if player enemy general has been killed
        if (selectedChessPieceColor === "red") {
            checkForWin(redPlayer, bluePlayer);
            checkForCheckmate(redPlayer, bluePlayer);
        } else if (selectedChessPieceColor === "blue") {
            checkForWin(bluePlayer, redPlayer);
            checkForCheckmate(bluePlayer, redPlayer);
        }
    } else {
        movePlayerChessPiece(this);

        // add  hover css effect on other chess pieces when the chess piece has been deselected
        addHoverEffectForChessPieces(selectedChessPieceColor);
        endPlayerTurn();

        if (selectedChessPieceColor === "red") {
            checkForCheckmate(redPlayer, bluePlayer);
        } else if (selectedChessPieceColor === "blue") {
            checkForCheckmate(bluePlayer, redPlayer);
        }
    }

    if (enableComputerPlayer === true && bluePlayer.turn === true) {
        computerPlayerAction();
    }
}

// click event for selected chess piece to allow player to deselect
var buttonClickEvent = function (event) {
    let buttonElement = document.querySelector('.bluePlayer > .switch');
    let nameElement = document.querySelector('.bluePlayer > .name');
    let turnElement = document.querySelector('.bluePlayer > .turn');

    if (buttonElement.value === "on") {
        enableComputerPlayer = false;

        buttonElement.value = "off";

        buttonElement.innerHTML = "Turn On Computer Player";
        nameElement.innerHTML = "Human Blue"
        turnElement.innerHTML = "Your </br> Turn";

        bluePlayer.name = "Human Blue";

    } else if (buttonElement.value === "off") {
        enableComputerPlayer = true;

        buttonElement.value = "on";

        buttonElement.innerHTML = "Turn Off Computer Player";
        nameElement.innerHTML = "Computer Blue"
        turnElement.innerHTML = "Computer Turn";

        bluePlayer.name = "Computer Blue";
    }
}

/*
======================================
= function for computer blue player  =
======================================
*/
// get all possible move for computer player
var computerPlayerAction = function () {
    let bestPossibleMove = calculateBestMoveForComputerPlayer(playerChessBoard);

    let yAxis = bestPossibleMove.possibleYCoordinate;
    let xAxis = bestPossibleMove.possibleXCoordinate;

    setTimeout(function() {
        document.querySelector('[id="' + bestPossibleMove.id + '"]').click();
    }, 500);

    setTimeout(function() {
        document.querySelector('[yCoordinate="' + yAxis + '"][xCoordinate="' + xAxis + '"]').click();
    }, 1000);
}

var calculateBestMoveForComputerPlayer = function (chessBoard) {
    let highestScore = 0;
    let bestPossibleMove = [];
    let allPossibleMoves = getAllPossibleMoveForPlayer(bluePlayer, playerChessBoard);

    // compute the score for all the possible move snapshot
    for (let i = 0; i < allPossibleMoves.length; i++) {
        let possibleMoveChessPiece;
        let possibleMoveChessPieceId = allPossibleMoves[i].id;
        let possibleYMove = allPossibleMoves[i].possibleYCoordinate;
        let possibleXMove = allPossibleMoves[i].possibleXCoordinate;

        // create a snapshot of current board
        let snapshot = createSnapshot(chessBoard);

        // find the chess piece that will be moved based on the possible move
        for (let a = 0; a < snapshot.length; a++) {
            for (let b = 0; b < snapshot[a].length; b++) {
                if (snapshot[a][b].id === possibleMoveChessPieceId) {
                    chessPieceToBeMoved = snapshot[a][b];
                }
            }
        }

        // remove the chess piece from the original position and put it into the identify possible move
        snapshot[chessPieceToBeMoved.yCoordinate][chessPieceToBeMoved.xCoordinate] = "";
        snapshot[possibleYMove][possibleXMove] = chessPieceToBeMoved;

        // tag the scoring for each possible move
        allPossibleMoves[i]["score"] = evaluateBoardScore(bluePlayer, snapshot);
    }

    // find the possible move with the highest score
    for (let i = 0; i < allPossibleMoves.length; i++) {
        // this is to prevent 0 being a bigger number than negative value in the array
        if (i === 0) {
            highestScore = allPossibleMoves[i].score;
        }

        if (allPossibleMoves[i].score >= highestScore) {
            highestScore = allPossibleMoves[i].score;
        }
    }

    // pick one of the possible move with the highest score. It does not matter which so long as it is the highest
    for (let i = 0; i < allPossibleMoves.length; i++) {
        if (allPossibleMoves[i].score === highestScore) {
            bestPossibleMove = allPossibleMoves[i];
            break;
        }
    }

    return bestPossibleMove;
}

var getAllPossibleMoveForPlayer = function (player, chessBoard) {
    let possibleMoves = [];

    for (let a = 0; a < chessBoard.length; a++) {
        for (let b = 0; b < chessBoard[a].length; b++) {
            if (chessBoard[a][b].color === player.color) {
                chessBoard[a][b].possibleMoves().forEach(function(possibleMove) {
                    possibleMove["id"] = chessBoard[a][b].id;
                    possibleMove["name"] = chessBoard[a][b].name;
                    possibleMove["originalYCoordinate"] = chessBoard[a][b].yCoordinate;
                    possibleMove["originalXCoordinate"] = chessBoard[a][b].xCoordinate;

                    possibleMoves.push(possibleMove);
                });
            }
        }
    }

    return possibleMoves;
}

var evaluateBoardScore = function (player, chessBoard) {
    let score = 0;

    for (let a = 0; a < chessBoard.length; a++) {
        for (let b = 0; b < chessBoard[a].length; b++) {
            if (chessBoard[a][b] !== "") {
                if (chessBoard[a][b].color === player.color) {
                    score += chessBoard[a][b].weightage;
                } else {
                    // minus score for human player chess pieces
                    score -= chessBoard[a][b].weightage;
                }
            }
        }
    }
    return score;
}

var createSnapshot = function (chessBoard) {
     let snapshot = [ [],[],[],[],[],[],[],[],[],[] ];

    for (let a = 0; a < chessBoard.length; a++) {
        for (let b = 0; b < chessBoard[a].length; b++) {
            snapshot[a].push(chessBoard[a][b]);
        }
    }

    return snapshot;
}

/*
================================
= main                         =
================================
*/

let enableComputerPlayer = true;
generateGame();