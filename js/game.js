var game = new Phaser.Game(1600, 900, Phaser.AUTO, '');

game.state.add('play', playState);
game.state.add("gameOver", gameOverState);
game.state.add("winnerState", winnerState);
game.state.add("increaseLevel", increaseLevel);
game.state.start('play');