var coord_finale;
export default class niveau3 extends Phaser.Scene {
  constructor() {
    super({
      key: "niveau3"
    });
  }
  preload() {
    this.load.image("obstacle","src/assets/niveau3/obstacle.png");
    this.load.image("brocolis","src/assets/niveau3/brocolis.png");
    this.load.image("tuile_1_1","src/assets/niveau3/kebab.png");
    this.load.image("tuile_2_2", "src/assets/niveau3/legume.png");
    this.load.image("tuile_3_3", "src/assets/niveau3/mcdo.png");
    this.load.image("tuile_4_4", "src/assets/niveau3/piste.jpg");
    this.load.tilemapTiledJSON("map3", "src/assets/niveau3/map_burger.json");
    this.load.audio('son_burger', 'src/assets/son_burger.mp3');
  }

  create() {
    const map = this.add.tilemap("map3");
    const tuile1 = map.addTilesetImage("kebab", "tuile_1_1");
    const tuile2 = map.addTilesetImage("legume", "tuile_2_2");
    const tuile3 = map.addTilesetImage("mcdo","tuile_3_3");
    const tuile4 = map.addTilesetImage("piste", "tuile_4_4");
    const calque2 = map.createLayer("fond", [tuile1,tuile2,tuile3,tuile4]);
    const calque1 = map.createLayer("legumes", [tuile1,tuile2,tuile3,tuile4]);
    calque2.setCollisionByProperty({ estSolide: true }); 

    this.music = this.sound.add('son_burger', {
      loop: true,
      volume: 0.5
  });
  this.music.play();

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, calque2);
    this.player.setScale(2);
    this.clavier = this.input.keyboard.createCursorKeys();

    // on redimentionne le monde les dimensions de la map
    this.physics.world.setBounds(0, 0, 80000, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 80000, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player); 

    /*************************
     *  CREATION DES OBSTACLES  *
     *************************/

    // Ajout d'un événement pour faire apparaître les obstacles (burgers et brocolis)
    this.time.addEvent({
      callback: this.ajouterObstacle, // Appelle la fonction ajouterObstacle
      callbackScope: this,// Pour que la fonction puisse accéder aux variables de la scène
      delay: 1000, // Une nouvelle bouteille toutes les secondes
    });
  }

  /*************************
  *  FONCTION POUR CREER DES OBSTACLES  *
  *************************/
  ajouterObstacle() {
    let coordX = 1000;  // coordonnée X initiale
    while (coordX < 70900) {  // la boucle s'arrête dès que coordX atteint 70900
        let randomDistance = Phaser.Math.Between(500, 700);
        coordX += randomDistance;
        // Choisir aléatoirement entre un brocoli ou un obstacle
        let obstacleType = Phaser.Math.Between(0, 1);
        let obstacle;
        if (obstacleType === 0) {
            obstacle = this.physics.add.staticSprite(coordX, 500, 'brocolis');
        } else {
            obstacle = this.physics.add.staticSprite(coordX, 500, 'obstacle');
        }

        // Ajouter un collider pour détecter les collisions avec le joueur
        this.physics.add.collider(this.player, obstacle, () => {
            if (obstacleType === 0) {
              if (this.player.displayWidth<50) {
                this.scene.switch('gameover_burger');
            }
              //diminuer la largeur du player si brocoli
              this.player.setDisplaySize(this.player.displayWidth * 0.9, this.player.displayHeight);
              this.player.setSize(30,66);

            } else {
              if (this.player.displayWidth > 378){
                this.cameras.main.stopFollow(); //stopper le suivi caméra sur le player                this.music.stop();

                let centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
                let centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

                this.add.text(centerX-250, centerY-6, "Perdu, t'es trop gros, va faire du cardio !", {
                  fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                  fontSize: "22pt" 

              });
              //attendre 3 secondes avant de repartir sur la map principale
              this.time.delayedCall(3000, () => {
                this.scene.switch("selection");
            }, [], this)

              }
              //augmenter la largeur du player si burger
              this.player.setDisplaySize(this.player.displayWidth * 1.3, this.player.displayHeight);
              this.player.setSize(30,66); //réduire la taille de la hitbox
            }
            obstacle.destroy();  // Détruire l'obstacle après la collision
            //console.log("Largeur:", this.player.displayWidth);
            console.log(coordX);
        }); 
    } 
  }

  update() { 
    if (this.clavier.up.isDown && this.player.body.blocked.down){
      this.player.setVelocityY(-500);
    }else {
      this.player.setVelocityX(500);
      this.player.setGravity(400);
      this.player.anims.play("anim_tourne_droite", true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
    if (this.player.x >15000) {
      this.music.stop();
      this.scene.switch('gameover_burger');
  }
  }
}
