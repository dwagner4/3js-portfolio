import gsap from 'gsap';
import * as THREE from 'three';

import SceneThree from '../../systems/SceneThree.js';

import BrainOne from '../../actors/brain/BrainOne.js';
import BrainClot from '../../actors/brain/brainclot.js';
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

    console.log('A');
    this.camera.position.set(0, 3, 30);

    this.cameraDistance = 30;
    this.cameraHeight = 3;
    this.cameraRotate = true;
    this.stoprotating = false;
    this.pause = true;
    this.cameraLookAt = { x: 0, y: 0, z: 0 };

    this.camera.lookAt(
      this.cameraLookAt.x,
      this.cameraLookAt.y,
      this.cameraLookAt.z
    );

    this.cameraPanToLesion = () =>
      gsap
        .timeline()
        // .set(this.camera.position, {z: -30, duration: 1})
        .to(this.camera.position, {
          x: -10,
          y: -5.5,
          z: -10,
          duration: 5,
        })
        .to(
          this.cameraLookAt,
          {
            x: -2.25,
            y: -8,
            z: 0,
            onUpdate: () => {
              this.camera.lookAt(
                this.cameraLookAt.x,
                this.cameraLookAt.y,
                this.cameraLookAt.z
              );
            },
            duration: 5,
          },
          '<'
        );

    // this.toLesionTL = () => gsap.timeline(
    //   this.camera.position,
    //   {
    //     z: -30,
    //     ease: "none",
    //     duration: 2
    //   }
    // )

    // this.animprops = {
    //   cameraDistance: 30,
    //   cameraHeight: 3,
    // };

    brainService.subscribe(state => {
      resetbtn.style.display = state.context.resetbtn;
      nextbtn.style.display = state.context.nextbtn;
      drugbtn.style.display = state.context.drugbtn;
      rewindbtn.style.display = state.context.rewindbtn;
      if (state.value === 'home') {
        this.cameraRotate = true;
        this.stoprotating = false;
        this.cameraDistance = 30;
      }
      if (state.value === 'stoprotating') {
        this.stoprotating = true;
      }
      if (state.value === 'lesion') {
        if (!gsap.isTweening(this.camera.position)) {
          this.cameraRotate = false;
          this.cameraPanToLesion().play();
          // gsap.fromTo(
          //   this.camera.position,
          //   { z: -30},
          //   {
          //     z: -100,
          //     onUpdate: () => {console.log(this.camera.position.z)},
          //     duration: 5,
          //     ease: "none",
          //   }
          // ).play(true);
        }
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
    this.brainClot.lesion.rotateY(Math.PI);
    this.brainClot.lesion.position.set(-2.25, -8, -0.1);
    this.brainClot.lesion.rotateX(Math.PI / 20);
    this.scene.add(this.brainClot.lesion);
    this.objectsToUpdate.push(this.brainClot);
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

    // this.camera.lookAt(0, 0, 0);
  }

  dispose() {
    brainService.send({ type: 'HOME' });
    this.stage.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
  }
}
