// import * as THREE from 'three';
import Actor from '../systems/Actor.js';
import { createGlbLoader } from '../systems/Loader.js';

export default class BrainOne extends Actor {
  constructor() {
    super();
    this.model = {};
  }

  async init() {
    super.init();
    const glbloader = await createGlbLoader();
    const [brainData] = await Promise.all([
      glbloader.loadAsync('/assets/brain-Circulation.glb'),
    ]);
    const brainmodel = brainData.scene;
    // eslint-disable-next-line prefer-destructuring
    this.model = brainmodel.children[0];
    // eslint-disable-next-line prefer-destructuring
    this.brain = this.model.children[1];
  }

  // eslint-disable-next-line class-methods-use-this
  dispose() {}
}
