let imageFilePath = "img/";

let redPlayer = {
    name: "Red Player",
    color: "red",
    turn: true,
    win: 0,
    loss: 0,
    chessPieces:
    [{
        id: "r-j-1",
        name: "jiang",
        coordinate: "9,4",
        image: imageFilePath + "red-jiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-s-1",
        name: "shi",
        coordinate: "9,3",
        image: imageFilePath + "red-shi.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-s-2",
        name: "shi",
        coordinate: "9,5",
        image: imageFilePath + "red-xiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-x-1",
        name: "xiang",
        coordinate: "9,2",
        image: imageFilePath + "red-xiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-x-2",
        name: "xiang",
        coordinate: "9,6",
        image: imageFilePath + "red-xiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-m-1",
        name: "ma",
        coordinate: "9,1",
        image: imageFilePath + "red-ma.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-m-2",
        name: "ma",
        coordinate: "9,7",
        image: imageFilePath + "red-ma.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-c-1",
        name: "che",
        coordinate: "9,0",
        image: imageFilePath + "red-che.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-c-2",
        name: "che",
        coordinate: "9,8",
        image: imageFilePath + "red-che.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-p-1",
        name: "pao",
        coordinate: "7,1",
        image: imageFilePath + "red-pao.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-p-2",
        name: "pao",
        coordinate: "7,7",
        image: imageFilePath + "red-pao.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-b-1",
        name: "bing",
        rankUp: false,
        coordinate: "6,0",
        image: imageFilePath + "red-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-b-2",
        name: "bing",
        rankUp: false,
        coordinate: "6,2",
        image: imageFilePath + "red-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-b-3",
        name: "bing",
        rankUp: false,
        coordinate: "6,4",
        image: imageFilePath + "red-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-b-4",
        name: "bing",
        rankUp: false,
        coordinate: "6,6",
        image: imageFilePath + "red-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "r-b-5",
        name: "bing",
        rankUp: false,
        coordinate: "6,8",
        image: imageFilePath + "red-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
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
        name: "jiang",
        coordinate: "0,4",
        image: imageFilePath + "blue-jiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-s-1",
        name: "shi",
        coordinate: "0,3",
        image: imageFilePath + "blue-shi.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-s-2",
        name: "shi",
        coordinate: "0,5",
        image: imageFilePath + "blue-xiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-x-1",
        name: "xiang",
        coordinate: "0,2",
        image: imageFilePath + "blue-xiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-x-2",
        name: "xiang",
        coordinate: "0,6",
        image: imageFilePath + "blue-xiang.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-m-1",
        name: "ma",
        coordinate: "0,1",
        image: imageFilePath + "blue-ma.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-m-2",
        name: "ma",
        coordinate: "0,7",
        image: imageFilePath + "blue-ma.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-c-1",
        name: "che",
        coordinate: "0,0",
        image: imageFilePath + "blue-che.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-c-2",
        name: "che",
        coordinate: "0,8",
        image: imageFilePath + "blue-che.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-p-1",
        name: "pao",
        coordinate: "2,1",
        image: imageFilePath + "blue-pao.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-p-2",
        name: "pao",
        coordinate: "2,7",
        image: imageFilePath + "blue-pao.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-b-1",
        name: "bing",
        rankUp: false,
        coordinate: "3,0",
        image: imageFilePath + "blue-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-b-2",
        name: "bing",
        rankUp: false,
        coordinate: "3,2",
        image: imageFilePath + "blue-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-b-3",
        name: "bing",
        rankUp: false,
        coordinate: "3,4",
        image: imageFilePath + "blue-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-b-4",
        name: "bing",
        rankUp: false,
        coordinate: "3,6",
        image: imageFilePath + "blue-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    },
    {
        id: "b-b-5",
        name: "bing",
        rankUp: false,
        coordinate: "3,8",
        image: imageFilePath + "blue-bing.svg",
        weightage: "0",
        endangered: false,
        killed: false,
        movement: "one"
    }]
}