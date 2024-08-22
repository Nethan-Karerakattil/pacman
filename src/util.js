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
function render_image(spritesheet, sprite, loc, sprite_size, offset) {
    ctx.drawImage(
        spritesheet,
        sprite * sprite_size, 0,
        sprite_size, sprite_size,
        loc[0] * 16 - offset,
        loc[1] * 16 - offset,
        sprite_size, sprite_size
    );
}

/**
 * Renders text from the char_map variable
 * @param {array} char_map char_map variable
 * @param {image} spritesheet text spritesheet image
 */
function render_text(char_map, spritesheet){
    for(let i = 0; i < char_map.length; i++){
        render_image(spritesheet, char_map[i][1], char_map[i][0], 16, 5);
    }
}

/**
 * Renders the map based on the data inside the tilemap variable
 * @param {array} tilemap variable that contains all data regarding walls and pellets
 * @param {image} spritesheet spritesheet for all walls and pelletes
 */
function render_bkg(tilemap, spritesheet){
    const SPRITE_WIDTH = 16;
    const SPRITE_HEIGHT = 16;
    const SCREEN_CELL_WIDTH = 16;
    const SCREEN_CELL_HEIGHT = 16;

    for(let y = 0; y < tilemap.length; y++){
        for(let x = 0; x < tilemap[y].length; x++){
            ctx.drawImage(
                spritesheet,
                tilemap[y][x] * SPRITE_WIDTH, 0,
                SPRITE_WIDTH, SPRITE_HEIGHT,
                x * SCREEN_CELL_WIDTH, y * SCREEN_CELL_HEIGHT,
                SCREEN_CELL_WIDTH, SCREEN_CELL_HEIGHT
            );
        }
    }
}