export default class niveau1_fin extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau1_fin' });
    }

    preload() {
        this.load.image('fin_bouteille', 'src/assets/niveau1/bouteille_fin.jpg');
    }

    create() {
        let image1 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fin_bouteille");
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