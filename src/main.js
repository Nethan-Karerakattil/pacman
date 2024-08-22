const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

/* Globals */
const ROWS = 28;
const COLS = 31;
const SCALE = 16;
let fps = 0;

canvas.width = ROWS * SCALE;
canvas.height = COLS * SCALE;

let renderer = null;
let text = null;
let pacman = null;
let state = "insert-coin";
let game_pause = false;
let player_dir = "a";

let char_sprites;
let ghost_sprites;
let pacman_sprites;
let wall_sprites;

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

    char_sprites = new Image();
    char_sprites.src = "./images/charectors.png";
    char_sprites.onload = () => char_sprites.image_loaded = true;

    ghost_sprites = new Image();
    ghost_sprites.src = "./images/ghost.png";
    ghost_sprites.onload = () => ghost_sprites.image_loaded = true;

    pacman_sprites = new Image();
    pacman_sprites.src = "./images/pacman.png";
    pacman_sprites.onload = () => pacman_sprites.image_loaded = true;

    wall_sprites = new Image();
    wall_sprites.src = "./images/wall.png";
    wall_sprites.onload = () => wall_sprites.image_loaded = true;

    /* Events */
    document.addEventListener("keyup", (e) => {
        if(state === "insert-coin" && e.key === "Enter"){
            state = "game";
            return;
        }

        if(state === "game"){
            if (e.key === "w" || e.key === "ArrowUp"){
                player_dir = "w";
                return;
            }
            
            if (e.key === "a" || e.key === "ArrowLeft"){
                player_dir = "s";
                return;
            }
            
            if (e.key === "s" || e.key === "ArrowDown"){
                player_dir = "s";
                return;
            }
            
            if (e.key === "d" || e.key === "ArrowRight"){
                player_dir = "d";
                return;
            }

            return;
        }
    });

    // TODO: Find more optimal way to load sprites
    wait_loaded();
    function wait_loaded(){
        if(
            char_sprites.image_loaded &&
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

    // TODO: Find more optimal way to limit fps to 60
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
            render_insert_coin();
            break;

        case "pre-game":
            break;

        case "game":
            render_game();
            break;

        case "post-game":
            break;
    }
}