import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'lil-gui';
import SceneThree from '../systems/SceneThree.js';
import AnimCamera from '../systems/AnimCamera.js';
import AnimOrbitControl from '../systems/AnimOrbitControl.js';

// import HeartScenery from '../scenery/HeartScenery.js';

import BrainOne from '../actors/BrainOne.js';
import BrainClot from '../actors/brainclot.js';
// import MySphere from '../props/MySphere.js';
import { brainService } from './brainMachine.js';
// eslint-disable-next-line no-unused-vars
import {
  initBrainActions,
  initCameraActions,
  initControlActions,
} from './brainactions.js';

export default class BrainOneScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    const pgeometry = new THREE.CircleGeometry(1000, 32);
    const pmaterial = new THREE.MeshStandardMaterial({
      color: 0x336633,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(pgeometry, pmaterial);
    this.plane.rotateX(-Math.PI / 2);
    this.plane.translateZ(-1);
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);

    const resetbtn = document.querySelector('#resetbtn');
    resetbtn.onclick = () => {
      brainService.send({ type: 'HOME' });
    };
    const nextbtn = document.querySelector('#nextbtn');
    nextbtn.onclick = () => {
      brainService.send({ type: 'NEXT' });
    };
    const drugbtn = document.querySelector('#drugbtn');
    drugbtn.onclick = () => {
      brainService.send({ type: 'DRUG' });
    };
    const rewindbtn = document.querySelector('#rewindbtn');
    rewindbtn.onclick = () => {
      brainService.send({ type: 'REWIND' });
    };

    brainService.subscribe(state => {
      if (state.value === 'rotate') {
        this.camera.animation.play('slowmove');
        this.controls.animation.play('target');
        this.brain.animation.play('grey');
      }
    });

    this.camera = new AnimCamera(this);
    this.camera.position.set(0, 5, -30);
    // this.camera.rotation.set(-3, 0, 3.14);
    // console.log(this.camera.rotation);

    this.scene.background = new THREE.Color(0xa0a0a0);

    this.camera = new AnimCamera(this.canvas);

    this.controls = new AnimOrbitControl(this.camera, this.canvas);
    // this.controls.enableDamping = true;

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(3, 3, 0);

    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x666666); // soft white light
    this.scene.add(this.ambientLight);

    this.brain = {};
    this.brainClot = {};
  }

  async init() {
    await super.init();

    this.controls.target = new THREE.Vector3(0, 0.05, 0);
    this.brain = new BrainOne();
    await this.brain.init();
    this.brain.model.position.y += -10;
    this.objectsToUpdate.push(this.brain);

    // this.greyMatter = this.brain.model.getObjectByName('Brain');
    // this.greyMatter.material.transparent = true;
    // this.greyMatter.material.opacity = 0.1;
    // this.greyMatter.material.wireframe = true

    this.scene.add(this.brain.model);

    this.brainClot = new BrainClot();
    this.brainClot.init();
    this.brainClot.lesion.rotateY(Math.PI);
    this.brainClot.lesion.position.set(-2.25, -8, -0.1);
    this.brainClot.lesion.rotateX(Math.PI / 20);
    this.scene.add(this.brainClot.lesion);

    this.controls.animation.actions = initCameraActions(
      this.controls.animation.mixer
    );
    this.brain.animation.actions = initBrainActions(this.brain.animation.mixer);
    this.controls.animation.actions = initControlActions(
      this.controls.animation.mixer
    );
    // this.camera.animation.play('slowmove');
  }

  update(time) {
    super.update(time);
    // console.log(this.camera.rotation)
    // console.log(this.controls.target)
    this.controls.animation.mixer.update(this.time.delta * 0.001);
    this.camera.animation.mixer.update(this.time.delta * 0.001);
    this.brain.animation.mixer.update(this.time.delta * 0.001);
  }

  dispose() {
    this.stage.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
  }
}
