var canva_height = 30;
var canva_width  = 30;

var canva_pixels = "";
var canva_status = [];

var game = [];
game.ready = true;
game.end = false;
game.food = false;

snake = {};
snake.size = 8;
snake.axis = 0; //0 - Vertical, 1 - Horizontal
snake.direction = -1; //1 - Cima e direita, 0 - Baixo e esquerda
snake.food = false;

snake.newAxis = 0;
snake.newDirection = -1;
snake.directionChanges = false;

snake.body = [
    [15,22],
    [15,21],
    [15,20],
    [15,19],
    [15,18],
    [15,17],
    [15,16],
    [15,15],
]

for (let y = 0; y < canva_height; y++) {
    canva_pixels += "<tr>";
    canva_status[y] = [];

    for (let x = 0; x < canva_width; x++) {
       canva_pixels += "<td data-status='0' id='pixel-"+x+"-"+y+"'></td>";
       canva_status[y][x] = 0;
    }

    canva_pixels += "</tr>";
}

$(".canvas").html(canva_pixels);


//Start Snake
for (let i = 0; i < snake.body.length; i++) {
    updatePixel(snake.body[i][0], snake.body[i][1], 'snake');
}

function updatePixel(x, y, value) {
    if(value == "snake") {
        $("#pixel-"+x+"-"+y).addClass("snake");
        var sts = 1;
    } else if (value == "food") {
        $("#pixel-"+x+"-"+y).addClass("food");
        var sts = 2;
    } else {
        $("#pixel-"+x+"-"+y).removeClass("food");
        $("#pixel-"+x+"-"+y).removeClass("snake");
        var sts = 0;
    }

    canva_status[y][x] = sts;
    $("#pixel-"+x+"-"+y).attr('data-status', sts);
}

function calculateNextPixel() {
    var size = snake.size - 1;

    var x = snake.body[size][0];
    var y = snake.body[size][1];

    if (snake.axis == 1) {
        x = x + snake.direction;        
    } else {
        y = y + snake.direction;
    }

    if(validatePixel(x, y)){
        snake.body.push([x, y]);
        updatePixel(x, y, 'snake');
        
        if(!snake.food) {
            updatePixel(snake.body[0][0], snake.body[0][1], '');
            snake.body.shift();
        } else {
            snake.size++;
            snake.food = false;
        }
    } else {
        end();
    }
}

function validatePixel(x, y){
    if(x > (canva_width - 1) || x < 0) {
        return false;
    }

    if(y > (canva_height - 1) || y < 0) {
        return false;
    }

    var target = $("#pixel-"+x+"-"+y).attr('data-status');
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
    game.loop = setInterval(loop, 50);
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