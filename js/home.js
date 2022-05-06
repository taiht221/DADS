import '../scss/pages/home.scss'
;(() => {
  const header = document.getElementsByTagName('header')[0]
  const headerNav = document.querySelector('header nav')
  var swiper = new Swiper('.mySwiper', {
    spaceBetween: 0,
    slidesPerView: 4,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    isFinite: true,
    speed: 500,
    loop: true,
    loopFillGroupWithBlank: true,
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
  })

  function toggleNav() {
    headerNav.querySelector('.hambuger').addEventListener('click', () => {
      headerNav.querySelector('#mobile-menu').classList.toggle('hidden')
    })
  }
  toggleNav()

  console.log(window.scrollY)

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      header.classList.remove('relative')
      header.classList.add('active')
    } else {
      header.classList.add('relative')
      header.classList.remove('active')
    }
  }
  window.addEventListener('scroll', handleScroll)
})()
