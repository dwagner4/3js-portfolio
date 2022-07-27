/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCubeTextureLoader } from '../systems/Loader.js';
import SceneThree from '../systems/SceneThree.js';

import ElfScene from '../scenery/ElfScene.js';
import Elf from '../actors/Elf.js';

export default class ThrillScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 2.5, 10);
    this.scene.fog = new THREE.Fog(0x42280e, 10, 50);

    /**
     * add controls
     */
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.environmentMap = {};
    this.environmentMap.intensity = 0.25;
    const cubetextureloader = createCubeTextureLoader();
    this.environmentMap.texture = cubetextureloader.load([
      'assets/skybox/desertdawn_rt.jpg',
      'assets/skybox/desertdawn_lf.jpg',
      'assets/skybox/desertdawn_up.jpg',
      'assets/skybox/desertdawn_dn.jpg',
      'assets/skybox/desertdawn_bk.jpg',
      'assets/skybox/desertdawn_ft.jpg',
    ]);
    this.environmentMap.encoding = THREE.sRGBEncoding;
    this.scene.environment = this.environmentMap.texture;
    this.scene.background = this.environmentMap.texture;
    this.environmentMap.updateMaterials = () => {
      this.scene.traverse(child => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }

  async init() {
    await super.init();

    const elfscene = new ElfScene();

    const elf = new Elf();
    await elf.init();
    this.objectsToUpdate.push(elf);

    this.scene.add(
      elf.model,
      elfscene.plane,
      elfscene.hemilight,
      elfscene.light
    );

    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    // create a global audio source
    this.sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/audio/ElfThriller1.mp3', buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      // this.sound.play();
    });

    const container = document.querySelector('#scene-container');
    const dancebtn = document.getElementById('dance');
    dancebtn.onclick = () => {
      this.sound.play();
      console.log(elf);
      elf.animation.play('idle');
      dancebtn.style.display = 'none';
      container.requestFullscreen();
    };
  }
}
