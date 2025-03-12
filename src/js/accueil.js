export default class accueil extends Phaser.Scene {
    constructor() {
        super({ key: 'accueil' });
    }

    preload() {
        this.load.image('fond_accueil', 'src/assets/addiction.png');
        this.load.image('bouton_play', 'src/assets/bouton.png');
        this.load.image('bouton_regles', 'src/assets/bouton_regles.png');
    }

    create() {
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fond_accueil");
        image0.setDisplaySize(this.scale.width, this.scale.height);
        this.add.text(280, 100, 'Alice au pays des champis', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: "45pt"
          })
        
        let playButton = this.add.image(630, 350, 'bouton_play').setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.switch('selection');
        });
        
        let rulesButton = this.add.image(1175, 550, 'bouton_regles').setInteractive();
        rulesButton.on('pointerdown', () => {
            this.scene.switch('regles');
        });
    }
}


