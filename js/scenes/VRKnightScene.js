import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SceneThree from '../systems/SceneThree.js';

import Knight from '../actors/humans/Knight.js';

export default class VRKnightScene extends SceneThree {
  constructor(canvasId) {
    super(canvasId);

    this.camera.position.set(0, 1.6, 5);
    this.scene.background = new THREE.Color(0x003049);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    this.scene.add(this.hemilight);

    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set(1, 1, 1).normalize();
    this.scene.add(this.light);

    const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0x333333,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(geometry, material);
    this.plane.rotateX(-Math.PI / 2);
    this.plane.translateZ(-1);
    this.scene.add(this.plane);
  }

  async init() {
    this.knight = new Knight(this);
    await this.knight.init();
    console.log(this.knight);
    this.knight.model.scale.set(0.01, 0.01, 0.01);
    // this.knight.model.position.set(0,0,0)
    this.knight.model.translateZ(1);
    this.scene.add(this.knight.model);
    this.objectsToUpdate.push(this.knight);
    // console.log(this.knight.mixer)

    this.dolly = new THREE.Object3D();
    // this.dolly.add( this.stage.camera );
    this.dolly.position.set(0, 0, 5);
    this.scene.add(this.dolly);

    // if (true) {
    //   const gripModels = []
    //   this.stage.enableVR( gripModels, controllerHandlers )

    //   // Add custom grip models, light saber, etc...

    //   // this.controls =  new VRcontrollers( gripModels, controllerHandlers )
    //   VRService.subscribe((state) => {
    //     this.rightJoystick = state.context.rightAxes
    //     this.rightButtons = state.context.rightBtns
    //   })

    //   // this.dolly = new THREE.Object3D();
    //   // this.dolly.add( this.stage.camera );
    //   // this.dolly.position.set(1,1,5)
    //   // this.scene.add( this.dolly );

    //   // this.dummyCam = new THREE.Object3D();
    //   // this.stage.camera.add( this.dummyCam );
    // }

    this.raycaster = new THREE.Raycaster();
    this.workingMatrix = new THREE.Matrix4();
    this.workingVector = new THREE.Vector3();

    // mainService.send({type: 'LOADED'})
  }
}
