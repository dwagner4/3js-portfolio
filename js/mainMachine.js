// eslint-disable-next-line no-undef
const { createMachine, interpret, assign } = XState;

const mainMachine = createMachine(
  {
    context: {},
    id: 'mainMachine',
    initial: 'home',
    states: {
      home: {
        entry: ['selecthome'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      brain: {
        entry: ['selectone'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      term: {
        entry: ['selectone'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      birds: {
        entry: ['selectone'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
    },
  },
  {
    actions: {
      selecthome: assign({
        homebtn: 'block',
        menubtn: 'block',
        aboutbtn: 'block',
      }),
      selectone: assign({
        homebtn: 'block',
        menubtn: 'none',
        aboutbtn: 'none',
      }),
    },
  }
);

const mainService = interpret(mainMachine);
mainService.onTransition(state => console.log(state));
mainService.start();

export { mainMachine, mainService };
