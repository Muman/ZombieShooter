var player;
var controls;
var backgroundlayer;

var enemiesSpritesGroup;
var enemies;

let ENEMIES_COUNT = 50;
let MAP_WIDTH = 32;

var playState = {

	preload : function() {
        game.load.spritesheet('player', 'assets/human_player.png', 32, 48);
        game.load.spritesheet('enemy', 'assets/zombie5r.png', 32, 48);
        game.load.tilemap('tilemap', 'assets/maze3.csv', null, Phaser.Tilemap.CSV);
    	game.load.image('tileset', 'assets/tileset.png');     
	},

	create : function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.TILE_BIAS = 40;

        map = game.add.tilemap('tilemap', 32, 32);
  		map.addTilesetImage('tileset');

  		backgroundlayer = map.createLayer(0);
        map.setCollision(1, true, backgroundlayer);
        backgroundlayer.resizeWorld(true);

        this.enemies = this.createRandomEnemies(ENEMIES_COUNT);

    	player = new Player(game.add.sprite(game.world.centerX, game.world.centerY, 'player'));

        game.physics.enable(enemiesSpritesGroup, Phaser.Physics.ARCADE);
        game.physics.enable([backgroundlayer, player.sprite], Phaser.Physics.ARCADE);
        game.camera.follow(player.sprite);
        
        player.setCollisionWithWorldBounds(true);

  		controls = game.input.keyboard.createCursorKeys();
	},


	update : function() {

            this.updateEnemies();
            player.move();

            game.physics.arcade.collide(enemiesSpritesGroup, this.zombieCollidedWithZombie);
            game.physics.arcade.collide(player.sprite, backgroundlayer);
            game.physics.arcade.collide(enemiesSpritesGroup, backgroundlayer);
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
	},

    updateEnemies() {
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].moveToTarget(player.x(), player.y());
        }
    },

    playerCollidedWithZombie : function(obj1, obj2) {
        player.gotHit();
       // game.state.start('gameOver');
    },

    zombieCollidedWithZombie : function(obj1) {
/*        obj1.body.velocity.x = 0;
        obj1.body.velocity.y = 0;
        obj1.body.stopVelocityOnCollide = true;*/
    },

    createRandomEnemies(enemiesCount) {
        var randomlyPlacedEnemies = [];

        enemiesSpritesGroup = game.add.group();
        enemiesSpritesGroup.enableBody = true;
        enemiesSpritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
        enemiesSpritesGroup.setAll('body.collideWorldBounds', true);

       for (var i = 0; i < enemiesCount; ++i) {
            var sprite = enemiesSpritesGroup.create(i * 63, Math.random() * 100 % MAP_WIDTH, 'enemy');
            sprite.body.mass = 100;
            var enemy = new Enemy(sprite);
            randomlyPlacedEnemies.push(enemy);
        }

        return randomlyPlacedEnemies;
    }
}