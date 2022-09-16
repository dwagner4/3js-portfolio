// import gsap from 'gsap';
import * as THREE from 'three';
import Actor from '../../systems/Actor.js';

export default class BrainDamage extends Actor {
  constructor(directionVector) {
    super();
    this.model = {};
    this.growthDirection = directionVector;
    this.mainscale = 0.001;
    this.subscale = 0.001;
  }

  async init() {
    this.model = new THREE.Group();
    const geometry = new THREE.TetrahedronGeometry(1, 4);
    const material = new THREE.MeshLambertMaterial({ color: 0xaaaacc });
    this.mainlobe = new THREE.Mesh(geometry, material);
    this.mainlobe.rotateX(0.75);
    // this.mainlobe.rotateY(0.1)

    const subgeo = new THREE.TetrahedronGeometry(1, 2);
    const submat = new THREE.MeshLambertMaterial({ color: 0xaaaacc });
    this.sublobeA = new THREE.Mesh(subgeo, submat);
    this.sublobeB = new THREE.Mesh(subgeo, submat);
    this.sublobeC = new THREE.Mesh(subgeo, submat);
    this.sublobeA.position.set(1, 0.5, 0.5);
    this.sublobeB.position.set(0.5, 1, 0.5);
    this.sublobeC.position.set(0, 1, 1);

    this.model.add(this.mainlobe, this.sublobeA, this.sublobeB, this.sublobeC);
    // this.model.scale.set(1, 2, 0.4);
  }

  update(time) {
    super.update(time);
    this.mainlobe.scale.set(this.mainscale, this.mainscale * 2, this.mainscale);
    const mainpos = this.mainscale / 1.5;
    this.mainlobe.position.set(mainpos, mainpos * 2, mainpos);
    this.sublobeA.scale.set(this.subscale, this.subscale, this.subscale);
    this.sublobeB.scale.set(this.subscale, this.subscale, this.subscale);
    this.sublobeC.scale.set(this.subscale, this.subscale, this.subscale * 1.5);
    this.sublobeA.position.set(this.mainscale, 0, 0);
    this.sublobeB.position.set(0, this.mainscale, 0);
    this.sublobeC.position.set(0, 0, this.mainscale);
    // console.log(this.mainlobe)
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
