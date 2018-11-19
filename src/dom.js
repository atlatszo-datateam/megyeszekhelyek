export default {
  createElement (tag) {
    return document.createElement(tag)
  },
  
  getElement (selector) {
    return document.querySelector(selector)
  },
  
  getAllElements (selector) {
    return Array.from(document.querySelectorAll(selector))
  },

  getChild (element, selector) {
    return element.querySelector(selector)
  },

  getChildren (element, selector) {
    return element.querySelectorAll(selector)
  },
  
  removeElement (element) {
    element.remove()
  },
  
  addClass (element, className) {
    element.classList.add(className)
  
    return element
  },
  
  removeClass (element, className) {
    element.classList.remove(className)
  
    return element
  },
  
  toggleClass (element, className) {
    element.classList.toggle(className)
  
    return element
  },
  
  getAttribute (element, attribute) {
    return element.getAttribute(attribute)
  },
  
  setAttribute (element, attribute, value) {
    element[attribute] = value
  
    return element
  },

  getStyle (element, style) {
    return element.style[style]
  },
  
  setStyle (element, style, value) {
    element.style[style] = value
  
    return element
  },

  appendChild (parent, child) {
    parent.appendChild(child)

    return parent
  },

  fadeIn (element, min = 0, max = 1) {
    element.style.opacity = min

    var last = +new Date()
    var tick = function() {
      element.style.opacity = +element.style.opacity + (new Date() - last) / 400
      last = +new Date()

      if (+element.style.opacity < max) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    }

    tick()
  }
}
