var zone_texte;
export default class FIN extends Phaser.Scene {
    constructor() {
        super({ key: 'FIN' });
    }

    preload() {
        this.load.image('FIN', 'src/assets/FIN.jpg');
    }

    create() {
        let image1 = this.add.image(this.scale.width / 2, this.scale.height / 2, "FIN");
        image1.setDisplaySize(this.scale.width, this.scale.height);
        zone_texte = this.add.text(200, 500, "BRAVO TU A TROUVE LA PAIX INTERIEUR", {
            fontSize: "bold 32px Arial",
            fill: "#FFFFFF"
        });
        this.time.addEvent({
            delay: 10000, // nouvelle valeur pour random et direction
            callback: this.fin, // Appelle la fonction aléatoire
            callbackScope: this,// Pour que la fonction puisse accéder aux variables de la scène
            loop: true, // Répétition indéfinie
        });
    }

    fin() {
        this.scene.start("accueil");
    }
}  