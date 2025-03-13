var zone_texte;
export default class niveau4_fin extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau4_fin' });
    }

    preload() {
        this.load.image('fin_casino', 'src/assets/fin_casino.jpg');
        this.load.audio('son_casino', 'src/assets/son_casino.mp3');
    }

    create() {

        this.music = this.sound.add('son_casino', {
            loop: true,
            volume: 0.5
        });
        this.music.play();
        
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fin_casino");
        image0.setDisplaySize(this.scale.width, this.scale.height);
        zone_texte = this.add.text(200, 400, "OUPSI TA PLUS D ARGENT TU AURAI DU ARRETER DE PARIER", {
                fontSize: "bold 32px Arial",
                fill: "#2F5BFD"
        });

        

        this.time.addEvent({
            delay: 7500, // nouvelle valeur pour random et direction
            callback: this.fin, // Appelle la fonction aléatoire
            callbackScope: this,// Pour que la fonction puisse accéder aux variables de la scène
            loop: true, // Répétition indéfinie
        });
    }

    fin() {
        this.scene.start("selection");
    }
}