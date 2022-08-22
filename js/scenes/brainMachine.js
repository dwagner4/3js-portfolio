// eslint-disable-next-line no-undef, no-unused-vars
const { createMachine, interpret, assign } = XState;

const brainMachine = createMachine({
  context: {},
  id: 'mainMachine',
  initial: 'home',
  states: {
    home: {
      entry: [],
      on: {
        NEXT: { target: 'rotate' },
      },
    },
    rotate: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'lesion' },
      },
    },
    lesion: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'stroke' },
      },
    },
    stroke: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'depletion' },
      },
    },
    depletion: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        DRUG: { target: 'drug' },
        NEXT: { target: 'damage' },
      },
    },
    damage: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        REWIND: { target: 'depletion' },
      },
    },
    drug: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'recovery' },
      },
    },
    recovery: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        REWIND: { target: 'depletion' },
      },
    },
  },
});

const brainService = interpret(brainMachine);
brainService.onTransition(state => console.log(state));
brainService.start();

export { brainMachine, brainService };
