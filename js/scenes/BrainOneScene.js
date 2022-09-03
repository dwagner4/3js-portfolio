import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'lil-gui';
import SceneThree from '../systems/SceneThree.js';
import AnimCamera from '../systems/AnimCamera.js';

// import HeartScenery from '../scenery/HeartScenery.js';

import BrainOne from '../actors/BrainOne.js';
import BrainClot from '../actors/brainclot.js';
// import MySphere from '../props/MySphere.js';
import { brainService } from './brainMachine.js';

export default class BrainOneScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

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

    this.camera = new AnimCamera(this);
    this.camera.position.set(0, 5, -30);

    this.scene.background = new THREE.Color(0xa0a0a0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

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

    this.greyMatter = this.brain.model.getObjectByName('Brain');
    this.greyMatter.material.transparent = true;
    this.greyMatter.material.opacity = 0.1;
    // this.greyMatter.material.wireframe = true

    this.scene.add(this.brain.model);

    this.brainClot = new BrainClot();
    this.brainClot.init();
    this.brainClot.lesion.rotateY(Math.PI);
    this.brainClot.lesion.position.set(-2.25, -8, -0.1);
    this.brainClot.lesion.rotateX(Math.PI / 20);
    this.scene.add(this.brainClot.lesion);

    const times = [0, 3];
    const values = [0, 5, -30, 0, 1, -10];
    const positionKF = new THREE.VectorKeyframeTrack(
      '.position',
      times,
      values
    );
    const tracks = [positionKF];
    const length = -1;
    const clip = new THREE.AnimationClip('slowmove', length, tracks);
    console.log(this.camera.animation.mixer);
    this.camera.animation.actions.slowmove =
      await this.camera.animation.mixer.clipAction(clip);
    this.camera.animation.play('slowmove');
  }

  update(time) {
    super.update(time);
    this.camera.animation.mixer.update(this.time.delta * 0.001);
  }

  dispose() {
    this.stage.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
  }
}
