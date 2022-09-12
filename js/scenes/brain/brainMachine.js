// eslint-disable-next-line no-undef, no-unused-vars
const { createMachine, interpret, assign } = XState;

const brainMachine = createMachine(
  {
    context: {},
    id: 'mainMachine',
    initial: 'home',
    states: {
      home: {
        entry: ['selecthome'],
        on: {
          NEXT: { target: 'stoprotating' },
        },
      },
      stoprotating: {
        entry: ['selectrotate'],
        on: {
          ATZERO: { target: 'lesion' },
        },
      },
      lesion: {
        entry: ['selectbefore'],
        on: {
          REWIND: { target: 'home' },
          NEXT: { target: 'breakoff' },
        },
      },
      breakoff: {
        entry: ['selectbefore'],
        on: {
          REWIND: { target: 'lesion' },
          NEXT: { target: 'travel' },
        },
      },
      travel: {
        entry: ['selectbefore'],
        on: {
          REWIND: { target: 'breakoff' },
          NEXT: { target: 'stroke' },
        },
      },
      stroke: {
        entry: ['selectstroke'],
        on: {
          REWIND: { target: 'travel' },
          NEXT: { target: 'damage' },
          DRUG: { target: 'drug' },
        },
      },
      damage: {
        entry: ['selectend'],
        on: {
          HOME: { target: 'home' },
          REWIND: { target: 'stroke' },
        },
      },
      drug: {
        entry: ['selectbefore'],
        on: {
          REWIND: { target: 'stroke' },
          NEXT: { target: 'recovery' },
        },
      },
      recovery: {
        entry: ['selectend'],
        on: {
          HOME: { target: 'home' },
          REWIND: { target: 'drug' },
        },
      },
    },
  },
  {
    actions: {
      selecthome: assign({
        homebtn: 'block',
        resetbtn: 'none',
        nextbtn: 'block',
        drugbtn: 'none',
        rewindbtn: 'none',
      }),
      selectrotate: assign({
        homebtn: 'block',
        resetbtn: 'none',
        nextbtn: 'none',
        drugbtn: 'none',
        rewindbtn: 'none',
      }),
      selectbefore: assign({
        homebtn: 'block',
        resetbtn: 'none',
        nextbtn: 'block',
        drugbtn: 'none',
        rewindbtn: 'block',
      }),
      selectstroke: assign({
        homebtn: 'block',
        resetbtn: 'none',
        nextbtn: 'block',
        drugbtn: 'block',
        rewindbtn: 'block',
      }),
      selectend: assign({
        homebtn: 'block',
        resetbtn: 'block',
        nextbtn: 'none',
        drugbtn: 'none',
        rewindbtn: 'block',
      }),
    },
  }
);

const brainService = interpret(brainMachine);
brainService.onTransition(state => console.log(state.value));
brainService.start();

export { brainMachine, brainService };
