class Ghost {
    constructor(type, renderer, loc){
        this.type = type;
        this.loc = loc;
        this.start_from = structuredClone(loc);
        this.last_updated = Date.now();
        this.animation_counter = 0;
        this.renderer = renderer;
        this.speed = 15;
    }

    /**
     * Loads ghost sprites
     * @param {string} path The path to sprites
     */
    async load(path) {
        let image_paths = [
            path + "/down-1.png",
            path + "/down-2.png",
            path + "/left-1.png",
            path + "/left-2.png",
            path + "/right-1.png",
            path + "/right-2.png",
            path + "/up-1.png",
            path + "/up-2.png"
        ];

        this.images = [];
        for(let i = 0; i < 8; i++){
            this.images[i] = new Image();

            try {
                await new Promise((resolve, reject) => {
                    this.images[i].src = image_paths[i];
                    this.images[i].onload = () => resolve();
                    this.images[i].onerror = () => reject();
                });
            } catch(err) {
                console.error(err);
            }
        }
    }

    /**
     * Renders and updates the ghost
     */
    render() {
        if(this.animation_counter == this.speed || !this.move_to){
            this.loc = structuredClone(this.move_to ? this.move_to : this.loc);
            this.animation_counter = 0;

            /* Pathfind */
            let dirs = [];
            let next_tile = [];

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

        /* Animation */
        let movement = [
            (this.move_to[0] - this.start_from[0]) / this.speed,
            (this.move_to[1] - this.start_from[1]) / this.speed
        ];

        let active_sprite = (this.animation_counter < this.speed / 2) ? 1 : 0;
        if(movement[0] < 0) active_sprite += 2;
        if(movement[0] > 0) active_sprite += 4;
        if(movement[1] < 0) active_sprite += 6;
        if(movement[1] > 0) active_sprite += 0;
        
        this.loc[0] += movement[0];
        this.loc[1] += movement[1];

        this.animation_counter++;

        /* Draw */
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