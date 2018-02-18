
let INTRO_TEXT = "ZOMBIE SHOOTER";

var text;
var btnPlay;
var btnExit;
let PLAY_BUTTON_WIDTH = 300;
let PLAY_BUTTON_HEIGHT = 100;

let EXIT_BUTTON_WIDTH = 300;
let EXIT_BUTTON_HEIGHT = 100;

var menuState = {
	
	preload : function() {
	    game.load.image('play_button', 'assets/play_button.png');
	    game.load.image('exit_button', 'assets/exit_button.png');

	},

	create : function() {
		game.stage.setBackgroundColor(0x2d2d2d);

	    btnPlay = game.add.button(game.camera.view.centerX, game.camera.view.centerY,'play_button', this.onPlayBtnCallback, this);
	    btnPlay.width = PLAY_BUTTON_WIDTH;
	    btnPlay.height = PLAY_BUTTON_HEIGHT;
	    btnPlay.fixedToCamera  = true;
	    btnPlay.anchor.set(0.5);
	    btnPlay.cameraOffset.setTo(game.camera.width / 2, game.camera.height / 2 - 100)

	    btnExit = game.add.button(game.camera.view.centerX, game.camera.view.centerY, 'exit_button', this.onExitBtnCallback, this);
	    btnExit.width = EXIT_BUTTON_WIDTH;
	    btnExit.height = EXIT_BUTTON_HEIGHT;
	    btnExit.fixedToCamera = true;
	    btnExit.anchor.set(0.5);
	    btnExit.cameraOffset.setTo(game.camera.width / 2, game.camera.height / 2 + 70)

	    text = game.add.text(5, 5, INTRO_TEXT);
	    text.fixedToCamera  = true;
	    text.anchor.set(0.5);
	    text.align = 'center';
	    text.font = 'Arial Black';
	    text.fontSize = 55;
	    text.fontWeight = 'bold';
	    text.stroke = '#000000';
	    text.strokeThickness = 6;
	    text.fill = '#43d637';
	    text.cameraOffset.setTo(game.camera.width / 2,150);
	},


	update : function() {

	},

	onPlayBtnCallback : function() {
		game.state.start('play');
	},
	
		onExitBtnCallback : function() {
		game.state.start('exit');
	}
}