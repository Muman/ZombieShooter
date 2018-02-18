var increaseLevel = {

	update : function() {
        level += 1;
        game.state.start('play');
	},

}