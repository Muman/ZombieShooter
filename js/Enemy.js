let ENEMY_MOVEMENT_VELOCITY = 20;

class Enemy {


	constructor(p_sprite) {
		this.sprite = p_sprite;
		this.sprite.anchor.setTo(0.5, 0.5);
	}

	move() {
		this.sprite.x += 1;
	}

    setCollisionWithWorldBounds(p_flagValue) {
        this.sprite.body.collideWorldBounds = p_flagValue;
    }

    moveToTarget(x, y) {

    	if (this.sprite.x < x) {
    		this.sprite.body.velocity.x = ENEMY_MOVEMENT_VELOCITY;
    	} else if (this.sprite.x > x) {
  			this.sprite.body.velocity.x = -ENEMY_MOVEMENT_VELOCITY;
    	}

    	if (this.sprite.y < y) {
  			this.sprite.body.velocity.y = ENEMY_MOVEMENT_VELOCITY;
    	} else if (this.sprite.y > y) {
    	   	this.sprite.body.velocity.y = -ENEMY_MOVEMENT_VELOCITY;
    	}
    }

}