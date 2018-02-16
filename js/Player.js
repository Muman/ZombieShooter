let maxVelocity = 150;
let UP = -1;
let DOWN = 1;
let RIGHT = 1;
let LEFT = -1;
let NONE = 0;

class Player {
    constructor(p_sprite) {
        this.sprite = p_sprite;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.hp = 100;
        this.maxHp = 100;
        this.sprite.animations.add('moveUp', [13, 14, 15, 12], 4, false);
        this.sprite.animations.add('moveDown', [1, 2, 3, 0], 4, false);
        this.sprite.animations.add('moveRight', [9, 10, 11, 8], 4, false);
        this.sprite.animations.add('moveLeft', [5, 6, 7, 4], 4, false);
        this.sprite.animations.add('moveRight', [9, 10, 11, 8], 4, false);
        this.moveDirectionX = NONE;
        this.moveDirectionY = DOWN;
        this.fireDirectionX = NONE;
        this.fireDirectionY = DOWN;
        this.hp = 100;
    }

    scalePlayer(p_firstMutlipler, p_secondMultipler) {
        this.sprite.scale.setTo(p_firstMutlipler, p_secondMultipler);
    }

    setCollisionWithWorldBounds(p_flagValue) {
        this.sprite.body.collideWorldBounds = p_flagValue;
    }
    
    reset() {
        this.directionX = NONE;
        this.directionY = NONE;
    }

    setDirectionX(p_direction) {
        this.directionX = p_direction;
    }

    setDirectionY(p_direction) {
        this.directionY = p_direction;
    }

    getFireDirectionX() {
        return this.fireDirectionX;
    }

    getFireDirectionY() {
        return this.fireDirectionY;
    }

    playAnimation() {
        if (this.directionY != NONE) {
            if (this.directionY == UP) {
                this.sprite.animations.play('moveUp', 15);
                this.fireDirectionY = UP;
            }
            if (this.directionY == DOWN) {
                this.sprite.animations.play('moveDown', 15);
                this.fireDirectionY = DOWN;
            }
            this.fireDirectionX = NONE;
        }
        else {
            if (this.directionX == RIGHT) {
                this.sprite.animations.play('moveRight', 15);
                this.fireDirectionX = RIGHT;
                this.fireDirectionY = NONE;
            }
            if (this.directionX == LEFT) {
                this.sprite.animations.play('moveLeft', 15);
                this.fireDirectionX = LEFT;
                this.fireDirectionY = NONE;
            }

        }
    }
    
    move() {
        var normalizeMultiper = 1;
        var horizontalVelocity = this.directionX * maxVelocity;
        var verticalVelocity = this.directionY * maxVelocity;
        if (math.pow(horizontalVelocity, 2)
            + math.pow(verticalVelocity, 2)
            >= math.pow(maxVelocity, 2) * 2)
        {
            normalizeMultiper = math.sqrt( math.pow(maxVelocity, 2) / 2 )/ maxVelocity;
        }
        this.sprite.body.velocity.x = normalizeMultiper * horizontalVelocity;
        this.sprite.body.velocity.y = normalizeMultiper * verticalVelocity;
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