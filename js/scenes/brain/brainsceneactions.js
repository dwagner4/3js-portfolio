import * as THREE from 'three';

const initControlActions = mixer => {
  const controlactions = {};

  const targettimes = [0, 3];
  const targetvalues = [0, 0.1, 0, -2.25, -8, -0.1];
  const targetKF = new THREE.VectorKeyframeTrack(
    '.target',
    targettimes,
    targetvalues
  );
  const targettracks = [targetKF];
  const targetlength = -1;
  const targetclip = new THREE.AnimationClip(
    'target',
    targetlength,
    targettracks
  );
  controlactions.target = mixer.clipAction(targetclip);
  controlactions.target.setLoop(THREE.LoopOnce);
  controlactions.target.clampWhenFinished = true;

  return controlactions;
};

const initCameraActions = mixer => {
  const cameraactions = {};

  const slowmovetimes = [0, 3];
  const slowmovevalues = [0, 5, -30, 0, -10, -10];
  const positionKF = new THREE.VectorKeyframeTrack(
    '.position',
    slowmovetimes,
    slowmovevalues
  );
  const slowmovetracks = [positionKF];
  const slowmovelength = -1;
  const slowmoveclip = new THREE.AnimationClip(
    'slowmove',
    slowmovelength,
    slowmovetracks
  );
  cameraactions.slowmove = mixer.clipAction(slowmoveclip);
  cameraactions.slowmove.setLoop(THREE.LoopOnce);
  cameraactions.slowmove.clampWhenFinished = true;

  return cameraactions;
};

export { initCameraActions, initControlActions };
