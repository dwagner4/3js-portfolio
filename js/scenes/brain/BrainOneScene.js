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
    this.brainprops = { opacity: 1.0 };

    this.camera.lookAt(
      this.cameraLookAt.x,
      this.cameraLookAt.y,
      this.cameraLookAt.z
    );

    // this.cameraPanToplaque = () =>
    //   gsap
    //     .timeline()
    //     // .set(this.camera.position, {z: -30, duration: 1})
    //     .to(this.brain, {
    //       greyopacity: 0.1,
    //       duration: 2,
    //     })
    //     .to(this.camera.position, {
    //       x: -10,
    //       y: -5.5,
    //       z: -10,
    //       duration: 5,
    //     })
    //     .to(
    //       this.controls.target,
    //       {
    //         x: -2.25,
    //         y: -8,
    //         z: 0,
    //         duration: 5,
    //       },
    //       '<'
    //     )
    //     .to(
    //       this.scene.background,
    //       {
    //         r: 0.6,
    //         g: 0.7,
    //         b: 0.8,
    //         duration: 5,
    //       },
    //       '<'
    //     )
    //     .to(this.brain, {
    //       arteryOneOpacity: 0.3,
    //       duration: 2,
    //     });

    // this.dobreakoff = () =>
    //   gsap
    //     .timeline()
    //     .to(this.brainClot.model.position, {
    //       x: -2.1,
    //       y: -7.5,
    //       z: -0.3,
    //       duration: 2,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -2.4,
    //       y: -5.2,
    //       z: -0.7,
    //       duration: 5,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -1,
    //       y: -4.1,
    //       z: -1.1,
    //       duration: 3,
    //     })
    //     .to(
    //       this.camera.position,
    //       {
    //         x: -3,
    //         y: -10.8,
    //         z: -13.6,
    //         duration: 4,
    //       },
    //       '<'
    //     )
    //     .to(
    //       this.controls.target,
    //       {
    //         x: 0.7,
    //         y: -7.2,
    //         z: -1.8,
    //         duration: 4,
    //       },
    //       '<'
    //     )
    //     .to(this.brainClot.model.position, {
    //       x: -1,
    //       y: -3.5,
    //       z: -1.0,
    //       duration: 2,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -1.1,
    //       y: -2.4,
    //       z: -2.2,
    //       duration: 3,
    //     });

    // this.dotravel = () =>
    //   gsap
    //     .timeline()
    //     .to(this.brain, {
    //       arteryOneOpacity: 1.0,
    //       duration: 1,
    //     })
    //     .set(this.brain, {
    //       aOneTrans: false,
    //     })
    //     .to(
    //       this.brain,
    //       {
    //         greyopacity: 1.0,
    //         duration: 1,
    //       },
    //       '<'
    //     )
    //     .to(this.camera.position, {
    //       x: -1.37,
    //       y: 10.38,
    //       z: -13.84,
    //       duration: 5,
    //     })
    //     .to(
    //       this.controls.target,
    //       {
    //         x: -2.72,
    //         y: 0.54,
    //         z: 0.07,
    //         duration: 5,
    //       },
    //       '<'
    //     )
    //     .to(
    //       this.scene.background,
    //       {
    //         r: 0.8,
    //         g: 0.7,
    //         b: 0.6,
    //         duration: 2,
    //       },
    //       '<'
    //     )
    //     .to(this.brain, {
    //       greyopacity: 0.0,
    //       duration: 1,
    //     })
    //     .set(this.brain, {
    //       greyVisible: false,
    //     })
    //     .set(this.brain, {
    //       aTwoTrans: true,
    //     })
    //     .to(this.brain, {
    //       arteryTwoOpacity: 0.3,
    //       duration: 2,
    //     })

    //     .set(this.brainClot.model.position, {
    //       x: -2.5,
    //       y: -2.0,
    //       z: -2.4,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -3.1,
    //       y: -1.0,
    //       z: -1.8,
    //       duration: 3,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -3.6,
    //       y: -0.9,
    //       z: -1.2,
    //       duration: 3,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -4.2,
    //       y: -0.4,
    //       z: -0.9,
    //       duration: 3,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -4.5,
    //       y: -0.0,
    //       z: -0.75,
    //       duration: 3,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -4.55,
    //       y: 0.15,
    //       z: -0.7,
    //       duration: 3,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -4.5,
    //       y: 0.35,
    //       z: -0.75,
    //       duration: 3,
    //     })
    //     .to(this.brainClot.model.position, {
    //       x: -4.35,
    //       y: 0.5,
    //       z: -0.78,
    //       duration: 3,
    //     })

    //     .to(this.brain, {
    //       arteryTwoOpacity: 1.0,
    //       duration: 2,
    //     })
    //     .set(this.brain, {
    //       aTwoTrans: false,
    //     })
    //     .set(this.brain, {
    //       greyVisible: true,
    //     })
    //     .to(this.brain, {
    //       greyopacity: 1.0,
    //       duration: 3,
    //     })
    //     .to(this.camera.position, {
    //       x: -18.7,
    //       y: 2.8,
    //       z: -5.6,
    //       duration: 5,
    //     })
    //     .to(this.camera.position, {
    //       x: -12.1,
    //       y: 1.2,
    //       z: -1.5,
    //       duration: 5,
    //     })
    //     .to(this.brain, {
    //       greyopacity: 0.05,
    //       duration: 3,
    //     });

    // this.dostroke = () =>
    //   gsap
    //     .timeline()

    //     .to(this.brainDamage, {
    //       mainscale: 0.5,
    //       duration: 15,
    //     });

    // this.dodamage = () =>
    //   gsap
    //     .timeline()
    //     .to(this.brainDamage, {
    //       subscale: 0.5,
    //       mainscale: 1.0,
    //       duration: 15,
    //     })
    //     .to(
    //       this.scene.background,
    //       {
    //         r: 0.5,
    //         g: 0.2,
    //         b: 0.1,
    //         duration: 5,
    //       },
    //       '<'
    //     )
    //     .to(this.camera.position, {
    //       x: -40,
    //       y: 1.2,
    //       z: -1.5,
    //       duration: 5,
    //     })
    //     .to(
    //       this.brain,
    //       {
    //         greyopacity: 0.5,
    //         duration: 5,
    //       },
    //       '<'
    //     );

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
