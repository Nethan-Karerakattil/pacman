let game_timer = 0;

function render_game() {
    /* Blinking of power pellets */
    game_timer++;
    if (game_timer > 14) {
        game_timer = 0;
    }

    if (game_timer < 7) {
        tilemap[3][1] = 34;
        tilemap[3][26] = 34;
        tilemap[23][1] = 34;
        tilemap[23][26] = 34;
    } else if (game_timer >= 7) {
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
}