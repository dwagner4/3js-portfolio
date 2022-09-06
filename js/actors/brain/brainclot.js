import * as THREE from 'three';
import Actor from '../../systems/Actor.js';

export default class BrianClot extends Actor {
  constructor() {
    super();
    this.model = {};
  }

  async init() {
    this.lesion = new THREE.Group();
    const geometry = new THREE.TetrahedronGeometry(0.25, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xaaaa00 });
    const model = new THREE.Mesh(geometry, material);
    model.scale.set(1, 2, 0.4);
    const clotgeometry = new THREE.TetrahedronGeometry(0.1, 2);
    const clotmaterial = new THREE.MeshStandardMaterial({ color: 0x505050 });
    const clot = new THREE.Mesh(clotgeometry, clotmaterial);
    clot.position.set(0, 0.4, 0.05);
    this.lesion.add(model, clot);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.clotgeometry.dispose();
    this.clotmaterial.dispose();
  }
}
