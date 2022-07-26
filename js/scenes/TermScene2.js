import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SceneThree from '../systems/SceneThree.js';

import NorthTerminal from '../actors/NorthTerminal.js';

export default class TermScene2 extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 30, 150);
    this.scene.background = new THREE.Color(0xffa0ff);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  async init() {
    await super.init();

    this.controls.target = new THREE.Vector3(0, 0.05, 0);

    this.term = new NorthTerminal();
    await this.term.init();
    this.term.model.position.set(392, -126, 740);
    console.log(this.term);
    this.scene.add(this.term.model);
  }
}
