import * as fct from "/src/js/fonctions.js";
/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var groupe_bouteilles; // contient tous les sprite etoiles
var score = 0; // pour enregistrer le score
var zone_texte_score;


export default class niveau1 extends Phaser.Scene {
  constructor() {
    super({ key: "niveau1" });
  }

  preload() {
    this.load.image("img_cristaline", "src/assets/cristaline.png");
    this.load.image("img_jack", "src/assets/jack.png");
  }

  create() {
    console.log("Scène niveau1 créée"); // Vérifier que la scène est bien chargée

    this.add.image(400, 300, "img_ciel");

    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);

    /*************************
     *  CREATION DES BOUTEILLES  *
     **************************/
    
    this.groupe_bouteilles = this.physics.add.group();
    this.positionsUtilisees = new Set(); //stocker les positions utilisées et éviter les collisions entre bouteilles

    // Ajout d'un événement pour faire tomber les bouteilles, il se répète indéfiniment 
    this.time.addEvent({
      delay: 1000, // Une nouvelle bouteille toutes les secondes
      callback: this.ajouterBouteille, // Appelle la fonction ajouterBouteille
      callbackScope: this,// Pour que la fonction puisse accéder aux variables de la scène
      loop: true
    });

    /*****************************
   *  ZONE D'AFFICHAGE DU SCORE *
   ******************************/

    //  On définit une zone de texte pour afficher le score en haut a gauche
    zone_texte_score = this.add.text(16, 16, "Score : 0", {
      fontSize: "32px", // taille du texte
      fill: "#000" // couleur de texte
    });

    
  }

  ajouterBouteille() {

    let largeurScene = this.scale.width; // Récupère la largeur de la scène
    let coordX;

  
    do {
      coordX = Phaser.Math.Between(50, largeurScene - 50);
    } while (this.positionsUtilisees.has(coordX));

    this.positionsUtilisees.add(coordX);

    // Choisit aléatoirement entre une bouteille d'eau et une bouteille d'alcool
    let typeBouteille = Phaser.Math.RND.pick(["img_cristaline", "img_jack"]);
    // Crée la bouteille à la position générée et à une hauteur de 10px
    let bouteille = this.groupe_bouteilles.create(coordX, 10, typeBouteille);
    // Applique une vitesse de chute aléatoire entre 20 et 50 pixels par seconde
    bouteille.setVelocityY(Phaser.Math.Between(2, 5));

    // Après 2 secondes, libère la position pour qu'une autre bouteille puisse y apparaître
    this.time.delayedCall(2000, () => {
      this.positionsUtilisees.delete(coordX);
    });
  }

  

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }

    if (this.clavier.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("Changement de scène");
        this.scene.switch("selection");
      }
    }
  }
}


