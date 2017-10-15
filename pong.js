const canvas = document.getElementById('pong');


class Vect{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

class Rect{
    constructor(w, h) {
        this.position = new Vect;
        this.size = new Vect(w, h);
    }

    // sides of rectangle
    // 'get' adds a function property on the Rect object that will run when looked up

    get left(){
       return this.position.x - this.size.x / 2;
    }
    
    get right(){
       return this.position.x + this.size.x / 2;
    }
    
    get top(){
       return this.position.y - this.size.y / 2;
    }
    
    get bottom(){
       return this.position.y + this.size.y / 2;
    }
}



class Ball extends Rect{
    constructor() {
        super(10, 10);
        this.velocity = new Vect;
    }
}

class Pong{
    constructor(canvas){
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');

        //speed and posittion of ball
        this.ball = new Ball;
        this.ball.position.x = 100;
        this.ball.position.y = 50;
        
        this.ball.velocity.x = 200;
        this.ball.velocity.y = 200;

        //Players
        // this.players = [
        //     new Player,
        //     new Player
        // ]


        // Animation Frame
            let lastTime;
            const callback = (milliseconds) => {
                 if(lastTime){
                    this.update((milliseconds - lastTime) / 1000);
                 }
                lastTime = milliseconds;
                requestAnimationFrame(callback);
            }
            callback();
    }
    draw() {
        //background
        this._ctx.fillStyle = '#000'; //color
        this._ctx.fillRect(0,0, this._canvas.width, this._canvas.height); 

        this.drawRect(this.ball);
    }

    drawRect(rect) {
        // Ball
        this._ctx.fillStyle = '#fff';
        this._ctx.fillRect(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
    }
        

    // ball movement
    update(timeDifference) {
        this.ball.position.x += this.ball.velocity.x * timeDifference;
        this.ball.position.y += this.ball.velocity.y * timeDifference;

        if(this.ball.left < 0 || this.ball.right > this._canvas.width) {
            this.ball.velocity.x = -this.ball.velocity.x;
        }
        if(this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }

        this.draw();
    }
}



const pong = new Pong(canvas);









