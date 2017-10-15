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
        this.players = [
            new Player,
            new Player
        ]
        // player positions
        this.players[0].position.x = 40; //left side
        this.players[1].position.x = this._canvas.width -40; //right side
       
        //center the player
        this.players.forEach(player => {
            // divide the height in two, thus centering the positions
            player.position.y = this._canvas.height / 2; 
        });

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

    // Where the ball meets the paddle
    collide(player, ball) {
        if(player.left < ball.right && player.right > ball.left &&
        player.top < ball.bottom && player.bottom > ball.top){
            ball.velocity.x = -ball.velocity.x;
        }
    }

    draw() {
        //background
        this._ctx.fillStyle = '#000'; //color
        this._ctx.fillRect(0,0, this._canvas.width, this._canvas.height); 

        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));
    }

    drawRect(rect) {
        // Ball
        this._ctx.fillStyle = '#fff';
        this._ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
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

        // make the oponent follow the ball
        this.players[1].position.y = this.ball.position.y;

        this.players.forEach(player => this.collide(player, this.ball));

        this.draw();
    }
}

// **NOTE**
// The super keyword is used to call functions on an object's parent.

class Player extends Rect {
    constructor(){
        // this is calling the width and height on the Rect constructor
        super(20, 100); 
 
        this.score = 0;
    } 
 }

const pong = new Pong(canvas);

//responds to the postion of mouse clicks
window.addEventListener('mousemove', event => {
    pong.players[0].position.y = event.offsetY; // up and down
    pong.players[0].position.x = event.offsetX;// left and right
});


window.addEventListener('keydown', event => {
    pong.players[0].position.y = event.keyCode;
    

});




