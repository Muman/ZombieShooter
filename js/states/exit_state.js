
//let INTRO_TEXT = "ZOMBIE SHOOTER";
var text;
var introText;
var devsText;
var namesText;

var exitState = {
	
	preload : function() {


	},

	create : function() {
		game.stage.setBackgroundColor(0x2d2d2d);


	    introText = game.add.text(5, 5, INTRO_TEXT);
	    introText.fixedToCamera  = true;
	    introText.anchor.set(0.5);
	    introText.align = 'center';
	    introText.font = 'Arial Black';
	    introText.fontSize = 55;
	    introText.fontWeight = 'bold';
	    introText.stroke = '#000000';
	    introText.strokeThickness = 6;
	    introText.fill = '#43d637';
	    introText.cameraOffset.setTo(game.camera.width / 2,150);
		
		devsText = game.add.text(5, 5, 'Autorzy:');
	    devsText.fixedToCamera  = true;
	    devsText.anchor.set(0.5);
	    devsText.align = 'center';
	    devsText.font = 'Arial Black';
	    devsText.fontSize = 35;
	    devsText.fontWeight = 'bold';
	    devsText.stroke = '#000000';
	    devsText.strokeThickness = 6;
	    devsText.fill = '#43d637';
	    devsText.cameraOffset.setTo(game.camera.width / 2,150 + 170);
		
		namesText = game.add.text(5, 5, 'Piotr Muciek, Grzegorz Nowiński, Arkadiusz Sitarz');
	    namesText.fixedToCamera  = true;
	    namesText.anchor.set(0.5);
	    namesText.align = 'center';
	    namesText.font = 'Arial Black';
	    namesText.fontSize = 15;
	    namesText.fontWeight = 'bold';
	    namesText.stroke = '#000000';
	    namesText.strokeThickness = 6;
	    namesText.fill = '#43d637';
	    namesText.cameraOffset.setTo(game.camera.width / 2,150 + 220);
		
		
		
		
		
	},


	update : function() {

	},


}