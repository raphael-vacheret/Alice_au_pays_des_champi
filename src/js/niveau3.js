
export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("tuile_1","src/assets/niveau3/kebab.png");
    this.load.image("tuile_2", "src/assets/niveau3/legume.png");
    this.load.image("tuile_3", "src/assets/niveau3/mcdo.png");
    this.load.image("tuile_4", "src/assets/niveau3/piste.jpg");
    this.load.tilemapTiledJSON("map", "src/assets/niveau3/map_burger.json");
  }

  create() {
    this.groupe_plateformes = this.physics.add.staticGroup();

    const map = this.add.tilemap("map");
    const tuile1 = map.addTilesetImage("kebab", "tuile_1");
    const tuile2 = map.addTilesetImage("legume", "tuile_2");
    const tuile3 = map.addTilesetImage("mcdo","tuile_3");
    const tuile4 = map.addTilesetImage("piste", "tuile_4");
    const calque2 = map.createLayer("fond", [tuile1,tuile2,tuile3,tuile4]);
    const calque1 = map.createLayer("legumes", [tuile1,tuile2,tuile3,tuile4]);
    
    calque2.setCollisionByProperty({ estSolide: true });

    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 3", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    //this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, calque2);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);
  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-500);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(500);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) // Vérifie qu'il ne touche pas calque2
      {
      this.player.setVelocityY(-330);
    }

    /*if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }*/
  }
}
