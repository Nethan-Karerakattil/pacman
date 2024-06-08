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

    renderer = new Renderer(rows, cols, tilemap, wall_sprites);
    // pacman = new Pacman(renderer, [13, 23]);

    // blinky = new Ghost("blinky", renderer, pacman, [1, 1]);
    // pinky = new Ghost("pinky", renderer, pacman, [26, 29]);
    // inky = new Ghost("inky", renderer, pacman, [1, 29]);
    // clyde = new Ghost("clyde", renderer, pacman, [26, 1]);
    
    // await pacman.load(pacman_images);

    // await blinky.load(blinky_images);
    // await pinky.load(pinky_images);
    // await inky.load(inky_images);
    // await clyde.load(clyde_images);

    // /* Events */
    // document.addEventListener("keyup", (e) => {
    //     if(e.key === "w") pacman.player_dir = "w";
    //     else if(e.key === "a") pacman.player_dir = "a";
    //     else if(e.key === "s") pacman.player_dir = "s";
    //     else if(e.key === "d") pacman.player_dir = "d";
    // });

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

    renderer.render();

    // pacman.update();
    // blinky.update();
    // pinky.update();
    // inky.update();
    // clyde.update();
}