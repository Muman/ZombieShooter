var player;
var map; 
var controls;
var backgroundlayer;
var pathsLayer;

var playState = {

	preload : function() {
        game.load.spritesheet('player', 'assets/human_player.png', 32, 48);
        game.load.tilemap('tilemap', 'assets/CSV_Labirynt.csv', null, Phaser.Tilemap.CSV);
    	game.load.image('tileset', 'assets/tileset.png');     
	},

	create : function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('tilemap', 32, 32);
  		map.addTilesetImage('tileset');

  		backgroundlayer = map.createLayer(0);
  		
        map.setCollisionBetween(1, 1);
        backgroundlayer.resizeWorld();

    	player = new Player(game.add.sprite(0, 0, 'player'));

		game.physics.enable(player.sprite, Phaser.Physics.ARCADE);
        game.camera.follow(player.sprite);
        
        player.scalePlayer(1, 1);
        player.setCollisionWithWorldBounds(true);
  		controls = game.input.keyboard.createCursorKeys();
	},

	update : function() {

			game.physics.arcade.collide(player.sprite, backgroundlayer);

            player.updateVelocity();
            if(controls.left.isDown){
                player.moveLeft();
            }

            if(controls.right.isDown){
                player.moveRight();
            }

            if (controls.down.isDown){
                player.moveDown();
            }  

            if (controls.up.isDown){
                player.moveUp();
            }
	}
}