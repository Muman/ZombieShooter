var game = new Phaser.Game(1600, 900, Phaser.AUTO, '');

game.state.add("play", playState);
game.state.add("gameOver", gameOverState);
game.state.add("winnerState", winnerState);
game.state.add("increaseLevel", increaseLevel);
game.state.add("menu", menuState);
game.state.add("exit", exitState);
game.state.start('menu');