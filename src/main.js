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
let pacman = null;
let pwr_pellet_timer = 0;

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
    });

    calc_fps();
    function calc_fps() {
        setTimeout(() => {
            calc_fps();
            // console.log(fps);
            fps = 0;
        }, 1000);
    }

    loop();
    function loop(){
        setTimeout(() => {
            loop();
            render_loop();
            fps++;  
        }, 1000 / 60);
    }
}

function render_loop() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Blinking of power pellets */
    pwr_pellet_timer++;
    if(pwr_pellet_timer > 14){
        pwr_pellet_timer = 0;
    }

    if(pwr_pellet_timer < 7){
        tilemap[3][1] = 34;
        tilemap[3][26] = 34;
        tilemap[23][1] = 34;
        tilemap[23][26] = 34;
    } else if(pwr_pellet_timer >= 7) {
        tilemap[3][1] = 33;
        tilemap[3][26] = 33;
        tilemap[23][1] = 33;
        tilemap[23][26] = 33;
    }

    // Blank = 34
    // pwr pellet = 33

    /* Render Board */
    renderer.render();

    /* Render Ghosts and Pacman */
    pacman.update();
    blinky.update();
    pinky.update();
    inky.update();
    clyde.update();
}