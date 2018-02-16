let ENEMY_MOVEMENT_VELOCITY = 40;

class Enemy {

    constructor(p_sprite) {
        this.sprite = p_sprite;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('moveUp', [13, 14, 15, 12], 4, false);
        this.sprite.animations.add('moveDown', [1, 2, 3, 0], 4, false);
        this.sprite.animations.add('moveRight', [9, 10, 11, 8], 4, false);
        this.sprite.animations.add('moveLeft', [5, 6, 7, 4], 4, false);
        this.sprite.animations.add('moveRight', [9, 10, 11, 8], 4, false);
    }
    
    setCollisionWithWorldBounds(p_flagValue) {
        this.sprite.body.collideWorldBounds = p_flagValue;
    }
    
    moveToTarget(x, y) {
        
        var normalizeMultiper = 1
        var X = math.round(x)
        var Y = math.round(y)
        var ZombiePosistion_Y = math.round(this.sprite.y);
        var ZombiePosistion_X = math.round(this.sprite.x);
        
        if (ZombiePosistion_Y < Y) {
            this.sprite.body.velocity.y = ENEMY_MOVEMENT_VELOCITY;
            this.sprite.animations.play('moveDown', 10);
        } else if (ZombiePosistion_Y > Y) {
            this.sprite.body.velocity.y = -ENEMY_MOVEMENT_VELOCITY;
            this.sprite.animations.play('moveUp', 10);
        }
        else {
            this.sprite.body.velocity.y = 0;
        }
        
        if (ZombiePosistion_X < X) {
            this.sprite.body.velocity.x = ENEMY_MOVEMENT_VELOCITY;
            if (this.sprite.body.velocity.y == 0) {
                this.sprite.animations.play('moveRight', 10);
            }
        } else if (ZombiePosistion_X > X) {
            this.sprite.body.velocity.x = -ENEMY_MOVEMENT_VELOCITY;
            if (this.sprite.body.velocity.y == 0) {
                this.sprite.animations.play('moveLeft', 10);
            }
        }
        
        if (math.pow(this.sprite.body.velocity.x, 2) 
            + math.pow(this.sprite.body.velocity.y, 2) 
            >= math.pow(ENEMY_MOVEMENT_VELOCITY, 2) * 2)
        {
            normalizeMultiper = math.sqrt( math.pow(ENEMY_MOVEMENT_VELOCITY, 2) / 2 )/ ENEMY_MOVEMENT_VELOCITY;
        }
        this.sprite.body.velocity.x = normalizeMultiper * this.sprite.body.velocity.x;
        this.sprite.body.velocity.y = normalizeMultiper * this.sprite.body.velocity.y;
        
    }
}