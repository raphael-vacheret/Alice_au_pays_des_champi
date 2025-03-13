import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier

let camera;  // Déclaration de la caméra
let zoomFactor = 1.7;  // Facteur de zoom initial

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
    
    // chargement asset du personnage
    this.load.spritesheet("img_perso", "src/assets/selection/perso1.png", {
      frameWidth: 46,
      frameHeight: 66
    });

    // chargement asset des images pour mini-jeux 
    this.load.image("img_porte1", "src/assets/selection/alcool_porte.png");
    this.load.image("img_porte2", "src/assets/selection/champi_porte.png");
    this.load.image("img_porte3", "src/assets/selection/burger_porte.png");
    this.load.image("img_porte4", "src/assets/selection/porte_rose.png");
    this.load.image("img_porte5", "src/assets/selection/casino.png");

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu1", "src/assets/selection/Tileset.png");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/selection/Tileset2.png");
    this.load.image("Phaser_tuilesdejeu3", "src/assets/selection/GUI.png");
    this.load.image("Phaser_traps", "src/assets/selection/Traps_1-removebg-preview.png");

    // asset de la porte final de la map
    this.load.image("img_porteFin", "src/assets/porteNv_2.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/selection/mapJeu.json"); 
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

    /***********************************************************************/
    /**CHARGEMENT CARTE, TUILES ET CALQUES
    /***********************************************************************/

    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte");

    // chargement des 4 jeux de tuiles
    const tileset1 = carteDuNiveau.addTilesetImage(
          "Tileset",
          "Phaser_tuilesdejeu1"
        ); 
    const tileset2 = carteDuNiveau.addTilesetImage(
          "Tileset2",
          "Phaser_tuilesdejeu2"
        ); 
    const tileset3 = carteDuNiveau.addTilesetImage(
          "GUI",
          "Phaser_tuilesdejeu3"
        ); 
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
     *  PLACEMENT DES MINI-JEUX SUR LA MAP  *
     *************************************/

    this.porte1_1 = this.physics.add.staticSprite(224,128,"img_porte1") 
    this.porte2_1 = this.physics.add.staticSprite(592,320 ,"img_porte2")  
    this.porte3_1 = this.physics.add.staticSprite(832,144 ,"img_porte3")  
    this.porte4_1 = this.physics.add.staticSprite(368,432 ,"img_porte5")  

    this.porte1_2 = this.physics.add.staticSprite(1264,352 ,"img_porte1")   
    this.porte2_2 = this.physics.add.staticSprite(2192,192,"img_porte2")  
    this.porte3_2 = this.physics.add.staticSprite(1600,496,"img_porte3")  
    this.porte4_2 = this.physics.add.staticSprite(2336,448,"img_porte5") 

    this.porte1_3 = this.physics.add.staticSprite(3120,320,"img_porte1")   
    this.porte2_3 = this.physics.add.staticSprite(4576,544,"img_porte2")  
    this.porte3_3 = this.physics.add.staticSprite(4240,64,"img_porte3")  
    this.porte4_3 = this.physics.add.staticSprite(4912,64,"img_porte5") 
    
    this.porte1_4 = this.physics.add.staticSprite(5584,160 ,"img_porte1")   
    this.porte2_4 = this.physics.add.staticSprite(4576,480,"img_porte2")  
    this.porte3_4 = this.physics.add.staticSprite(4656,336,"img_porte3")  
    this.porte4_4 = this.physics.add.staticSprite(5744,464,"img_porte5") 

    this.porte1_5 = this.physics.add.staticSprite(6608,560,"img_porte1")   
    this.porte2_5 = this.physics.add.staticSprite(6032,160,"img_porte2")  
    this.porte3_5 = this.physics.add.staticSprite(4240,464,"img_porte3")  
    this.porte4_5 = this.physics.add.staticSprite(1712,352,"img_porte5") 
     
    
    this.porteFin = this.physics.add.staticSprite(6464,368,"img_porteFin")

    // porte1_n : mini jeu alcool
    // porte2_n : mini jeu champi
    // porte3_n : mini jeu burger
    // porte4_n : mini jeu argent 



    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/

    // On créée un nouveeau personnage : player
    player = this.physics.add.sprite(16,400, "img_perso");
    
    //  propriétées physiques de l'objet player :
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
    player.setScale(0.5); // le player est réduit pour correspondre à la taille de la map 


    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet chaque animation est une succession 
    // de frame à vitesse de défilement défini une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, 
    // on utilisera la méthode play() creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
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
     *  GESTION DES INTERACTIONS *
     ******************************************************/

    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide et de la propriété passerUnSeulSens
    calque_plateformes.setCollisionByProperty({ estSolide: true }); 
    calque_background.setCollisionByProperty({ estSolide: true }); 

    calque_plateformes.setCollisionByProperty({ passerUnSeulSens: true }); 
    calque_background.setCollisionByProperty({ passerUnSeulSens: true }); 
    // passerUnSeulSens est une propriété établie dans Tiled qui n'a pas pu être exploité

    
    // ajout d'une collision entre le joueur et les calques 
    this.physics.add.collider(player, calque_plateformes); 
    this.physics.add.collider(player, calque_background);
    this.physics.add.collider(player, calque_traps);


    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 8000, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 8000, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player); 

    // le zoom est activé
    camera = this.cameras.main;
    camera.setZoom(zoomFactor);
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
  /***********************************************************************/

  update() {
    
    // Déplacement du personnage 
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

    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }

    // Lorsque le joueur arrive sur une des "portes" correspondant à un mini jeux 
    // le joueur est transporté dans le niveau lorsqu'il clique sur la barre espace 
    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) { 
      if (this.physics.overlap(player, this.porte1_1)) this.scene.switch("niveau1");
        //this.porte1.destroy(); // on destroy la porte pour ne pas y retourner
      if (this.physics.overlap(player, this.porte1_2)) this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte1_3)) this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte1_4)) this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte1_5)) this.scene.switch("niveau1");


      if (this.physics.overlap(player, this.porte2_1)) this.scene.switch("niveau2_1_1");
      if (this.physics.overlap(player, this.porte2_2)) this.scene.switch("niveau2_1_1");
      if (this.physics.overlap(player, this.porte2_3)) this.scene.switch("niveau2_1_1");
      if (this.physics.overlap(player, this.porte2_4)) this.scene.switch("niveau2_1_1");
      if (this.physics.overlap(player, this.porte2_5)) this.scene.switch("niveau2_1_1");


      if (this.physics.overlap(player, this.porte3_1)) this.scene.switch("niveau3");
      if (this.physics.overlap(player, this.porte3_2)) this.scene.switch("niveau3");
      if (this.physics.overlap(player, this.porte3_3)) this.scene.switch("niveau3");
      if (this.physics.overlap(player, this.porte3_4)) this.scene.switch("niveau3");
      if (this.physics.overlap(player, this.porte3_5)) this.scene.switch("niveau3");
     

      if (this.physics.overlap(player, this.porte4_1)) this.scene.switch("niveau4");
      if (this.physics.overlap(player, this.porte4_2)) this.scene.switch("niveau4");
      if (this.physics.overlap(player, this.porte4_3)) this.scene.switch("niveau4");
      if (this.physics.overlap(player, this.porte4_4)) this.scene.switch("niveau4");
      if (this.physics.overlap(player, this.porte4_5)) this.scene.switch("niveau4");

      if (this.physics.overlap(player, this.porteFin)) this.scene.start("accueil");
    
    }
    
  }


}
