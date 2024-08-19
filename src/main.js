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
let game_pause = false;

let blinky = null;
let pinky = null;
let inky = null;
let clyde = null;

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

    renderer = new Renderer(rows, cols, tilemap, wall_sprites);
    text = new Text(char_sprites, []);
    pacman = new Pacman(renderer, pacman_sprites, [13, 23]);

    blinky = new Ghost("blinky", renderer, pacman, ghost_sprites, [1, 1]);
    pinky = new Ghost("pinky", renderer, pacman, ghost_sprites, [26, 29]);
    inky = new Ghost("inky", renderer, pacman, ghost_sprites, [1, 29]);
    clyde = new Ghost("clyde", renderer, pacman, ghost_sprites, [26, 1]);

    /* Events */
    document.addEventListener("keyup", (e) => {
        if(state === "game" && (e.key === "w" || e.key === "ArrowUp")) return pacman.player_dir = "w";
        else if(state === "game" && (e.key === "a" || e.key === "ArrowLeft")) return pacman.player_dir = "a";
        else if(state === "game" && (e.key === "s" || e.key === "ArrowDown")) return pacman.player_dir = "s";
        else if(state === "game" && (e.key === "d" || e.key === "ArrowRight")) return pacman.player_dir = "d";
        
        if(state === "insert-coin" && e.key === "Enter") return state = "game";
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