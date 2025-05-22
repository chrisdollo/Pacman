class Pacman{
    constructor(x,y,width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = height;
        this.speed = speed;
        this.current_direction = RIGHT;
        this.nextDirection =  this.current_direction;
        this.frameCount = 7;
        
        // this.nextDirection = DOWN
        
        this.currentFrame = 1;

        setInterval(()=>{
            this.changeAnimation();
        }, 100)
    }


    moveProcess(){

        this.changeDirectionIfPossible();
        this.moveForwards();

        if(this.checkCollision()){
            this.moveBackwards();
            this.direction = tempDirection;
        }else{
            this.moveBackwards();
        }

        // this.currentDirection = this.nextDirection
    }

    eat(){}

    moveBackwards(){

        switch(this.currentDirection){
            case RIGHT:
                this.x -= this.speed;
                break;
            case LEFT:
                this.x += this.speed;
                break;
            case UP:
                this.y += this.speed;
                break;
            case DOWN:
                this.y -= this.speed;
                break;
        }

    }

    moveForwards(){

        switch(this.currentDirection){
            case RIGHT:
                this.x += this.speed;
                break;
            case LEFT:
                this.x -= this.speed;
                break;
            case UP:
                this.y -= this.speed;
                break;
            case DOWN:
                this.y += this.speed;
                break;
        }

    }

    checkCollision(){
        // chech if the x and y of pacman correspond to a block on the map that's 1

        if(  
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1 
            ){
            return true;
        }

        return false;
    }

    checkGhostCollision(){

    }

    changeDirectionIfPossible(){
        if (this.direction = this.nextDirection) return 

        let tempDirection = this.direction
        this.direction = this.nextDirection
        this.moveForwards();
        if (this.checkCollision()){
            this.moveBackwards();
        }
    }



    changeAnimation(){

        // we update the frame to the next one or the first
        this.currentFrame = ( (this.currentFrame == this.frameCount) ? 1 : this.currentFrame+1)

        this.update();
        // draw();
        

    }

    update(){
        // this.currentDirection = this.nextDirection;

        // console.log("this is the current direction: " + this.currentDirection)
    }

    // drawing Pacman on screen
    draw(){

        canvasContext.save();

        canvasContext.translate(
            this.x + blockSize /2,
            this.y + blockSize /2
        )

        canvasContext.rotate((this.currentDirection * 90 * Math.PI) / 180);

        canvasContext.translate(
            -this.x - blockSize / 2,
            -this.y - blockSize / 2
        )

        // the drawImage function allows us to draw on an image or parts of it on a canvas
        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * blockSize,
            0,
            blockSize,
            blockSize,
            this.x,
            this.y,
            this.width,
            this.heigth
        );

        canvasContext.restore();
    }



    getMapX(){
        return parseInt(this.x / blockSize);
    }

    getMapY(){
        return parseInt(this.y / blockSize);
    }

    getMapXRightSide(){
        return parseInt( (this.x + 0.999999 * blockSize) / blockSize);
    }

    getMapYRightSide(){
        return parseInt( (this.y + 0.999999 * blockSize) / blockSize);
    }

}