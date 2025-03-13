

export default class reglesgameover_burger extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover_burger' });
    }

    preload() {

        this.load.image('marathon', 'src/assets/marathon.png');
    }

    create() {

        let image0 = this.add.image(this.scale.width / 2, this.scale.height / 2, "marathon");
        image0.setDisplaySize(this.scale.width, this.scale.height);
        //on attend 5 secondes avant de revenir sur la page principale
          this.time.delayedCall(5000, () => {
            this.scene.switch("selection");
        }, [], this)
    }
}


