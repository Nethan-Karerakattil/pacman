const GHOST_SPEED = 9;
const PACMAN_SPEED = 10;

class BaseGhost {
    constructor(location) {
        this.loc = location;
        this.prev_loc = [];
        this.next_loc = [];
        this.movement = [0, 0];
        this.speed = GHOST_SPEED;
        this.sprite_toggle = false;
        this.timer = 0;
    }

    /**
     * Update code for all ghosts
     * 
     * Contains:-
     *  - Pathfinding algorithm
     *  - Code for redrawing ghost
     */
    update() {
        if (this.timer % this.speed == 0 || !this.movement) {
            this.loc[0] = Math.round(this.loc[0]);
            this.loc[1] = Math.round(this.loc[1]);

            /* Find all valid directions */
            let all_dirs = [
                [this.loc[0] + 0, this.loc[1] + 1],
                [this.loc[0] + 1, this.loc[1] + 0],
                [this.loc[0] + 0, this.loc[1] - 1],
                [this.loc[0] - 1, this.loc[1] + 0],
            ];

            let valid_dirs = [];
            for (let i = 0; i < all_dirs.length; i++) {
                if(all_dirs[i][0] < 0 || all_dirs[i][1] < 0) continue;

                let next_tile = tilemap[all_dirs[i][1]][all_dirs[i][0]];
                let is_path = next_tile === 32 || next_tile === 33 || next_tile === 34;
                let not_prev_loc = JSON.stringify(this.prev_loc) !== JSON.stringify(all_dirs[i]);
                
                if (is_path && not_prev_loc){
                    valid_dirs.push(all_dirs[i]);
                }
            }

            /* Find shortest distance linearly */
            const target = this.find_target();

            let shortest_dir = [];
            let shortest_dist = Infinity;
            for (let i = 0; i < valid_dirs.length; i++) {
                let x_diff = Math.abs(valid_dirs[i][0] - target[0]);
                let y_diff = Math.abs(valid_dirs[i][1] - target[1]);

                let dist = x_diff * x_diff + y_diff * y_diff;
                if (dist < shortest_dist) {
                    shortest_dir = valid_dirs[i];
                    shortest_dist = dist;
                }
            }

            /* Calculate movement vector */
            this.prev_loc = structuredClone(this.loc);
            this.next_loc = structuredClone(shortest_dir);

            this.movement = [
                (this.next_loc[0] - this.prev_loc[0]) / this.speed,
                (this.next_loc[1] - this.prev_loc[1]) / this.speed,
            ];
        }

        /* Draw */
        this.timer++;
        if (this.timer % 7 == 0) this.sprite_toggle = !this.sprite_toggle;

        this.loc[0] += this.movement[0];
        this.loc[1] += this.movement[1];

        if (!this.sprite_toggle) render_image(ghost_sprites, this.sprite_offset, this.loc, 28, 5);
        if (this.sprite_toggle) render_image(ghost_sprites, this.sprite_offset + 1, this.loc, 28, 5);
    }
}

class Blinky extends BaseGhost {
    constructor(location) {
        super(location);
        this.sprite_offset = 0;
    }

    /**
     * Returns the target tile for blinky
     * 
     * When blinky is in his chase state, his target
     * tile is always directly on top of pacman. If
     * blinky is in his scatter state, his target
     * tile is a pre-determined point in the top 
     * right side of the screen.
     * 
     * @returns x, y target location
     */
    find_target() {
        return [28, -2];
    }
}

class Pinky extends BaseGhost {
    constructor(location) {
        super(location);
        this.sprite_offset = 8;
    }

    /**
     * Returns the target tile for pinky
     * 
     * When pinky is in his chase state, his target
     * tile is always 4 tiles ahead of pacman, except
     * for when pacman is facing upwards. If pacman
     * is facing upwards, pinky's target tile is 4
     * up and 4 to the left. This is because of an
     * overflow bug in the original code. If pinky
     * is in his scatter state, his target tile
     * is in the top left side of the screen.
     * 
     * @returns x, y target location
     */
    find_target() {
        return [0, -2];
    }
}

class Inky extends BaseGhost {
    constructor(location) {
        super(location);
        this.sprite_offset = 16;
    }

    /**
     * Returns the target tile for inky
     * 
     * Go read about it yourself
     * https://gameinternals.com/understanding-pac-man-ghost-behavior
     * 
     * @returns x, y target location
     */
    find_target() {
        return [28, 33];
    }
}

class Clyde extends BaseGhost {
    constructor(location) {
        super(location);
        this.sprite_offset = 24;
    }

    /**
     * Returns the target tile for clyde
     * 
     * When blinky is in his chase state and he is
     * farther than 8 tiles from pacman, his target
     * tile is exactly the same as blinky. If he is
     * 8 tiles or closer, his target tile is the
     * same as his scatter state. If he is in his
     * scatter state, his target tile is in the 
     * bottom left side of the screen.
     * 
     * @returns x, y, target location
     */
    find_target() {
        return [0, 33];
    }
}

let game_timer = 0;
let toggle_pwr_pellet = true;

let blinky = new Blinky([1, 1]);
let pinky = new Pinky([26, 29]);
let inky = new Inky([1, 29]);
let clyde = new Clyde([26, 1]);

/**
 * Renders the game state
 */
function render_game() {
    /* Blinking of power pellets */
    game_timer++;
    if(game_timer % 7 == 0) toggle_pwr_pellet = !toggle_pwr_pellet;

    if (toggle_pwr_pellet) {
        tilemap[3][1] = 33;
        tilemap[3][26] = 33;
        tilemap[23][1] = 33;
        tilemap[23][26] = 33;
    } else {
        tilemap[3][1] = 34;
        tilemap[3][26] = 34;
        tilemap[23][1] = 34;
        tilemap[23][26] = 34;
    }

    /* Render Background */
    render_bkg(tilemap, wall_sprites);

    /* Update and render ghosts */
    blinky.update();
    pinky.update();
    inky.update();
    clyde.update();

    /* Pacman */
}