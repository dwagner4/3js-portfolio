import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import SceneThree from '../systems/SceneThree.js';

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

    this.gui = new dat.GUI();
    this.gui.close();
    this.gui.show();
    this.params = {
      lightIntensity: 1.0,
      greyMatterOpacity: 0.1,
      Anterior_Cerebral_Artery: false,
      Anterior_Communicating_Artery: false,
      Anterior_Inferior_Cerebellar_Artery: false,
      Basilar_Artery: false,
      Internal_Carotid_Artery: false,
      Middle_Cerebral_Artery: false,
      Posterior_Cerebral_Artery: false,
      Posterior_Communicating_Artery: false,
      Superior_Cerebellar_Artery: false,
      Vertebral_Artery: false,
    };
    this.gui.add(this.params, 'lightIntensity', 0.0, 4.0, 0.1);
    this.gui.add(this.params, 'greyMatterOpacity', 0.0, 1.0, 0.01);

    this.camera.position.set(0, 5, -30);
    this.scene.background = new THREE.Color(0xa0a0a0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    // const light = new THREE.PointLight(0xffaaaa, 2, 100, 1);
    // light.position.set(0, 0, -5);
    // this.stage.scene.add(light);

    // const light2 = new THREE.PointLight(0xaaaaff, 2, 100, 1);
    // light2.position.set(0, 0, 5);
    // this.stage.scene.add(light2);

    this.directionalLight = new THREE.DirectionalLight(
      0xffffff,
      this.params.lightIntensity
    );
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
    console.log(this.brain.model);

    this.arteryMaterial = this.brain.model.getObjectByName(
      'Anterior_Cerebral_Artery'
    ).material;
    this.arteryMaterial.transparent = true;
    this.arteryMaterial.opacity = this.params.arteryOpacity;

    this.Anterior_Cerebral_Artery = this.brain.model.getObjectByName(
      'Anterior_Cerebral_Artery'
    );
    this.Anterior_Cerebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });

    this.Anterior_Communicating_Artery = this.brain.model.getObjectByName(
      'Anterior_Communicating_Artery'
    );
    this.Anterior_Communicating_Artery.material =
      new THREE.MeshStandardMaterial({ color: 0x660000 });

    this.Anterior_Inferior_Cerebellar_Artery = this.brain.model.getObjectByName(
      'Anterior_Inferior_Cerebellar_Artery'
    );
    this.Anterior_Inferior_Cerebellar_Artery.material =
      new THREE.MeshStandardMaterial({ color: 0x660000 });

    this.Basilar_Artery = this.brain.model.getObjectByName('Basilar_Artery');
    this.Basilar_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });

    this.Internal_Carotid_Artery = this.brain.model.getObjectByName(
      'Internal_Carotid_Artery'
    );
    this.Internal_Carotid_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
      transparent: true,
      opacity: 0.5,
    });
    this.Middle_Cerebral_Artery = this.brain.model.getObjectByName(
      'Middle_Cerebral_Artery'
    );
    this.Middle_Cerebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    this.Posterior_Cerebral_Artery = this.brain.model.getObjectByName(
      'Posterior_Cerebral_Artery'
    );
    this.Posterior_Cerebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    this.Posterior_Communicating_Artery = this.brain.model.getObjectByName(
      'Posterior_Communicating_Artery'
    );
    this.Posterior_Communicating_Artery.material =
      new THREE.MeshStandardMaterial({ color: 0x660000 });
    this.Superior_Cerebellar_Artery = this.brain.model.getObjectByName(
      'Superior_Cerebellar_Artery'
    );
    this.Superior_Cerebellar_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    this.Vertebral_Artery =
      this.brain.model.getObjectByName('Vertebral_Artery');
    this.Vertebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    const arteries = this.gui.addFolder('Arteries');
    arteries.add(this.params, 'Anterior_Cerebral_Artery');
    arteries.add(this.params, 'Anterior_Communicating_Artery');
    arteries.add(this.params, 'Anterior_Inferior_Cerebellar_Artery');
    arteries.add(this.params, 'Basilar_Artery');
    arteries.add(this.params, 'Internal_Carotid_Artery');
    arteries.add(this.params, 'Middle_Cerebral_Artery');
    arteries.add(this.params, 'Posterior_Cerebral_Artery');
    arteries.add(this.params, 'Posterior_Communicating_Artery');
    arteries.add(this.params, 'Superior_Cerebellar_Artery');
    arteries.add(this.params, 'Vertebral_Artery');

    this.greyMatter = this.brain.model.getObjectByName('Brain');
    this.greyMatter.material.transparent = true;
    this.greyMatter.material.opacity = this.params.greyMatterOpacity;
    // this.greyMatter.material.wireframe = true

    this.scene.add(this.brain.model);

    this.brainClot = new BrainClot();
    this.brainClot.init();
    this.brainClot.lesion.rotateY(Math.PI);
    this.brainClot.lesion.position.set(-2.25, -8, -0.1);
    this.brainClot.lesion.rotateX(Math.PI / 20);
    this.scene.add(this.brainClot.lesion);
  }

  update(time) {
    super.update(time);
    this.directionalLight.intensity = this.params.lightIntensity;
    if (this.greyMatter) {
      this.greyMatter.material.opacity = this.params.greyMatterOpacity;
    }
    if (this.params.Anterior_Cerebral_Artery) {
      this.Anterior_Cerebral_Artery.material.color = new THREE.Color(0xff00aa);
    } else if (this.Anterior_Cerebral_Artery) {
      this.Anterior_Cerebral_Artery.material.color = new THREE.Color(0x660000);
    }
    if (this.params.Anterior_Communicating_Artery) {
      this.Anterior_Communicating_Artery.material.color = new THREE.Color(
        0xff00aa
      );
    } else if (this.Anterior_Communicating_Artery) {
      this.Anterior_Communicating_Artery.material.color = new THREE.Color(
        0x660000
      );
    }
    if (this.params.Anterior_Inferior_Cerebellar_Artery) {
      this.Anterior_Inferior_Cerebellar_Artery.material.color = new THREE.Color(
        0xff00aa
      );
    } else if (this.Anterior_Inferior_Cerebellar_Artery) {
      this.Anterior_Inferior_Cerebellar_Artery.material.color = new THREE.Color(
        0x660000
      );
    }
    if (this.params.Basilar_Artery) {
      this.Basilar_Artery.material.color = new THREE.Color(0xff00aa);
    } else if (this.Basilar_Artery) {
      this.Basilar_Artery.material.color = new THREE.Color(0x660000);
    }
    if (this.params.Internal_Carotid_Artery) {
      this.Internal_Carotid_Artery.material.color = new THREE.Color(0xff00aa);
    } else if (this.Internal_Carotid_Artery) {
      this.Internal_Carotid_Artery.material.color = new THREE.Color(0x660000);
    }
    if (this.params.Middle_Cerebral_Artery) {
      this.Middle_Cerebral_Artery.material.color = new THREE.Color(0xff00aa);
    } else if (this.Middle_Cerebral_Artery) {
      this.Middle_Cerebral_Artery.material.color = new THREE.Color(0x660000);
    }
    if (this.params.Posterior_Cerebral_Artery) {
      this.Posterior_Cerebral_Artery.material.color = new THREE.Color(0xff00aa);
    } else if (this.Posterior_Cerebral_Artery) {
      this.Posterior_Cerebral_Artery.material.color = new THREE.Color(0x660000);
    }
    if (this.params.Posterior_Communicating_Artery) {
      this.Posterior_Communicating_Artery.material.color = new THREE.Color(
        0xff00aa
      );
    } else if (this.Posterior_Communicating_Artery) {
      this.Posterior_Communicating_Artery.material.color = new THREE.Color(
        0x660000
      );
    }
    if (this.params.Superior_Cerebellar_Artery) {
      this.Superior_Cerebellar_Artery.material.color = new THREE.Color(
        0xff00aa
      );
    } else if (this.Superior_Cerebellar_Artery) {
      this.Superior_Cerebellar_Artery.material.color = new THREE.Color(
        0x660000
      );
    }
    if (this.params.Vertebral_Artery) {
      this.Vertebral_Artery.material.color = new THREE.Color(0xff00aa);
    } else if (this.Vertebral_Artery) {
      this.Vertebral_Artery.material.color = new THREE.Color(0x660000);
    }
  }

  dispose() {
    this.stage.disableVR();
    this.brain.dispose();
    this.brain.model.removeFromParent();
  }
}
