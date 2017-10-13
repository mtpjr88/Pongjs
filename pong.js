
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

}

class Ball extends Rect{
    constructor() {
        super(10, 10);
        this.velocity = new Vect;
    }
}

const ball = new Ball;
ball.position.x = 100;
ball.position.y = 50;

ball.velocity.x = 100;
ball.velocity.y = 100;

// Animation Frame
let lastTime;
function callback(milliseconds) {
    if(lastTime){
     update((milliseconds - lastTime) / 1000);
 }
    lastTime = milliseconds;
    requestAnimationFrame(callback);
}

// ball movement
function update(timeDifference) {
    ball.position.x += ball.velocity.x * timeDifference;
    ball.position.y += ball.velocity.y * timeDifference;

    if(ball.position.x < 0 || ball.position.x > canvas.width) {
        ball.velocity.x = -ball.velocity.x;
    }
    if(ball.position.y < 0 || ball.position.y > canvas.height) {
        ball.velocity.y = -ball.velocity.y;
    }

    //background
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // Ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.position.x, ball.position.y, ball.size.x, ball.size.y);
}

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

callback();
