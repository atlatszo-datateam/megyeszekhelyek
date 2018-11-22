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
  DOM.setStyle(cityNow, 'opacity', event.target.value)
  DOM.setStyle(cityThen, 'opacity', 1 - event.target.value)
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

function showTooltip (event) {
  console.log('showTooltip')
  const circle = event.target
  
  tooltip.innerHTML = DOM.getAttribute(circle, 'title');
  tooltip.style.display = 'block';
  tooltip.style.left = `${DOM.getAttribute(circle, 'cx') - 5}px`;
  tooltip.style.top = `${DOM.getAttribute(circle, 'cy') - 15}px`;
}

function hideTooltip () {
  console.log('hideTooltip')
}

cityElements.forEach(city => city.addEventListener('click', selectCity))
cityElements.forEach(city => city.addEventListener('mouseenter', showTooltip))
cityElements.forEach(city => city.addEventListener('mouseleave', hideTooltip))
citySlider.addEventListener('input', transitionToCity)
citySlider.addEventListener('change', transitionToCity)
