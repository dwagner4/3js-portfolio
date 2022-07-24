import * as THREE from 'three';
import World from '../systems/World.js';

import HeartScenery from '../scenery/HeartScenery.js';
import Heart from '../actors/Heart.js';
import MySphere from '../props/MySphere.js';

export default class OneWorld extends World {
  constructor(stage) {
    super(stage);

    this.stage.camera.position.set(0, 1.6, 5);
    this.stage.scene.background = new THREE.Color(0x493000);

    const hrtBgrd = new HeartScenery();
    this.hemi = hrtBgrd.hemilight;
    this.light = hrtBgrd.light;
    this.plane = hrtBgrd.plane;
    this.stage.scene.add(this.hemi, this.light, this.plane);

    this.heart = {};
    this.sphere = {};
  }

  async init() {
    await super.init();

    this.heart = new Heart();
    await this.heart.init();
    this.heart.model.position.y += 0.95;
    this.stage.scene.add(this.heart.model);

    this.sphere = new MySphere();
    await this.sphere.init();
    this.sphere.model.position.x += 1;
    this.sphere.model.position.y += 0.25;
    this.sphere.model.castShadow = true;
    this.stage.scene.add(this.sphere.model);
  }

  update(time) {
    super.update(time);
  }

  dispose() {
    this.stage.disableVR();
    this.heart.dispose();
    this.heart.model.removeFromParent();
    this.hemi.removeFromParent();
    this.light.removeFromParent();
    this.plane.geometry.dispose();
    this.plane.material.dispose();
    this.plane.removeFromParent();
    this.sphere.dispose();
    this.sphere.model.removeFromParent();
  }
}
