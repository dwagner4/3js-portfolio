/* eslint-disable class-methods-use-this */
import * as THREE from 'three';

export default class Actor {
  constructor() {
    this.model = null;
    this.body = null;
    this.animation = {};
    this.audio = {};
  }

  async init() {
    /** load the model */

    /** make AnimationClips and AnimationActions */

    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.play = name => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };
  }

  setBody() {}

  update(time) {
    this.animation.mixer?.update(time.delta * 0.001);
  }

  dispose() {}
}
