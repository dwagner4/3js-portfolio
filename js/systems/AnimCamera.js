/* eslint-disable class-methods-use-this */
import * as THREE from 'three';

export default class AnimCamera extends THREE.PerspectiveCamera {
  constructor(scene) {
    super(35, scene.sizes.width / scene.sizes.height, 0.1, 1000);

    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this);
    this.animation.actions = {};

    this.animation.play = name => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      newAction.reset();
      newAction.play();
      if (oldAction) {
        newAction.crossFadeFrom(oldAction, 1);
      }

      this.animation.actions.current = newAction;
    };
  }

  update(time) {
    this.animation.mixer?.update(time.delta * 0.001);
  }

  dispose() {}
}
