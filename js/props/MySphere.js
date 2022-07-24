import * as THREE from 'three';
import Prop from '../systems/Prop.js';

export default class MySphere extends Prop {
  constructor() {
    super();
    console.log(this);
    this.model = {};
  }

  async init() {
    this.geometry = new THREE.SphereGeometry(0.25, 32, 16);
    this.material = new THREE.MeshPhongMaterial({ color: 0x222288 });
    this.model = new THREE.Mesh(this.geometry, this.material);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
