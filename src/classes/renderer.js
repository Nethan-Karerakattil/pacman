class Renderer {
    constructor(width, height, tilemap, spritesheet){
        this.width = width;
        this.height = height;
        this.tilemap = tilemap;
        this.spritesheet = spritesheet;
    }

    /**
     * Renders background images to canvas
     */
    render(){
        let cell_width = canvas.width / this.width;
        let cell_height = canvas.height / this.height;

        for(let y = 0; y < this.tilemap.length; y++){
            for(let x = 0; x < this.tilemap[y].length; x++){
                ctx.drawImage(
                    this.spritesheet,
                    this.tilemap[y][x] * 16, 0, 16, 16,
                    x * cell_width, y * cell_height,
                    cell_width, cell_height
                );
            }
        }
    }
}