var maxVelocity = 150;

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
        this.horizontalVelocity = 0;
        this.verticalVelocity = 0;
    }

    scalePlayer(p_firstMutlipler, p_secondMultipler) {
        this.sprite.scale.setTo(p_firstMutlipler, p_secondMultipler);
    }

    setCollisionWithWorldBounds(p_flagValue) {
        this.sprite.body.collideWorldBounds = p_flagValue;
    }
    
    reset() {
        this.horizontalVelocity = 0;
        this.verticalVelocity = 0;
    }

    setDirectionUp() {
        this.verticalVelocity = -maxVelocity;
        this.sprite.animations.play('moveUp', 15);
    }

    setDirectionDown() {
        this.verticalVelocity = maxVelocity;
        this.sprite.animations.play('moveDown', 15);
    }

    setDirectionRight() {
        this.horizontalVelocity = maxVelocity;
        if (this.verticalVelocity == 0) {
            this.sprite.animations.play('moveRight', 15);
        }
        else if (this.verticalVelocity > 0) {
            this.sprite.animations.play('moveDown', 15);
        }
        else if (this.verticalVelocity < 0) {
            this.sprite.animations.play('moveUp', 15);
        }
    }

    setDirectionLeft() {
        this.horizontalVelocity = -maxVelocity;
        if (this.verticalVelocity == 0) {
            this.sprite.animations.play('moveLeft', 15);
        }
        else if (this.verticalVelocity > 0) {
            this.sprite.animations.play('moveDown', 15);
        }
        else if (this.verticalVelocity < 0) {
            this.sprite.animations.play('moveUp', 15);
        }
    }
    
    move() {
        var normalizeMultiper = 1;
        if ( math.pow(this.horizontalVelocity, 2) + math.pow(this.verticalVelocity, 2) >= math.pow(maxVelocity, 2) * 2) {
            normalizeMultiper = math.sqrt( math.pow(maxVelocity, 2) / 2 )/ maxVelocity;
        }
        this.sprite.body.velocity.x = normalizeMultiper * this.horizontalVelocity;
        this.sprite.body.velocity.y = normalizeMultiper * this.verticalVelocity;
    }
    
    y() {
        return this.sprite.y;
    }

    x() {
        return this.sprite.x;
    }

    gotHit() {
                this.hp -= 10;

        if (this.hp < 0) {
            this.sprite.kill();
        }
    }
}