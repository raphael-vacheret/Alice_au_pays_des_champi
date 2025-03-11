export default class niveau2_1_1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2_1_1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("tuile_1","scr/assets/arcenciel.png");
    this.load.image("tuile_2", "src/assets/canabis-removedg-preview.png");
    this.load.image("tuile_3", "src/assets/elephant.png");
    this.load.image("tuile_4", "src/assets/Overlay_illumination.png");
    this.load.image("tuile_5", "src/assets/unicorn-sprite_1.png");
    this.load.image("tuile_6", "src/assets/unicorn-sprite_2.png");
    this.load.image("tuile_7", "src/assets/unicorn-sprite_3.png");
    this.load.tilemapTiledJSON("map", "src/assets/map_champi.json");
  }

  create() {
    this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    const map = this.add.tilemap("map");
    const tuile1 = map.addTilesetImage("tuile_1", "arc_en_ciel+_-removedg-preview");
    const tuile2 = map.addTilesetImage("tuile_2", "canabis-removedg-preview");
    const tuile3 = map.addTilesetImage("tuile_3", "elephant");
    const tuile4 = map.addTilesetImage("tuile_4", "Overlay_illumination");
    const tuile5 = map.addTilesetImage("tuile_5", "unicorn-sprite_1");
    const tuile6 = map.addTilesetImage("tuile_6", "unicorn-sprite_2");
    const tuile7 = map.addTilesetImage("tuile_7", "unicorn-sprite_3");
    const calque1 = map.createdynamicLayer("Calque de Tuiles 1", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    const calque2 = map.createdynamicLayer("Calque de Tuiles 2", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    const calque3 = map.createdynamicLayer("Calque de Tuiles 3", [tuile1,tuile2,tuile3,tuile4,tuile5,tuile6,tuile7]);
    calque2.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, calque2);

    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "question 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 520, "img_porte4");
    this.porte_perdu = this.physics.add.staticSprite(700, 520, "img_porte4");


    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
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
        this.scene.switch("selection");
      }
      if (this.physics.overlap(this.player, this.porte_perdu)) {
        console.log("faux");
        this.scene.switch("niveau2_1_2");
      }
    }
  }
}
// question 1: les champignons c'est naturel, donc c'est bon pour la santé ? vrai/faux
// question 2: combien de consomateurs de champignons sont morts en 2024 ?
// question 3: combien de consomateurs de drogue devienne addictes ?
// question 4: Comment réduire les risques liés à l’usage des champignons hallucinogènes ?
// question 5: Quel est le principal danger des champignons hallucinogènes ?
// question 6: combien de temps dure un cure de champignons hallucinogènes ?
// question 7: Quels sont les risques de rechute après avoir arrêté les champignons hallucinogènes ?
// question 8: combien de consomateurs finnisent en prison ?
// question 9: combien de consomateurs finnisent en hopital ?