import * as fct from "/src/js/fonctions.js";
/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/
var eau;
var jack;
//var hepar;


export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("img_cristaline", "src/assets/cristaline.png");
    this.load.image("img_jack", "src/assets/jack.png");
    //this.load.image("img_hepar", "src/assets/hepar.png");
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();

    this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);

    //création bouteilles qui tombent
    this.eau = this.physics.add.sprite(300, 450, "img_cristaline");
    this.eau.setCollideWorldBounds(true);
    this.physics.add.collider(this.eau, this.groupe_plateformes);

    this.jack = this.physics.add.sprite(400, 450, "img_jack");
    this.jack.setCollideWorldBounds(true);
    this.physics.add.collider(this.jack, this.groupe_plateformes);

    //this.hepar = this.physics.add.sprite(500, 450, "img_hepar");
    //this.hepar.setCollideWorldBounds(true);
    //this.physics.add.collider(this.hepar, this.groupe_plateformes);
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
        this.scene.switch("selection");
      }
    }
  }
}
