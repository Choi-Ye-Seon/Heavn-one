// Lenis ScrollSmooth
const lenis = new Lenis({
  autoRaf: true
});

lenis.on('scroll', ScrollTrigger.update);



$(document).ready(function () {

  // 1. Intro
  gsap.set('.intro ', {autoAlpha: 1});
  gsap.set('.intro > div', {autoAlpha: 0});

  const intro = gsap.timeline({
    onStart: function () {
      $('html').addClass('fixed');
    }
  });

  intro
  .to('.intro > div', 1, {autoAlpha: 1, delay: 0.5,})
  .to('.intro > div', {autoAlpha: 0})
  .to('.intro', {
    autoAlpha: 0,
    onComplete: function () {
      $('html').removeClass('fixed');
    }
  });



  // 2. header / order btn 모션
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

  // header lightMode 함수 선언
  function lightMode(){
    const light = gsap.timeline({
      defaults:{
        duration:0.1
      }
    });
    light
    .to("#header .logo img",{filter:"invert(0%)"},"light")
    .to("#header .link-order",{backgroundColor:"rgba(255,255,255,0.1)"},"light")
    .to("#header .link-order .text",{color:"rgb(255,255,255)"},"light");
  }

  // header darkMode 함수 선언
  function darkMode(){
    const dark = gsap.timeline({
      defaults:{
        duration:0.1
      }
    });
    dark
    .to("#header .logo img",{filter:"invert(100%)"},"dark")
    .to("#header .link-order",{backgroundColor:"rgba(0, 0, 0, 0.1)"},"dark")
    .to("#header .link-order .text",{color:"rgb(24,24,26)"},"dark");
  }

// header darkMode/lightMode 실행
ScrollTrigger.create({
      trigger:".sc-about .about-hero",
      start:"98% 5%",
      endTrigger:".sc-story .story-headline",
      end:"100% 5%",
      // markers:true,
      onEnter:function(){
        darkMode();
      },
      onLeaveBack:function(){
        lightMode();
      }
});

ScrollTrigger.create({
  trigger:".sc-story .story-list",
  start:"0% 5%",
  endTrigger:".sc-detail",
  end:"100% 5%",
  // markers:true,
  onEnter:function(){
    gsap.to("#header .logo img",{filter : "invert(0%)"});
  },
  onLeaveBack:function(){
    // lightMode();
    gsap.to("#header .logo img",{filter : "invert(100%)"});
  }
});

ScrollTrigger.create({
    trigger: '.sc-story .story-item:nth-child(3)',
    start: '0% 5%',
    endTrigger: '.sc-feature',
    end: '100% 5%',
    scrub: 1,
    // markers:true,
    onEnter:function(){
      lightMode();
    },
    onLeaveBack:function(){
      // lightMode();
      gsap.to("#header .logo img",{filter : "invert(0%)"});
      gsap.to("#header .link-order",{backgroundColor:"rgba(0, 0, 0, 0.1)"},"dark");
      gsap.to("#header .link-order .text",{color:"rgb(24,24,26)"},"dark");
    }
});

 ScrollTrigger.create({
  trigger: '.sc-guarantee',
  start: '0% 5%',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter:function(){
    darkMode();
  },
  onLeaveBack:function(){
    lightMode();
  }
});

ScrollTrigger.create({
  trigger: '.sc-interview .img-box',
  start: '0% 5%',
  end: '100% 5%',
  scrub: 1,
  // markers:true,
  onEnter:function(){
    lightMode();
  },
  onLeaveBack:function(){
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
  onEnter:function(){
    darkMode();
  },
  onLeaveBack:function(){
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
  onEnter:function(){
    lightMode();
  },
  onLeaveBack:function(){
    darkMode();
  }
 });
// // header darkMode/lightMode 실행



// 3. sc-about
// 3-1) about hero-caption logo split
const aboutText = new SplitType('.sc-about .caption-title .caption', {types: 'words, chars'});

// 3-1) about hero-caption 모션
const about = gsap.timeline({
  paused: true
});
about
.to('.sc-about .hero-caption.first .caption.logo .char', {yPercent: -100, stagger: 0.1})
.to('.sc-about .hero-caption.first .caption:last-child .char', {yPercent: -100, stagger: 0.1}, '-=0.5')
.to('.sc-about .hero-caption .caption-para p .line', {yPercent: -100, stagger: 0.1});


// 3-2) about hero-caption.second 모션
gsap.set('.sc-about .hero-caption.second', {autoAlpha: 0});
gsap.set('.sc-about .hero-bg img', {yPercent:0});

const aboutScroll = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-about .about-hero',
    start: '0% 0%',
    end: '100% 100%',
    scrub: 1,
    // markers:true
  }
});

aboutScroll
.to('.sc-about .hero-caption.first', { autoAlpha: 0, duration: 1 }, 'a')
.to('.sc-about .hero-bg img', { scale: 1.3, duration: 2 }, 'a') 
.to('.sc-about .hero-caption.second', { autoAlpha: 1, duration: 1 }, 'a+=0.7');

// 3-3) about hero img 모션
gsap.to(".sc-about .hero-bg img",{
  yPercent:10,
  scrollTrigger:{
    trigger:".sc-about .about-hero",
    start: '100% 100%',
    end: '100% 50%',
    scrub: 1,
  }
});

// intro 모션이 종료되면 about애니메이션 시작
intro.eventCallback('onComplete', function () {
  about.play();
});


// 3-4) about yellow motion
gsap.to('.sc-about .motion-circle', {
  backgroundColor: 'rgb(249, 197, 24)',
  scrollTrigger: {
    trigger: '.sc-about .about-comment',
    start: '0% 50%',
    end: '0% 10%',
    scrub: 1
    // markers:true
  }
});

const yellowBg = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-about .about-comment',
    start: '0% 30%',
    end: '100% 100%',
    scrub: 0,
    // markers:true
  }
});

gsap.set(".sc-about .para-box-xl .line.flex .thumb img",{yPercent:-10});

gsap.to('.sc-about .para-box-xl .line.flex .thumb img', {yPercent: -7,
  scrollTrigger:{
    trigger:".sc-about .about-comment",
    start:"0% 50%",
    end:"20% 50%",
    scrub:1,
    // markers:true
  }
});

yellowBg
.to('.sc-about .motion-circle', {filter: 'blur(0px)', scale: 1})
.to('.sc-about .motion-circle', {opacity: 0, duration: 0})
.to('.sc-story .clock', {opacity: 1, duration: 0});


// 4. story 
// 4-1) story / clock
const clock = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-story',
    start: '0% 80%',
    endTrigger: '.story-item:nth-child(1)',
    end: '100% 100%',
    scrub: 1
    // markers:true
  }
});
clock
.to('.sc-story .clock-classic', {backgroundColor: 'rgb(246, 228, 177)'}, 'circle')
.to('.sc-story .clock-wrap', {y: '22.4rem'}, 'circle')
.to('.sc-story .clock-digital', {opacity: 1});


// 4-2) story / digital
gsap.set('.sc-story .clock-number-1', { yPercent: 0 });

gsap.fromTo('.sc-story .clock-number-1',{
  yPercent: -33.3,
}, {
  yPercent: -66.3,
  scrollTrigger: {
    trigger: '.sc-story .story-item:nth-child(3)',
    start: '0% 16%',
    end: '0% 16%',
    scrub: 1, 
    // markers:true
  }
});

gsap.fromTo('.sc-story .clock-number-1',{
  yPercent: 0,
}, {
  yPercent: -33.3,
  scrollTrigger: {
    trigger: '.sc-story .story-item:first-child',
    start: '23% 0%',
    end: '100% 100%',
    scrub: 1, 
    // markers:true
  }
});

gsap.to('.sc-story .clock-number-2', {
  yPercent: -94,
  scrollTrigger: {
    trigger: '.sc-story .story-list',
    start: '0% 0%',
    end: '90% 50%',
    scrub: 0,
    // markers:true
  }
});


// 4-3) story / sun
gsap.to('.sc-story .sun', {
  y: 0,
  scrollTrigger: {
    trigger: '.sc-story .story-item:first-child',
    start: '0% 12%',
    end: '100% 10%',
    scrub: 1,
    // markers: true
  }
});

// 4-3) story / night
const nightTime = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-story .story-item:nth-child(3)',
    start: '0% 16%',
    end: '50% 16%',
    scrub: 1,
    // markers:true
  }
});

nightTime
  .to('.sc-story .story-item', {backgroundColor: 'rgb(33,33,33)'}, '<')
  .to('.sc-story .clock-classic', {backgroundColor: 'rgb(245,245,245)'}, '<')
  .to('.sc-story .story-item .schedule h3', {color: 'rgb(224,224,224)'}, '<')
  .to('.sc-story .story-item .schedule .desc', {color: 'rgb(224,224,224)'}, '<')
  .to('.sc-story .clock-digital .clock-text', {color: 'rgb(224,224,224)'}, '<')
  .to('.sc-story .sun', {yPercent: 100}, '<');
});

const orderBtn02 = gsap.timeline({
  defaults: {
    duration: 0.2
  },
  paused: true
});

orderBtn02
.to('.sc-story .text.top', {yPercent: -100}, '<')
.to('.sc-story .text.bottom', {y: 0}, '<');

$('.sc-story .link-order').hover(
  function () {
    orderBtn02.play();
  },
  function () {
    orderBtn02.reverse();
  }
);



// 5. feature lottie
var animation1 = bodymovin.loadAnimation({
  container: $('.sc-feature .feature-layer-1 .content')[0], 
  path: './assets/data/data.json', 
  renderer: 'svg', 
  loop: false, 
  autoplay: false 
});

ScrollTrigger.create({
  trigger: '.sc-feature', 
  start: '5% 0%', 
  end: '100% 100%', 
  scrub: 1, 
  // markers: true, 
  onUpdate: (self) => {
    const progress = self.progress; 
    const totalFrames = animation1.totalFrames; 
    animation1.goToAndStop(progress * totalFrames, true); // 스크롤 진행에 따라 프레임 이동
  },
  onLeave: () => {
    // 마지막 프레임 고정
    animation1.goToAndStop(animation1.totalFrames - 1, true); 
  }
});


// 5-1) feature-text gsap
const feature = gsap.timeline({
 scrollTrigger:{
  trigger:".sc-feature",
  start:"5% 0%",
  end: '100% 100%', 
  scrub: 1, 
  // markers: true,
 }
});

gsap.set(".sc-feature .feature-text",{autoAlpha:0});

feature
.to(".sc-feature .feature-text:nth-child(1)",{autoAlpha:1})
.to(".sc-feature .feature-text:nth-child(1)",{autoAlpha:0})
.to(".sc-feature .feature-text:nth-child(2)",{autoAlpha:1})
.to(".sc-feature .feature-text:nth-child(2)",{autoAlpha:0})
.to(".sc-feature .feature-text:nth-child(3)",{autoAlpha:1})
.to(".sc-feature .feature-text:nth-child(3)",{autoAlpha:0})
.to(".sc-feature .feature-text:nth-child(4)",{autoAlpha:1})
.to(".sc-feature .feature-text:nth-child(4)",{autoAlpha:0});



// 6. guarantee-info order btn모션
  const orderBtn03 = gsap.timeline({
    defaults: {
      duration: 0.2
    },
    paused: true
  });

 orderBtn03
 .to('.sc-guarantee .text.top', {yPercent: -100}, '<')
 .to('.sc-guarantee .text.bottom', {y: 0}, '<');

  $('.sc-guarantee .link-order').hover(
    function () {
      orderBtn03.play();
    },
    function () {
      orderBtn03.reverse();
    }
  );

  
  // 7. interview
  // 7-1) interview img 모션
  gsap.fromTo(".sc-interview .img-box img",{
    yPercent:-10
  },{
    yPercent:10,
    scrollTrigger:{
      trigger:".sc-interview",
      start:"0% 100%",
      end:"100% 100%",
      scrub:1,
      // markers:true,
    }
  }
);

  // 7-2) interview text 모션
  const interviewText = new SplitType('.sc-interview .split-lines .line', { types: 'words' });

const lineMask = gsap.timeline({
  scrollTrigger:{
    trigger:".sc-interview .interview-box",
    start:"0% 50%",
      end:"100% 60%",
      scrub:1,
      // markers:true,
  }
});
lineMask
.to(".sc-interview .split-lines .line:nth-child(1) .line-mask",{width:"0"})
.to(".sc-interview .interviewer",{opacity:1},"<")
.to(".sc-interview .split-lines .line:nth-child(2) .line-mask",{width:"0"})
.to(".sc-interview .split-lines .line:nth-child(3) .line-mask",{width:"0"});


// 8. detail 모션
gsap.set(".sc-detail .skizze-1 .skizze-text, .sc-detail .skizze-1 .skizze-tab",{opacity:0});
gsap.set(".skizze-6",{autoAlpha:0});

// gsap.set(".skizze-6 .skizze-text, .skizze-6 .skizze-tab",{opacity:0});

const detail = gsap.timeline({
  scrollTrigger:{
    trigger:".sc-detail",
    start:"0% 0%",
    end:"100% 100%",
    scrub:1,
    // markers:true
  },
});


detail
  .to([".skizze-2", ".skizze-3", ".skizze-5"], { rotate: -90,
    onComplete:function(){
      gsap.set('.sc-detail img.skizze-2',{autoAlpha:0});
    },
    
  }, "a")
  .to(".sc-detail .skizze-1 .skizze-text", { opacity: 1}, "a")

  .to([".skizze-2", ".skizze-3", ".skizze-5"], { rotate: -180,
    onComplete:function(){
      gsap.set(".sc-detail .skizze-1",{"z-index":6});
    },
    onReverseComplete:function(){
      gsap.set('.sc-detail img.skizze-2',{autoAlpha:1});
      gsap.set(".sc-detail .skizze-1",{"z-index":1});
    },

  }, "b")
  .to(".sc-detail .skizze-1 .skizze-tab", { opacity: 1}, "b");
  

//reversecomplete를 -180에서 되돌아갈 때 써야함. -90에서 한번에 쓰면 skkize가 초기 상태로 돌아갔을 때 실행되는 것임


  // .to([".skizze-2", ".skizze-3", ".skizze-5"], { rotate: -180 }, "a")
  // .to(".skizze-1 .skizze-text", { opacity: 1,
  //   onComplete:function(){
  //     gsap.to(".skizze-6 .skizze-text",{opacity:1});
  //     gsap.to(".skizze-1 .skizze-text",{opacity:0});
  //   },
  //   onReverseComplete:function(){
  //     gsap.to(".skizze-6 .skizze-text",{opacity:0});
  //     gsap.to(".skizze-1 .skizze-text",{opacity:1});
  //   }
  //  }, "a")
  // .to(".skizze-1 .skizze-tab",{opacity:1,
  //   onComplete:function(){
  //     gsap.to(".skizze-6 .skizze-tab",{opacity:1});
  //     gsap.to(".skizze-1 .skizze-tab",{opacity:0});
  //   },
  //   onReverseComplete:function(){
  //     gsap.to(".skizze-6 .skizze-tab",{opacity:0});
  //     gsap.to(".skizze-1 .skizze-tab",{opacity:1});
  //   }
  // })  ;

// 텍스트 노출될 때, skizze-1 .skizze-text 영역이 가려짐. 
// skizze-6 .skizze-text의 z-index가 높아서 노출되어야 함.
// skizze-1 .skizze-text이 opacity:1이 되었을 때 노출되어야 swap.png 이미지보다 위에 노출되지 않음...
// 전체적으로 스크립트 확인해야함..


//  detail orderBtn
const orderBtn04 = gsap.timeline({
  defaults: {
    duration: 0.2
  },
  paused: true
});

gsap.set(".sc-detail .text.bottom",{yPercent:100})
orderBtn04
.to('.sc-detail .text.top', {yPercent: -100}, '<')
.to('.sc-detail .text.bottom', {yPercent: 0}, '<');

$('.sc-detail .link-catalog').hover(
  function () {
    orderBtn04.play();
  },
  function () {
    orderBtn04.reverse();
  }
);


// 9. order img
gsap.fromTo(".sc-order .img-box img",{yPercent:-10},
  {yPercent:10,
  scrollTrigger:{
    trigger:".sc-detail",
    start:"90% 70%",
    endTrigger:".sc-order",
    end:"100% 100%",
    scrub:1,
    // markers:true,
  }
});

// 9-1) order btn
const orderBtn05 = gsap.timeline({
  defaults: {
    duration: 0.2
  },
  paused: true
});

orderBtn05
.to('.sc-order .text.top', {yPercent: -100}, '<')
.to('.sc-order .text.bottom', {y: 0}, '<');

$('.sc-order .link-order').hover(
  function () {
    orderBtn05.play();
  },
  function () {
    orderBtn05.reverse();
  }
);


// footer thisYear
const thisYear = document.querySelector('#thisYear');
thisYear.textContent = new Date().getFullYear();
