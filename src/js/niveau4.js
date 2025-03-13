var temps;
let stop = false; // Indique si le sprite a déjà été déclenché
var zone_texte;
var zone_texte2;

export default class niveau4 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau4' });
    }

    preload() {
        this.load.image('fond_casino', 'src/assets/theme_casino.jpg');
        this.load.image('argent', 'src/assets/ARGENT.png');
        this.load.spritesheet('timer', 'src/assets/timeur.png', { frameWidth: 129.4, frameHeight: 148 });
        this.load.spritesheet('jeton', 'src/assets/jeton.png', { frameWidth: 116, frameHeight: 98.66 });
    }

    create() {
        // Réinitialisation de la monnaie entre 50 et 75 à chaque retour dans le niveau
        this.monnaie = Phaser.Math.Between(75, 100);
        stop = false;

        // Stocke les positions utilisées pour éviter les chevauchements
        this.positionsUtilisees = new Set();
        this.groupe_jetons = this.physics.add.group(); // Crée un groupe de jetons

        // Ajout du fond
        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "fond_casino");
        image0.setDisplaySize(this.scale.width, this.scale.height);

        // Création de l'animation des jetons
        this.anims.create({
            key: "anime_jetons",
            frames: this.anims.generateFrameNumbers("jeton", { start: 0, end: 8 }),
            frameRate: 4, // 4 FPS pour une animation fluide
            repeat: -1 // Boucle infinie
        });

        // Affichage de l'icône argent et du texte
        this.Argent = this.add.image(650, 200, "argent");
        zone_texte = this.add.text(585, 190, "argent: " + this.monnaie, {
            fontSize: "bold 32px Arial",
            fill: "#ffd700"
        });
        zone_texte2 = this.add.text(200, 500, "DEPECHE TOI DE CLIQUER POUR RETIRER TON ARGENT !!!", {
            fontSize: "bold 32px Arial",
            fill: "#FFFFFF"
        });

        // Création du sprite du timer avec le premier frame visible
        temps = this.add.sprite(650, 350, "timer", 0); // 0 pour afficher la première frame par défaut

        // Création de l'animation du timer
        this.anims.create({
            key: "anime_temps",
            frames: this.anims.generateFrameNumbers("timer", { start: 0, end: 12 }),
            frameRate: 0.75,
            repeat: 0
        });

        // Création du bouton de jeu
        let playButton = this.add.sprite(650, 350, "timer").setInteractive();

        // Événement au clic -> Ajoute un jeton qui tombe
        playButton.on('pointerdown', () => {
            if (!stop) {
                temps.play("anime_temps"); // Joue l'animation du timer
                stop = true;
        
                // Écoute l'événement de fin d'animation
                temps.on('animationcomplete', (animation) => {
                    if (animation.key === "anime_temps") {
                        this.scene.start("niveau4_fin"); // Change de scène quand l'animation se termine
                    }
                });
            }
        
            this.monnaie -= 1;
            zone_texte.setText("argent: " + this.monnaie); // Mise à jour de l'affichage
        
            if (this.monnaie === 0) {
                this.scene.start("selection"); // Changement de scène si argent = 0
            } else {
                this.ajouterJeton(); // Ajoute un jeton qui tombe
            }
        });
        

        // Reset du timer à la première frame quand on revient sur la scène
        this.events.on('wake', () => {
            this.monnaie = Phaser.Math.Between(50, 100); // Recalcul de la monnaie
            stop = false; // Reset du flag
            temps.setFrame(0); // Remet l'image du timer à l'état initial
            zone_texte.setText("argent: " + this.monnaie); // Met à jour l'affichage
            this.resetJetons(); // Réinitialise les jetons
        });
    }

    // Fonction pour ajouter un jeton qui tombe
    ajouterJeton() {
        let largeurScene = this.scale.width;
        let coordX;

        do {
            coordX = Phaser.Math.Between(50, largeurScene - 50);
        } while (this.positionsUtilisees.has(coordX));

        this.positionsUtilisees.add(coordX);

        // Crée un jeton et applique l'animation
        let jeton = this.groupe_jetons.create(coordX, 50, "jeton").play("anime_jetons");
        jeton.setVelocityY(Phaser.Math.Between(50, 100)); // Applique une vitesse de chute

        // Supprime le jeton quand il sort de l'écran
        this.time.delayedCall(3000, () => {
            jeton.destroy();
            this.positionsUtilisees.delete(coordX);
        });
    }

    // Fonction pour réinitialiser les jetons à chaque retour dans la scène
    resetJetons() {
        this.groupe_jetons.clear(true, true); // Supprime tous les jetons affichés
        this.positionsUtilisees.clear(); // Réinitialise les positions utilisées
    }
}
