const cityThen = document.querySelector('.city-then')
const cityNow = document.querySelector('.city-now')
const citySlider = document.querySelector('.city-slider')
const cities = Array.from(document.querySelectorAll('.st3'))

function selectCity (event) {
  cities.forEach(city => city.classList.remove('selected'))
  event.target.classList.add('selected')
}

function transitionToCity (event) {
  cityNow.style.opacity = event.target.value
}

cities.forEach(city => city.addEventListener('click', selectCity))
citySlider.addEventListener('input', transitionToCity)
citySlider.addEventListener('change', transitionToCity)
