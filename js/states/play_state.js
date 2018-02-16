var player;
var controls;
var backgroundlayer;
var timer;

var enemiesSpritesGroup;
var enemies;

var bullet;
var bulletTime = 0;
let FIREARM_LOAD = 20;

let ENEMIES_COUNT = 100;
let MAP_WIDTH = 32;

var playState = {

preload : function() {
    game.load.spritesheet('player', 'assets/human_player.png', 32, 48);
    game.load.spritesheet('enemy', 'assets/zombie5r.png', 32, 48);
    game.load.tilemap('tilemap', 'assets/maze4.csv', null, Phaser.Tilemap.CSV);
	game.load.image('tileset', 'assets/tileset.png');     
    game.load.image('bullet', 'assets/bullet0.png');
},

create : function() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('tilemap', 32, 32);
	map.addTilesetImage('tileset');

	backgroundlayer = map.createLayer(0);
    map.setCollision(1, true, backgroundlayer);
    backgroundlayer.resizeWorld(true);

    this.enemies = this.createRandomEnemies(ENEMIES_COUNT);

	player = new Player(game.add.sprite(game.world.centerX, game.world.centerY, 'player'));

    createBullets(FIREARM_LOAD);
    
    enemiesSpritesGroup = game.add.group();

    for (var i = this.enemies.length - 1; i >= 0; i--) {
        enemiesSpritesGroup.add(this.enemies[i].sprite);
    }

    game.physics.enable([backgroundlayer, player.sprite, enemiesSpritesGroup], Phaser.Physics.ARCADE);
    game.camera.follow(player.sprite);
    
    player.setCollisionWithWorldBounds(true);

	controls = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
},


update : function() {

    game.physics.arcade.overlap(bullets, enemiesSpritesGroup, killZombie, null, this);
    game.physics.arcade.collide(bullets, backgroundlayer, collisionHandler);
    game.physics.arcade.collide(enemiesSpritesGroup, enemiesSpritesGroup);
    game.physics.arcade.collide(player.sprite, backgroundlayer);
    game.physics.arcade.collide(enemiesSpritesGroup, backgroundlayer, this.zombieCollidedWithWall);
    game.physics.arcade.collide(enemiesSpritesGroup, player.sprite, this.playerCollidedWithZombie);

    player.reset();
    
    if (controls.down.isDown){
        player.setDirectionY(DOWN);
    }  

    if (controls.up.isDown){
        player.setDirectionY(UP);
    }
    
    if(controls.left.isDown){
        player.setDirectionX(LEFT);
    }

    if(controls.right.isDown){
        player.setDirectionX(RIGHT);
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

    this.updateEnemies();

    player.move();
    player.playAnimation();
},

updateEnemies() {
    for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].moveToTarget(player.x(), player.y());
    }
},

playerCollidedWithZombie : function(obj1, obj2) {
    if (math.round(game.time.totalElapsedSeconds()) % 3 == 0) {
        player.gotHit();
    }
    if (player.hp <= 0) {
        game.state.start('gameOver');
    }
},

zombieCollidedWithWall : function(obj1, obj2) {
    console.log("Zombie touched wall");
},

createRandomEnemies(enemiesCount) {
    var randomlyPlacedEnemies = [];

    for (var i = 0; i < enemiesCount; ++i) {
        var enemy = new Enemy(game.add.sprite(Math.random() * 100 * 32, Math.random() * 100 % MAP_WIDTH, 'enemy'));

    console.log("enemy created " + enemy);
        //enemy.setCollisionWithWorldBounds(true);
        randomlyPlacedEnemies.push(enemy);
    }

    console.log(randomlyPlacedEnemies.length);

    return randomlyPlacedEnemies;
}
}

function createBullets(p_firearmLoad) {
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < FIREARM_LOAD; i++) {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    } 
}

function fireBullet () {

    console.log("fire")
    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);
        if (bullet)
        {
            if (player.getFireDirectionX() != NONE) {
                bullet.reset(player.sprite.x + 50 * player.getFireDirectionX(), player.sprite.y - 8 * player.getFireDirectionX());
                bullet.angle = player.getFireDirectionX() * 90;
                bullet.body.velocity.y = 0;
                bullet.body.velocity.x = player.getFireDirectionX() * 300;
            }
            if (player.getFireDirectionY() != NONE) {
                bullet.angle = 0;
                bullet.reset(player.sprite.x - 8 + 0 * player.getFireDirectionY(), player.sprite.y - 22 + 32 * player.getFireDirectionY());

                bullet.body.velocity.x = 0;
                bullet.body.velocity.y = player.getFireDirectionY() * 300;        
            }
                   
            bulletTime = game.time.now + 150;
        }
    }
}

function resetBullet (bullet) {

    bullet.kill();
}

function killZombie(bullet, zombie) {

    bullet.kill();
    zombie.kill();
}

function collisionHandler(bullet, wall) {

    bullet.kill();
}