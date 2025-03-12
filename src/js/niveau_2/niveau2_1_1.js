export default class niveau2_1_1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2_1_1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  // chargement des assets
  preload() {
    this.load.image("tuile_1","src/assets/arcenciel.png");
    this.load.image("tuile_2", "src/assets/canabis-removebg-preview.png");
    this.load.image("tuile_3", "src/assets/elephant.png");
    this.load.image("tuile_4", "src/assets/Overlay_illumination.png");
    this.load.image("tuile_5", "src/assets/unicorn-sprite_1.png");
    this.load.image("tuile_6", "src/assets/unicorn-sprite_2.png");
    this.load.image("tuile_7", "src/assets/unicorn-sprite_3.png");
    this.load.tilemapTiledJSON("map", "src/assets/map_champi.json");
  }

  create() {
    // creation de la map
    const map = this.add.tilemap("map");
    const tuile1 = map.addTilesetImage("arc_en_ciel+_-removebg-preview", "tuile_1"); // nom dans le json
    const tuile2 = map.addTilesetImage("canabis-removebg-preview", "tuile_2");
    const tuile3 = map.addTilesetImage("elephant","tuile_3");
    const tuile4 = map.addTilesetImage("Overlay_illumination", "tuile_4");
    const tuile5 = map.addTilesetImage("unicorn-sprite_1", "tuile_5");
    const tuile6 = map.addTilesetImage("unicorn-sprite_2", "tuile_6");
    const tuile7 = map.addTilesetImage("unicorn-sprite_3", "tuile_7");
    const calque1 = map.createLayer("Calque de Tuiles 1", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]); // nom du calque dans le json
    const calque3 = map.createLayer("Calque de Tuiles 3", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    const calque2 = map.createLayer("Calque de Tuiles 2", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    calque2.setCollisionByProperty({ estSolide: true });
    
    

    // ajout d'un texte distintcif  du niveau
    this.add.text(600, 300, "Combien de consomateurs de champignons sont morts en 2024 ?", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    this.add.text(350, 415, "a) 0", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    this.add.text(900, 415, "c) 1500", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    this.add.text(625, 415, "b) 250", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    // ajout des portes
    this.porte_retour = this.physics.add.staticSprite(350, 496, "img_porte4");
    this.porte_perdu = this.physics.add.staticSprite(900, 496, "img_porte4");
    this.porte_3 = this.physics.add.staticSprite(625, 496, "img_porte4");

    // ajout du joueur
    this.player = this.physics.add.sprite(550, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, calque2); // collision avec le calque 2
    this.clavier = this.input.keyboard.createCursorKeys(); // gestion du clavier
  }

  update() {
    // gestion des déplacements du joueur
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
    // gestion des collisions avec les portes
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("vrai");
        this.scene.switch("niveau2_1_2");
      }
      if (this.physics.overlap(this.player, this.porte_3)) {
        console.log("vrai");
        this.scene.switch("niveau2_1_2");
      }
      if (this.physics.overlap(this.player, this.porte_perdu)) {
        console.log("faux");
        
        this.scene.switch("fin");
      }
    }
  }
}
// question 1: les champignons c'est naturel, donc c'est bon pour la santé ? vrai/faux --
// question 2: combien de consomateurs de champignons sont morts en 2024 ? ++
// question 3: combien de consomateurs de drogue devienne addictes ? ++
// question 4: Comment réduire les risques liés à l’usage des champignons hallucinogènes ? 

// question 5: Quel est le principal danger des champignons hallucinogènes ?
// question 6: combien de temps dure un cure de champignons hallucinogènes ? ++
// question 7: Quels sont les risques de rechute après avoir arrêté les champignons hallucinogènes ? --

// question 8: combien de consomateurs finnisent en prison ? 
// question 9: combien de consomateurs finnisent en hopital ? --