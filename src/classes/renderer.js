class Renderer {
    constructor(tilemap, width, height){
        this.width = width;
        this.height = height;
        this.tilemap = tilemap;
        this.images = [];
    }

    async load(image_src_arr){
        for(let i = 0; i < image_src_arr.length; i++){
            let image = new Image();

            try {
                await new Promise((resolve, reject) => {
                    image.src = image_src_arr[i];
                    image.onload = () => resolve();
                    image.onerror = () => reject("Error while processing image");
                });
            } catch(err) {
                console.error(err);
            }
        
            this.images.push(image);
        }
    }

    render(){
        let cell_width = canvas.width / this.width;
        let cell_height = canvas.height / this.height;

        for(let y = 0; y < this.tilemap.length; y++){
            for(let x = 0; x < this.tilemap[y].length; x++){
                let image = this.images[this.tilemap[y][x]];
                
                ctx.drawImage(image, x * cell_width, y * cell_height, cell_width, cell_height);
            }
        }
    }
}