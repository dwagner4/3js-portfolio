This is an OOP template for Three.js web applications.  It was generated from @open-wc targeting plain vanilla Javascript, roll-up and jest.  The dependencies are;

- Three.js, 3D rendering
- Gsap, variable animation (not strictly required)
- xState, finite state machine (not strictly required)
- cannon.js, (required for physics, could use Ammo.js)

The "System" directory contains three.js modules that are meant to be extended for a particular application.
- Stage is extended for the main element which creates a scene, camera, renderer, and other optional items such as VR, Physics, Post-processing, etc...
-  A World is extended to create a particular environment which can be dynamically switched controled by the finite state machine
-  Actor is extended for dynamic objects, actors have update and dispose functions 
-  Scenery is extended for static objects


Index.html contains minimal html and possible grphics to display during the initial download.

main.js sets up html dynamic elements, subcribes to the finite state machine and loads the Stage instance

The Stage.js parent has an overlay plane attached to the camera to use for fading to black, etc...

actors and scenery all have init, update and dispose functions

Large files and resources are loaded during each object's init() function which is async called recursively from the world's init()

World instances contain an array of objectToBeUpdated[] which recursively calls update functions during render

dispose functions are called when switching worlds

## Quick Start

1. Clone the repository 
2. from root `npm install`
3. `npm run start`

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors
