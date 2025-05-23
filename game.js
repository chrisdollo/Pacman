
const canvas = document.getElementById("canvas");

// getContext is used with thte HTML canvas tag,
// it tells the browser how you want to draw on the canvas (2d, webg1 webg12)

const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghost = document.getElementById("ghost")

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}




let blockSize = 20;
let fps = 30;
let wallSpaceWidth = blockSize/ 1.5;
let wallOffset = (blockSize - wallSpaceWidth)/2;

let wallColor = "red";
let InnerWallCollor = "black";
let pacman;






let RIGHT = 4;
let LEFT = 2;
let UP = 3;
let DOWN = 1;





let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


let gameLoop = () =>{
    update();
    draw();
}

let update = () =>{
    pacman.moveProcess();
}


let draw = () => {

    // we make the canvas background black
    createRect (0, 0, canvas.width, canvas.height, "black");

    drawWalls();
    pacman.draw();
}

let gameInterval = setInterval(gameLoop, 1000 /fps);

let drawWalls = () => {
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j <map[0].length ; j++){
            
            // if it's a wall
            if (map[i][j] == 1){
                createRect(
                    j * blockSize, 
                    i * blockSize, 
                    blockSize, 
                    blockSize, 
                    wallColor
                );
            }


            if (j > 0 && map[i][j-1] == 1 ){
                createRect(
                    j * blockSize , 
                    i * blockSize + wallOffset, 
                    wallSpaceWidth + wallOffset, 
                    wallSpaceWidth, 
                    InnerWallCollor
                );
            }


            if (j < map[0].length -1 && map[i][j+1] == 1 ){
                createRect(
                    j * blockSize + wallOffset, 
                    i * blockSize + wallOffset, 
                    wallSpaceWidth + wallOffset, 
                    wallSpaceWidth, 
                    InnerWallCollor
                );
            }





            if (i > 0 && map[i-1][j] == 1 ){
                createRect(
                    j * blockSize + wallOffset, 
                    i * blockSize, 
                    wallSpaceWidth , 
                    wallSpaceWidth + wallOffset, 
                    InnerWallCollor
                );
            }



            if (i < map.length - 1 && map[i + 1][j] == 1){
                createRect(
                    j * blockSize + wallOffset, 
                    i * blockSize + wallOffset, 
                    wallSpaceWidth , 
                    wallSpaceWidth + wallOffset, 
                    InnerWallCollor
                );
            }
        }
    }
}






let createNewPacman = () => {
    pacman = new Pacman(
        blockSize,
        blockSize,
        blockSize,
        blockSize,
        blockSize/5,
    );
};


createNewPacman();
gameLoop();



window.addEventListener("keydown", (event) => {

    let k = event.keyCode;

    if (k == 37 || k == 65){
        // left arrow or a
        pacman.nextDirection = LEFT;
        console.log("fessssseeesss");
    } else if (k == 38 || k == 87){
        // up arrow or a
        pacman.nextDirection = UP;
        console.log("my gad");
    } else if (k == 39 || k == 68){
        // up arrow or a
        pacman.nextDirection = RIGHT;
        console.log("eussss");
    } else if (k == 40 || k == 83){
        // up arrow or a
        pacman.nextDirection = DOWN;
        console.log("you");
    }
})