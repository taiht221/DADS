import '../scss/pages/home.scss'
;(() => {
  const header = document.getElementsByTagName('header')[0]
  const headerNav = document.querySelector('header nav')
  var swiper = new Swiper('.mySwiper', {
    spaceBetween: 0,
    slidesPerView: 4,
    centeredSlides: false,
    isFinite: true,
    speed: 500,
    loop: false,
    loopFillGroupWithBlank: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
      },
    },
    allowTouchMove: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  function toggleNav() {
    headerNav.querySelector('.hambuger').addEventListener('click', () => {
      headerNav.querySelector('#mobile-menu').classList.toggle('hidden')
    })
  }
  toggleNav()
})()
;(() => {
  /// Set the date we're counting down to
  var countDownDate = new Date('Jan 5, 2024 15:37:25').getTime()

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Output the result in an element with id="demo"
    document.getElementById('day').innerHTML = days
    document.getElementById('hour').innerHTML = hours
    document.getElementById('min').innerHTML = minutes
    document.getElementById('sec').innerHTML = seconds
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x)
      document.getElementById('demo').innerHTML = 'EXPIRED'
    }
  }, 1000)
})()
