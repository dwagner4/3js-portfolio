import * as THREE from 'three';
import Actor from '../../systems/Actor.js';
import { createGlbLoader } from '../../systems/Loader.js';
// import { initBrainActions } from './brainactions.js';

export default class BrainOne extends Actor {
  constructor() {
    super();
    this.model = {};

    // variables for animation and control in Parent Scene
    this.greyopacity = 1.0;
    this.arteryOneOpacity = 1.0;
    this.greyVisible = true;
    this.aOneTrans = true;
    this.arteryTwoOpacity = 1.0;
    this.aTwoTrans = false;
  }

  async init() {
    super.init();
    const glbloader = await createGlbLoader();
    const [brainData] = await Promise.all([
      glbloader.loadAsync('/assets/brain-Circulation.glb'),
    ]);
    const brainmodel = brainData.scene;
    // eslint-disable-next-line prefer-destructuring
    this.model = brainmodel.children[0];
    this.model.name = 'brain';
    this.Anterior_Cerebral_Artery = this.model.getObjectByName(
      'Anterior_Cerebral_Artery'
    );
    this.Anterior_Cerebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });

    this.Anterior_Communicating_Artery = this.model.getObjectByName(
      'Anterior_Communicating_Artery'
    );
    this.Anterior_Communicating_Artery.material =
      new THREE.MeshStandardMaterial({ color: 0x660000 });

    this.Anterior_Inferior_Cerebellar_Artery = this.model.getObjectByName(
      'Anterior_Inferior_Cerebellar_Artery'
    );
    this.Anterior_Inferior_Cerebellar_Artery.material =
      new THREE.MeshStandardMaterial({ color: 0x660000 });

    this.Basilar_Artery = this.model.getObjectByName('Basilar_Artery');
    this.Basilar_Artery.material = new THREE.MeshLambertMaterial({
      color: 0x660000,
    });

    this.Internal_Carotid_Artery = this.model.getObjectByName(
      'Internal_Carotid_Artery'
    );
    this.Internal_Carotid_Artery.material = new THREE.MeshLambertMaterial({
      color: 0x660000,
      transparent: this.aOneTrans,
      opacity: this.arteryOneOpacity,
      // wireframe: true
    });
    this.Middle_Cerebral_Artery = this.model.getObjectByName(
      'Middle_Cerebral_Artery'
    );
    this.Middle_Cerebral_Artery.material = new THREE.MeshLambertMaterial({
      color: 0x660000,
      transparent: this.aTwoTrans,
      opacity: this.arteryTwoOpacity,
    });
    this.Posterior_Cerebral_Artery = this.model.getObjectByName(
      'Posterior_Cerebral_Artery'
    );
    this.Posterior_Cerebral_Artery.material = new THREE.MeshLambertMaterial({
      color: 0x660000,
    });
    this.Posterior_Communicating_Artery = this.model.getObjectByName(
      'Posterior_Communicating_Artery'
    );
    this.Posterior_Communicating_Artery.material =
      new THREE.MeshLambertMaterial({ color: 0x660000 });
    this.Superior_Cerebellar_Artery = this.model.getObjectByName(
      'Superior_Cerebellar_Artery'
    );
    this.Superior_Cerebellar_Artery.material = new THREE.MeshLambertMaterial({
      color: 0x660000,
    });
    this.Vertebral_Artery = this.model.getObjectByName('Vertebral_Artery');
    this.Vertebral_Artery.material = new THREE.MeshLambertMaterial({
      color: 0x660000,
    });
    this.greyMatter = this.model.getObjectByName('Brain');
    this.greyMatter.material.transparent = true;
    this.greyMatter.material.opacity = this.greyopacity;

    // this.animation.actions = initBrainActions(this.animation.mixer);
  }

  update(time) {
    super.update(time);
    this.greyMatter.material.opacity = this.greyopacity;
    this.Internal_Carotid_Artery.material.opacity = this.arteryOneOpacity;
    this.Internal_Carotid_Artery.material.transparent = this.aOneTrans;
    this.Internal_Carotid_Artery.material.needsUpdate = true;
    this.Middle_Cerebral_Artery.material.opacity = this.arteryTwoOpacity;
    this.Middle_Cerebral_Artery.material.transparent = this.aTwoTrans;
    this.Middle_Cerebral_Artery.material.needsUpdate = true;
    this.greyMatter.visible = this.greyVisible;
  }

  // eslint-disable-next-line class-methods-use-this
  dispose() {}
}
