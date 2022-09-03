/* eslint-disable class-methods-use-this */
import * as THREE from 'three';
import PhysWorld from './PhysWorld.js';

export default class SceneThree {
  constructor(canvasId) {
    /** setup sizes and time */
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
    window.addEventListener('resize', () => this.resize);

    this.time = {
      start: Date.now(),
      current: Date.now(),
      delta: 16,
      elapsed: 0,
    };

    /** set up scene object and cameras */
    const deadCanvas = document.getElementById('scene-container');
    if (deadCanvas) {
      deadCanvas.remove();
    }

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.setAttribute('id', canvasId);
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    /** all scene objects that animate must be pushed to objectToUpdate */
    this.objectsToUpdate = [];

    /**
     * Overlay
     */
    // this.overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
    // this.overlayMaterial = new THREE.ShaderMaterial({
    //   transparent: true,
    //   uniforms: {
    //     uAlpha: { value: 1 },
    //   },
    //   vertexShader: `
    //     void main()
    //     {
    //       gl_Position = vec4(position, 1.0);
    //     }
    //   `,
    //   fragmentShader: `
    //     uniform float uAlpha;
    //     void main()
    //     {
    //       gl_FragColor = vec4( 0.0, 0.0, 0.0, uAlpha);
    //     }
    //   `,
    // });
    // const overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial);
    // overlay.name = 'overlay';
    // this.scene.add(overlay);

    this.camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );

    // Set up animation for camera object
    this.camera.animation = {
      mixer: new THREE.AnimationMixer(this.camera),
      actions: {},
      play: name => {
        const newAction = this.camera.animation.actions[name];
        const oldAction = this.camera.animation.actions.current;
        newAction.reset();
        newAction.play();
        newAction.crossFadeFrom(oldAction, 1);

        this.animation.actions.current = newAction;
      },
    };

    /** setup renderer function */
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      physicallyCorrectLights: true,
      outputEncoding: THREE.sRGBEncoding,
      toneMapping: THREE.CineonToneMapping,
      toneMappingExposure: 1.75,
    });
    this.renderer.shadowMap.enabled = true; // needed? maybe set in world
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // needed? maybe set in world
    this.renderer.setClearColor('#211d20');
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // this.postProcessor = new PostProcess()

    /** initially setting animation loop to null, later call start() in main.js */
    this.renderer.setAnimationLoop(null);
  }

  init() {
    // load global assets and resources
    // this.scene.background = color
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // this.postProcessor.resize()

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  setCamera() {}

  // eslint-disable-next-line no-unused-vars
  enableVR(gripModels, controllerHandlers) {}

  disableVR() {}

  enablePhysics() {
    this.physWorld = new PhysWorld();
  }

  disbalePhysics() {}

  enablePostProcessing() {}

  disablePostProcessing() {}

  update() {
    const currentTime = Date.now();
    this.time.delta = currentTime - this.time.current;
    this.time.current = currentTime;
    this.time.elapsed = this.current - this.time.start;

    this.controls?.update(this.time.delta);

    // Update the mixer on each frame
    // function update () {
    this.camera.animation.mixer.update(this.time.delta * 0.001);
    // }

    this.physWorld?.step(1 / 60, this.time.delta, 3);
    // this.world?.update(this.time);
    for (const object of this.objectsToUpdate) {
      if (object.update) {
        object.update(this.time);
      }
    }

    // not needed with post processing
    this.renderer.render(this.scene, this.camera);
    // this.postProcessor.update()  // needed with postprocessing
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.update();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  destroy() {
    this.sizes.off('resize');

    this.scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }

      const materialKeys = Object.keys(child.material);

      for (let index = 0; index < materialKeys.length; index += 1) {
        const value = child.material[materialKeys[index]];
        if (value && typeof value.dispose === 'function') {
          value.dispose();
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.dispose();
    if (this.debug.active) {
      this.debug.ui.destroy();
    }

    const deadCanvas = document.getElementById('scene-container');
    deadCanvas.remove();
  }
}
