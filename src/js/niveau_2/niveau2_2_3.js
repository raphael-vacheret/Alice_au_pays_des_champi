export default class niveau2_2_3 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau2_2_3" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload() {
      this.load.image("tuile_1","src/assets/niveau2/arcenciel.png");
    this.load.image("tuile_2", "src/assets/niveau2/canabis-removebg-preview.png");
    this.load.image("tuile_3", "src/assets/niveau2/elephant.png");
    this.load.image("tuile_4", "src/assets/niveau2/Overlay_illumination.png");
    this.load.image("tuile_5", "src/assets/niveau2/unicorn-sprite_1.png");
    this.load.image("tuile_6", "src/assets/niveau2/unicorn-sprite_2.png");
    this.load.image("tuile_7", "src/assets/niveau2/unicorn-sprite_3.png");
    this.load.tilemapTiledJSON("map", "src/assets/niveau2/map_champi.json");
    }
  
    create() {
      this.groupe_plateformes = this.physics.add.staticGroup();
      const map = this.add.tilemap("map");
    const tuile1 = map.addTilesetImage("arc_en_ciel+_-removebg-preview", "tuile_1");
    const tuile2 = map.addTilesetImage("canabis-removebg-preview", "tuile_2");
    const tuile3 = map.addTilesetImage("elephant","tuile_3");
    const tuile4 = map.addTilesetImage("Overlay_illumination", "tuile_4");
    const tuile5 = map.addTilesetImage("unicorn-sprite_1", "tuile_5");
    const tuile6 = map.addTilesetImage("unicorn-sprite_2", "tuile_6");
    const tuile7 = map.addTilesetImage("unicorn-sprite_3", "tuile_7");
    const calque1 = map.createLayer("Calque de Tuiles 1", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    const calque2 = map.createLayer("Calque de Tuiles 2", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    const calque3 = map.createLayer("Calque de Tuiles 3", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    calque2.setCollisionByProperty({ estSolide: true });

    // ajout d'un texte distintcif  du niveau
    this.add.text(600, 300, "Combien de consomateurs finnisent en hopital ?", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    this.add.text(350, 415, "a) 17", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    this.add.text(900, 415, "c) 22", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);
    this.add.text(625, 415, "b) 12", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    }).setOrigin(0.5, 0.5);


      this.porte_retour = this.physics.add.staticSprite(350, 496, "img_porte4");
      this.porte_perdu = this.physics.add.staticSprite(900, 496, "img_porte4");
      this.porte_3 = this.physics.add.staticSprite(625, 496, "img_porte4");
  
  
      this.player = this.physics.add.sprite(550, 450, "img_perso");
      this.player.refreshBody();
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, calque2);
      this.clavier = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.groupe_plateformes);
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
  
      if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
        if (this.physics.overlap(this.player, this.porte_retour)) {
          console.log("vrai");
          this.music.stop();
          this.scene.switch("niveau2_fin");
        }
        if (this.physics.overlap(this.player, this.porte_3)) {
          console.log("vrai");
          this.scene.switch("niveau2_3_1");
        }
        if (this.physics.overlap(this.player, this.porte_perdu)) {
          console.log("faux");
          this.scene.switch("niveau2_3_1");
        }
      }
    }
  }