import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SceneThree from '../systems/SceneThree.js';

export default class HomeScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 5, -30);
    this.scene.background = new THREE.Color(0xa0a0ff);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  async init() {
    await super.init();

    this.controls.target = new THREE.Vector3(0, 0.05, 0);
  }
}
