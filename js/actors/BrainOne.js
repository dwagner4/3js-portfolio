import * as THREE from 'three';
import Actor from '../systems/Actor.js';
import { createGlbLoader } from '../systems/Loader.js';

export default class BrainOne extends Actor {
  constructor() {
    super();
    this.model = {};
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
    this.Basilar_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });

    this.Internal_Carotid_Artery = this.model.getObjectByName(
      'Internal_Carotid_Artery'
    );
    this.Internal_Carotid_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
      transparent: true,
      opacity: 0.5,
    });
    this.Middle_Cerebral_Artery = this.model.getObjectByName(
      'Middle_Cerebral_Artery'
    );
    this.Middle_Cerebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    this.Posterior_Cerebral_Artery = this.model.getObjectByName(
      'Posterior_Cerebral_Artery'
    );
    this.Posterior_Cerebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    this.Posterior_Communicating_Artery = this.model.getObjectByName(
      'Posterior_Communicating_Artery'
    );
    this.Posterior_Communicating_Artery.material =
      new THREE.MeshStandardMaterial({ color: 0x660000 });
    this.Superior_Cerebellar_Artery = this.model.getObjectByName(
      'Superior_Cerebellar_Artery'
    );
    this.Superior_Cerebellar_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
    this.Vertebral_Artery = this.model.getObjectByName('Vertebral_Artery');
    this.Vertebral_Artery.material = new THREE.MeshStandardMaterial({
      color: 0x660000,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  dispose() {}
}
