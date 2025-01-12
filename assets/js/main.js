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
    .to('.intro > div', 1, {autoAlpha: 1, delay: 0.5})
    .to('.intro > div', {autoAlpha: 0})
    .to('.intro', {
      autoAlpha: 0,
      onComplete: function () {
        $('html').removeClass('fixed');
        lenis.start();
      }
    });


  // 2. sc-about
  // 2-1) about hero-caption split
  const targetEls = document.querySelectorAll(
    '.sc-about .caption-title .caption'
  );

  targetEls.forEach(function (target) {
    const char = target.textContent.split('');
    const wrappedText = char
      .map(function (char) {
        return `<span class="char">${char}</span>`;
      })
      .join('');

    const wrappedWord = `<span class="word">${wrappedText}</span>`;
    target.innerHTML = wrappedWord;
  });


  // 2-2) about hero-caption 모션
  const about = gsap.timeline({
    paused: true
  });
  
  gsap.set('.sc-about .hero-caption.first .caption .char', {yPercent: 100});

  about
    .to('.sc-about .hero-caption.first .caption.logo .char', {
      yPercent: 0,
      stagger: 0.1
    })
    .to(
      '.sc-about .hero-caption.first .caption:last-child .char',
      {
        yPercent: 0,
        stagger: 0.1
      },
      '-=0.5'
    )
    .to('.sc-about .hero-caption .caption-para p .line', {
      yPercent: -100,
      stagger: 0.1
    });


  // 2-2) about hero-caption.second 모션
  gsap.set('.sc-about .hero-caption.second', {autoAlpha: 0});
  gsap.set('.sc-about .hero-bg img', {yPercent: 0});

  const aboutScroll = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-about .about-hero',
      start: '0% 0%',
      end: '100% 100%',
      scrub: 1
      // markers:true
    }
  });

  aboutScroll
    .to('.sc-about .hero-caption.first', {autoAlpha: 0, duration: 1}, 'a')
    .to('.sc-about .hero-bg img', {scale: 1.3, duration: 2}, 'a')
    .to(
      '.sc-about .hero-caption.second',
      {autoAlpha: 1, duration: 1},
      'a+=0.7'
    );


  // 2-3) about hero img 모션
  gsap.to('.sc-about .hero-bg img', {
    yPercent: 10,
    scrollTrigger: {
      trigger: '.sc-about .about-hero',
      start: '100% 100%',
      end: '100% 50%',
      scrub: 1
    }
  });


  // intro 모션이 종료 후, about 애니메이션 시작
  intro.eventCallback('onComplete', function () {
    about.play();
  });


  // 2-4) about yellow motion
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
      scrub: 0
      // markers:true
    }
  });

  gsap.set('.sc-about .para-box-xl .line.flex .thumb img', {yPercent: -10});

  gsap.to('.sc-about .para-box-xl .line.flex .thumb img', {
    yPercent: -7,
    scrollTrigger: {
      trigger: '.sc-about .about-comment',
      start: '0% 50%',
      end: '20% 50%',
      scrub: 1
      // markers:true
    }
  });

  yellowBg
    .to('.sc-about .motion-circle', {filter: 'blur(0px)', scale: 1})
    .to('.sc-about .motion-circle', {opacity: 0, duration: 0})
    .to('.sc-story .clock', {opacity: 1, duration: 0});


  // 3. story
  // 3-1) story / clock
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
    .to('.sc-story .clock-classic', {backgroundColor: 'rgb(246, 228, 177)'},'circle')
    .to('.sc-story .clock-wrap', {y: '22.4rem'}, 'circle')
    .to('.sc-story .clock-digital', {opacity: 1});


  // 3-2) story / digital
  gsap.set('.sc-story .clock-number-1', {yPercent: 0});

  gsap.fromTo('.sc-story .clock-number-1', {
    yPercent: -33.3
  },
    {
      yPercent: -66.3,
      scrollTrigger: {
        trigger: '.sc-story .story-item:nth-child(3)',
        start: '0% 16%',
        end: '0% 16%',
        scrub: 1
        // markers:true
      }
    }
  );

  gsap.fromTo('.sc-story .clock-number-1',
    {
      yPercent: 0
    },
    {
      yPercent: -33.3,
      scrollTrigger: {
        trigger: '.sc-story .story-item:first-child',
        start: '23% 0%',
        end: '100% 100%',
        scrub: 1
        // markers:true
      }
    }
  );

  gsap.to('.sc-story .clock-number-2', {
    yPercent: -94,
    scrollTrigger: {
      trigger: '.sc-story .story-list',
      start: '0% 0%',
      end: '90% 50%',
      scrub: 0
      // markers:true
    }
  });

  // 3-3) story / sun
  gsap.to('.sc-story .sun', {
    y: 0,
    scrollTrigger: {
      trigger: '.sc-story .story-item:first-child',
      start: '0% 12%',
      end: '100% 10%',
      scrub: 1
      // markers: true
    }
  });

  // 3-4) story / night
  const nightTime = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-story .story-item:nth-child(3)',
      start: '0% 16%',
      end: '50% 16%',
      scrub: 1
      // markers:true
    }
  });

  nightTime
    .to('.sc-story .story-item', {backgroundColor: 'rgb(33,33,33)'}, '<')
    .to('.sc-story .clock-classic', {backgroundColor: 'rgb(245,245,245)'}, '<')
    .to('.sc-story .story-item .schedule h3', {color: 'rgb(224,224,224)'}, '<')
    .to('.sc-story .story-item .schedule .desc', {color: 'rgb(224,224,224)'},'<')
    .to('.sc-story .clock-digital .clock-text', {color: 'rgb(224,224,224)'},'<')
    .to('.sc-story .sun', {yPercent: 100}, '<');
});

// 3-5) orderBtn 
const orderBtn02 = gsap.timeline({
  defaults: {duration: 0.2},
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



// 4. feature lottie
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
    animation1.goToAndStop(progress * totalFrames, true); 
  },
  onLeave: () => {
    // 마지막 프레임 고정
    animation1.goToAndStop(animation1.totalFrames - 1, true);
  }
});


// 4-1) feature-text
const feature = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-feature',
    start: '5% 0%',
    end: '100% 100%',
    scrub: 1
    // markers: true,
  }
});

gsap.set('.sc-feature .feature-text', {autoAlpha: 0});

feature
  .to('.sc-feature .feature-text:nth-child(1)', {autoAlpha: 1})
  .to('.sc-feature .feature-text:nth-child(1)', {autoAlpha: 0})
  .to('.sc-feature .feature-text:nth-child(2)', {autoAlpha: 1})
  .to('.sc-feature .feature-text:nth-child(2)', {autoAlpha: 0})
  .to('.sc-feature .feature-text:nth-child(3)', {autoAlpha: 1})
  .to('.sc-feature .feature-text:nth-child(3)', {autoAlpha: 0})
  .to('.sc-feature .feature-text:nth-child(4)', {autoAlpha: 1})
  .to('.sc-feature .feature-text:nth-child(4)', {autoAlpha: 0});


// 5. guarantee-info orderBtn
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


// 6. interview
// 6-1) interview img 모션
gsap.fromTo('.sc-interview .img-box img',
  {
    yPercent: -10
  },
  {
    yPercent: 10,
    scrollTrigger: {
      trigger: '.sc-interview',
      start: '0% 100%',
      end: '100% 100%',
      scrub: 1
      // markers:true,
    }
  }
);

// 6-2) interview text 모션
const targetLines = document.querySelectorAll(".sc-interview .split-lines .line");

targetLines.forEach(function(targetline){
  const splitWord = targetline.textContent.trim().split(/\s+/).filter(word => word !== '');
  const wordWrap =  splitWord.map(function(word){
    return `<span class="word">${word}</span>`
  })
  .join(' ');

  const lineMaskEl = targetline.querySelector(".line-mask");
  if(lineMaskEl){
    targetline.innerHTML = wordWrap + lineMaskEl.outerHTML;
  }else{
    targetline.innerHTML = wordWrap;
  }
});

const lineMask = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-interview .interview-box',
    start: '0% 50%',
    end: '100% 60%',
    scrub: 1
    // markers:true,
  }
});
lineMask
  .to('.sc-interview .split-lines .line:nth-child(1) .line-mask', {width: '0'})
  .to('.sc-interview .interviewer', {opacity: 1}, '<')
  .to('.sc-interview .split-lines .line:nth-child(2) .line-mask', {width: '0'})
  .to('.sc-interview .split-lines .line:nth-child(3) .line-mask', {width: '0'});



// 7. detail 모션
gsap.set('.skizze-1 .skizze-text, .skizze-1 .skizze-tab', {opacity: 0});
gsap.set('.skizze-6 .skizze-text, .skizze-6 .skizze-tab', {opacity: 0});

const detail = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-detail',
    start: '0% 0%',
    end: '100% 100%',
    scrub: 1
    // markers:true
  }
});

detail
  // 90도
  .to(['.skizze-2', '.skizze-3', '.skizze-5'], {
      rotate: -90,
      onComplete: function () {
        gsap.set('.sc-detail img.skizze-2', {autoAlpha: 0});
        gsap.set('.skizze-6 .skizze-text', {opacity: 1});
      }
    },'a')
  .to('.sc-detail .skizze-1 .skizze-text',{
      opacity: 1,
      onComplete: function () {
        gsap.set('.skizze-1 .skizze-text', {opacity: 0});
      }
    },'a')

  //180도
  .to(['.skizze-2', '.skizze-3', '.skizze-5'], {
      rotate: -180,
      onComplete: function () {
        gsap.set('.skizze-6 .skizze-tab', {opacity: 1});
      },
      onReverseComplete: function () {
        gsap.set('.sc-detail img.skizze-2', {autoAlpha: 1});
        gsap.set('.skizze-6 .skizze-text', {opacity: 0});
      }
    },'b')
  .to('.sc-detail .skizze-1 .skizze-tab', {
      opacity: 1,
      onComplete: function () {
        gsap.set('.skizze-1 .skizze-tab', {opacity: 0});
      }
    },'b');

detail.add(function () {
  gsap.set('.skizze-6 .skizze-tab', {opacity: 0});
}, '-=0.001');


// 7-1) detail orderBtn
const orderBtn04 = gsap.timeline({
  defaults: {
    duration: 0.2
  },
  paused: true
});

gsap.set('.sc-detail .text.bottom', {yPercent: 100});
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


// 8. order img
gsap.fromTo(
  '.sc-order .img-box img',
  {yPercent: -10},
  {
    yPercent: 10,
    scrollTrigger: {
      trigger: '.sc-detail',
      start: '90% 70%',
      endTrigger: '.sc-order',
      end: '100% 100%',
      scrub: 1
      // markers:true,
    }
  }
);

// 8-1) order btn
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

