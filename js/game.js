
 var game = new Phaser.Game(1333, 766, Phaser.AUTO, '');

 game.state.add('play', playState);

 game.state.start('play');