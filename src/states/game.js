const GHOST_SPEED = 9;
const PACMAN_SPEED = 10;
const PACMAN_FLASH_SPEED = 4;
const PWR_PELLET_FLASH_SPEED = 7;
const SCATTER_TIME = 7;
const CHASE_TIME = 20;

const BLINKY_SCATTER_LOC = [28, -2];
const PINKY_SCATTER_LOC = [0, -2];
const INKY_SCATTER_LOC = [28, 33];
const CLYDE_SCATTER_LOC = [0, 33];

class BaseGhost {
    constructor(location) {
        this.loc = location;
        this.prev_loc = [];
        this.movement = [0, 0];
        this.speed = GHOST_SPEED;
        this.sprite_toggle = false;
        this.state = "chase";
    }

    /**
     * Update code for all ghosts
     * 
     * Contains:-
     *  - Pathfinding algorithm
     *  - Code for redrawing ghost
     */
    update() {
        if (game_timer % this.speed == 0) {
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
                if (all_dirs[i][0] < 0 || all_dirs[i][1] < 0) continue;

                let next_tile = tilemap[all_dirs[i][1]][all_dirs[i][0]];
                let is_path = next_tile === 32 || next_tile === 33 || next_tile === 34;
                let not_prev_loc = JSON.stringify(this.prev_loc) !== JSON.stringify(all_dirs[i]);

                if (is_path && not_prev_loc) {
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
            this.movement = [
                (shortest_dir[0] - this.prev_loc[0]) / this.speed,
                (shortest_dir[1] - this.prev_loc[1]) / this.speed,
            ];
        }

        /* Change state */
        if (this.state === "chase" && game_timer % CHASE_TIME == 0) this.state = "scatter";
        if (this.state === "scatter" && game_timer % SCATTER_TIME == 0) this.state = "chase";

        /* Draw */
        if (game_timer % 7 == 0) this.sprite_toggle = !this.sprite_toggle;

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
        switch(this.state){
            case "chase":
                return pacman_loc;

            case "scatter":
                return BLINKY_SCATTER_LOC;
        }
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
        switch(this.state){
            case "chase":
                if (pacman_dir[0] ==  0 && pacman_dir[1] == -1) return [pacman_loc[0] - 4, pacman_loc[1] - 4];
                if (pacman_dir[0] ==  1 && pacman_dir[1] ==  0) return [pacman_loc[0] + 4, pacman_loc[1] + 0];
                if (pacman_dir[0] ==  0 && pacman_dir[1] ==  1) return [pacman_loc[0] + 0, pacman_loc[1] + 4];
                if (pacman_dir[0] == -1 && pacman_dir[1] ==  0) return [pacman_loc[0] - 4, pacman_loc[1] + 0];
        
                return pacman_loc;

            case "scatter":
                return PINKY_SCATTER_LOC;
        }
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
     * Difficult to explain. Read the article below and scroll to the
     * "The Blue Ghost" section.
     * https://gameinternals.com/understanding-pac-man-ghost-behavior
     * 
     * @returns x, y target location
     */
    find_target() {
        switch(this.state){
            case "chase":
                return [
                    blinky.loc[0] + (2 * ((pacman_loc[0] + 2) - blinky.loc[0])),
                    blinky.loc[1] + (2 * ((pacman_loc[1] + 2) - blinky.loc[1])),
                ];

            case "scatter":
                return INKY_SCATTER_LOC;
        }
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
     * When clyde is in his chase state and he is
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
        switch(this.state){
            case "chase":
                if(
                    (Math.abs(this.loc[0] - pacman_loc[0]) > 8) ||
                    (Math.abs(this.loc[1] - pacman_loc[1]) > 8)
                ) return pacman_loc;
                return CLYDE_SCATTER_LOC;

            case "scatter":
                return CLYDE_SCATTER_LOC;
        }
    }
}

let game_timer = 0;
let pwr_pellet_flash = true;
let pacman_flash = true;
let pacman_loc = [13, 23];
let pacman_dir = [0, 0];
let pacman_movement = [0, 0];

let blinky = new Blinky([1, 1]);
let pinky = new Pinky([26, 29]);
let inky = new Inky([1, 29]);
let clyde = new Clyde([26, 1]);

/**
 * Renders the game state
 */
function render_game() {
    /* Blinking of power pellets */
    if (game_timer % PWR_PELLET_FLASH_SPEED == 0) pwr_pellet_flash = !pwr_pellet_flash;

    if (pwr_pellet_flash) {
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
    game_timer++;
    blinky.update();
    pinky.update();
    inky.update();
    clyde.update();

    /* Pacman */
    update_pacman();
}

/**
 * Updates & renders pacman
 */
function update_pacman() {
    /* Update movement vector */
    if (game_timer % PACMAN_SPEED == 0) {
        pacman_loc[0] = Math.round(pacman_loc[0]);
        pacman_loc[1] = Math.round(pacman_loc[1]);

        /* Validate user input */
        let player_next_loc = [pacman_loc[0] + player_dir[0], pacman_loc[1] + player_dir[1]];
        let player_next_tile = tilemap[player_next_loc[1]][player_next_loc[0]];

        if (player_next_tile === 32 || player_next_tile === 33 || player_next_tile === 34) {
            pacman_dir = structuredClone(player_dir);
        }

        /* Calculate movement vector */
        let pacman_next_loc = [pacman_loc[0] + pacman_dir[0], pacman_loc[1] + pacman_dir[1]];
        let pacman_next_tile = tilemap[pacman_next_loc[1]][pacman_next_loc[0]];

        if (pacman_next_tile === 32 || pacman_next_tile === 33 || pacman_next_tile === 34) {
            pacman_movement = [
                (pacman_next_loc[0] - pacman_loc[0]) / PACMAN_SPEED,
                (pacman_next_loc[1] - pacman_loc[1]) / PACMAN_SPEED
            ];
        } else {
            pacman_movement = [0, 0];
        }
    }

    /* Update location & draw */
    pacman_loc[0] += pacman_movement[0];
    pacman_loc[1] += pacman_movement[1];

    let sprite_id = 10;
    if (pacman_dir[0] ==  0 && pacman_dir[1] == -1) sprite_id += 6;
    if (pacman_dir[0] ==  1 && pacman_dir[1] ==  0) sprite_id += 4;
    if (pacman_dir[0] ==  0 && pacman_dir[1] ==  1) sprite_id += 0;
    if (pacman_dir[0] == -1 && pacman_dir[1] ==  0) sprite_id += 2;

    if (game_timer % PACMAN_FLASH_SPEED == 0) pacman_flash = !pacman_flash;
    if (pacman_flash && !(pacman_movement[0] == 0 && pacman_movement[1] == 0)) sprite_id++;

    render_image(pacman_sprites, sprite_id, pacman_loc, 26, 5);
}