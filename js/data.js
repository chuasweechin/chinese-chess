let yAxisBoundary = 9;
let xAxisBoundary = 8;
let imageFilePath = "img/";
let selectedChessPieceElement = "";

let redPlayer = {
    name: "Red Player",
    color: "red",
    turn: true,
    win: 0,
    loss: 0,
    chessPieces:
    [{
        id: "r-j-1",
        color: "red",
        name: "General",
        yCoordinate: "9",
        xCoordinate: "4",
        image: imageFilePath + "red-general.svg",
        killed: false
    },
    {
        id: "r-s-1",
        color: "red",
        name: "Advisor",
        yCoordinate: "9",
        xCoordinate: "3",
        image: imageFilePath + "red-advisor.svg",
        killed: false
    },
    {
        id: "r-s-2",
        color: "red",
        name: "Advisor",
        yCoordinate: "9",
        xCoordinate: "5",
        image: imageFilePath + "red-advisor.svg",
        killed: false
    },
    {
        id: "r-x-1",
        color: "red",
        name: "Elephant",
        yCoordinate: "9",
        xCoordinate: "2",
        image: imageFilePath + "red-elephant.svg",
        killed: false
    },
    {
        id: "r-x-2",
        color: "red",
        name: "Elephant",
        yCoordinate: "9",
        xCoordinate: "6",
        image: imageFilePath + "red-elephant.svg",
        killed: false
    },
    {
        id: "r-m-1",
        color: "red",
        name: "Horse",
        yCoordinate: "9",
        xCoordinate: "1",
        image: imageFilePath + "red-horse.svg",
        killed: false
    },
    {
        id: "r-m-2",
        color: "red",
        name: "Horse",
        yCoordinate: "9",
        xCoordinate: "7",
        image: imageFilePath + "red-horse.svg",
        killed: false
    },
    {
        id: "r-c-1",
        color: "red",
        name: "Chariot",
        yCoordinate: "9",
        xCoordinate: "0",
        image: imageFilePath + "red-chariot.svg",
        killed: false
    },
    {
        id: "r-c-2",
        color: "red",
        name: "Chariot",
        yCoordinate: "9",
        xCoordinate: "8",
        image: imageFilePath + "red-chariot.svg",
        killed: false
    },
    {
        id: "r-p-1",
        color: "red",
        name: "Cannon",
        yCoordinate: "7",
        xCoordinate: "1",
        image: imageFilePath + "red-cannon.svg",
        killed: false
    },
    {
        id: "r-p-2",
        color: "red",
        name: "Cannon",
        yCoordinate: "7",
        xCoordinate: "7",
        image: imageFilePath + "red-cannon.svg",
        killed: false
    },
    {
        id: "r-b-1",
        color: "red",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "6",
        xCoordinate: "0",
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-b-2",
        color: "red",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "6",
        xCoordinate: "2",
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-b-3",
        color: "red",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "6",
        xCoordinate: "4",
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-b-4",
        color: "red",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "6",
        xCoordinate: "6",
        image: imageFilePath + "red-soldier.svg",
        killed: false
    },
    {
        id: "r-b-5",
        color: "red",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "6",
        xCoordinate: "8",
        image: imageFilePath + "red-soldier.svg",
        killed: false
    }]
}

let bluePlayer = {
    name: "Blue Player",
    color: "blue",
    turn: true,
    win: 0,
    loss: 0,
    chessPieces:
    [{
        id: "b-j-1",
        color: "blue",
        name: "General",
        yCoordinate: "0",
        xCoordinate: "4",
        image: imageFilePath + "blue-general.svg",
        killed: false
    },
    {
        id: "b-s-1",
        color: "blue",
        name: "Advisor",
        yCoordinate: "0",
        xCoordinate: "3",
        image: imageFilePath + "blue-advisor.svg",
        killed: false
    },
    {
        id: "b-s-2",
        color: "blue",
        name: "Advisor",
        yCoordinate: "0",
        xCoordinate: "5",
        image: imageFilePath + "blue-advisor.svg",
        killed: false
    },
    {
        id: "b-x-1",
        color: "blue",
        name: "Elephant",
        yCoordinate: "0",
        xCoordinate: "2",
        image: imageFilePath + "blue-elephant.svg",
        killed: false
    },
    {
        id: "b-x-2",
        color: "blue",
        name: "Elephant",
        yCoordinate: "0",
        xCoordinate: "6",
        image: imageFilePath + "blue-elephant.svg",
        killed: false
    },
    {
        id: "b-m-1",
        color: "blue",
        name: "Horse",
        yCoordinate: "0",
        xCoordinate: "1",
        image: imageFilePath + "blue-horse.svg",
        killed: false
    },
    {
        id: "b-m-2",
        color: "blue",
        name: "Horse",
        yCoordinate: "0",
        xCoordinate: "7",
        image: imageFilePath + "blue-horse.svg",
        killed: false
    },
    {
        id: "b-c-1",
        color: "blue",
        name: "Chariot",
        yCoordinate: "0",
        xCoordinate: "0",
        image: imageFilePath + "blue-chariot.svg",
        killed: false
    },
    {
        id: "b-c-2",
        color: "blue",
        name: "Chariot",
        yCoordinate: "0",
        xCoordinate: "8",
        image: imageFilePath + "blue-chariot.svg",
        killed: false
    },
    {
        id: "b-p-1",
        color: "blue",
        name: "Cannon",
        yCoordinate: "2",
        xCoordinate: "1",
        image: imageFilePath + "blue-cannon.svg",
        killed: false
    },
    {
        id: "b-p-2",
        color: "blue",
        name: "Cannon",
        yCoordinate: "2",
        xCoordinate: "7",
        image: imageFilePath + "blue-cannon.svg",
        killed: false
    },
    {
        id: "b-b-1",
        color: "blue",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "3",
        xCoordinate: "0",
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-b-2",
        color: "blue",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "3",
        xCoordinate: "2",
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-b-3",
        color: "blue",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "3",
        xCoordinate: "4",
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-b-4",
        color: "blue",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "3",
        xCoordinate: "6",
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    },
    {
        id: "b-b-5",
        color: "blue",
        name: "Soldier",
        rankUp: false,
        yCoordinate: "3",
        xCoordinate: "8",
        image: imageFilePath + "blue-soldier.svg",
        killed: false
    }]
}