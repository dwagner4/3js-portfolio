// import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import SceneThree from '../../systems/SceneThree.js';

import BrainOne from '../../actors/brain/BrainOne.js';
import BrainClot from '../../actors/brain/brainclot.js';
import BrainPlaque from '../../actors/brain/brainPlaque.js';
import BrainDamage from '../../actors/brain/brainDamage.js';
import { brainService } from './brainMachine.js';
import {
  cameraPanToplaque,
  dobreakoff,
  dotravel,
  dostroke,
  dodamage,
} from './brainGsap.js';

export default class BrainOneScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    // const resetbtn = document.querySelector('#resetbtn');
    // resetbtn.onclick = () => {
    //   brainService.send({ type: 'HOME' });
    // };
    this.nextbtn = document.querySelector('#nextbtn');
    this.nextbtn.onclick = () => {
      brainService.send({ type: 'NEXT' });
    };
    this.drugbtn = document.querySelector('#drugbtn');
    this.drugbtn.onclick = () => {
      brainService.send({ type: 'DRUG' });
    };
    this.caption = document.querySelector('#caption');
    // const rewindbtn = document.querySelector('#rewindbtn');
    // rewindbtn.onclick = () => {
    //   brainService.send({ type: 'REWIND' });
    // };

    console.log('A');
    this.camera.position.set(0, 3, 30);

    this.cameraDistance = 30;
    this.cameraHeight = 3;
    this.cameraRotate = true;
    this.stoprotating = false;
    this.pause = true;
    this.cameraLookAt = { x: 0, y: 0, z: 0 };
    this.brainprops = { opacity: 1.0 };

    this.camera.lookAt(
      this.cameraLookAt.x,
      this.cameraLookAt.y,
      this.cameraLookAt.z
    );

    brainService.subscribe(state => {
      // resetbtn.style.display = state.context.resetbtn;
      // nextbtn.style.display = state.context.nextbtn;
      // drugbtn.style.display = state.context.drugbtn;
      // rewindbtn.style.display = state.context.rewindbtn;
      if (state.value === 'home') {
        this.cameraRotate = true;
        this.stoprotating = false;
        this.cameraDistance = 30;
      }
      if (state.value === 'stoprotating') {
        this.nextbtn.style.display = 'none';
        this.stoprotating = true;
      }
      if (state.value === 'plaque') {
        this.cameraRotate = false;
        cameraPanToplaque(this).play();
      }
      if (state.value === 'breakoff') {
        dobreakoff(this).play();
      }
      if (state.value === 'travel') {
        dotravel(this).play();
      }
      if (state.value === 'stroke') {
        dostroke(this).play();
      }
      if (state.value === 'damage') {
        dodamage(this).play();
      }
    });

    this.scene.background = new THREE.Color(0x303030);

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

    this.brain = new BrainOne();
    await this.brain.init();
    this.brain.model.position.y += -10;
    this.objectsToUpdate.push(this.brain);

    this.scene.add(this.brain.model);

    this.brainClot = new BrainClot();
    this.brainClot.init();
    this.scene.add(this.brainClot.model);
    this.brainClot.model.position.set(-2.25, -8, -0.1);
    this.objectsToUpdate.push(this.brainClot);

    this.brainplaque = new BrainPlaque();
    this.brainplaque.init();
    this.brainplaque.model.rotateY(Math.PI);
    this.brainplaque.model.position.set(-2.25, -8, -0.1);
    this.brainplaque.model.rotateX(Math.PI / 20);
    this.scene.add(this.brainplaque.model);

    this.brainDamage = new BrainDamage();
    this.brainDamage.init();
    this.scene.add(this.brainDamage.model);
    this.brainDamage.model.position.set(-4.35, 0.5, -0.78);
    this.objectsToUpdate.push(this.brainDamage);
  }

  update() {
    super.update();

    if (this.cameraRotate) {
      this.camera.position.set(
        Math.sin(this.time.current * 0.001) * this.cameraDistance,
        this.cameraHeight,
        Math.cos(this.time.current * 0.001) * this.cameraDistance
      );
      this.camera.lookAt(0, 0, 0);
    }
    if (
      this.pause &&
      this.stoprotating &&
      this.camera.position.x < 1 &&
      this.camera.position.z < -25
    ) {
      this.cameraRotate = false;
      this.pause = false;
      brainService.send({ type: 'ATZERO' });
    }
    // console.log(
    //   'pos:',
    //   this.camera.position,
    //   'target:',
    //   this.controls.target,
    //   'rotate:',
    //   this.camera.rotation
    // );
    // this.camera.lookAt(0, 0, 0);
    // console.log(this.brainDamage?.model)
  }

  dispose() {
    brainService.send({ type: 'HOME' });
    this.stage.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
  }
}
