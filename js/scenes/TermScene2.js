/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCubeTextureLoader } from '../systems/Loader.js';
import SceneThree from '../systems/SceneThree.js';

import NorthTerminal from '../actors/NorthTerminal.js';
import HeartScenery from '../scenery/HeartScenery.js';

export default class TermScene2 extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 30, 150);
    // this.scene.background = new THREE.Color(0xffa0ff);
    this.scene.fog = new THREE.Fog(0xaaaabb, 500, 1000);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    const hrtBgrd = new HeartScenery();
    this.hemi = hrtBgrd.hemilight;
    this.light = hrtBgrd.light;
    // this.plane = hrtBgrd.plane;
    // this.scene.add(this.hemi, this.light, this.plane);
    this.scene.add(this.hemi, this.light);

    const cubetextureloader = createCubeTextureLoader();
    this.environmentMap = {};
    this.environmentMap.intensity = 0.25;
    // this.environmentMap.texture = cubeTextureLoader.load(
    this.environmentMap.texture = cubetextureloader.load([
      'assets/skybox/yonder_rt.jpg',
      'assets/skybox/yonder_lf.jpg',
      'assets/skybox/yonder_up.jpg',
      'assets/skybox/yonder_dn.jpg',
      'assets/skybox/yonder_bk.jpg',
      'assets/skybox/yonder_ft.jpg',
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
  }

  async init() {
    await super.init();

    this.controls.target = new THREE.Vector3(0, 0.05, 0);

    this.term = new NorthTerminal();
    await this.term.init();
    this.term.model.position.set(392, -126, 740);
    console.log(this.term);
    this.scene.add(this.term.model);
  }

  update() {
    super.update();
    if (this.camera.position.y < 1.6) {
      this.camera.position.y = 1.6;
    }
  }
}
