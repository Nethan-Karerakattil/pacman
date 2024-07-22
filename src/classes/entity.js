class Entity {
    constructor(renderer, spritesheet, loc){
        this.renderer = renderer;
        this.spritesheet = spritesheet;
        this.loc = loc;
        this.timer = 0;
        this.speed = 13;
    }

    render(active_sprite, sprite_size){
        let ghost_scale = 1.5;
        let size = sprite_size * ghost_scale;

        ctx.drawImage(
            this.spritesheet,
            active_sprite * sprite_size, 0,
            sprite_size, sprite_size,
            this.loc[0] * 16 - 5,
            this.loc[1] * 16 - 5,
            26, 26
        );
    }
}

class Ghost extends Entity {
    constructor(type, renderer, pacman, spritesheet, loc){
        super(renderer, spritesheet, loc);
        this.type = type;
        this.pacman = pacman;
        this.speed = 9;
    }

    pathfind() {
        /* Portal Functionality */
        if(this.loc[0] < 0){
            this.loc[0] = this.renderer.width + 1;
            return;
        }

        if(this.loc[0] > this.renderer.width + 1){
            this.loc[0] = -1;
            return;
        }

        /* Calculate Valid Directions */
        let dirs = [];
        let next_tile;

        this.loc[0] = Math.round(this.loc[0]);
        this.loc[1] = Math.round(this.loc[1]);

        let prev_loc = [0, 0];
        if(this.movement){
            prev_loc[0] = this.loc[0] - Math.round(this.movement[0] * this.speed);
            prev_loc[1] = this.loc[1] - Math.round(this.movement[1] * this.speed);
        }

        next_tile = this.renderer.tilemap[this.loc[1]][this.loc[0] + 1];
        if(
            (next_tile === 32 || next_tile === 33 || next_tile === 34) &&
            (prev_loc[0] !== this.loc[0] + 1 || prev_loc[1] !== this.loc[1])
        ) dirs.push([1, 0]);
        

        next_tile = this.renderer.tilemap[this.loc[1] + 1][this.loc[0]];
        if(
            (next_tile === 32 || next_tile === 33 || next_tile === 34) &&
            (prev_loc[0] !== this.loc[0] || prev_loc[1] !== this.loc[1] + 1)
        ) dirs.push([0, 1]);

        next_tile = this.renderer.tilemap[this.loc[1]][this.loc[0] - 1];
        if(
            (next_tile === 32 || next_tile === 33 || next_tile === 34) &&
            (prev_loc[0] !== this.loc[0] - 1 || prev_loc[1] !== this.loc[1])
        ) dirs.push([-1, 0]);

        next_tile = this.renderer.tilemap[this.loc[1] - 1][this.loc[0]];
        if(
            (next_tile === 32 || next_tile === 33 || next_tile === 34) &&
            (prev_loc[0] !== this.loc[0] || prev_loc[1] !== this.loc[1] - 1)
        ) dirs.push([0, -1]);

        /* Pathfind */
        let rng = Math.floor(Math.random() * dirs.length);

        let move_to = [
            this.loc[0] + dirs[rng][0],
            this.loc[1] + dirs[rng][1]
        ];

        this.movement = [
            (move_to[0] - this.loc[0]) / this.speed,
            (move_to[1] - this.loc[1]) / this.speed
        ];
    }

    update(){
        if(this.timer === this.speed || !this.movement){
            this.loc = structuredClone(this.move_to ? this.move_to : this.loc);
            this.timer = 0;

            this.pathfind();
        }

        let active_sprite = (this.timer < this.speed / 2) ? 1 : 0;
        if(this.type === "blinky") active_sprite += 8;
        if(this.type === "pinky") active_sprite += 24;
        if(this.type === "inky") active_sprite += 16;
        
        if(this.movement[0] < 0) active_sprite += 2;
        if(this.movement[0] > 0) active_sprite += 4;
        if(this.movement[1] < 0) active_sprite += 6;
        
        this.loc[0] += this.movement[0];
        this.loc[1] += this.movement[1];
        this.timer++;

        this.render(active_sprite, 28);
    }
}

class Pacman extends Entity {
    constructor(renderer, spritesheet, loc){
        super(renderer, spritesheet, loc);
        this.player_dir = "a";
        this.dir = "a";
        this.speed = 10;
    }

    update(){
        if(this.timer === this.speed || !this.movement){
            this.loc[0] = Math.round(this.loc[0]);
            this.loc[1] = Math.round(this.loc[1]);

            if(!this.move_to) this.move_to = structuredClone(this.loc);
            this.start_from = structuredClone(this.loc);
            this.timer = 0;

            /* Portal Functionality */
            if(this.loc[0] < 0){
                this.loc = [this.renderer.width + 1, 14];
                this.start_from[0] = this.renderer.width + 1;
                this.move_to[0] = this.renderer.width;
                
                this.movement = [
                    (this.move_to[0] - this.start_from[0]) / this.speed,
                    (this.move_to[1] - this.start_from[1]) / this.speed
                ];

                return;
            }

            if(this.loc[0] > this.renderer.width + 1){
                this.loc = [-1, 14];
                this.start_from[0] = -1;
                this.move_to[0] = 0;

                this.movement = [
                    (this.move_to[0] - this.start_from[0]) / this.speed,
                    (this.move_to[1] - this.start_from[1]) / this.speed
                ];

                return;
            }

            /* Calculate Valid Directions */
            let valid_dirs = [];
            let next_tile;
    
            next_tile = this.renderer.tilemap[this.loc[1]][this.loc[0] + 1];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34 || !next_tile) valid_dirs.push("d");
    
            next_tile = this.renderer.tilemap[this.loc[1] + 1][this.loc[0]];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34 || !next_tile) valid_dirs.push("s");
    
            next_tile = this.renderer.tilemap[this.loc[1]][this.loc[0] - 1];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34 || !next_tile) valid_dirs.push("a");
    
            next_tile = this.renderer.tilemap[this.loc[1] - 1][this.loc[0]];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34 || !next_tile) valid_dirs.push("w");

            /* Change Pacman Direction */
            if(valid_dirs.includes(this.player_dir)) this.dir = structuredClone(this.player_dir);

            if(valid_dirs.includes(this.dir)){
                if(this.dir === "w") this.move_to[1] -= 1;
                else if(this.dir === "a") this.move_to[0] -= 1;
                else if(this.dir === "s") this.move_to[1] += 1;
                else if(this.dir === "d") this.move_to[0] += 1;
            }

            /* Calculate Movement Vector */
            this.movement = [
                (this.move_to[0] - this.start_from[0]) / this.speed,
                (this.move_to[1] - this.start_from[1]) / this.speed
            ];
        }

        let sprite_add_fac = 0;
        if(this.dir === "a") sprite_add_fac = 2;
        else if(this.dir === "d") sprite_add_fac = 4;
        else if(this.dir === "w") sprite_add_fac = 6;

        let active_sprite;
        if(this.movement[0] == 0 && this.movement[1] == 0){
            active_sprite = 10 + sprite_add_fac;
        } else {
            if(this.timer < this.speed / 4) active_sprite = 10 + sprite_add_fac;
            else if(this.timer >= this.speed / 4 && this.timer < this.speed / 2) active_sprite = 11 + sprite_add_fac;
            else if(this.timer >= this.speed / 2 && this.timer < (this.speed / 4) * 3) active_sprite = 10 + sprite_add_fac;
            else active_sprite = 18;
        }
        
        this.loc[0] += this.movement[0];
        this.loc[1] += this.movement[1];
        this.timer++;

        this.render(active_sprite, 26);
    }
}