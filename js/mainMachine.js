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
          ONE: { target: 'one' },
        },
      },
      one: {
        entry: ['selectone'],
        on: {
          HOME: { target: 'home' },
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
