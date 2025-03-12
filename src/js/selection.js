import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
var groupe_plateformes;

// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre le meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");

    this.load.spritesheet("img_perso", "src/assets/perso1.png", {
      frameWidth: 46,
      frameHeight: 66
    });
    
    this.load.image("img_porte1", "src/assets/alcool_porte.png");
    this.load.image("img_porte2", "src/assets/champi_porte.png");
    this.load.image("img_porte3", "src/assets/burger_porte.png");
    this.load.image("img_porte4", "src/assets/porte_rose.png");
    this.load.image("img_porte5", "src/assets/casino.png");

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu1", "src/assets/Tileset.png");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/Tileset2.png");
    this.load.image("Phaser_tuilesdejeu3", "src/assets/GUI.png");
    this.load.image("Phaser_traps", "src/assets/Traps_1-removebg-preview.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/mapJeu.json"); 
  }

  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {
      fct.doNothing();
      fct.doAlsoNothing();



    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte");

    // chargement du jeu de tuiles
    const tileset1 = carteDuNiveau.addTilesetImage(
          "Tileset",
          "Phaser_tuilesdejeu1"
        ); 
    // chargement du jeu de tuiles
    const tileset2 = carteDuNiveau.addTilesetImage(
          "Tileset2",
          "Phaser_tuilesdejeu2"
        ); 
    const tileset3 = carteDuNiveau.addTilesetImage(
          "GUI",
          "Phaser_tuilesdejeu3"
        ); 
    // chargement du jeu de tuiles
    const tileset4 = carteDuNiveau.addTilesetImage(
          "Traps_1-removebg-preview",
          "Phaser_traps"
        ); 



    // chargement du calque calque_background
    const calque_background = carteDuNiveau.createLayer(
          "calque_background",
          [tileset1,
          tileset2,
          tileset3,
          tileset4]
        );

    // chargement du calque calque_plateforme
    const calque_plateformes = carteDuNiveau.createLayer(
          "calque_plateformes",
          [tileset1,
          tileset2,
          tileset3,
          tileset4]
          
        );

    // chargement du calque calque_traps
    const calque_traps = carteDuNiveau.createLayer(
          "calque_traps",
          [tileset1,
          tileset2,
          tileset3,
          tileset4]
        ); 


    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/

    // On ajoute une simple image de fond, le ciel, au centre de la zone affichée (400, 300)
    // Par défaut le point d'ancrage d'une image est le centre de cette derniere
    //this.add.image(400, 300, "img_ciel");

    // la création d'un groupes permet de gérer simultanément les éléments d'une meme famille
    //  Le groupe groupe_plateformes contiendra le sol et deux platesformes sur lesquelles sauter
    // notez le mot clé "staticGroup" : le static indique que ces élements sont fixes : pas de gravite,
    // ni de possibilité de les pousser.
  
    

    /****************************
     *  Ajout des portes   *
     ****************************/
    this.porte1 = this.physics.add.staticSprite(600, 500, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(100, 550, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(50, 550, "img_porte3");
    this.porte4 = this.physics.add.staticSprite(400, 525, "img_porte5");

    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/

    // On créée un nouveeau personnage : player
    player = this.physics.add.sprite(100, 450, "img_perso");

    //  propriétées physiqyes de l'objet player :
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 6,
        end: 11
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 0 }],
      frameRate: 20
    });

    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

    /***********************
     *  CREATION DU CLAVIER *
     ************************/
    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();

    /*****************************************************
     *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
     ******************************************************/

    //  Collide the player with the groupe_plateformes
    //this.physics.add.collider(player, groupe_plateformes);


    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    calque_plateformes.setCollisionByProperty({ estSolide: true }); 
    calque_background.setCollisionByProperty({ estSolide: true }); 

    // ajout d'une collision entre le joueur et le calque plateformes
    this.physics.add.collider(player, calque_plateformes); 
    this.physics.add.collider(player, calque_background);
    

    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 8000, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 8000, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player); 
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
    
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }

    if (clavier.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1))
        this.scene.switch("niveau1");
        //this.porte1.destroy(); // on destroy la porte pour ne pas y retourner
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2_1_1");
      if (this.physics.overlap(player, this.porte3))
        this.scene.switch("niveau3");
      if (this.physics.overlap(player, this.porte4))
        this.scene.switch("niveau4");
    }
  }
}

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
