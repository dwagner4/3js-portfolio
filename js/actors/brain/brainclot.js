import gsap from 'gsap';
import * as THREE from 'three';
import Actor from '../../systems/Actor.js';

export default class BrainClot extends Actor {
  constructor() {
    super();
    this.model = {};
    this.params = { clotglow: 0 };
  }

  async init() {
    const clotgeometry = new THREE.TetrahedronGeometry(0.1, 2);
    const clotmaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xff00ff,
      emissiveIntensity: 5.0,
    });
    this.model = new THREE.Mesh(clotgeometry, clotmaterial);

    // this.clot.position.set(0, 0.4, 0.05);

    this.throb = gsap
      .to(this.params, {
        clotglow: 1.0,
        duration: 2,
        repeat: -1,
      })
      .play(true);
  }

  update(time) {
    super.update(time);
    this.model.material.emissiveIntensity = this.params.clotglow;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.clotgeometry.dispose();
    this.clotmaterial.dispose();
  }
}
