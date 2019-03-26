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
    let redDivNameElement = document.createElement("div");
    redDivNameElement.className = "name";

    let redDivStatslement = document.createElement("div");
    redDivStatslement.className = "stats";

    let redDivKilledElement = document.createElement("div");
    redDivKilledElement.className = "killed";

    document.querySelector(".redPlayer").appendChild(redDivNameElement);
    document.querySelector(".redPlayer").appendChild(redDivStatslement);
    document.querySelector(".redPlayer").appendChild(redDivKilledElement);

    // create score board for blue
    let blueDivNameElement = document.createElement("div");
    blueDivNameElement.className = "name";

    let blueDivStatslement = document.createElement("div");
    blueDivStatslement.className = "stats";

    let blueDivKilledElement = document.createElement("div");
    blueDivKilledElement.className = "killed";

    document.querySelector(".bluePlayer").appendChild(blueDivNameElement);
    document.querySelector(".bluePlayer").appendChild(blueDivStatslement);
    document.querySelector(".bluePlayer").appendChild(blueDivKilledElement);
}

var updateScoreBoard = function () {
    document.querySelector(".redPlayer > .name").innerHTML = "Name: " + redPlayer.name;
    document.querySelector(".redPlayer > .stats").innerHTML = "Win: " + redPlayer.win + " Loss: " + redPlayer.loss;
    document.querySelector(".redPlayer > .killed").innerHTML = "Chess Piece Killed: " + "0";

    document.querySelector(".bluePlayer > .name").innerHTML = "Name: " + bluePlayer.name;
    document.querySelector(".bluePlayer > .stats").innerHTML = "Win: " + bluePlayer.win + " Loss: " + bluePlayer.loss;
    document.querySelector(".bluePlayer > .killed").innerHTML = "Chess Piece Killed: " + "0";
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

    updateScoreBoard();
}

/*
================================
= helper function for the game =
================================
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

        // enable blue chess pieces once his turn is over
        document.querySelectorAll('tr > td > img[color="blue"]').forEach(function(chessPieceElement) {
            chessPieceElement.addEventListener("click", chessPieceClickEvent);
        });

        bluePlayer.turn = true;
        addHoverEffectForChessPieces(bluePlayer.color);
        updateScoreBoard();

    } else if (bluePlayer.turn === true) {
       // disable blue chess pieces once blue turn is over
        document.querySelectorAll('tr > td > img[color="blue"]').forEach(function(chessPieceElement) {
            chessPieceElement.removeEventListener("click", chessPieceClickEvent);
        });

        bluePlayer.turn = false;
        removeHoverEffectForChessPieces(bluePlayer.color);

        // enable red chess pieces once his turn is over
        document.querySelectorAll('tr > td > img[color="red"]').forEach(function(chessPieceElement) {
            chessPieceElement.addEventListener("click", chessPieceClickEvent);
        });

        redPlayer.turn = true;
        addHoverEffectForChessPieces(redPlayer.color);
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

            setTimeout(function () {
                alert(attackingPlayer.name + ", you have won the game!");
            }, 250);
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

        cellElement.style.backgroundColor = "rgb(255, 134, 134, 0.6)";
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
================================
= helper function for elements =
================================
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

        // disable friendly fire
        if (selectedChessPieceColor === cellChessPieceColor) {
            alert("You cannot attack your own " + this.childNodes[0].getAttribute("displayName") + "!");
        } else {
            movePlayerChessPiece(this);
            killEnemyChessPiece(this);

            // check if player enemy general has been killed
            if (selectedChessPieceColor === "red") {
                checkForWin(redPlayer, bluePlayer);
            } else {
                checkForWin(bluePlayer, redPlayer);
            }

            // add  hover css effect on other chess pieces when the chess piece has been deselected
            addHoverEffectForChessPieces(selectedChessPieceColor);

            endPlayerTurn();
        }
    } else {
            movePlayerChessPiece(this);

            // add  hover css effect on other chess pieces when the chess piece has been deselected
            addHoverEffectForChessPieces(selectedChessPieceColor);

        endPlayerTurn();
    }
}

/*
================================
= main                         =
================================
*/
generateGame();