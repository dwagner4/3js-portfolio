import gsap from 'gsap';

const cameraPanToplaque = target =>
  gsap
    .timeline({
      callbackScope: target,
      // eslint-disable-next-line func-names, object-shorthand
      onStart: function () {
        this.nextbtn.style.display = 'none';
      },
      // eslint-disable-next-line func-names, object-shorthand
      onComplete: function () {
        this.nextbtn.style.display = 'block';
      },
    })
    // .set(target.camera.position, {z: -30, duration: 1})
    .set(target.caption, {
      innerHTML: '',
    })
    .to(target.brain, {
      greyopacity: 0.1,
      duration: 2,
    })
    .to(target.camera.position, {
      x: -10,
      y: -5.5,
      z: -10,
      duration: 5,
    })
    .to(
      target.controls.target,
      {
        x: -2.25,
        y: -8,
        z: 0,
        duration: 5,
      },
      '<'
    )
    .to(
      target.scene.background,
      {
        r: 0.6,
        g: 0.7,
        b: 0.8,
        duration: 5,
      },
      '<'
    )
    .set(target.caption, {
      innerHTML: 'Plaque in the Internal Carotid Artery',
    })
    .to(target.brain, {
      arteryOneOpacity: 0.3,
      duration: 2,
      onCompleteParams: target,
    });

const dobreakoff = target =>
  gsap
    .timeline({
      callbackScope: target,
      // eslint-disable-next-line func-names, object-shorthand
      onStart: function () {
        this.nextbtn.style.display = 'none';
      },
      // eslint-disable-next-line func-names, object-shorthand
      onComplete: function () {
        this.nextbtn.style.display = 'block';
      },
    })
    .set(target.caption, {
      innerHTML: 'the plaque erupts releasing a blood clot!!',
    })
    .to(target.brainClot.model.position, {
      x: -2.1,
      y: -7.5,
      z: -0.3,
      duration: 2,
    })
    .to(target.brainClot.model.position, {
      x: -2.4,
      y: -5.2,
      z: -0.7,
      duration: 5,
    })
    .to(target.brainClot.model.position, {
      x: -1,
      y: -4.1,
      z: -1.1,
      duration: 3,
    })
    .to(
      target.camera.position,
      {
        x: -3,
        y: -10.8,
        z: -13.6,
        duration: 4,
      },
      '<'
    )
    .to(
      target.controls.target,
      {
        x: 0.7,
        y: -7.2,
        z: -1.8,
        duration: 4,
      },
      '<'
    )
    .to(target.brainClot.model.position, {
      x: -1,
      y: -3.5,
      z: -1.0,
      duration: 2,
    })
    .to(target.brainClot.model.position, {
      x: -1.1,
      y: -2.4,
      z: -2.2,
      duration: 3,
    });

const dotravel = target =>
  gsap
    .timeline({
      callbackScope: target,
      // eslint-disable-next-line func-names, object-shorthand
      onStart: function () {
        this.nextbtn.style.display = 'none';
      },
      // eslint-disable-next-line func-names, object-shorthand
      onComplete: function () {
        this.nextbtn.style.display = 'block';
      },
    })
    .set(target.caption, { innerHTML: '' })
    .to(target.brain, {
      arteryOneOpacity: 1.0,
      duration: 1,
    })
    .set(target.brain, {
      aOneTrans: false,
    })
    .to(
      target.brain,
      {
        greyopacity: 1.0,
        duration: 1,
      },
      '<'
    )
    .to(target.camera.position, {
      x: -1.37,
      y: 10.38,
      z: -13.84,
      duration: 5,
    })
    .to(
      target.controls.target,
      {
        x: -2.72,
        y: 0.54,
        z: 0.07,
        duration: 5,
      },
      '<'
    )
    .to(
      target.scene.background,
      {
        r: 0.8,
        g: 0.7,
        b: 0.6,
        duration: 2,
      },
      '<'
    )
    .to(target.brain, {
      greyopacity: 0.0,
      duration: 1,
    })
    .set(target.brain, {
      greyVisible: false,
    })
    .set(target.brain, {
      aTwoTrans: true,
    })
    .to(target.brain, {
      arteryTwoOpacity: 0.3,
      duration: 2,
    })
    .set(target.caption, {
      innerHTML: 'The clot travels up one of the Middle Cerebral Arteries',
    })
    .set(target.brainClot.model.position, {
      x: -2.5,
      y: -2.0,
      z: -2.4,
    })
    .to(target.brainClot.model.position, {
      x: -3.1,
      y: -1.0,
      z: -1.8,
      duration: 3,
    })
    .to(target.brainClot.model.position, {
      x: -3.6,
      y: -0.9,
      z: -1.2,
      duration: 3,
    })
    .to(target.brainClot.model.position, {
      x: -4.2,
      y: -0.4,
      z: -0.9,
      duration: 3,
    })
    .to(target.brainClot.model.position, {
      x: -4.5,
      y: -0.0,
      z: -0.75,
      duration: 3,
    })
    .to(target.brainClot.model.position, {
      x: -4.55,
      y: 0.15,
      z: -0.7,
      duration: 3,
    })
    .to(target.brainClot.model.position, {
      x: -4.5,
      y: 0.35,
      z: -0.75,
      duration: 3,
    })
    .to(target.brainClot.model.position, {
      x: -4.35,
      y: 0.5,
      z: -0.78,
      duration: 3,
    })
    .set(target.caption, { innerHTML: '' })
    .to(target.brain, {
      arteryTwoOpacity: 1.0,
      duration: 2,
    })
    .set(target.brain, {
      aTwoTrans: false,
    })
    .set(target.brain, {
      greyVisible: true,
    })
    .to(target.brain, {
      greyopacity: 1.0,
      duration: 3,
    })
    .to(target.camera.position, {
      x: -18.7,
      y: 2.8,
      z: -5.6,
      duration: 5,
    })
    .to(target.camera.position, {
      x: -12.1,
      y: 1.2,
      z: -1.5,
      duration: 5,
    })
    .to(target.brain, {
      greyopacity: 0.05,
      duration: 3,
    });

const dostroke = target =>
  gsap
    .timeline({
      callbackScope: target,
      // eslint-disable-next-line func-names, object-shorthand
      onStart: function () {
        this.nextbtn.style.display = 'none';
      },
      // eslint-disable-next-line func-names, object-shorthand
      onComplete: function () {
        this.nextbtn.style.display = 'block';
      },
    })
    .set(target.caption, { innerHTML: '' })
    .to(target.brainDamage, {
      mainscale: 0.5,
      duration: 15,
    })
    .set(target.caption, {
      innerHTML: 'local brain tissue is starved for Oxygen',
    });

const dodamage = target =>
  gsap
    .timeline({
      callbackScope: target,
      // eslint-disable-next-line func-names, object-shorthand
      onStart: function () {
        this.nextbtn.style.display = 'none';
      },
      // eslint-disable-next-line func-names, object-shorthand
      onComplete: function () {
        this.nextbtn.style.display = 'block';
      },
    })
    .set(target.caption, { innerHTML: '' })
    .to(target.brainDamage, {
      subscale: 0.5,
      mainscale: 1.0,
      duration: 15,
    })
    .to(
      target.scene.background,
      {
        r: 0.5,
        g: 0.2,
        b: 0.1,
        duration: 5,
      },
      '<'
    )
    .set(target.caption, {
      innerHTML: 'Without treatment, damage becomes permanent',
    })
    .to(target.camera.position, {
      x: -40,
      y: 1.2,
      z: -1.5,
      duration: 5,
    })
    .to(
      target.brain,
      {
        greyopacity: 0.5,
        duration: 5,
      },
      '<'
    );

export { cameraPanToplaque, dobreakoff, dotravel, dostroke, dodamage };
