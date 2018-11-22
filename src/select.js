import cities from './cities'
import DOM from './dom'
import Helpers from './helpers'

const cityThen = DOM.getElement('.city-then')
const cityNow = DOM.getElement('.city-now')
const populationThen = DOM.getElement('.population-then')
const populationThenNumber = DOM.getChild(populationThen, '.population-number')
const populationNow = DOM.getElement('.population-now')
const populationNowNumber = DOM.getChild(populationNow, '.population-number')
const populationCityName = DOM.getElement('.population-city-name')
const citySlider = DOM.getElement('.city-slider')
const citySliderText = DOM.getElement('.city-slider-container p')
const cityElements = DOM.getAllElements('.st3')
const tooltip = DOM.getElement('.tooltip')

function hideElement (element) {
  return DOM.setStyle(element, 'opacity', 0)
}

function selectCity (event) {
  cityElements.forEach(city => DOM.removeClass(city, 'selected'))
  changeCity(DOM.getAttribute(DOM.addClass(event.target, 'selected'), 'title'))
}

function transitionToCity (event) {
  const {value} = event.target
  if (value > 0) {
    DOM.setStyle(citySliderText, 'opacity', 0)
  } else {
    DOM.setStyle(citySliderText, 'opacity', 1)
  }
  
  DOM.setStyle(cityNow, 'opacity', value)
  DOM.setStyle(cityThen, 'opacity', 1 - value)
}

function createFigure (parent) {
  const figure = hideElement(DOM.addClass(DOM.createElement('span'), 'population-figure'))
  DOM.appendChild(parent, figure)

  return figure
}

function populate(element, population) {
  const container = DOM.getChild(element, '.population-container')
  
  DOM
    .getChildren(element, '.population-figure')
    .forEach(figure => DOM.removeElement(figure))
  
  Helpers
    .range(Math.ceil(population / 10000))
    .forEach(() => DOM.fadeIn(createFigure(container)))
}

function changeCity (cityName) {
  const selectedCity = cities.find(city => city.name === cityName)

  if (selectedCity) {
    const {population, name} = selectedCity

    DOM.setAttribute(populationCityName, 'innerHTML', name)
    DOM.fadeIn(DOM.setAttribute(populationThenNumber, 'innerHTML', Helpers.formatNumber(population.then)))
    DOM.fadeIn(DOM.setAttribute(populationNowNumber, 'innerHTML', Helpers.formatNumber(population.now)))
    populate(populationThen, population.then)
    populate(populationNow, population.now)
    DOM.setAttribute(cityThen, 'src', `dist/${selectedCity.images.then}`)
    DOM.setAttribute(cityNow, 'src', `dist/${selectedCity.images.now}`)
    citySlider.value = 0
    DOM.setStyle(cityThen, 'opacity', 1)
    DOM.setStyle(cityNow, 'opacity', 0)
  }
}

cityElements.forEach(city => city.addEventListener('click', selectCity))
citySlider.addEventListener('input', transitionToCity)
citySlider.addEventListener('change', transitionToCity)
