
const returnAppear = (trigger, duration, direction) => {

  const properties = (x, y) => [
        {
          x:x,
          y:y,
          opacity: 0
        },
        {
          duration: duration, 
          x: 0,
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: trigger,
            start: '-500px',
            end:'+=200px',
            delay: 1,
            scrub: 1,
            anticipatePin: 1,
          }
        }
      ]

  if(direction == "bottom") {
      return properties(0, 100)  
  }
  if(direction == "top") {
      return properties(0, -100)  
  }
  if(direction == "left") {
      return properties(-100, 0)  
  }
  if(direction == "default") {
      return properties(0, 0)  
  }
}

const defaultAppear = [
        {
          opacity: 0,
        },
        {
          duration: 1, 
          opacity: 1,
        }
      ]


//initial
gsap.fromTo(".hero .title", 
  {
    opacity: 0,
    y: 50
  },
  {
    duration:1,
    opacity: 1,
    y: 0
  }
)

gsap.fromTo(".hero .hero-link", 
  {
    opacity: 0,
  },
  {
    duration:1,
    opacity: 1,
  }
)

//about
gsap.fromTo("#about .titles", 
  ...returnAppear('#about', 2, 'top')
)

gsap.fromTo("#about p.paragraph", 
  ...returnAppear('#about', 3, 'left')
)

gsap.fromTo("#about .about-who__image", 
  ...returnAppear('#about', 3, 'bottom')
)

//about-us
gsap.fromTo(".about-us .titles", 
  ...returnAppear('.about-us .titles', 2, 'bottom')
)

gsap.fromTo(".about-us .team-card", 
  ...returnAppear('.about-us .titles', 3, 'bottom')
)

gsap.fromTo(".about-us .about-us__image",
  ...returnAppear('.about-us .titles', 4, 'bottom')
)

//

gsap.fromTo(".our-projects .titles",
  ...returnAppear('#products', 2, 'bottom')
)

gsap.fromTo(".our-projects .our-projects__card",
  ...returnAppear('#products', 3, 'bottom')
)

gsap.fromTo(".our-projects .our-projects__card",
  ...returnAppear('#products', 4, 'bottom')
)

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

  //   gsap.to(window, {
		// 	scrollTo: {
		// 		y: 100,
		// 		autoKill: false
		// 	},
		// 	duration: 1
		// });
    console.log("triggered")
  });
})




