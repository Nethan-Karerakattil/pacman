let image_src_arr = [
    /*  0 */ "../images/walls/type-1/edge-down-left.png",
    /*  1 */ "../images/walls/type-1/edge-down-right.png",
    /*  2 */ "../images/walls/type-1/edge-top-left.png",
    /*  3 */ "../images/walls/type-1/edge-top-right.png",

    /*  4 */ "../images/walls/type-1/wall-down.png",
    /*  5 */ "../images/walls/type-1/wall-left.png",
    /*  6 */ "../images/walls/type-1/wall-right.png",
    /*  7 */ "../images/walls/type-1/wall-top.png",

    /*  8 */ "../images/walls/type-2/edge-down-left.png",
    /*  9 */ "../images/walls/type-2/edge-down-right.png",
    /* 10 */ "../images/walls/type-2/edge-top-left.png",
    /* 11 */ "../images/walls/type-2/edge-top-right.png",

    /* 12 */ "../images/walls/type-2/wall-down.png",
    /* 13 */ "../images/walls/type-2/wall-left.png",
    /* 14 */ "../images/walls/type-2/wall-right.png",
    /* 15 */ "../images/walls/type-2/wall-top.png",

    /* 16 */ "../images/walls/tumor/down-left.png",
    /* 17 */ "../images/walls/tumor/down-right.png",
    /* 18 */ "../images/walls/tumor/top-left.png",
    /* 19 */ "../images/walls/tumor/top-right.png",
    /* 20 */ "../images/walls/tumor/left-top.png",
    /* 21 */ "../images/walls/tumor/left-down.png",
    /* 22 */ "../images/walls/tumor/right-top.png",
    /* 23 */ "../images/walls/tumor/right-down.png",

    /* 24 */ "../images/walls/corner/down-left.png",
    /* 25 */ "../images/walls/corner/down-right.png",
    /* 26 */ "../images/walls/corner/up-left.png",
    /* 27 */ "../images/walls/corner/up-right.png",

    /* 28 */ "../images/walls/corner/t2-down-left.png",
    /* 29 */ "../images/walls/corner/t2-down-right.png",
    /* 30 */ "../images/walls/corner/t2-up-left.png",
    /* 31 */ "../images/walls/corner/t2-up-right.png",

    /* 32 */ "../images/fruits/pellet.png",
    /* 33 */ "../images/fruits/power-pellet.png",
    /* 34 */ "../images/blank.png"
];

let pacman_images = [
    /*  0 */ "../images/pacman/die/1.png",
    /*  1 */ "../images/pacman/die/2.png",
    /*  2 */ "../images/pacman/die/3.png",
    /*  3 */ "../images/pacman/die/4.png",
    /*  4 */ "../images/pacman/die/5.png",
    /*  5 */ "../images/pacman/die/6.png",
    /*  6 */ "../images/pacman/die/7.png",
    /*  7 */ "../images/pacman/die/8.png",
    /*  8 */ "../images/pacman/die/9.png",
    /*  9 */ "../images/pacman/die/10.png",

    /* 10 */ "../images/pacman/move/down-1.png",
    /* 11 */ "../images/pacman/move/down-2.png",
    /* 12 */ "../images/pacman/move/left-1.png",
    /* 13 */ "../images/pacman/move/left-2.png",
    /* 14 */ "../images/pacman/move/right-1.png",
    /* 15 */ "../images/pacman/move/right-2.png",
    /* 16 */ "../images/pacman/move/up-1.png",
    /* 17 */ "../images/pacman/move/up-2.png",

    /* 18 */ "../images/pacman/circle.png"
];

let blinky_images = [
    "../images/ghosts/blinky/down-1.png",
    "../images/ghosts/blinky/down-2.png",
    "../images/ghosts/blinky/left-1.png",
    "../images/ghosts/blinky/left-2.png",
    "../images/ghosts/blinky/right-1.png",
    "../images/ghosts/blinky/right-2.png",
    "../images/ghosts/blinky/up-1.png",
    "../images/ghosts/blinky/up-2.png"
];

let pinky_images = [
    "../images/ghosts/pinky/down-1.png",
    "../images/ghosts/pinky/down-2.png",
    "../images/ghosts/pinky/left-1.png",
    "../images/ghosts/pinky/left-2.png",
    "../images/ghosts/pinky/right-1.png",
    "../images/ghosts/pinky/right-2.png",
    "../images/ghosts/pinky/up-1.png",
    "../images/ghosts/pinky/up-2.png"
];

let inky_images = [
    "../images/ghosts/inky/down-1.png",
    "../images/ghosts/inky/down-2.png",
    "../images/ghosts/inky/left-1.png",
    "../images/ghosts/inky/left-2.png",
    "../images/ghosts/inky/right-1.png",
    "../images/ghosts/inky/right-2.png",
    "../images/ghosts/inky/up-1.png",
    "../images/ghosts/inky/up-2.png"
];

let clyde_images = [
    "../images/ghosts/clyde/down-1.png",
    "../images/ghosts/clyde/down-2.png",
    "../images/ghosts/clyde/left-1.png",
    "../images/ghosts/clyde/left-2.png",
    "../images/ghosts/clyde/right-1.png",
    "../images/ghosts/clyde/right-2.png",
    "../images/ghosts/clyde/up-1.png",
    "../images/ghosts/clyde/up-2.png"
];

let tilemap = [
    [ 2,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7, 19, 18,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  3],
    [ 5, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,  6],
    [ 5, 32, 10, 12, 12, 12, 12, 12, 12, 12, 12, 11, 32, 14, 13, 32, 10, 12, 12, 12, 12, 12, 12, 12, 12, 11, 32,  6],
    [ 5, 33, 14, 34, 34, 34, 34, 34, 34, 34, 34, 13, 32, 14, 13, 32, 14, 34, 34, 34, 34, 34, 34, 34, 34, 13, 33,  6],
    [ 5, 32,  8, 15, 15, 15, 15, 15, 15, 15, 15,  9, 32,  8,  9, 32,  8, 15, 15, 15, 15, 15, 15, 15, 15,  9, 32,  6],
    [ 5, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,  6],
    [ 5, 32, 10, 12, 12, 11, 32, 10, 11, 32, 10, 12, 12, 12, 12, 12, 12, 11, 32, 10, 11, 32, 10, 12, 12, 11, 32,  6],
    [ 5, 32,  8, 15, 15,  9, 32, 14, 13, 32,  8, 15, 15, 24, 25, 15, 15,  9, 32, 14, 13, 32,  8, 15, 15,  9, 32,  6],
    [ 5, 32, 32, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 32, 32,  6],
    [ 0,  4,  4,  4,  4, 11, 32, 14, 27, 12, 12, 11, 34, 14, 13, 34, 10, 12, 12, 26, 13, 32, 10,  4,  4,  4,  4,  1],
    [34, 34, 34, 34, 34,  5, 32, 14, 25, 15, 15,  9, 34,  8,  9, 34,  8, 15, 15, 24, 13, 32,  6, 34, 34, 34, 34, 34],
    [34, 34, 34, 34, 34,  5, 32, 14, 13, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 14, 13, 32,  6, 34, 34, 34, 34, 34],
    [34, 34, 34, 34, 34,  5, 32, 14, 13, 34, 29,  4,  4,  4,  4,  4,  4, 28, 34, 14, 13, 32,  6, 34, 34, 34, 34, 34],
    [ 7,  7,  7,  7,  7,  9, 32,  8,  9, 34,  6, 34, 34, 34, 34, 34, 34,  5, 34,  8,  9, 32,  8,  7,  7,  7,  7,  7],
    [34, 34, 34, 34, 34, 34, 32, 34, 34, 34,  6, 34, 34, 34, 34, 34, 34,  5, 34, 34, 34, 32, 34, 34, 34, 34, 34, 34],
    [ 4,  4,  4,  4,  4, 11, 32, 10, 11, 34,  6, 34, 34, 34, 34, 34, 34,  5, 34, 10, 11, 32, 10,  4,  4,  4,  4,  4],
    [34, 34, 34, 34, 34,  5, 32, 14, 13, 34, 31,  7,  7,  7,  7,  7,  7, 30, 34, 14, 13, 32,  6, 34, 34, 34, 34, 34],
    [34, 34, 34, 34, 34,  5, 32, 14, 13, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 14, 13, 32,  6, 34, 34, 34, 34, 34],
    [34, 34, 34, 34, 34,  5, 32, 14, 13, 34, 10, 12, 12, 12, 12, 12, 12, 11, 34, 14, 13, 32,  6, 34, 34, 34, 34, 34],
    [ 2,  7,  7,  7,  7,  9, 32,  8,  9, 34,  8, 15, 15, 24, 25, 15, 15,  9, 34,  8,  9, 32,  8,  7,  7,  7,  7,  3],
    [ 5, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,  6],
    [ 5, 32, 10, 12, 12, 11, 32, 10, 12, 12, 12, 11, 32, 14, 13, 32, 10, 12, 12, 12, 11, 32, 10, 12, 12, 11, 32,  6],
    [ 5, 32,  8, 15, 24, 13, 32,  8, 15, 15, 15,  9, 32,  8,  9, 32,  8, 15, 15, 15,  9, 32, 14, 25, 15,  9, 32,  6],
    [ 5, 33, 32, 32, 14, 13, 32, 32, 32, 32, 32, 32, 32, 34, 34, 32, 32, 32, 32, 32, 32, 32, 14, 13, 32, 32, 33,  6],
    [20, 12, 11, 32, 14, 13, 32, 10, 11, 32, 10, 12, 12, 12, 12, 12, 12, 11, 32, 10, 11, 32, 14, 13, 32, 10, 12, 22],
    [21, 15,  9, 32,  8,  9, 32, 14, 13, 32,  8, 15, 15, 24, 25, 15, 15,  9, 32, 14, 13, 32,  8,  9, 32,  8, 15, 23],
    [ 5, 32, 32, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 14, 13, 32, 32, 32, 32, 32, 32,  6],
    [ 5, 32, 10, 12, 12, 12, 12, 26, 27, 12, 12, 11, 32, 14, 13, 32, 10, 12, 12, 26, 27, 12, 12, 12, 12, 11, 32,  6],
    [ 5, 32,  8, 15, 15, 15, 15, 15, 15, 15, 15,  9, 32,  8,  9, 32,  8, 15, 15, 15, 15, 15, 15, 15, 15,  9, 32,  6],
    [ 5, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,  6],
    [ 0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  1]
];