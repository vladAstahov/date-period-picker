/**
 * @param {any} v 
 * @returns {boolean}
 */
const isNumber = (v) => !isNaN(Number(v))

/**
 * @param {number} index
 * @returns {boolean}
 */
const isDayField = (index) => [0, 1].includes(index)
/**
 * @param {number} index
 * @returns {boolean}
 */
const isMonthField = (index) => [2, 3].includes(index)
/**
 * @param {number} index
 * @returns {boolean}
 */
const isYearField = (index) => [4, 5, 6, 7].includes(index)

/**
 * @param {string} value
 * @returns {string}
 */
const removeSeparators = (value) => value.replaceAll(/\./g, '')