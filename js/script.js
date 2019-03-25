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
}

// set the starting position for on the chess board
var placeChessPiecesAtStartingPosition = function (player) {
    player.chessPieces.forEach (function (chessPiece) {
        let cellElement = document.querySelector('[yCoordinate="' + chessPiece.yCoordinate + '"][xCoordinate="' + chessPiece.xCoordinate + '"]');
        let imgElement = document.createElement("img");

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

// check if player win by checking if the enemy general is killed
var disableChessBoard = function () {
    document.querySelectorAll('.chessBoard > table > tr > td > img').forEach (function (element) {
        element.className += "disableChessPiece";
    });
    removeEventFromChessPieces();
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

    addEventFromChessPieces();
    removeEventFromCells();

    selectedChessPieceElement = null;
}

// update the UI chess piece activity onto the back end array and chess piece data
var movePlayerChessPieceUpdateBackEnd = function (player, cellElement) {
    let chessPieceId = selectedChessPieceElement.getAttribute("id");

    let elementYCoordinate = cellElement.getAttribute("yCoordinate");
    let elementXCoordinate = cellElement.getAttribute("xCoordinate");

    player.chessPieces.forEach (function (chessPiece) {
        if (chessPiece.id === chessPieceId) {
            playerChessBoard[chessPiece.yCoordinate][chessPiece.xCoordinate] = "";

            // update the chess piece coordinate data
            chessPiece.yCoordinate = elementYCoordinate;
            chessPiece.xCoordinate = elementXCoordinate;

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
var addEventFromChessPieces = function () {
    document.querySelectorAll("table > tr > td > img").forEach(function (chessPieceElement) {
        chessPieceElement.addEventListener("click", chessPieceClickEvent);
    });
}
// remove chess piece click event for all the chess pieces
var removeEventFromChessPieces = function () {
    document.querySelectorAll("table > tr > td > img").forEach(function (chessPieceElement) {
        chessPieceElement.removeEventListener("click", chessPieceClickEvent);
    });
}

// add cell click event for applicable cells
var addEventFromCells = function () {
    document.querySelectorAll("table > tr > td").forEach(function (cellElement) {
        if (selectedChessPieceElement.parentElement !== cellElement) {
            cellElement.style.backgroundColor = "rgb(242, 238, 205, 0.5)";
            cellElement.addEventListener("click", cellClickEvent);
        }
    });
}

// remove cell click event for applicable cells
var removeEventFromCells = function () {
    document.querySelectorAll("table > tr > td").forEach(function (cellElement) {
        cellElement.style.backgroundColor = "";
        cellElement.removeEventListener("click", cellClickEvent);
    });
}

// click event for each chess piece
var chessPieceClickEvent = function (event) {
    selectedChessPieceElement = this;
    selectedChessPieceElement.className += "selected";

    this.addEventListener("click", chessPieceDeselectEvent);

    removeEventFromChessPieces();
    addEventFromCells();
}

// click event for selected chess piece to allow player to deselect
var chessPieceDeselectEvent = function (event) {
    this.classList.remove("selected");
    this.removeEventListener("click", chessPieceDeselectEvent);

    addEventFromChessPieces();
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
        }
    } else {
        movePlayerChessPiece(this);
    }
}

// check if player win by checking if the enemy general is killed
var checkForWin = function (attackingPlayer, defendingPlayer) {
    defendingPlayer.chessPieces.forEach (function (chessPiece) {
        if (chessPiece.name === "general" && chessPiece.killed === true) {
            disableChessBoard();

            setTimeout(function () {
                alert("You have defeated your enemy " + chessPiece.displayName + "!\n\n"
                    + attackingPlayer.name + ", you have won the game!");
            }, 250);

            setGameMessage("You have defeated your enemy " + chessPiece.displayName + "!\n\n"
                    + attackingPlayer.name + ", you have won the game!");

        }
    });
}

// set game message for the player
var setGameMessage = function (message) {
    document.querySelector(".gameMessage").innerHTML = message;
}

// main
let playerChessBoard = createChessBoardBackEnd();

renderChessBoardUI(playerChessBoard);
placeChessPiecesAtStartingPosition(redPlayer);
placeChessPiecesAtStartingPosition(bluePlayer);

// outstanding task
// 1 .set the turn for players. disable the enemy chess piece when it is the player's turn
// 2. create movement pattern for each of the chess piece
//    - flying general
//    - upgrade soldier movement
// 3. create a score board for players
// 4. improve UI to allow player to know each other turn
// 5. implement a computer player