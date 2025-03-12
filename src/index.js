// chargement des librairies
import regles from "/src/js/regles.js";
import accueil from "/src/js/accueil.js";
import selection from "/src/js/selection.js";
import niveau1 from "/src/js/niveau1.js";
import niveau2_1_1 from "/src/js/niveau_2/niveau2_1_1.js";
import niveau2_1_2 from "/src/js/niveau_2/niveau2_1_2.js";
import niveau2_1_3 from "/src/js/niveau_2/niveau2_1_3.js";
import niveau2_2_1 from "/src/js/niveau_2/niveau2_2_1.js";
import niveau2_2_2 from "/src/js/niveau_2/niveau2_2_2.js";
import niveau2_2_3 from "/src/js/niveau_2/niveau2_2_3.js";
import niveau2_3_1 from "/src/js/niveau_2/niveau2_3_1.js";
import niveau2_3_2 from "/src/js/niveau_2/niveau2_3_2.js";
import niveau2_3_3 from "/src/js/niveau_2/niveau2_3_3.js";
import niveau3 from "/src/js/niveau3.js";
import niveau4 from "/src/js/niveau4.js";
import gameover_burger from "/src/js/gameover_burger.js";

// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 1250, // largeur en pixels
  height: 625, // hauteur en pixels
   scale: {
        // Or set parent divId here
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
   },
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 800 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [accueil,regles,selection, niveau1, niveau2_1_1, niveau2_1_2,niveau2_1_3,niveau2_2_1,niveau2_2_2,niveau2_2_3,niveau2_3_1,niveau2_3_2,niveau2_3_3, niveau3,niveau4,gameover_burger]
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("accueil");
