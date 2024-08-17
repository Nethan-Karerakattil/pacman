const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

/* Globals */
let rows = 28;
let cols = 31;
let scale = 16;
let fps = 0;

canvas.width = rows * scale;
canvas.height = cols * scale;

let renderer = null;
let text = null;
let pacman = null;
let state = "insert-coin";
let timer = 0;

let pacman_anim_loc = 30;
let ghost_anim_loc = [34, 36, 38, 40];
let anim_timer = 0;
let anim_state = "chase";
let game_pause = false;
let anim_render_pacman = true;
let render_pwr_pellet = true;

let blinky = null;
let pinky = null;
let inky = null;
let clyde = null;

main();
async function main(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let font = new FontFace("main_font", "url(fonts/press-start-2p.ttf)");
    await font.load();
    document.fonts.add(font);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "12px main_font";
    ctx.fillText("LOADING ASSETS...", canvas.width / 2, canvas.height / 2);
    console.log("loading assets");

    let charector_sprites = new Image();
    charector_sprites.src = "./images/charectors.png";
    charector_sprites.onload = () => charector_sprites.image_loaded = true;

    let ghost_sprites = new Image();
    ghost_sprites.src = "./images/ghost.png";
    ghost_sprites.onload = () => ghost_sprites.image_loaded = true;

    let pacman_sprites = new Image();
    pacman_sprites.src = "./images/pacman.png";
    pacman_sprites.onload = () => pacman_sprites.image_loaded = true;

    let wall_sprites = new Image();
    wall_sprites.src = "./images/wall.png";
    wall_sprites.onload = () => wall_sprites.image_loaded = true;

    renderer = new Renderer(rows, cols, tilemap, wall_sprites);
    text = new Text(charector_sprites, []);
    pacman = new Pacman(renderer, pacman_sprites, [13, 23]);

    blinky = new Ghost("blinky", renderer, pacman, ghost_sprites, [1, 1]);
    pinky = new Ghost("pinky", renderer, pacman, ghost_sprites, [26, 29]);
    inky = new Ghost("inky", renderer, pacman, ghost_sprites, [1, 29]);
    clyde = new Ghost("clyde", renderer, pacman, ghost_sprites, [26, 1]);

    /* Events */
    document.addEventListener("keyup", (e) => {
        if(e.key === "w" || e.key === "ArrowUp") pacman.player_dir = "w";
        else if(e.key === "a" || e.key === "ArrowLeft") pacman.player_dir = "a";
        else if(e.key === "s" || e.key === "ArrowDown") pacman.player_dir = "s";
        else if(e.key === "d" || e.key === "ArrowRight") pacman.player_dir = "d";
        
        if(state === "insert-coin" && e.key === "Enter") state = "game";
    });

    wait_loaded();
    function wait_loaded(){
        if(
            charector_sprites.image_loaded &&
            ghost_sprites.image_loaded &&
            pacman_sprites.image_loaded &&
            wall_sprites.image_loaded
        ){
            calc_fps();
            loop();
            console.log("loaded all assets");
        } else {
            setTimeout(() => {
                wait_loaded();
            }, 10);
        }
    }

    function calc_fps() {
        setTimeout(() => {
            calc_fps();
            // console.log(fps);
            fps = 0;
        }, 1000);
    }

    function loop(){
        setTimeout(() => {
            loop();
            if(!game_pause) render_loop();
            fps++;
        }, 1000 / 60);
    }
}

function render_loop() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    switch(state){
        case "loading":
            break;

        case "insert-coin":
            timer++;

            if(timer === 1) menu_animation(0);
            if(timer > 50) render_image(blinky.spritesheet, 4, [3, 4], 28);
            if(timer === 100) menu_animation(1);
            if(timer === 125) menu_animation(2);
            if(timer > 175) render_image(pinky.spritesheet, 12, [3, 7], 28);
            if(timer === 225) menu_animation(3);
            if(timer === 250) menu_animation(4);
            if(timer > 325) render_image(inky.spritesheet, 20, [3, 10], 28);
            if(timer === 375) menu_animation(5);
            if(timer === 400) menu_animation(6);
            if(timer > 450) render_image(clyde.spritesheet, 28, [3, 13], 28);
            if(timer === 500) menu_animation(7);
            if(timer === 525) menu_animation(8);
            if(timer === 600) menu_animation(9);

            if(timer > 600){
                render_image(renderer.spritesheet, 32, [9, 21.7], 16);
                if(render_pwr_pellet) render_image(renderer.spritesheet, 33, [9, 23.7], 16);

                ctx.drawImage(
                    text.spritesheet,
                    3072, 0,
                    33, 10,
                    220, 350,
                    33, 10
                );

                ctx.drawImage(
                    text.spritesheet,
                    3072, 0,
                    33, 10,
                    220, 383,
                    33, 10
                );
            }

            if(timer > 650){
                if(render_pwr_pellet && timer < 960) render_image(renderer.spritesheet, 33, [3, 17], 16);

                // TODO: Fix color of namco sprite
                ctx.drawImage(
                    text.spritesheet,
                    3106, 0,
                    100, 16,
                    155, 450,
                    99, 16
                );
            }

            if(timer > 700){
                /* Blinking of power pelletes */
                if(timer % 7 == 0) render_pwr_pellet = !render_pwr_pellet;

                /* Chasing animation */
                if(anim_state === "chase"){
                    anim_timer++;
                    if(anim_timer > 12) anim_timer = 0;
    
                    if(anim_timer <= 4){
                        render_image(pacman.spritesheet, 12, [pacman_anim_loc, 17], 26);
                    } else if(anim_timer > 4 && anim_timer <= 8){
                        render_image(pacman.spritesheet, 13, [pacman_anim_loc, 17], 26);
                    } else {
                        render_image(pacman.spritesheet, 18, [pacman_anim_loc, 17], 26);
                    }
    
                    if(anim_timer <= 6){
                        render_image(blinky.spritesheet, 2, [ghost_anim_loc[0], 17], 28);
                        render_image(pinky.spritesheet, 10, [ghost_anim_loc[1], 17], 28);
                        render_image(blinky.spritesheet, 18, [ghost_anim_loc[2], 17], 28);
                        render_image(blinky.spritesheet, 26, [ghost_anim_loc[3], 17], 28);
                    } else {
                        render_image(blinky.spritesheet, 3, [ghost_anim_loc[0], 17], 28);
                        render_image(pinky.spritesheet, 11, [ghost_anim_loc[1], 17], 28);
                        render_image(blinky.spritesheet, 19, [ghost_anim_loc[2], 17], 28);
                        render_image(blinky.spritesheet, 27, [ghost_anim_loc[3], 17], 28);
                    }
    
                    pacman_anim_loc -= 0.1;
                    ghost_anim_loc[0] -= 0.11;
                    ghost_anim_loc[1] -= 0.11;
                    ghost_anim_loc[2] -= 0.11;
                    ghost_anim_loc[3] -= 0.11;

                    if(pacman_anim_loc < 3.5){
                        anim_state = "scatter";
                    }

                /* Running away animation */
                } else if(anim_state === "scatter"){
                    if(timer == 980){
                        temp_pause(1000, () => anim_render_pacman = true);
                        ghost_anim_loc[0] = null;
                        anim_render_pacman = false;
                    }

                    if(timer == 1020){
                        temp_pause(1000, () => anim_render_pacman = true);
                        ghost_anim_loc[1] = null;
                        anim_render_pacman = false;
                    }

                    if(timer == 1060){
                        temp_pause(1000, () => anim_render_pacman = true);
                        ghost_anim_loc[2] = null;
                        anim_render_pacman = false;
                    }

                    if(timer == 1100){
                        temp_pause(1000, () => anim_render_pacman = true);
                        ghost_anim_loc[3] = null;
                        anim_render_pacman = false;
                    }

                    if(anim_render_pacman){
                        anim_timer++;
                        if(anim_timer > 12) anim_timer = 0;
                        if(anim_timer <= 4){
                            render_image(pacman.spritesheet, 14, [pacman_anim_loc, 17], 26);
                        } else if(anim_timer > 4 && anim_timer <= 8){
                            render_image(pacman.spritesheet, 15, [pacman_anim_loc, 17], 26);
                        } else {
                            render_image(pacman.spritesheet, 18, [pacman_anim_loc, 17], 26);
                        }
                    }
    
                    if(anim_timer <= 6){
                        if(ghost_anim_loc[0]) render_image(blinky.spritesheet, 32, [ghost_anim_loc[0], 17], 28);
                        if(ghost_anim_loc[1]) render_image(pinky.spritesheet, 32, [ghost_anim_loc[1], 17], 28);
                        if(ghost_anim_loc[2]) render_image(blinky.spritesheet, 32, [ghost_anim_loc[2], 17], 28);
                        if(ghost_anim_loc[3]) render_image(blinky.spritesheet, 32, [ghost_anim_loc[3], 17], 28);
                    } else {
                        if(ghost_anim_loc[0]) render_image(blinky.spritesheet, 33, [ghost_anim_loc[0], 17], 28);
                        if(ghost_anim_loc[1]) render_image(pinky.spritesheet, 33, [ghost_anim_loc[1], 17], 28);
                        if(ghost_anim_loc[2]) render_image(blinky.spritesheet, 33, [ghost_anim_loc[2], 17], 28);
                        if(ghost_anim_loc[3]) render_image(blinky.spritesheet, 33, [ghost_anim_loc[3], 17], 28);
                    }
    
                    pacman_anim_loc += 0.1;
                    if(ghost_anim_loc[0]) ghost_anim_loc[0] += 0.05;
                    if(ghost_anim_loc[1]) ghost_anim_loc[1] += 0.05;
                    if(ghost_anim_loc[2]) ghost_anim_loc[2] += 0.05;
                    if(ghost_anim_loc[3]) ghost_anim_loc[3] += 0.05;
                }
            }

            /* Restart animation */
            if(timer > 1500){
                timer = 0;
                text.char_map = [];
                anim_state = "chase";
                pacman_anim_loc = 30;
                ghost_anim_loc = [34, 36, 38, 40];
            }

            text.render();
            break;

        case "pre-game":
            break;

        case "game":
            /* Blinking of power pellets */
            timer++;
            if(timer > 14){
                timer = 0;
            }

            if(timer < 7){
                tilemap[3][1] = 34;
                tilemap[3][26] = 34;
                tilemap[23][1] = 34;
                tilemap[23][26] = 34;
            } else if(timer >= 7) {
                tilemap[3][1] = 33;
                tilemap[3][26] = 33;
                tilemap[23][1] = 33;
                tilemap[23][26] = 33;
            }

            /* Render Board */
            renderer.render();

            /* Render Ghosts and Pacman */
            pacman.update();
            blinky.update();
            pinky.update();
            inky.update();
            clyde.update();
            break;

        case "post-game":
            break;
    }
}

/**
 * Pauses the game for the given time
 * @param {number} time ms to pause the game for
 * @param {function} callback function to do after pause is over
 */
function temp_pause(time, callback){
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
function render_image(spritesheet, sprite, loc, sprite_size){
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
 * Displays the animation for menu state
 * @param {*} anim_number 
 */
function menu_animation(anim_number){
    switch(anim_number){
        case 0:
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
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
            text.char_map.push(
                [[11, 22], 135],
                [[12, 22], 130],
                [[11, 24], 156],
                [[12, 24], 130],
            );
            break;
    }
}