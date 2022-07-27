import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SceneThree from '../systems/SceneThree.js';

// import HeartScenery from '../scenery/HeartScenery.js';

import BrainOne from '../actors/BrainOne.js';
// import MySphere from '../props/MySphere.js';

export default class BrainOneScene2 extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 5, -30);
    this.scene.background = new THREE.Color(0xffa0a0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    // const light = new THREE.PointLight(0xffaaaa, 2, 100, 1);
    // light.position.set(0, 0, -5);
    // this.stage.scene.add(light);

    // const light2 = new THREE.PointLight(0xaaaaff, 2, 100, 1);
    // light2.position.set(0, 0, 5);
    // this.stage.scene.add(light2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(3, 3, 0);
    this.scene.add(directionalLight);

    this.brain = {};
  }

  async init() {
    await super.init();

    this.controls.target = new THREE.Vector3(0, 0.05, 0);

    // this.heart = new Heart();
    // await this.heart.init();
    // this.heart.model.position.y += 0.95;
    // this.stage.scene.add(this.heart.model);

    this.brain = new BrainOne();
    await this.brain.init();
    this.brain.model.position.y += -10;
    // const frontal = this.brain.brain
    // const scalar = new THREE.Matrix4().makeScale(0.0001, 0.0001, 0.0001);
    // frontal.applyMatrix4(scalar);
    // frontal.material.transparent = true
    // frontal.material.opacity = 1.0

    console.log(this.brain);
    // const newMat = new THREE.MeshStandardMaterial({ color: 0xff0000, transparent: true})
    // frontal.material = newMat
    // frontal.material.transparent = true
    // frontal.material.opacity = 0.5
    // frontal.material.wireframe = true
    // frontal.rotateX(-Math.PI / 2);
    // frontal.rotateZ(Math.PI);

    this.scene.add(this.brain.model);

    // this.sphere = new MySphere();
    // await this.sphere.init();
    // this.sphere.model.position.x += 1;
    // this.sphere.model.position.y += 0.25;
    // this.sphere.model.castShadow = true;
    // this.stage.scene.add(this.sphere.model);
  }

  update(time) {
    super.update(time);
  }

  dispose() {
    this.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
    // this.hemi.removeFromParent();
    // this.light.removeFromParent();
    // this.plane.geometry.dispose();
    // this.plane.material.dispose();
    // this.plane.removeFromParent();
    // this.sphere.dispose();
    // this.sphere.model.removeFromParent();
  }
}
