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
          THRILL: { target: 'thrill' },
          KNIGHT: { target: 'knight' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      brain: {
        entry: ['selecthome'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          THRILL: { target: 'thrill' },
          KNIGHT: { target: 'knight' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      term: {
        entry: ['selecthome'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          THRILL: { target: 'thrill' },
          KNIGHT: { target: 'knight' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      thrill: {
        entry: ['selectthrill'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          THRILL: { target: 'thrill' },
          KNIGHT: { target: 'knight' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      knight: {
        entry: ['selecthome'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          THRILL: { target: 'thrill' },
          KNIGHT: { target: 'knight' },
          BIRDS: { target: 'birds' },
          BRAIN: { target: 'brain' },
        },
      },
      birds: {
        entry: ['selecthome'],
        on: {
          HOME: { target: 'home' },
          TERM: { target: 'term' },
          THRILL: { target: 'thrill' },
          KNIGHT: { target: 'knight' },
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
        brainbtn: 'block',
        termbtn: 'block',
        thrillbtn: 'block',
        knightbtn: 'block',
        birdsbtn: 'block',
        bubblesbtn: 'block',
        aboutbtn: 'block',
        dancebtn: 'none',
      }),
      selectthrill: assign({
        homebtn: 'none',
        brainbtn: 'none',
        termbtn: 'none',
        thrillbtn: 'none',
        knightbtn: 'none',
        birdsbtn: 'none',
        bubblesbtn: 'none',
        aboutbtn: 'none',
        dancebtn: 'block',
      }),
    },
  }
);

const mainService = interpret(mainMachine);
mainService.onTransition(state => console.log(state));
mainService.start();

export { mainMachine, mainService };
