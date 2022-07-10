
const homeScript = () => {
  
  const animationsScript = () => {
   const returnAppear = (trigger, duration, direction) => {
  
    const properties = (x, y) => [
      {
        x: x,
        y: y,
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
          end: '+=200px',
          delay: 1,
          scrub: 1,
          anticipatePin: 1,
        }
      }
    ]
  
    if (direction == "bottom") {
      return properties(0, 100)
    }
    if (direction == "top") {
      return properties(0, -100)
    }
    if (direction == "left") {
      return properties(-100, 0)
    }
    if (direction == "default") {
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
      duration: 1,
      opacity: 1,
      y: 0
    }
  )
  
  gsap.fromTo(".hero .hero-link",
    {
      opacity: 0,
    },
    {
      duration: 1,
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
    anchor.addEventListener('click', function(e) {
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
  }

  // animationsScript()

    //  slider properties using the splide library
  
  const splide2 = new Splide('.splide', {
    perPage: 3,
    rewind: true,
    width: '100%',
    height: '400px',
    gap: '1rem',
    arrows: false,
    lazyload: 'sequential',
    drag: true,
    padding: '1rem',
    autoplay: true,
    speed: 1000,
    pagination: {
      type: 'bullets',
      clickable: true,
    }
  }).mount()
}


const factoringScript = () => {

  //DROPAREA LOGIC
  const dropArea = document.querySelector('.form-upload-zone')
  const formUploadText = document.querySelector('.form-upload-text')
  
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })
  
  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  // Add highlight to the drop area when the user is dragging a file
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  })
  
  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })
  
  function highlight(event) {
    dropArea.classList.add('highlight')
  }
  
  function unhighlight(event) {
    dropArea.classList.remove('highlight')
  }
  
  dropArea.addEventListener('drop', handleDrop, false)
  
  function handleDrop(event) {
    const dt = event.dataTransfer
    const files = dt.files
    handleFiles(files)
    formUploadText.innerHTML = [...files][0].name
  }
  
  let myFiles = []
  
  function handleFiles(files) {
    files = [...files]
    files.forEach(uploadFile)
    myFiles = files
  }
  
  
  function uploadFile(file) {
    const formData = new FormData()
  
    formData.append('file', file)
    
    return file
  }
  
  
  const uploadZoneButton = document.querySelector('.upload-zone-click')
  
  uploadZoneButton.addEventListener('click', () => {
    importData()
  })
  
  function importData () {
    let input = document.createElement('input')
    input.type = 'file'
    input.onchange = _ => {
      let files = Array.from(input.files)
      formUploadText.innerHTML = files[0].name
      myFiles = files
    }
    input.click()
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {}
    formData.forEach((value, key) => {
      if(key === 'file') {
        data[key] = myFiles[0]
      } else {
        data[key] = value
      }
    })
    console.log(data)
  }
  
  const form = document.querySelector('.form')
  form.addEventListener('submit', handleSubmit)
  
  
  if(myFiles.length > 0) {
    formUploadText.innerHTML = `${myFiles[0].name}`
  }
}

if (window.location.pathname === "/") {
  homeScript()
} else {
  factoringScript()
}









