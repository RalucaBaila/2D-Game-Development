
var score = 0;
function gameScore(){
    document.getElementById('score').innerHTML = "Score: " + score;
}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x =x;
    this.y =y;
    this.width= 50;
    this.height = 50;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >600){

        this.x = -101;
        this.x += this.speed *dt;
        //console.log("My bug position is " + this.x );

    } else {
        this.x += this.speed *dt +1;
        //console.log(" ELSE My bug position is " + this.x );
    } 
  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite ='images/char-cat-girl.png'; 
    this.x = x || 200;
    this.y = y || 400;
    this.width =50;
    this.height =50;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
 var allEnemiesLength = allEnemies.length;
    if ( this.y < 10){
        this.x =200;
        this.y = 400;
        console.log("You touched the water");
    }

    for (var i = 0; i < allEnemiesLength; i++) {
        var enemy = allEnemies[i];
        if (this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && this.height + this.y > enemy.y) {
            console.log("bang");
             this.x =200;
             this.y = 400;
             score +=1;
             gameScore();
            }      
        }
    };


Player.prototype.handleInput = function(key) {
    if ( key ==='right' && this.x < 400) {
        console.log("current player X position is " + this.x);
        this.x +=100;
    } 

    if (key ==='left'&& this.x > 10) {
         console.log("current player X position is " + this.x);
        this.x -= 100;
    }

    if ( key === 'up' && this.y > 10) {
        console.log("current player Y position is " + this.y);
        this.y -= 85;
    } 

    if ( key === 'down' && this.y < 300) {
        console.log("current player down Y position is " + this.y);
        this.y += 85;
    } 
    
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


 var enemy1 = new Enemy(-100,60,120);
 var enemy2 = new Enemy(-100,140,100);
 var enemy3 = new Enemy(-100,240, 170);

var allEnemies = [enemy1,enemy2,enemy3];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

