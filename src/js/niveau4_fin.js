var zone_texte;
export default class niveau4_fin extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau4_fin' });
    }

    preload() {
        this.load.image('fin_casino', 'src/assets/niveau4/fin_casino.png');
        this.load.audio('son_casino', 'src/assets/niveau4/son_casino.mp3');
    }

    create() {

        this.music = this.sound.add('son_casino', {
            loop: true,
            volume: 0.5
        });
        this.music.play();
        
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fin_casino");
        image0.setDisplaySize(this.scale.width, this.scale.height);

        this.time.addEvent({
            delay: 7500, // nouvelle valeur pour random et direction
            callback: this.fin, // Appelle la fonction aléatoire
            callbackScope: this,// Pour que la fonction puisse accéder aux variables de la scène
            loop: true, // Répétition indéfinie
        });
    }

    fin() {
        this.sound.stopAll();
        this.scene.switch("selection");
    }
}