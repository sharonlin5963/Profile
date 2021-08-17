window.onload = function () {
  function addClass (dom, className) {
    dom.classList.add(className)
  };
  function removeClass (dom, className) {
    dom.classList.remove(className)
  };
  // video play & status
  function startVideo (dom, video) {
    addClass(dom, 'large')
    video.pause()
    video.currentTime = 0
    video.play()
    video.addEventListener('ended', () => {
      video.currentTime = 0
    }, false)
  };
  const jailulu = document.querySelector('#jailulu a')
  const jailuluVideo = document.querySelector('#jailulu video')
  jailulu.addEventListener('mouseenter', () => {
    startVideo(jailulu, jailuluVideo)
  }, false)
  jailulu.addEventListener('mouseleave', () => {
    removeClass(jailulu, 'large')
  }, false)

  const piano = document.querySelector('#piano a')
  const pianoVideo = document.querySelector('#piano video')
  piano.addEventListener('mouseenter', () => {
    startVideo(piano, pianoVideo)
  }, false)
  piano.addEventListener('mouseleave', () => {
    removeClass(piano, 'large')
  }, false)

  const pomodoro = document.querySelector('#pomodoro a')
  const pomodoroVideo = document.querySelector('#pomodoro video')
  pomodoro.addEventListener('mouseenter', () => {
    startVideo(pomodoro, pomodoroVideo)
  }, false)
  pomodoro.addEventListener('mouseleave', () => {
    removeClass(pomodoro, 'large')
  }, false)

  // scroll event
  window.addEventListener('scroll', function (e) {
    const about = document.querySelector('#about')
    const scrollRight = document.querySelectorAll('.scroll-right')
    const scrollLeft = document.querySelectorAll('.scroll-left')
    const scrolled = window.pageYOffset
    const rateX = scrolled * 0.5 - 100
    const rateY = scrolled * 0.2 - 100
    // about me文字左右移動
    scrollRight.forEach(item => {
      item.style.transform = `translate(${rateX}px, ${rateY}px)`
    })
    scrollLeft.forEach(item => {
      item.style.transform = `translate(-${rateX}px, ${rateY}px)`
    })

    const experience = document.querySelector('#experience')
    const timeLine = document.querySelector('.timeLine')
    const line = document.querySelector('#line')
    const timeLineRateX = scrolled * 0.7
    // work-timeline向左移動
    const offset = timeLineRateX - timeLine.offsetWidth - 500
    timeLine.style.right = (offset <= 800) ? `${offset}px` : '800px'
    // work-timeline線延伸
    if (scrolled >= experience.offsetTop) {
      addClass(line, 'extend')
    } else if (scrolled < experience.offsetTop) {
      removeClass(line, 'extend')
    }

    // project 淡入動畫
    function showAnimate (domName) {
      const project = document.querySelector('#project')
      const dom = document.querySelector(`#${domName}`)
      const offsetTop = project.offsetTop + dom.offsetTop - 600
      if (scrolled >= offsetTop) {
        removeClass(dom, 'hide')
      } else if (scrolled < offsetTop) {
        addClass(dom, 'hide')
      }
    };
    showAnimate('jailulu')
    showAnimate('piano')
    showAnimate('pomodoro')
  }, false)
}
