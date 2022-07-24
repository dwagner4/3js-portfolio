/* eslint-disable new-cap */
// eslint-disable-next-line import/no-unresolved
import { gsap } from 'gsap';

/** import the Finite State Machine */
import { mainService } from './mainMachine.js';

/** import the stage and the initial world */
import Act1 from './stages/Act1.js';

/**
 * connect to backend
 *
 * For Firebase
 * import { getMyConfig } from '../config.js';
 *   Import the functions you need from the SDKs you need
 *   eslint-disable-next-line import/order
 * import { initializeApp } from 'firebase/app';
 *   TODO: Add SDKs for Firebase products that you want to use
 *   https://firebase.google.com/docs/web/setup#available-libraries
 * const firebaseConfig = getMyConfig();
 *   Initialize Firebase
 *   eslint-disable-next-line no-unused-vars
 * const app = initializeApp(firebaseConfig);
 */

/**
 * identify html elements and attach listeners
 *
 * const homebtn = document.querySelector('#homebtn')
 * homebtn.onclick = () => {mainService.send({type: 'HOME'})}
 * ...
 * homebtn.onmouseover = homeover
 * homebtn.onmouseout = msgout
 */
const homebtn = document.querySelector('#homebtn');
const menubtn = document.querySelector('#menubtn');
const aboutbtn = document.querySelector('#aboutbtn');

const fadeDuration = 1;

/**
 * create Global stage
 */
const container = document.querySelector('#scene-container');
const stage = new Act1(container, {
  controller: { type: 'orbit' },
  debug: false,
});
stage.init();

homebtn.onclick = () => {
  gsap.to(stage.overlayMaterial.uniforms.uAlpha, {
    duration: fadeDuration,
    value: 1,
    onComplete: () => mainService.send({ type: 'HOME' }),
  });
};
menubtn.onclick = () => {
  gsap.to(stage.overlayMaterial.uniforms.uAlpha, {
    duration: fadeDuration,
    value: 1,
    onComplete: () => mainService.send({ type: 'ONE' }),
  });
};

/**
 * just load the world
 */
// stage.world = new InitialWorld(stage);
// stage.world.init();
stage.start();

/**
 * world utility functions
 */
// eslint-disable-next-line no-unused-vars
const killWorld = () => {
  // gsap.to(this.overlayMaterial.uniforms.uAlpha, {duration: 3, value: 1})

  stage.stop();
  stage.world.dispose();
  stage.update();
};

/**
 * concatenates state.value keys with final text value, assumes xState state.value
 * like,
 * home: { secondstage: 'bigpicture'} => homesecondstagebigpicture
 * any state with a unique world must be listed in FSM subscription
 */
// eslint-disable-next-line no-unused-vars
const parseState = stateValue => {
  const header = [];
  let childState = stateValue;
  let loop = true;
  while (loop) {
    if (typeof childState === 'string' || childState instanceof String) {
      header.push(childState);
      loop = false;
    } else {
      const keys = Object.keys(childState);
      const localKey = keys[0];
      header.push(localKey);
      childState = childState[localKey];
    }
  }

  let startStr = '';
  for (let i = 0; i < header.length; i += 1) {
    const element = header[i];
    startStr += element;
  }
  return startStr;
};

/**
 * subscribe to ui state
 * lazy load world objects and initialize
 * change html element state
 *
 */
let currentStateStr = null;

mainService.subscribe(state => {
  homebtn.style.display = state.context.homebtn;
  menubtn.style.display = state.context.nextbtn;
  aboutbtn.style.display = state.context.aboutbtn;

  // changing world, don't want to restart world if not changed
  const stateStr = parseState(state.value);
  if (stateStr !== currentStateStr) {
    if (stateStr === 'home') {
      if (stage.world) {
        killWorld();
      }
      import('./worlds/InitialWorld.js').then(module => {
        stage.world = new module.default(stage);
        stage.world.init();
        stage.start();
        gsap.to(stage.overlayMaterial.uniforms.uAlpha, {
          duration: fadeDuration,
          value: 0,
        });
      });
    }
    if (stateStr === 'one') {
      if (stage.world) {
        killWorld();
      }
      import('./worlds/OneWorld.js').then(module => {
        stage.world = new module.default(stage);
        stage.world.init();
        stage.start();
        gsap.to(stage.overlayMaterial.uniforms.uAlpha, {
          duration: fadeDuration,
          value: 0,
        });
      });
    }

    currentStateStr = stateStr;
  }
});
