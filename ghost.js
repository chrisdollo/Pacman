class Ghost{
    constructor(x,y,width, height, speed, imageX, imageY, imageWidth, imageHeigth, range) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = height;
        this.speed = speed;
        this.currentDirection = RIGHT

        
        this.currentFrame = 1;
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageWidth = imageWidth;
        this.imageHeigth = imageHeigth;
        this.range = range;
    }


    moveProcess(){

        this.changeDirectionIfPossible();
        this.moveForwards();

        if(this.checkCollision()){
            this.moveBackwards();
            return;
        }

        // this.currentDirection = this.nextDirection
    }


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

        // console.log(" BEING CALLED: " + this.currentDirection)

        // console.log("this is the current direction: " + this.currentDirection)
        // console.log("this is the next direction: " + this.nextDirection)

        if (this.direction == this.nextDirection) return 

        let tempDirection = this.currentDirection;
        this.currentDirection = this.nextDirection;
        this.moveForwards();

        if (this.checkCollision()){
            this.moveBackwards();
            this.currentDirection = tempDirection;
        }
        else{
            this.moveBackwards();
        }


        // console.log("this is the current direction: " + this.currentDirection)
        // console.log("this is the next direction: " + this.nextDirection)
    }



    changeAnimation(){
        // we update the frame to the next one or the first
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame+1
        // this.update();
        // this.currentDirection = this.nextDirection;


        // console.log("this is the current direction: " + this.currentDirection)
        // console.log("this is the next direction: " + this.nextDirection)
        // draw();
    }

    update(){
        // console.log("this is the current direction: " + this.currentDirection)
    }

    // drawing Pacman on screen
    draw(){

      

        // the drawImage function allows us to draw on an image or parts of it on a canvas
        canvasContext.drawImage(
            ghostFrames,
            this.imageX,
            this.imageY,
            this.imageWidth,
            this.imageHeigth,
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