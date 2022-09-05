/* eslint-disable class-methods-use-this */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class AnimCamera extends OrbitControls {
  constructor(camera, canvas) {
    super(camera, canvas);
    this.enableDamping = true;

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
