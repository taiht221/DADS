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

  var swiper2 = new Swiper('#netSwiper', {
    pagination: {
      el: '.swiper-pagination2',
      dynamicBullets: true,
    },
    spaceBetween: 20,
    allowTouchMove: true,
    slidesPerView: 1,
    centeredSlides: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
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
  function countDown() {
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
    if (hours.toString().length === 1) {
      var hours =
        '0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    } else {
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
    }
    if (minutes.toString().length === 1) {
      var minutes =
        '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    } else {
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    }
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Output the result in an element with id="demo"
    document.getElementById('day').innerHTML = days
    document.getElementById('hour').innerHTML = hours
    document.getElementById('min').innerHTML = minutes
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x)
      document.getElementById('day').innerHTML = '00'
      document.getElementById('hour').innerHTML = '00'
      document.getElementById('min').innerHTML = '00'
    }
  }
  countDown()
  // Update the count down every 1 second
  var x = setInterval(countDown, 60000)
})()

if (document.getElementById('copyButton')) {
  document.getElementById('copyButton').addEventListener('click', () => {
    // Get the text field
    var copyText = document.getElementById('copyInput')

    // Select the text field
    copyText.select()
    copyText.setSelectionRange(0, 99999) // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value)
  })
}
