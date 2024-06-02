class Entity {
    constructor(renderer, loc){
        this.renderer = renderer;
        this.loc = loc;

        this.images = [];
        this.start_from = structuredClone(this.loc);
        this.last_updated = Date.now();
        this.timer = 0;
        this.speed = 13;
    }

    async load(image_src_arr) {
        for(let i = 0; i < image_src_arr.length; i++){
            let image = new Image();

            try {
                await new Promise((resolve, reject) => {
                    image.src = image_src_arr[i];
                    image.onload = () => resolve();
                    image.onerror = () => reject("Error while processing image");
                });
            } catch(err) {
                console.error(err);
            }
        
            this.images.push(image);
        }
    }

    render(active_sprite){
        let cell_width = 16;
        let cell_height = 16;
        let ghost_scale = 1.5;
        
        let width = cell_width * ghost_scale;
        let height = cell_height * ghost_scale;

        ctx.drawImage(
            this.images[active_sprite],
            this.loc[0] * cell_width - (cell_width / 4),
            this.loc[1] * cell_height - (cell_height / 4),
            width, height
        );
    }
}

class Ghost extends Entity {
    constructor(type, renderer, loc){
        super(renderer, loc);
        this.type = type;
    }

    pathfind() {
        let dirs = [];
        let next_tile;

        next_tile = this.renderer.tilemap[this.loc[1] + 0][this.loc[0] + 1];
        if(next_tile === 32 || next_tile === 33 || next_tile === 34) dirs.push([1, 0]);

        next_tile = this.renderer.tilemap[this.loc[1] + 1][this.loc[0] + 0];
        if(next_tile === 32 || next_tile === 33 || next_tile === 34) dirs.push([0, 1]);

        next_tile = this.renderer.tilemap[this.loc[1] + 0][this.loc[0] - 1];
        if(next_tile === 32 || next_tile === 33 || next_tile === 34) dirs.push([-1, 0]);

        next_tile = this.renderer.tilemap[this.loc[1] - 1][this.loc[0] + 0];
        if(next_tile === 32 || next_tile === 33 || next_tile === 34) dirs.push([0, -1]);

        for(let i = 0; i < dirs.length; i++){
            let dir = [this.loc[0] + dirs[i][0], this.loc[1] + dirs[i][1]];
            if(dir.toString() === this.start_from.toString()) dirs.splice(i, 1);
        }

        this.start_from = structuredClone(this.loc);
        let rng = Math.floor(Math.random() * dirs.length);

        this.move_to = structuredClone(this.loc);
        this.move_to[0] += dirs[rng][0];
        this.move_to[1] += dirs[rng][1];
    }

    update(){
        if(this.timer === this.speed || !this.move_to){
            this.loc = structuredClone(this.move_to ? this.move_to : this.loc);
            this.timer = 0;

            this.pathfind();
        }

        let movement = [
            (this.move_to[0] - this.start_from[0]) / this.speed,
            (this.move_to[1] - this.start_from[1]) / this.speed
        ];

        let active_sprite = (this.timer < this.speed / 2) ? 1 : 0;
        if(movement[0] < 0) active_sprite += 2;
        if(movement[0] > 0) active_sprite += 4;
        if(movement[1] < 0) active_sprite += 6;
        
        this.loc[0] += movement[0];
        this.loc[1] += movement[1];
        this.timer++;

        this.render(active_sprite);
    }
}

class Pacman extends Entity {
    constructor(renderer, loc){
        super(renderer, loc);
        this.player_dir = "a";
        this.dir = "a";
        this.speed = 12;
    }

    update(){
        if(this.timer === this.speed || !this.movement){
            this.loc[0] = Math.round(this.loc[0]);
            this.loc[1] = Math.round(this.loc[1]);

            if(!this.move_to) this.move_to = structuredClone(this.loc);
            this.start_from = structuredClone(this.loc);
            this.timer = 0;

            /* Calculate Valid Directions */
            let valid_dirs = [];
            let next_tile;
    
            next_tile = this.renderer.tilemap[this.loc[1]][this.loc[0] + 1];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34) valid_dirs.push("d");
    
            next_tile = this.renderer.tilemap[this.loc[1] + 1][this.loc[0]];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34) valid_dirs.push("s");
    
            next_tile = this.renderer.tilemap[this.loc[1]][this.loc[0] - 1];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34) valid_dirs.push("a");
    
            next_tile = this.renderer.tilemap[this.loc[1] - 1][this.loc[0]];
            if(next_tile === 32 || next_tile === 33 || next_tile === 34) valid_dirs.push("w");

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
        if(this.timer < this.speed / 4) active_sprite = 10 + sprite_add_fac;
        else if(this.timer >= this.speed / 4 && this.timer < this.speed / 2) active_sprite = 11 + sprite_add_fac;
        else if(this.timer >= this.speed / 2 && this.timer < (this.speed / 4) * 3) active_sprite = 10 + sprite_add_fac;
        else active_sprite = 18;
        
        this.loc[0] += this.movement[0];
        this.loc[1] += this.movement[1];
        this.timer++;

        this.render(active_sprite);
    }
}