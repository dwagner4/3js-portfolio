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
        NEXT: { target: 'stoprotating' },
      },
    },
    stoprotating: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        // NEXT: { target: 'breakoff' },
        ATZERO: { target: 'lesion' },
      },
    },
    lesion: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'breakoff' },
      },
    },
    breakoff: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'travel' },
      },
    },
    travel: {
      entry: [],
      on: {
        HOME: { target: 'home' },
        NEXT: { target: 'depletion' },
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
      // the stroke starts
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
brainService.onTransition(state => console.log(state.value));
brainService.start();

export { brainMachine, brainService };
