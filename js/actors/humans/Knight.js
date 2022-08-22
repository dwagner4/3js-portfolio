import * as THREE from 'three';
import Actor from '../../systems/Actor.js';
import { createGlbLoader } from '../../systems/Loader.js';

export default class Knight extends Actor {
  constructor(scene) {
    super();
    this.model = null;
    this.body = null;
    this.animation = {};
    this.scene = scene;

    this.loopcount = 0;
  }

  async init() {
    super.init();
    const glbloader = await createGlbLoader();
    const [knightData, walkingData, runningData] = await Promise.all([
      glbloader.loadAsync('../../../assets/knight/DracoKnight-idle.glb'),
      glbloader.loadAsync('../../../assets/knight/walking.glb'),
      glbloader.loadAsync('../../../assets/knight/running.glb'),
    ]);

    // eslint-disable-next-line prefer-destructuring
    this.model = knightData.scene.children[0];
    this.animations = [
      ...knightData.animations,
      ...walkingData.animations,
      ...runningData.animations,
    ];
    this.setAnimation();
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer
      .clipAction(this.animations[0])
      .setLoop(THREE.LoopRepeat, 2);
    this.animation.actions.walking = this.animation.mixer
      .clipAction(this.animations[1])
      .setLoop(THREE.LoopRepeat, 5);
    // this.animation.actions.idle.setLoop(THREE.LoopOnce, 1)
    this.animation.actions.running = this.animation.mixer
      .clipAction(this.animations[2])
      .setLoop(THREE.LoopRepeat, 8);
    // this.animation.actions.idle.setLoop(THREE.LoopOnce, 1)

    this.animation.actions.current = this.animation.actions.walking;
    this.animation.actions.current.play();

    this.animation.mixer.addEventListener('loop', e => {
      // console.log(e);
      this.loopcount += 1;
      // console.log(this.loopcount, e.action._loopCount, e.action._clip.name);
      if (this.loopcount >= e.action.repetitions - 1) {
        // if ( this.loopcount >= 5) {
        this.loopcount = 0;
        const actionName = e.action._clip.name;
        if (actionName === 'walking') {
          this.animation.play('running');
        }
        if (actionName === 'running.001') {
          this.animation.play('idle');
        }
        if (actionName === 'idle') {
          this.animation.play('walking');
        }
      }
    });

    // this.animation.mixer.addEventListener( 'finished', (e) => {
    //   console.log(e)
    //   const actionName = e.action._clip.name
    //   if ( actionName === 'walking' ) {
    //     this.animation.play('running')
    //   }
    // })

    this.animation.play = name => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };
  }

  update() {
    this.animation.mixer?.update(this.scene.time.delta * 0.001);
  }
}
