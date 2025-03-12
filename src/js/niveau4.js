var temps;
var monnaie;
var jeton;
let stop = false; // Indique si le sprite a déjà été déclenché
export default class niveau4 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau4' });
    }
    

    preload() {
        this.load.image('fond_casino', 'src/assets/theme_casino.jpg');
        this.load.spritesheet('timer','src/assets/timeur.png', { frameWidth: 129.5, frameHeight: 148 });
        this.load.spritesheet('jeton','src/assets/jeton.png', { frameWidth: 129, frameHeight: 148 });
    }

    create() {

        // Ajout du fond
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fond_casino");
        image0.setDisplaySize(this.scale.width, this.scale.height);
        // Ajout d'un bouton interactif
        let playButton = this.add.sprite(650, 350, "timer").setInteractive(); // Ajout du bouton

        // Événement au clic
        playButton.on('pointerdown', () => {
            if (!stop) {
                temps.play("anime_temps"); // Joue l'animation sur le sprite du timer
                stop = true;
            }

        });

        // Création du sprite du timer
        temps = this.add.sprite(650, 350, "timer"); 

        // Création de l'animation
        this.anims.create({
            key: "anime_temps",
            frames: this.anims.generateFrameNumbers("timer", {
                start: 0,
                end: 12
            }),
            frameRate: 0.75,
            repeat: 0
        });

        
       
        
    }
}
