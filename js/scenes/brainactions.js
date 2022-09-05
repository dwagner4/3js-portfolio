import * as THREE from 'three';

const initControlActions = mixer => {
  const controlactions = {};

  const targettimes = [0, 3];
  const targetvalues = [0, 0, 0, -2.25, -8, -0.1];
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

const initBrainActions = mixer => {
  const brainactions = {};

  const greytimes = [0, 1, 2];
  const greyvalues = [1.0, 0.5, 0.1];
  const greypositionKF = new THREE.NumberKeyframeTrack(
    '.greyopacity',
    greytimes,
    greyvalues
  );
  const greytracks = [greypositionKF];
  const greylength = -1;
  const greyclip = new THREE.AnimationClip('grey', greylength, greytracks);
  brainactions.grey = mixer.clipAction(greyclip);
  brainactions.grey.setLoop(THREE.LoopOnce);
  brainactions.grey.clampWhenFinished = true;

  return brainactions;
};

export { initBrainActions, initCameraActions, initControlActions };
