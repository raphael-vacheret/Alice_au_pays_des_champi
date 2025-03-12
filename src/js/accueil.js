export default class accueil extends Phaser.Scene {
    constructor() {
        super({ key: 'accueil' });
    }

    preload() {
        this.load.image('fond_accueil', 'src/assets/page_accueil.png');
        this.load.image('bouton_play', 'src/assets/bouton.png');
        this.load.image('bouton_regles', 'src/assets/logo_2.png');
        this.load.image('titre', 'src/assets/titre2.png');
        
    }

    create() {
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fond_accueil");
        image0.setDisplaySize(this.scale.width, this.scale.height);
        image0.setTint(0x555555);

        this.add.image(707, 257, "titre");

        //this.add.text(120, 200, 'ALICE AU PAYS DES CHAMPIS', {
            //color : '#FF69B4',
            //fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            //fontSize: "55pt"
          //})
        
        let playButton = this.add.image(630, 430, 'bouton_play').setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.switch('selection');
        });
        
        let rulesButton = this.add.image(1180, 50, 'bouton_regles').setInteractive();
        rulesButton.on('pointerdown', () => {
            this.scene.switch('regles');
        });
    }
}


