import * as THREE from 'three';

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

export { initBrainActions };
