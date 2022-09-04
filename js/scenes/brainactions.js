import * as THREE from 'three';

const initCameraActions = mixer => {
  const cameraactions = {};

  const slowmovetimes = [0, 3];
  const slowmovevalues = [0, 5, -30, 0, 5, -10];
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

  const targettimes = [0, 3];
  const targetvalues = [0, 0, 0, 0, -10, 0];
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
  cameraactions.target = mixer.clipAction(targetclip);

  const rotatetimes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const rotatevalues = [
    0, 5, -30,

    0, -10, -30,
  ];
  const rotatepositionKF = new THREE.VectorKeyframeTrack(
    '.position',
    rotatetimes,
    rotatevalues
  );
  const rotatetracks = [rotatepositionKF];
  const rotatelength = -1;
  const rotateclip = new THREE.AnimationClip(
    'rotate',
    rotatelength,
    rotatetracks
  );
  cameraactions.rotate = mixer.clipAction(rotateclip);

  const greytimes = [0, 1, 2];
  const greyvalues = [1.0, 0.5, 0.1];
  const greypositionKF = new THREE.NumberKeyframeTrack(
    '.opacity',
    greytimes,
    greyvalues
  );
  const greytracks = [greypositionKF];
  const greylength = -1;
  const greyclip = new THREE.AnimationClip('grey', greylength, greytracks);
  cameraactions.grey = mixer.clipAction(greyclip);

  return cameraactions;
};

const initBrainActions = mixer => {
  const brainactions = {};

  const greytimes = [0, 1, 2];
  const greyvalues = [1.0, 0.5, 0.1];
  const greypositionKF = new THREE.NumberKeyframeTrack(
    '.opacity',
    greytimes,
    greyvalues
  );
  const greytracks = [greypositionKF];
  const greylength = -1;
  const greyclip = new THREE.AnimationClip('grey', greylength, greytracks);
  brainactions.grey = mixer.clipAction(greyclip);

  return brainactions;
};

export { initBrainActions, initCameraActions };
