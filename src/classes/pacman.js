class Pacman {
    constructor(renderer, loc){
        this.renderer = renderer;
        this.loc = loc;
    }

    async load(path) {
        let image_paths = [
            path + "/down-1.png",
            path + "/down-2.png",
            path + "/left-1.png",
            path + "/left-2.png",
            path + "/right-1.png",
            path + "/right-2.png",
            path + "/up-1.png",
            path + "/up-2.png"
        ];

        this.images = [];
        for(let i = 0; i < 8; i++){
            this.images[i] = new Image();

            try {
                await new Promise((resolve, reject) => {
                    this.images[i].src = image_paths[i];
                    this.images[i].onload = () => resolve();
                    this.images[i].onerror = () => reject();
                });
            } catch(err) {
                console.error(err);
            }
        }
    }

    render() {

    }
}