// Lenis ScrollSmooth
const lenis = new Lenis({
  autoRaf: true
});

lenis.on('scroll', ScrollTrigger.update);

lenis.stop();

// 1. header / order btn 모션
const orderBtn = gsap.timeline({
  defaults: {duration: 0.2},
  paused: true
});

orderBtn
  .to('#header .text.top', {yPercent: -100}, '<')
  .to('#header .text.bottom', {y: 0}, '<');

$('#header .link-order').hover(
  function () {
    orderBtn.play();
  },
  function () {
    orderBtn.reverse();
  }
);

// 2. header lightMode 함수 선언
function lightMode() {
  const light = gsap.timeline({
    defaults: {
      duration: 0.1
    }
  });
  light
    .to('#header .logo img', {filter: 'invert(0%)'}, 'light')
    .to(
      '#header .link-order',
      {backgroundColor: 'rgba(255,255,255,0.1)'},
      'light'
    )
    .to('#header .link-order .text', {color: 'rgb(255,255,255)'}, 'light');
}

// 2-2) header darkMode 함수 선언
function darkMode() {
  const dark = gsap.timeline({
    defaults: {
      duration: 0.1
    }
  });
  dark
    .to('#header .logo img', {filter: 'invert(100%)'}, 'dark')
    .to('#header .link-order', {backgroundColor: 'rgba(0, 0, 0, 0.1)'}, 'dark')
    .to('#header .link-order .text', {color: 'rgb(24,24,26)'}, 'dark');
}

// header darkMode/lightMode 실행
ScrollTrigger.create({
  trigger: '.sc-about .about-hero',
  start: '98% 5%',
  endTrigger: '.sc-story .story-headline',
  end: '100% 5%',
  // markers:true,
  onEnter: function () {
    darkMode();
  },
  onLeaveBack: function () {
    lightMode();
  }
});

ScrollTrigger.create({
  trigger: '.sc-story .story-list',
  start: '0% 5%',
  endTrigger: '.sc-detail',
  end: '100% 5%',
  // markers:true,
  onEnter: function () {
    gsap.to('#header .logo img', {filter: 'invert(0%)'});
  },
  onLeaveBack: function () {
    gsap.to('#header .logo img', {filter: 'invert(100%)'});
  }
});

ScrollTrigger.create({
  trigger: '.sc-story .story-item:nth-child(3)',
  start: '0% 5%',
  endTrigger: '.sc-feature',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter: function () {
    lightMode();
  },
  onLeaveBack: function () {
    gsap.to('#header .logo img', {filter: 'invert(0%)'});
    gsap.to(
      '#header .link-order',
      {backgroundColor: 'rgba(0, 0, 0, 0.1)'},
      'dark'
    );
    gsap.to('#header .link-order .text', {color: 'rgb(24,24,26)'}, 'dark');
  }
});

ScrollTrigger.create({
  trigger: '.sc-guarantee',
  start: '0% 5%',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter: function () {
    darkMode();
  },
  onLeaveBack: function () {
    lightMode();
  }
});

ScrollTrigger.create({
  trigger: '.sc-interview .img-box',
  start: '0% 5%',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter: function () {
    lightMode();
  },
  onLeaveBack: function () {
    darkMode();
  }
});

ScrollTrigger.create({
  trigger: '.sc-interview .interview-box',
  start: '0% 5%',
  endtrigger: '.sc-detail',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter: function () {
    darkMode();
  },
  onLeaveBack: function () {
    lightMode();
  }
});

ScrollTrigger.create({
  trigger: '.sc-order .img-box',
  start: '0% 5%',
  endtrigger: '#footer',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter: function () {
    lightMode();
  },
  onLeaveBack: function () {
    darkMode();
  }
});

// footer thisYear
const thisYear = document.querySelector('#thisYear');
thisYear.textContent = new Date().getFullYear();
