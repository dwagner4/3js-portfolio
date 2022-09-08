// import gsap from 'gsap'
import * as THREE from 'three';
import SceneThree from '../../systems/SceneThree.js';
import AnimCamera from '../../systems/AnimCamera.js';
import AnimOrbitControl from '../../systems/AnimOrbitControl.js';

import BrainOne from '../../actors/brain/BrainOne.js';
import BrainClot from '../../actors/brain/brainclot.js';
import { brainService } from './brainMachine.js';

import { initCameraActions, initControlActions } from './brainsceneactions.js';

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

    // this.params = { clotglow: 0 }

    brainService.subscribe(state => {
      if (state.value === 'lesion') {
        this.camera.animation.play('slowmove');
        this.controls.animation.play('target');
        this.controls.autoRotate = false;
        this.brain.animation.play('grey');
      }
    });

    this.camera = new AnimCamera(this);
    this.camera.position.set(0, 5, -30);

    this.scene.background = new THREE.Color(0x303030);

    this.controls = new AnimOrbitControl(this.camera, this.canvas);

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

    this.controls.target = new THREE.Vector3(0, 0.1, 0);
    this.brain = new BrainOne();
    await this.brain.init();
    this.brain.model.position.y += -10;
    this.objectsToUpdate.push(this.brain);

    this.scene.add(this.brain.model);

    this.brainClot = new BrainClot();
    this.brainClot.init();
    this.brainClot.lesion.rotateY(Math.PI);
    this.brainClot.lesion.position.set(-2.25, -8, -0.1);
    this.brainClot.lesion.rotateX(Math.PI / 20);
    this.scene.add(this.brainClot.lesion);
    this.objectsToUpdate.push(this.brainClot);

    // gsap.to(this.params, {
    //   clotglow: 1.0,
    //   duration: 5,
    //   repeat: -1
    // }).play(true)

    this.camera.animation.actions = initCameraActions(
      this.camera.animation.mixer
    );
    this.controls.animation.actions = initControlActions(
      this.controls.animation.mixer
    );
    this.controls.autoRotate = true;
  }

  update(time) {
    super.update(time);
    // this.brainClot.clotmaterial.emissiveIntensity = this.params.clotglow;
    // console.log(this.brainClot.clotmaterial)
    this.controls.animation.mixer.update(this.time.delta * 0.001);
    this.camera.animation.mixer.update(this.time.delta * 0.001);
  }

  dispose() {
    this.stage.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
  }
}
