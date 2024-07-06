function codepen() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.08,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
codepen();
function wholePage() {
  let tl = gsap.timeline();

  function cursor() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle, index) {
      circle.x = 0;
      circle.y = 0;
    });

    window.addEventListener("mousemove", function (e) {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length + 0.3;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.2;
        y += (nextCircle.y - y) * 0.2;
      });
      requestAnimationFrame(animateCircles);
    }
    animateCircles();

    //LOADING SCREEN

    document.querySelector("#wrapper").addEventListener("mouseenter", (e) => {
      gsap.to(circles, {
        scale: 0.8,
        backgroundColor: "white",
      });
    });
    document.querySelector("#wrapper").addEventListener("mouseleave", (e) => {
      gsap.to(circles, {
        scale: 0.8,
        backgroundColor: "red",
      });
    });

    //MENU

    document.querySelector("#menu-page").addEventListener("mouseenter", (e) => {
      gsap.to(circles, {
        scale: 0.8,
        backgroundColor: "white",
      });
    });
    document.querySelector("#menu-page").addEventListener("mouseleave", (e) => {
      gsap.to(circles, {
        scale: 0.8,
        backgroundColor: "red",
      });
    });

    //PAGE 2

    document.querySelector("#page2").addEventListener("mouseenter", (e) => {
      gsap.to(circles, {
        scale: 0.8,
        backgroundColor: "white",
      });
    });
    document.querySelector("#page2").addEventListener("mouseleave", (e) => {
      gsap.to(circles, {
        backgroundColor: "red",
        scale: 0.8,
      });
    });

    //EXTRA PAGE

    document
      .querySelector("#extra-page img")
      .addEventListener("mouseenter", (e) => {
        gsap.to(circles, {
          scale: 0.7,
          backgroundColor: "white",
        });
      });
    document
      .querySelector("#extra-page img")
      .addEventListener("mouseleave", (e) => {
        gsap.to(circles, {
          backgroundColor: "red",
        });
      });
  }
  cursor();

  function wrapper() {
    gsap.to("#wrapper video", {
      delay: 10,
      duration: 1.5,
      y: "-200%",
    });
    gsap.to("#wrapper .Loader-container", {
      delay: 8,
      opacity: 0,
      duration: 2,
      y: "-100%",
    });
    gsap.to("#wrapper", {
      delay: 11,
      duration: 0.1,
      display: "none",
    });
  }
  wrapper();

  function navBar() {
    tl.from("#navbar", {
      opacity: 0,
      ease: "expoScale(0.5,7,none)",
      scrollTrigger: {
        trigger: "#landing-page",
        scroller: "#main",
        // markers: true,
        start: "top -40%",
        end: " bottom -38%",
        scrub: 1,
        duration: 1,
        delay: 1,
        stagger: -1,
      },
    }).from(".menu-container", {
      opacity: 0,
      ease: "expoScale(0.5,7,none)",
      scrollTrigger: {
        trigger: "#landing-page",
        scroller: "#main",
        // markers: true,
        start: "top -40%",
        end: " bottom -38%",
        scrub: 1,
      },
    });
  }
  navBar();

  function menu() {
    let flag = 0;
    document.querySelector(".menu-container").addEventListener("click", () => {
      if (flag == 0) {
        gsap.to("#menu-page", {
          transformOrigin: "top",
          height: "100vh",
          backgroundColor: "#f40009",
          duration: 1,
          ease: "power4.inOut",
        });
        gsap.from(".menu-links h2", {
          y: 50,
          bottom: 0,
          delay: 0.8,
          opacity: 0,
          repeat: 0,
          stagger: 0.12,
        });
        gsap.from("#menu-page #sign", {
          opacity: 0,
          y: "40%",
          duration: 0.8,
          delay: 0.8,
        });
        flag = 1;
      } else {
        gsap.to("#menu-page", {
          transformOrigin: "top",
          height: 0,
          backgroundColor: "#050505",
          duration: 1,
          ease: "power1.inOut",
        });
        gsap.to("#menu-page #sign", {
          opacity: 1,
          y: "0%",
          duration: 0.8,
        });
        flag = 0;
      }
    });
  }
  menu();

  function page1() {
    tl.from("#landing-page", {
      height: 0,
      transformOrigin: "center",
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        // markers: true,
        start: "bottom 100%",
        end: "100% 0%",
        pin: true,
        scrub: 1,
      },
    });

    tl.from("#landing-page h2", {
      scale: 10,
      scrollTrigger: {
        trigger: "landing-page",
        scroller: "#main",
        // markers: true,
        start: "bottom 100%",
        end: "100% 0%",
        pin: true,
        scrub: 1,
      },
    });

    tl.from("#landing-page h2", {
      opacity: 1,
      scrollTrigger: {
        trigger: "landing-page h2",
        scroller: "#main",
        // markers: true,
        start: "bottom 30%",
        end: "top 20%",
        pin: true,
        scrub: 3,
      },
    });
    tl.from("#extra-page h1", {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: "#extra-page",
        scroller: "#main",
        // markers: true,
        start: "bottom 100%",
        end: "top -140%",
        scrub: 1,
        pin: true,
      },
    });

    tl.from("#extra-page #can-img", {
      y: 1000,
      scale: 0.3,
      ease: "back.inOut(1)",
      scrollTrigger: {
        trigger: "#extra-page",
        scroller: "#main",
        // markers: true,
        start: "bottom 200%",
        end: "top 0%",
        scrub: 5,
      },
    });
    tl.from("#extra-page #splash-img", {
      scale: 0,
      opacity: 0,
      ease: "back.inOut(2.7)",
      scrollTrigger: {
        trigger: "#extra-page",
        scroller: "#main",
        // markers: true,
        start: "bottom 100%",
        end: "top 0%",
        scrub: 5,
      },
    });

    tl.to("#extra-page , #page2", {
      backgroundColor: "#f40009",
      scrollTrigger: {
        trigger: "#overlay",
        scroller: "#main",
        // markers: "true",
        start: "top 0%",
        end: " 100% 0%",
        stagger: -1,
        delay: 0,
        duration: 0,
        ease: "power4.out",
        scrub: 1,
      },
    }).to("#opening-box1 path", {
      fill: "#f40009",
      scrollTrigger: {
        trigger: "#overlay",
        scroller: "#main",
        // markers: "true",
        start: "top 0%",
        end: " 100% 0%",
        stagger: -1,
        delay: 0,
        duration: 0,
        ease: "power4.out",
        scrub: 1,
      },
    });
  }
  page1();

  function page2() {
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#overlay",
        scroller: "#main",
        start: "top -28%",
        end: "+=150%",
        scrub: 1,
        // markers: true,
        stagger: 5,
        pin: "#page2",
        delay: 2,
      },
    });
    timeline.to("#textVision-hover .line1", {
      width: "100%",
      duration: 10,
    });
    timeline.to("#textVision-hover .line2", {
      width: "100%",
      duration: 10,
    });
    timeline.to("#textVision-hover .line3", {
      width: "100%",
      duration: 10,
    });
    tl.to(".text", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".text",
        scroller: "#main",
        // markers: true,
        start: "top 45%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
  }
  page2();

  function page3() {
    if (window.matchMedia("(max-width: 700px)").matches) {
      tl.to("#mdl-box", {
        y: 600,
        ease: "back.inOut(1.1)",
        scrollTrigger: {
          trigger: "#fst-box",
          scroller: "#main",
          // markers: true,
          start: "bottom 100%",
          end: "top 0%",
          scrub: 5,
        },
      });
      tl.to("#lst-box", {
        y: 1150,
        ease: "back.inOut(1.1)",
        scrollTrigger: {
          trigger: "#fst-box",
          scroller: "#main",
          // markers: true,
          start: "bottom 100%",
          end: "top 0%",
          scrub: 5,
          pin: true,
        },
      });
      tl.from(".img-box h2", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: "#mdl-box",
          scroller: "#main",
          // markers: true,
          start: "bottom 90%",
          end: "top 0%",
          scrub: 1,
          pin: true,
        },
      });

      document
        .querySelector(".images-and-paras #fst-img")
        .addEventListener("click", () => {
          gsap.to("#para-cont1", {
            clipPath: "circle(100% at 50% 50%)",
            duration: 0.8,
          });
        });
      document
        .querySelector(".paras #prev-btn1")
        .addEventListener("click", () => {
          gsap.to("#para-cont1", {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.5,
          });
        });

      document
        .querySelector(".images-and-paras #mdl-img")
        .addEventListener("click", () => {
          gsap.to("#para-cont2", {
            clipPath: "circle(100% at 50% 50%)",
            duration: 0.8,
          });
        });
      document
        .querySelector(".paras #prev-btn2")
        .addEventListener("click", () => {
          gsap.to("#para-cont2", {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.5,
          });
        });

      document
        .querySelector(".images-and-paras #lst-img")
        .addEventListener("click", () => {
          gsap.to("#para-cont3", {
            clipPath: "circle(100% at 50% 50%)",
            duration: 0.8,
          });
        });
      document
        .querySelector(".paras #prev-btn3")
        .addEventListener("click", () => {
          gsap.to("#para-cont3", {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.5,
          });
        });
    } else {
      tl.from("#img-container .img-box", {
        y: 500,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#page3",
          scroller: "#main",
          // markers: true,
          start: "bottom 150%",
          end: "top 0%",
          scrub: 5,
        },
      });
      tl.to("#fst-box", {
        x: -500,
        ease: "back.inOut(2.1)",
        scrollTrigger: {
          trigger: "#page3",
          scroller: "#main",
          // markers: true,
          start: "bottom 115%",
          end: "top 0%",
          scrub: 5,
        },
      });
      tl.to("#lst-box", {
        x: 500,
        ease: "back.inOut(2.1)",
        scrollTrigger: {
          trigger: "#page3",
          scroller: "#main",
          // markers: true,
          start: "bottom 115%",
          end: "top 0%",
          scrub: 5,
          pin: true,
        },
      });
      tl.from(".img-box h2", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: "#page3",
          scroller: "#main",
          // markers: true,
          start: "bottom 115%",
          end: "top 0%",
          scrub: 5,
          pin: true,
        },
      });

      document
        .querySelector(".images-and-paras #fst-img")
        .addEventListener("click", () => {
          gsap.to("#para-cont1", {
            clipPath: "circle(120% at 17% 50%)",
            duration: 0.8,
          });
        });
      document
        .querySelector(".paras #prev-btn1")
        .addEventListener("click", () => {
          gsap.to("#para-cont1", {
            clipPath: "circle(0% at 17% 50%)",
            duration: 0.5,
          });
        });

      document
        .querySelector(".images-and-paras #mdl-img")
        .addEventListener("click", () => {
          gsap.to("#para-cont2", {
            clipPath: "circle(100% at 50% 50%)",
            duration: 0.8,
          });
        });
      document
        .querySelector(".paras #prev-btn2")
        .addEventListener("click", () => {
          gsap.to("#para-cont2", {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.5,
          });
        });

      document
        .querySelector(".images-and-paras #lst-img")
        .addEventListener("click", () => {
          gsap.to("#para-cont3", {
            clipPath: "circle(120% at 83% 50%)",
            duration: 0.8,
          });
        });
      document
        .querySelector(".paras #prev-btn3")
        .addEventListener("click", () => {
          gsap.to("#para-cont3", {
            clipPath: "circle(0% at 83% 50%)",
            duration: 0.5,
          });
        });
    }
  }
  page3();

  function page4() {
    tl.from("#page4 .img-container img", {
      y: 50,
      opacity: 0,
      // stagger: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#page4",
        scroller: "#main",
        // markers: true,
        start: "bottom 120%",
        end: "top 30%",
        scrub: 4,
      },
    });
    tl.from("#page4 #underline", {
      width: 0,
      delay: 0.5,
      duration: 7.5,
      scrollTrigger: {
        trigger: "#page4",
        scroller: "#main",
        // markers: true,
        start: "top 120%",
        scrub: 1,
      },
    });
  }
  page4();

  function page5() {
    let swiper = new Swiper(".mySwiper", {
      loop: true,
      speed: 1000,
      spaceBetween: 0,
      grabCursor: true,

      direction: "vertical",
      parallax: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      pagination: {
        el: ".swiper-scrollbar",
        type: "scroller",
      },
      navigation: {
        nextEl: ".arrow-back",
        prevEl: ".arrow-next",
      },
    });
  }
  page5();

  function page6() {
    tl.from("#page6 #underline", {
      width: 0,
      delay: 0.5,
      duration: 7.5,
      scrollTrigger: {
        trigger: "#page6",
        scroller: "#main",
        // markers: true,
        start: "top 120%",
        scrub: 1,
      },
    });
  }
  page6();

  function footer() {
    tl.to("#page6", {
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: "#footer",
        scroller: "#main",
        // markers: true,
        start: "bottom 140%",
        end: "top 0%",
        scrub: 1,
      },
    });
    tl.from("#footer #heading #brand-img", {
      y: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#page6",
        scroller: "#main",
        // markers: true,
        start: "bottom 50%",
        end: "top 0%",
        scrub: 3,
      },
    });
  }
  footer();
}
wholePage();

window.addEventListener("resize", () => {
  location.reload();
});
document.querySelector(".nav-items #logo").addEventListener("click", () => {
  location.reload();
});
