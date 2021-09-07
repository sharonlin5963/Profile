import favorite00 from '@/assets/images/favorite00.png'
import favorite01 from '@/assets/images/favorite01.png'
import favorite02 from '@/assets/images/favorite02.png'
window.onload = function () {
  function addClass (dom, className) {
    dom.classList.add(className)
  };
  function removeClass (dom, className) {
    dom.classList.remove(className)
  };
  // video play & status
  function startVideo (domName) {
    const dom = document.querySelector(`#${domName} a`)
    const video = document.querySelector(`#${domName} video`)
    if (window.innerWidth >= 768) {
      addClass(dom, 'large')
      video.pause()
      video.currentTime = 0
    }
    video.play()
    video.addEventListener('ended', () => {
      video.currentTime = 0
    }, false)
  };
  // #about 主圖片隨機置換
  const random = (Math.random() * 10).toFixed(0) * 1 % 3
  const favoriteImage = document.querySelector('#favoriteImage')
  const favoriteImages = {
    0: favorite00,
    1: favorite01,
    2: favorite02
  }
  favoriteImage.src = favoriteImages[random]

  // #project-mouseenter
  const jailulu = document.querySelector('#jailulu a')
  jailulu.addEventListener('mouseenter', () => {
    startVideo('jailulu')
  }, false)
  jailulu.addEventListener('mouseleave', () => {
    removeClass(jailulu, 'large')
  }, false)

  const piano = document.querySelector('#piano a')
  piano.addEventListener('mouseenter', () => {
    startVideo('piano')
  }, false)
  piano.addEventListener('mouseleave', () => {
    removeClass(piano, 'large')
  }, false)

  const pomodoro = document.querySelector('#pomodoro a')
  pomodoro.addEventListener('mouseenter', () => {
    startVideo('pomodoro')
  }, false)
  pomodoro.addEventListener('mouseleave', () => {
    removeClass(pomodoro, 'large')
  }, false)

  // scroll event
  window.addEventListener('scroll', function (e) {
    const scrolled = window.pageYOffset
    // #home-縮放
    const home = document.querySelector('#home')
    if (scrolled > 0) {
      addClass(home, 'large')
    } else if (scrolled === 0) {
      removeClass(home, 'large')
    }
    // #about me文字左右移動
    const scrollRight = document.querySelectorAll('.scroll-right')
    const scrollLeft = document.querySelectorAll('.scroll-left')

    const rateX = scrolled * 0.03
    const rateY = scrolled * 0.2 - 100
    scrollRight.forEach(item => {
      item.style.transform = `translate(${rateX}vw, ${rateY}px)`
    })
    scrollLeft.forEach(item => {
      item.style.transform = `translate(-${rateX}vw, ${rateY}px)`
    })

    const experience = document.querySelector('#experience')
    const timeLine = document.querySelector('.timeLine')
    const line = document.querySelector('#line')
    const works = document.querySelector('.works')
    const timeLineRateX = scrolled * 0.7

    function timelineAnimate () {
      // work-timeline向左移動
      const offset = timeLineRateX - timeLine.offsetWidth - 500
      if (window.innerWidth >= 768) {
        timeLine.style.right = (offset <= 2000) ? `${offset}px` : '2000px'
      }
      // work-timeline線延伸
      if (scrolled >= experience.offsetTop) {
        addClass(line, 'extend')
        if (window.innerWidth < 768) addClass(works, 'show')
      } else if (scrolled < experience.offsetTop) {
        removeClass(line, 'extend')
        if (window.innerWidth < 768) removeClass(works, 'show')
      }
    }

    const project = document.querySelector('#project')
    const projectTitle = document.querySelector('#project .title')
    const rateData = {
      jailulu: -70,
      piano: -83,
      pomodoro: -95
    }

    function upDownMoving (domName) {
      const dom = document.querySelector(`#${domName} .info`)
      const rate = (rateData[domName] > 0 ? scrolled * 0.015 : scrolled * -0.015) - rateData[domName]
      dom.style.transform = `translateY(${rate}vh)`
    }
    function showInfo (domName) {
      const dom = document.querySelector(`#${domName}`)
      const domInfo = document.querySelector(`#${domName} .info`)
      const offsetTop = project.offsetTop + dom.offsetTop - 150
      // console.log(domName, project.offsetTop, dom.offsetTop)
      if (scrolled >= offsetTop) {
        addClass(domInfo, 'show')
      } else if (scrolled < offsetTop) {
        removeClass(domInfo, 'show')
      }
    }
    // project
    timelineAnimate()
    if (window.innerWidth > 1024) {
      upDownMoving('jailulu')
      upDownMoving('piano')
      upDownMoving('pomodoro')
    } else {
      showInfo('jailulu')
      showInfo('piano')
      showInfo('pomodoro')
    }

    // #experience
    if (scrolled >= project.offsetTop - 300) {
      removeClass(experience, 'sticky')
    } else if (scrolled >= experience.offsetTop - 100) {
      experience.style.opacity = 1
      addClass(experience, 'sticky')
    }
    if (scrolled >= project.offsetTop - 800 && window.innerWidth >= 768) {
      experience.style.opacity = 0
    }
    // #project-title淡入動畫
    if (scrolled >= project.offsetTop - 500) {
      addClass(projectTitle, 'fade-in')
    } else if (scrolled < project.offsetTop) {
      removeClass(projectTitle, 'fade-in')
    }

    // #project-works 淡入動畫
    function showAnimate (domName) {
      const dom = document.querySelector(`#${domName}`)
      const offsetTop = project.offsetTop + dom.offsetTop - 400
      if (scrolled >= offsetTop) {
        addClass(dom, 'show')
        if (window.innerWidth < 768) startVideo(domName)
      } else if (scrolled < offsetTop) {
        removeClass(dom, 'show')
      }
    };
    showAnimate('jailulu')
    showAnimate('piano')
    showAnimate('pomodoro')
  }, false)
}
