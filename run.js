const canvas= document.getElementById('game');
const ctx= canvas.getContext('2d');
class SnakePart{
    constructor(x,y){
        this.x= x;
        this.y= y;
    }
}
let speed= 10;
let tileCount= 20;
let tileSize= canvas.width/tileCount-2;
let headX= 10;
let headY= 10;
const snakeParts= [];
let tailLength= 0;
let appleX= 5;
let appleY= 5;
let xVelocity= 0;
let yVelocity= 0;
let score= 0;
const biteSound= new Audio('bite.wav');
const finishSound= new Audio('finish.wav');

function drawGame(){
    clearScreen();
    changeSnakePosition();
    let result= isGameOver();
    if(result){
        return;
    }
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/ speed);
}
function clearScreen(){
    ctx.fillStyle= 'blue';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawScore(){
    ctx.fillStyle= 'black';
    ctx.font= '18px bolder'
    ctx.fillText('Score: '+score, canvas.width-75, 15);
}
function drawApple(){
    ctx.fillStyle= 'orange';
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}
function drawSnake(){
    ctx.fillStyle= 'red';
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
    ctx.fillStyle= 'pink';
    for(let i=0; i<snakeParts.length; i++){
        let part= snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length>tailLength){
        snakeParts.shift();
    }
}
function changeSnakePosition(){
    headX= headX+xVelocity;
    headY= headY+yVelocity;
}
function checkAppleCollision(){
    if(appleX==headX && appleY==headY){
        appleX= Math.floor(Math.random()*tileCount);
        appleY= Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        biteSound.play();
    }
}
function isGameOver(){
    let gameOver= false;
    if(yVelocity==0 && xVelocity==0){
        return false;
    }
    if(headX<0){
        gameOver= true;
    }
   else if(headX==tileCount){
        gameOver= true;
    }
    else if(headY<0){
        gameOver=true;
    }
    else if(headY==tileCount){
        gameOver= true;
    }
    for(let i=0; i<snakeParts.length; i++){
        let part= snakeParts[i];
        if(part.x==headX && part.y==headY){
            gameOver= true;
            break;
        }
    }
    if(gameOver){
        ctx.font= '48px bolder';
        var gradient=ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop('0.3', 'black');
        gradient.addColorStop('0.5', 'gray');
        gradient.addColorStop('0.6', 'green');
        gradient.addColorStop('0.7', 'yellow');
        ctx.fillStyle= gradient;
        ctx.fillText('WASTED! '+ score, canvas.width/4.5, canvas.height/2);
        finishSound.play();
    }
    return gameOver;
}
document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    if(event.keyCode== 38){
        if(yVelocity== 1)
        return;
        yVelocity= -1;
        xVelocity= 0;
    }
    if(event.keyCode== 40){
        if(yVelocity== -1)
        return;
        yVelocity= 1;
        xVelocity= 0;
    }
    if(event.keyCode== 37){
        if(xVelocity== 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }
    if(event.keyCode== 39){
        if(xVelocity== -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}
drawGame();
