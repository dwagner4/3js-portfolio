import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default class FallingBalls {
  constructor(numBalls, scene) {
    this.scene = scene;
    this.theBalls = [];
    this.time = this.scene.time;
    this.lastBall = Date.now();
    this.ballcount = 0;
    this.scene.enablePhysics();
    this.numberOfBalls = numBalls;
    this.scene.objectsToUpdate.push(this);
  }

  async init() {
    this.scene.objectsToUpdate.push(this);
    this.createABall();
  }

  createABall() {
    const ballRadius = Math.random() * 0.2 + 0.1;
    const theBall = {};
    theBall.model = new THREE.Mesh(
      new THREE.SphereGeometry(ballRadius, 20, 20),
      new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        metalness: 0.3,
        roughness: 0.4,
      })
    );
    theBall.model.castShadow = true;

    const shape = new CANNON.Sphere(ballRadius);
    theBall.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(
        Math.random() * 3 - 1.5,
        6,
        Math.random() * 3 - 1.5
      ),
      // eslint-disable-next-line object-shorthand
      shape: shape,
      // material: this.physWorld.defaultContactMaterial
    });
    this.theBalls.push(theBall);
    // console.log(this.theBalls)
    this.scene.scene.add(theBall.model);
    this.scene.physWorld.addBody(theBall.body);
  }

  update() {
    const currentTime = Date.now();
    const ballWait = currentTime - this.lastBall;
    if (ballWait > 200) {
      if (this.theBalls.length < this.numberOfBalls) {
        // eslint-disable-next-line no-unused-vars
        const aBall = this.createABall();
      } else {
        this.theBalls[this.ballcount].body.position = new CANNON.Vec3(
          Math.random() * 3 - 1.5,
          6,
          Math.random() * 3 - 1.5
        );
        this.theBalls[this.ballcount].body.velocity = new CANNON.Vec3(0, 0, 0);
        // eslint-disable-next-line no-plusplus, no-unused-expressions
        this.ballcount >= this.numberOfBalls - 1
          ? (this.ballcount = 0)
          : this.ballcount++;
      }
      this.lastBall = currentTime;
    }

    this.theBalls.forEach(b => {
      b.model.position.copy(b.body.position);
    });
  }

  dispose() {
    // eslint-disable-next-line no-return-assign, no-unused-vars, no-param-reassign
    this.theBalls.forEach(el => (el = null));
  }
}
