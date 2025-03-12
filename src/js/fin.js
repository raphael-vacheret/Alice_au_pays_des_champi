import * as fct from "/src/js/niveau2.js";  

export default class niveau3 extends Phaser.Scene{
    constructor() {
        super({
        key: "fin"
        });
    }

    preload(){
        this.load.image("champi_fin","src/assets/niveau3/champi_fin.png");
    }

    create(){
        let image_fin = this.add.image(this.scale.width / 2, this.scale.height / 2, "champi_fin");
        image_fin.setDisplaySize(this.scale.width, this.scale.height);
    }

    update(){

    }
}