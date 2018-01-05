var player;
var map; 
var cursors;
var backgroundlayer;
var pathsLayer;

var playState = {

	preload : function() {
        game.load.image('player', 'assets/player.png');

        game.load.tilemap('tilemap', 'assets/labirynt2.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.image('tiles', 'assets/tileset.png');
            
        cursors = game.input.keyboard.createCursorKeys();
	},

	create : function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('tilemap');
  		map.addTilesetImage('tileset', 'tiles');

  		backgroundlayer = map.createLayer('Obstacles');
  		pathsLayer = map.createLayer('Paths');

    	player = game.add.sprite( 0.0, 0.0, 'player');
    	player.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(player);

		player.body.bounce.y = 0.2;
   	 	player.body.linearDamping = 1;
    	player.body.collideWorldBounds = true;

  		map.setCollisionByExclusion([], true, backgroundlayer);
  		backgroundlayer.resizeWorld();

  		game.camera.follow(player);
	},

	update : function() {

			game.physics.arcade.collide(backgroundlayer, player);

            if(cursors.left.isDown){
                player.x -= 1;
            }

            if(cursors.right.isDown){
                player.x += 1;
            }

            if (cursors.down.isDown){
                    player.y += 1;
            }  

            if (cursors.up.isDown){
                player.y -= 1;
            }
	}

}