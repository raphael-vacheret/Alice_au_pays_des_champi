export default class regles extends Phaser.Scene {
    constructor() {
        super({ key: 'regles' });
    }

    preload() {

        this.load.image('bouton_retour', 'src/assets/fleche_retour.png');
    }

    create() {

        this.cameras.main.setBackgroundColor('#2D2D2D');

        this.add.text(250, 100, 'regles du jeux', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: "45pt"
          })
        
        let backButton = this.add.image(1150, 540, 'bouton_retour').setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.switch('accueil');
        });
    }
}