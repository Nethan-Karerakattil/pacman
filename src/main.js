const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

/* Globals */
let rows = 28;
let cols = 31;
let scale = 16;
let fps = 0;

canvas.width = rows * scale;
canvas.height = cols * scale;

let game_pause = false;
let renderer = null;
let pacman = null;

let blinky = null;
let pinky = null;
let inky = null;
let clyde = null;

/* Events */
document.addEventListener("visibilitychange", () => {
    game_pause = document.hidden ? true : false;
});

/* Logic */
main();
async function main(){
    renderer = new Renderer(rows, cols);
    pacman = new Pacman(renderer, []);

    blinky = new Ghost("blinky", renderer, [1, 1]);
    pinky = new Ghost("pinky", renderer, [26, 29]);
    inky = new Ghost("inky", renderer, [1, 29]);
    clyde = new Ghost("clyde", renderer, [26, 1]);
    
    await renderer.load(image_src_arr);
    renderer.tilemap = tilemap;

    await blinky.load("../images/ghosts/blinky");
    await pinky.load("../images/ghosts/pinky");
    await inky.load("../images/ghosts/inky");
    await clyde.load("../images/ghosts/clyde");

    let font = new FontFace("main_font", "url(fonts/press-start-2p.ttf)");
    await font.load();
    document.fonts.add(font);

    calc_fps();
    function calc_fps() {
        setTimeout(() => {
            calc_fps();
            console.log(fps);
            fps = 0;
        }, 1000);
    }

    loop();
    function loop(){
        setTimeout(() => {
            loop();
            if(!game_pause){
                render_loop();
                fps++;
            }
        }, 1000 / 60);
    }
}

function render_loop() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    renderer.render();

    blinky.render();
    pinky.render();
    inky.render();
    clyde.render();
}