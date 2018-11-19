export default {
  range (length) {
    return Array(length).fill().map((v,i)=>i)
  },

  formatNumber (number, divider = " ") {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, divider)
  }
}