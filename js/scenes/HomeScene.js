import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SceneThree from '../systems/SceneThree.js';

import BallTray from '../actors/BallTray.js';
import FallingBalls from '../actors/FallingBalls.js';

export default class HomeScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 3, 16);
    this.scene.background = new THREE.Color(0x0060a0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.pointlight = new THREE.PointLight(0xffaaaa, 0.5, 20);
    this.pointlight.position.set(2, 2, 2);
    this.scene.add(this.pointlight);

    this.light = new THREE.DirectionalLight(0xffffff, 0.75);
    this.light.name = 'Splash';
    this.light.position.set(10, 10, 10).normalize();

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    // console.log(this.light.shadow.camera)
    this.light.shadow.camera.near = 0.5;
    this.light.shadow.camera.far = 500;
    // this.light.shadow.camera.top = 5
    // this.light.shadow.camera.bottom = -5
    // this.light.shadow.camera.left = 5
    // this.light.shadow.camera.right = -5

    // this.light.shadow.radius = 10

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene.add(this.light);
  }

  async init() {
    await super.init();

    this.raycaster = new THREE.Raycaster();
    this.workingMatrix = new THREE.Matrix4();
    this.workingVector = new THREE.Vector3();

    this.fallingballs = new FallingBalls(20, this);
    this.fallingballs.init();

    this.balltray = new BallTray();
    await this.balltray.init();
    // this.balltray.model.rotateX(- Math.PI / 2)
    this.scene.add(this.balltray.model);
    this.physWorld.addBody(this.balltray.body);

    // mainService.send({type: 'LOADED'})
  }
}
