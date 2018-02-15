var player;
var controls;
var backgroundlayer;
var timer;

var enemiesSpritesGroup;
var enemies;

let ENEMIES_COUNT = 100;
let MAP_WIDTH = 32;

var playState = {

	preload : function() {
        game.load.spritesheet('player', 'assets/human_player.png', 32, 48);
        game.load.spritesheet('enemy', 'assets/zombie5r.png', 32, 48);
        game.load.tilemap('tilemap', 'assets/maze4.csv', null, Phaser.Tilemap.CSV);
    	game.load.image('tileset', 'assets/tileset.png');     
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

        enemiesSpritesGroup = game.add.group();

        for (var i = this.enemies.length - 1; i >= 0; i--) {
            enemiesSpritesGroup.add(this.enemies[i].sprite);
        }

        game.physics.enable([backgroundlayer, player.sprite, enemiesSpritesGroup], Phaser.Physics.ARCADE);
        game.camera.follow(player.sprite);
        
        player.setCollisionWithWorldBounds(true);

  		controls = game.input.keyboard.createCursorKeys();
	},


	update : function() {

            game.physics.arcade.collide(enemiesSpritesGroup, enemiesSpritesGroup);
            game.physics.arcade.collide(player.sprite, backgroundlayer);
            game.physics.arcade.collide(enemiesSpritesGroup, backgroundlayer, this.zombieCollidedWithWall);
            game.physics.arcade.collide(enemiesSpritesGroup, player.sprite, this.playerCollidedWithZombie);

            player.reset();
        
            if (controls.down.isDown){
                player.setDirectionDown();
            }  

            if (controls.up.isDown){
                player.setDirectionUp();
            }
        
            if(controls.left.isDown){
                player.setDirectionLeft();
            }

            if(controls.right.isDown){
                player.setDirectionRight();
            }

            this.updateEnemies();

            player.move();
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