/*
    This file contains all the code related to the insert-coin state.
*/

let insert_coin_timer = 0;
let pacman_anim_loc = 30;
let ghost_anim_loc = [34, 36, 38, 40];
let anim_timer = 0;
let anim_state = "chase";
let anim_render_pacman = true;
let render_pwr_pellet = true;
let char_map = [];

/**
 * Renders the insert coin state
 */
function render_insert_coin() {
    insert_coin_timer++;

    if (insert_coin_timer === 1) menu_animation(0);
    if (insert_coin_timer > 50) render_image(ghost_sprites, 4, [3, 4], 28);
    if (insert_coin_timer === 100) menu_animation(1);
    if (insert_coin_timer === 125) menu_animation(2);
    if (insert_coin_timer > 175) render_image(ghost_sprites, 12, [3, 7], 28);
    if (insert_coin_timer === 225) menu_animation(3);
    if (insert_coin_timer === 250) menu_animation(4);
    if (insert_coin_timer > 325) render_image(ghost_sprites, 20, [3, 10], 28);
    if (insert_coin_timer === 375) menu_animation(5);
    if (insert_coin_timer === 400) menu_animation(6);
    if (insert_coin_timer > 450) render_image(ghost_sprites, 28, [3, 13], 28);
    if (insert_coin_timer === 500) menu_animation(7);
    if (insert_coin_timer === 525) menu_animation(8);
    if (insert_coin_timer === 600) menu_animation(9);

    if (insert_coin_timer > 600) {
        render_image(wall_sprites, 32, [9, 21.7], 16);
        if (render_pwr_pellet) render_image(wall_sprites, 33, [9, 23.7], 16);

        ctx.drawImage(
            char_sprites,
            3072, 0,
            33, 10,
            220, 350,
            33, 10
        );

        ctx.drawImage(
            char_sprites,
            3072, 0,
            33, 10,
            220, 383,
            33, 10
        );
    }

    if (insert_coin_timer > 650) {
        if (render_pwr_pellet && insert_coin_timer < 960) render_image(wall_sprites, 33, [3, 17], 16);

        // TODO: Fix color of namco sprite
        ctx.drawImage(
            char_sprites,
            3106, 0,
            100, 16,
            155, 450,
            99, 16
        );
    }

    if (insert_coin_timer > 700) {
        /* Blinking of power pelletes */
        if (insert_coin_timer % 7 == 0) render_pwr_pellet = !render_pwr_pellet;

        /* Chasing animation */
        if (anim_state === "chase") {
            anim_timer++;
            if (anim_timer > 12) anim_timer = 0;

            if (anim_timer <= 4) {
                render_image(pacman_sprites, 12, [pacman_anim_loc, 17], 26);
            } else if (anim_timer > 4 && anim_timer <= 8) {
                render_image(pacman_sprites, 13, [pacman_anim_loc, 17], 26);
            } else {
                render_image(pacman_sprites, 18, [pacman_anim_loc, 17], 26);
            }

            if (anim_timer <= 6) {
                render_image(ghost_sprites, 2, [ghost_anim_loc[0], 17], 28);
                render_image(ghost_sprites, 10, [ghost_anim_loc[1], 17], 28);
                render_image(ghost_sprites, 18, [ghost_anim_loc[2], 17], 28);
                render_image(ghost_sprites, 26, [ghost_anim_loc[3], 17], 28);
            } else {
                render_image(ghost_sprites, 3, [ghost_anim_loc[0], 17], 28);
                render_image(ghost_sprites, 11, [ghost_anim_loc[1], 17], 28);
                render_image(ghost_sprites, 19, [ghost_anim_loc[2], 17], 28);
                render_image(ghost_sprites, 27, [ghost_anim_loc[3], 17], 28);
            }

            pacman_anim_loc -= 0.1;
            ghost_anim_loc[0] -= 0.11;
            ghost_anim_loc[1] -= 0.11;
            ghost_anim_loc[2] -= 0.11;
            ghost_anim_loc[3] -= 0.11;

            if (pacman_anim_loc < 3.5) {
                anim_state = "scatter";
            }

            /* Running away animation */
        } else if (anim_state === "scatter") {
            if (insert_coin_timer == 980) {
                temp_pause(1000, () => anim_render_pacman = true);
                ghost_anim_loc[0] = null;
                anim_render_pacman = false;
            }

            if (insert_coin_timer == 1020) {
                temp_pause(1000, () => anim_render_pacman = true);
                ghost_anim_loc[1] = null;
                anim_render_pacman = false;
            }

            if (insert_coin_timer == 1060) {
                temp_pause(1000, () => anim_render_pacman = true);
                ghost_anim_loc[2] = null;
                anim_render_pacman = false;
            }

            if (insert_coin_timer == 1100) {
                temp_pause(1000, () => anim_render_pacman = true);
                ghost_anim_loc[3] = null;
                anim_render_pacman = false;
            }

            if (anim_render_pacman) {
                anim_timer++;
                if (anim_timer > 12) anim_timer = 0;
                if (anim_timer <= 4) {
                    render_image(pacman_sprites, 14, [pacman_anim_loc, 17], 26);
                } else if (anim_timer > 4 && anim_timer <= 8) {
                    render_image(pacman_sprites, 15, [pacman_anim_loc, 17], 26);
                } else {
                    render_image(pacman_sprites, 18, [pacman_anim_loc, 17], 26);
                }
            }

            if (anim_timer <= 6) {
                if (ghost_anim_loc[0]) render_image(ghost_sprites, 32, [ghost_anim_loc[0], 17], 28);
                if (ghost_anim_loc[1]) render_image(ghost_sprites, 32, [ghost_anim_loc[1], 17], 28);
                if (ghost_anim_loc[2]) render_image(ghost_sprites, 32, [ghost_anim_loc[2], 17], 28);
                if (ghost_anim_loc[3]) render_image(ghost_sprites, 32, [ghost_anim_loc[3], 17], 28);
            } else {
                if (ghost_anim_loc[0]) render_image(ghost_sprites, 33, [ghost_anim_loc[0], 17], 28);
                if (ghost_anim_loc[1]) render_image(ghost_sprites, 33, [ghost_anim_loc[1], 17], 28);
                if (ghost_anim_loc[2]) render_image(ghost_sprites, 33, [ghost_anim_loc[2], 17], 28);
                if (ghost_anim_loc[3]) render_image(ghost_sprites, 33, [ghost_anim_loc[3], 17], 28);
            }

            pacman_anim_loc += 0.1;
            if (ghost_anim_loc[0]) ghost_anim_loc[0] += 0.05;
            if (ghost_anim_loc[1]) ghost_anim_loc[1] += 0.05;
            if (ghost_anim_loc[2]) ghost_anim_loc[2] += 0.05;
            if (ghost_anim_loc[3]) ghost_anim_loc[3] += 0.05;
        }
    }

    /* Restart animation */
    if (insert_coin_timer > 1500) {
        insert_coin_timer = 0;
        char_map = [];
        anim_state = "chase";
        pacman_anim_loc = 30;
        ghost_anim_loc = [34, 36, 38, 40];
    }

    render_text(char_map, char_sprites);
}

/**
 * Pauses the game for the given time
 * @param {number} time ms to pause the game for
 * @param {function} callback function to do after pause is over
 */
function temp_pause(time, callback) {
    game_pause = true;
    setTimeout(() => {
        callback();
        game_pause = false;
    }, time);
}

/**
 * Renders a sprite from a sheet.
 * @param {image} spritesheet image element
 * @param {number} sprite the sprite to display
 * @param {array} loc x, y location of sprite
 * @param {number} sprite_size width and height of sprite
 */
function render_image(spritesheet, sprite, loc, sprite_size) {
    ctx.drawImage(
        spritesheet,
        sprite * sprite_size, 0,
        sprite_size, sprite_size,
        loc[0] * 16,
        loc[1] * 16,
        sprite_size, sprite_size
    );
}

/**
 * Renders text from the char_map variable
 * @param {array} char_map char_map variable
 * @param {image} spritesheet text spritesheet image 
 */
function render_text(char_map, spritesheet){
    const SPRITE_SIZE = 16;
    const SPRITE_SCREEN_SIZE = 16;

    for(let i = 0; i < char_map.length; i++){
        ctx.drawImage(
            spritesheet,

            char_map[i][1] * SPRITE_SIZE, 0,
            SPRITE_SIZE, SPRITE_SIZE,

            char_map[i][0][0] * SPRITE_SCREEN_SIZE - 5,
            char_map[i][0][1] * SPRITE_SCREEN_SIZE - 5,
            SPRITE_SCREEN_SIZE, SPRITE_SCREEN_SIZE
        );
    }
}

/**
 * Pushes values to the char_map variable
 * 
 * In the char_map variable:-
 *  - first value refers to the x, y coordinates on the screen
 *  - second value refers to the number of the sprite on the spritesheet
 * @param {number} anim_number
 */
function menu_animation(anim_number) {
    switch (anim_number) {
        case 0:
            char_map.push(
                [[6, 3], 2],
                [[7, 3], 7],
                [[8, 3], 0],
                [[9, 3], 17],
                [[10, 3], 0],
                [[11, 3], 2],
                [[12, 3], 19],
                [[13, 3], 4],
                [[14, 3], 17],
                [[16, 3], 185], // TODO: replace with forward slash
                [[18, 3], 13],
                [[19, 3], 8],
                [[20, 3], 2],
                [[21, 3], 10],
                [[22, 3], 13],
                [[23, 3], 0],
                [[24, 3], 12],
                [[25, 3], 4]
            );
            break;

        case 1:
            char_map.push(
                [[7, 5], 40],
                [[8, 5], 34],
                [[9, 5], 36],
                [[10, 5], 26], // TODO: fix color of "a" sprite
                [[11, 5], 36],
                [[12, 5], 30],
                [[13, 5], 186],
                [[14, 5], 186],
                [[15, 5], 186],
                [[16, 5], 186],
            )
            break;

        case 2:
            char_map.push(
                [[17, 5], 181],
                [[18, 5], 26],
                [[19, 5], 36],
                [[20, 5], 26],
                [[21, 5], 27],
                [[22, 5], 30],
                [[23, 5], 34],
                [[24, 5], 181],
            );
            break;

        case 3:
            char_map.push(
                [[7, 8], 64],
                [[8, 8], 52],
                [[9, 8], 54],
                [[10, 8], 59],
                [[11, 8], 60],
                [[12, 8], 53],
                [[13, 8], 72],
                [[14, 8], 70],
                [[15, 8], 56],
                [[16, 8], 187],
                [[17, 8], 187],
            );
            break;

        case 4:
            char_map.push(
                [[18, 8], 182],
                [[19, 8], 67],
                [[20, 8], 60],
                [[21, 8], 65],
                [[22, 8], 62],
                [[23, 8], 76],
                [[24, 8], 182],
            );
            break;

        case 5:
            char_map.push(
                [[7, 11], 88],
                [[8, 11], 86],
                [[9, 11], 90],
                [[10, 11], 78],
                [[11, 11], 84],
                [[12, 11], 98],
                [[13, 11], 95],
                [[14, 11], 82],
                [[15, 11], 188],
                [[16, 11], 188],
            );
            break;

        case 6:
            char_map.push(
                [[17, 11], 183],
                [[18, 11], 78],
                [[19, 11], 92],
                [[20, 11], 96],
                [[21, 11], 98],
                [[22, 11], 88],
                [[23, 11], 82],
                [[24, 11], 183],
            );
            break;

        case 7:
            char_map.push(
                [[7, 14], 118],
                [[8, 14], 123],
                [[9, 14], 118],
                [[10, 14], 105],
                [[11, 14], 118],
                [[12, 14], 114],
                [[13, 14], 108],
                [[14, 14], 189],
                [[15, 14], 189],
                [[16, 14], 189],
            );
            break;

        case 8:
            char_map.push(
                [[17, 14], 184],
                [[18, 14], 110],
                [[19, 14], 124],
                [[20, 14], 129],
                [[21, 14], 124],
                [[22, 14], 123],
                [[23, 14], 104],
                [[24, 14], 184],
            );
            break;

        case 9:
            char_map.push(
                [[11, 22], 135],
                [[12, 22], 130],
                [[11, 24], 156],
                [[12, 24], 130],
            );
            break;
    }
}