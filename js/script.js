// create back end 10 x 9 chess board
var createChessBoard = function () {
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
var createChessBoardUI = function (chessBoard) {
    let tableElement = document.createElement("table");
    tableElement.className = "board";

    for (let a = 0; a < chessBoard.length; a++) {
        let rowElement = document.createElement("tr");

        for (let b = 0; b < chessBoard[a].length; b++) {
            let cellElement = document.createElement("td");

            cellElement.setAttribute("coordinate" , a + "," + b);
            cellElement.textContent = "";

            rowElement.appendChild(cellElement);
        }

        tableElement.appendChild(rowElement);
    }

    document.querySelector(".chessBoard").appendChild(tableElement);
}

// set the starting position for on the chess board
var placeChessPiecesAtStartingPosition = function (redPlayer, bluePlayer) {

    // place the chess pieces for both the players on the game board
    redPlayer.chessPieces.forEach(function (chessPiece) {
        let temp = document.querySelector('td[coordinate="' + chessPiece.coordinate + '"]');
        let imgElement = document.createElement("img");
        imgElement.setAttribute( "src", chessPiece.image );

        temp.appendChild(imgElement);
    });

    bluePlayer.chessPieces.forEach(function (chessPiece) {
        let temp = document.querySelector('td[coordinate="' + chessPiece.coordinate + '"]');
        let imgElement = document.createElement("img");
        imgElement.setAttribute( "src", chessPiece.image );

        temp.appendChild(imgElement);
    });
}

var chessMoveEvent = function () {

}

createChessBoardUI(createChessBoard());
placeChessPiecesAtStartingPosition(redPlayer, bluePlayer);