export default class niveau2_fin extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau2_fin' });
    }

    preload() {
        this.load.image('mec_content', 'src/assets/niveau2/mec_content_2.jpg');
    }

    create() {
        let image1 = this.add.image(this.scale.width / 2, this.scale.height / 2, "mec_content");
        image1.setDisplaySize(this.scale.width, this.scale.height);
        this.time.addEvent({
            delay: 5000, // nouvelle valeur pour random et direction
            callback: this.fin, // Appelle la fonction aléatoire
            callbackScope: this,// Pour que la fonction puisse accéder aux variables de la scène
            loop: true, // Répétition indéfinie
        });
    }

    fin() {
        this.scene.switch("selection");
    }
} 