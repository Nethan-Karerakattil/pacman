const SPRITE_SIZE = 16;

class Text {
    constructor(spritesheet, char_map){
        this.spritesheet = spritesheet;
        this.char_map = char_map;
    }

    /**
     * Renders the text from this.char_map to screen
     * @param {string} input text to display
     */
    render(){
        for(let i = 0; i < this.char_map.length; i++){
            ctx.drawImage(
                this.spritesheet,

                this.char_map[i][1] * SPRITE_SIZE, 0,
                SPRITE_SIZE, SPRITE_SIZE,

                this.char_map[i][0][0] * 16 - 5,
                this.char_map[i][0][1] * 16 - 5,
                16, 16
            );
        }
    }
}