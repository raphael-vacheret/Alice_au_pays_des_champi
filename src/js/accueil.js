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
        //adapter la taille de l'image à celle de l'écran
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fond_accueil");
        image0.setDisplaySize(this.scale.width, this.scale.height);
        //foncer l'image de fond
        image0.setTint(0x555555);

        this.add.image(707, 257, "titre");

        // Ajout du bouton Play interactif pour accéder au jeu
        let playButton = this.add.image(630, 430, 'bouton_play').setInteractive();

        // Animation au survol du bouton Play
        playButton.on('pointerover', () => {
            playButton.setScale(1.1); // Agrandir légèrement au survol
        });
        playButton.on('pointerout', () => {
            playButton.setScale(1); // Revenir à la taille normale
        });

        // Action quand on clique sur le bouton Play
        playButton.on('pointerdown', () => {
            this.scene.switch('selection');
        });

        // Ajout du bouton interactif pour les règles
        let rulesButton = this.add.image(1180, 50, 'bouton_regles').setInteractive();

        // Animation au survol du bouton Règles
        rulesButton.on('pointerover', () => {
            rulesButton.setScale(1.1); // Agrandir légèrement au survol
        });
        rulesButton.on('pointerout', () => {
            rulesButton.setScale(1); // Revenir à la taille normale
        });

        // Action quand on clique sur le bouton Règles
        rulesButton.on('pointerdown', () => {
            this.scene.switch('regles');
        });
    }
}


