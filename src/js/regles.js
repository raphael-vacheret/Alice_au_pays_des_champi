export default class regles extends Phaser.Scene {
    constructor() {
        super({ key: 'regles' });
    }

    preload() {

        this.load.image('bouton_retour', 'src/assets/accueil/fleche_retour.png');
    }

    create() {

        this.cameras.main.setBackgroundColor('#2D2D2D');

        // Afficher le titre des règles (centré en haut)
        this.add.text(640, 80, 'Règles du jeu', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: "45pt",
            color: "#FFFFFF"
        }).setOrigin(0.5); // Centre le texte

        // Texte des règles du jeu (centré verticalement)
        const regles = 
            "🌍 5 mondes : la map principale + 4 mini-jeux.\n\n --> Va de l'autre côté de la map, surmonte tes addictions en appuyant sur Espace.\n\n" +
            "🍾 Drunk People : Récupère 10 bouteilles d'eau, évite l'alcool !\n\n" +
            "🍄 Magic Champi : Réponds bien aux questions pour te désintoxiquer.\n\n" +
            "🍔 Eat Well : Trop de burgers = trop gros ! Les brocolis sont ta survie.\n\n" +
            "💰 Money Clicker : Clique sur le jeton à temps ou perds tout ton argent !";

        // Affichage du texte des règles bien centré et justifié
        this.add.text(150, 160, regles, {
            fontFamily: 'Arial',
            fontSize: "22pt",
            color: "#FFFFFF",
            wordWrap: { width: 980, useAdvancedWrap: true }, // Justification avec un retour à la ligne propre
            align: "justify"
        });

        // Ajout du bouton retour
        let backButton = this.add.image(1150, 570, 'bouton_retour').setInteractive();
        backButton.setScale(0.8); // Réduire la taille du bouton si nécessaire

        // Ajouter une animation au survol du bouton
        backButton.on('pointerover', () => {
            backButton.setScale(0.9);
        });
        backButton.on('pointerout', () => {
            backButton.setScale(0.8);
        });

        // Action quand on clique sur le bouton
        backButton.on('pointerdown', () => {
            this.scene.switch('accueil'); // Retourner à la scène d'accueil
        });
    }
}