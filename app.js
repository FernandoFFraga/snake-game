var canva_height = 30;
var canva_width  = 51;
var pixel_size = 15;

var canva_pixels = "";
var canva_status = [];

var game = [];
game.ready = true;
game.end = false;
game.food = false;
game.speed = 50;
game.mode = "normal";

snake = {};
snake.size = 4;
snake.axis = 0; //0 - Vertical, 1 - Horizontal
snake.direction = -1; //1 - Cima e direita, 0 - Baixo e esquerda
snake.food = false;

snake.newAxis = 0;
snake.newDirection = -1;
snake.directionChanges = false;



snake.body = [
    [26,18],
    [26,17],
    [26,16],
    [26,15],
]

for (let y = 0; y < canva_height; y++) {
    canva_status[y] = [];
    for (let x = 0; x < canva_width; x++) {
       canva_status[y][x] = 0;
    }
}

$("#viewer").attr("width", canva_width*pixel_size);
$("#viewer").attr("height", canva_height*pixel_size);

var canvas = document.getElementById("viewer");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "#F1F1F1";
ctx.fillRect(0, 0, (canva_width*pixel_size), (canva_height*pixel_size));


//Start Snake
for (let i = 0; i < snake.body.length; i++) {
    updatePixel(snake.body[i][0], snake.body[i][1], 'snake');
}

var strip = true;
function updatePixel(x, y, value) {
    if(value == "snake") {
        if(game.mode == "mengo") {
            if(strip) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "black";
            }
        strip = !strip;
        } else {
            ctx.fillStyle = "rgb(53, 173, 79)";
        }
        
        var sts = 1;
    } else if (value == "food") {
        if(game.mode == "mengo") {
            ctx.fillStyle = "rgb(53, 173, 79)";
        } else {
            ctx.fillStyle = "rgb(182, 42, 42)";
        }
        var sts = 2;
    } else {
        ctx.fillStyle = "#F1F1F1";
        var sts = 0;
    }

    ctx.fillRect((x*pixel_size), (y*pixel_size), pixel_size, pixel_size);
    canva_status[y][x] = sts;
}

function calculateNextPixel() {
    var size = snake.size - 1;

    var x = snake.body[size][0];
    var y = snake.body[size][1];

    if (snake.axis == 1) {
        x = x + snake.direction;    
        
        if(x > (canva_width - 1)) {
            x = 0;
        } else if(x < 0){
            x = canva_width - 1;
        }
        
    } else {
        y = y + snake.direction;

        if(y > (canva_height - 1)) {
            y = 0;
        } else if(y < 0){
            y = canva_height - 1;
        }
    }


    if(validatePixel(x, y)){
        snake.body.push([x, y]);
        updatePixel(x, y, 'snake');
        
        if(!snake.food) {
            updatePixel(snake.body[0][0], snake.body[0][1], '');
            snake.body.shift();
        } else {
            snake.size++;
            $("#score").text(snake.size - 4);
            snake.food = false;
        }
    } else {
        end();
    }
}

function validatePixel(x, y){
    /*if(x > (canva_width - 1) || x < 0) {
        return false;
    }

    if(y > (canva_height - 1) || y < 0) {
        return false;
    }*/

    var target = canva_status[y][x];
    if(target == 1) {
        return false;
    } else if(target == 2) {
        snake.food = true;
        game.food = false;
    }

    return true;
}

function end(){
    game.ready = false;
    game.end = true;
    clearInterval(game.loop);
}

$(window).keydown(function(event) {
    if(game.ready && event.which == 38){ //UP
        if(snake.axis == 1) {
            snake.newAxis = 0;
            snake.newDirection = -1;
            snake.directionChanges = true;
        }
    }

    if(game.ready && event.which == 40){ //DOWN
        if(snake.axis == 1) {
            snake.newAxis = 0;
            snake.newDirection = 1;
            snake.directionChanges = true;
        }
    }

    if(game.ready && event.which == 37){ //LEFT
        if(snake.axis == 0) {
            snake.newAxis = 1;
            snake.newDirection = -1;
            snake.directionChanges = true;
        }
    }

    if(game.ready && event.which == 39){ //RIGHT
        if(snake.axis == 0) {
            snake.newAxis = 1;
            snake.newDirection = 1;
            snake.directionChanges = true;
        }
    }

    if(event.which == 13) {
        if(isStarted) {
            isStarted = false;
            start();
        } else if(game.end){
            window.location='index.html';
        }
    }
});

//Start

var isStarted = true;
function start() {
    game.loop = setInterval(loop, game.speed);
}

function loop(){
    calculateNextPixel();
    spawnFood();
    updateDirection();
}

//Utils

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function spawnFood() {
    if (!game.food) {
        var loading = true;
        while (loading) {
            x = getRandomNumber(0, (canva_width - 1));
            y = getRandomNumber(0, (canva_height - 1));

            if(validatePixel(x, y)){
                updatePixel(x, y, 'food');
                loading = false;
                game.food = true;
            }
        }
    } 
}

function updateDirection(){
    if(snake.directionChanges) {
        snake.axis = snake.newAxis;
        snake.direction = snake.newDirection;
        snake.directionChanges = false;
    }
}

