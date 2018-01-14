class Player {
    constructor(p_sprite) {
        this.sprite = p_sprite;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.hp = 100;
        this.sprite.animations.add('moveUp', [13, 14, 15, 12], 4, false);
        this.sprite.animations.add('moveDown', [1, 2, 3, 0], 4, false);
        this.sprite.animations.add('moveRight', [9, 10, 11, 8], 4, false);
        this.sprite.animations.add('moveLeft', [5, 6, 7, 4], 4, false);
        this.sprite.animations.add('moveRight', [9, 10, 11, 8], 4, false);
    }


    scalePlayer(p_firstMutlipler, p_secondMultipler) {
        this.sprite.scale.setTo(p_firstMutlipler, p_secondMultipler);
    }

    setCollisionWithWorldBounds(p_flagValue) {
        this.sprite.body.collideWorldBounds = p_flagValue;
    }
    
    updateVelocity() {
        var l_velocity = 10;
        
        if(this.sprite.body.velocity.y > 0) {
            this.sprite.body.velocity.y -= l_velocity;
        }
        if(this.sprite.body.velocity.y < 0) {
            this.sprite.body.velocity.y += l_velocity;
        }
        if(this.sprite.body.velocity.x > 0) {
            this.sprite.body.velocity.x -= l_velocity;
        }
        if(this.sprite.body.velocity.x < 0) {
            this.sprite.body.velocity.x += l_velocity;
        }
    }

    moveUp() {
        this.sprite.body.velocity.y = -150;
        this.sprite.animations.play('moveUp', 15);
    }

    moveDown() {
        this.sprite.body.velocity.y = 150;
        this.sprite.animations.play('moveDown', 15);
    }

    moveRight() {
        this.sprite.body.velocity.x = 150;
        this.sprite.animations.play('moveRight', 15);
    }

    moveLeft() {
        this.sprite.body.velocity.x = -150;
        this.sprite.animations.play('moveLeft', 15);
    }
    
    
}