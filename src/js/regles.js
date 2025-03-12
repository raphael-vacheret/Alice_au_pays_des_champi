export default class regles extends Phaser.Scene {
    constructor() {
        super({ key: 'regles' });
    }

    preload() {

        this.load.image('bouton_retour', 'src/assets/bouton_retour.png');
    }

    create() {

        this.cameras.main.setBackgroundColor('#2D2D2D');

        this.add.text(280, 100, 'regles du jeux', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: "45pt"
          })
        
        let rulesButton = this.add.image(1175, 550, 'bouton_retour').setInteractive();
        rulesButton.on('pointerdown', () => {
            this.scene.switch('accueil');
        });
    }
}