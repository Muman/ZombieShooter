var player;
var controls;
var backgroundlayer;
var tvPlayerHpIndicator;
var imageHeart;

var enemiesSpritesGroup;
var enemies;

let ENEMIES_COUNT = 100;
let MAP_WIDTH = 32;

var playState = {

	preload : function() {
        game.load.spritesheet('player', 'assets/human_player.png', 32, 48);
        game.load.spritesheet('enemy', 'assets/zombie5r.png', 32, 48);
        game.load.tilemap('tilemap', 'assets/maze3.csv', null, Phaser.Tilemap.CSV);
    	game.load.image('tileset', 'assets/tileset.png');
        game.load.image('heart', 'assets/heart.png');      
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

        this.initPlayerHpIndicator();
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

            this.updatePlayerHpIndicator();
	},

    initPlayerHpIndicator() {

        imageHeart = game.add.sprite(game.camera.width - 100, game.camera.height -100, "heart");
        imageHeart.fixedToCamera = true;
        imageHeart.cameraOffset.setTo(game.camera.width - 100, game.camera.height -95);
        imageHeart.scale.setTo(0.25, 0.25);

        tvPlayerHpIndicator = game.add.text(5, 5, "100%");
        tvPlayerHpIndicator.fixedToCamera = true;
        tvPlayerHpIndicator.anchor.set(0.5);
        tvPlayerHpIndicator.cameraOffset.setTo(game.camera.width - 165, game.camera.height -60);
        tvPlayerHpIndicator.align = 'center';
        tvPlayerHpIndicator.font = 'Arial Black';
        tvPlayerHpIndicator.fontSize = 55;
        tvPlayerHpIndicator.fontWeight = 'bold';
        tvPlayerHpIndicator.stroke = '#000000';
        tvPlayerHpIndicator.strokeThickness = 6;
        tvPlayerHpIndicator.fill = '#43d637';
    },

    updateEnemies() {
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].moveToTarget(player.x(), player.y());
        }
    },

    playerCollidedWithZombie : function(obj1, obj2) {
        player.gotHit();
        game.state.start('gameOver');
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
    },

    updatePlayerHpIndicator() {
        var playerHpPercantage = player.hp / player.maxHp * 100;

        tvPlayerHpIndicator.text = playerHpPercantage; 

        if (playerHpPercantage < 60) {
            tvPlayerHpIndicator.fill = '#ffff00';
        } else if (playerHpPercantage < 30) {
            tvPlayerHpIndicator.fill = '#ff0000';
        } else {
            tvPlayerHpIndicator.fill = '#43d637';
        }
    }
}