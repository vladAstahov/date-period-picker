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
 * @param {number} [valueIndex = 0] 
 * @param {string} [result = '']
 * @return {string} 
 */
const converter = (value, valueIndex = 0, result = '') => {
    if (valueIndex < value.length && result.length < 10) {
        if (isDayField(valueIndex) && isNumber(value[valueIndex])) {
            if (valueIndex === 0) {
                if (['0', '1', '2', '3'].includes(value[0])) {
                    valueIndex += 1;
                    result += value[0]
                    return converter(value, valueIndex, result)
                }

                valueIndex += 2;
                result += '0' + value[0] + '.'
                return converter(value, valueIndex, result)
            }

            if (Number(`${value[0]}${value[1]}`) >= 0 && Number(`${value[0]}${value[1]}`) <= 31) {
                valueIndex += 1;
                result += value[1] + '.'
                return converter(value, valueIndex, result)
            }

            valueIndex += 1;
            result += '0' + value[0] + '.'
            return converter(value, valueIndex, result)
        }
        if (isMonthField(valueIndex) && isNumber(value[valueIndex])) {
            if (valueIndex === 2) {
                if (['0', '1'].includes(value[2])) {
                    valueIndex += 1;
                    result += value[2]
                    return converter(value, valueIndex, result)
                }

                valueIndex += 2;
                result += '0' + value[2] + '.'
                return converter(value, valueIndex, result)
            }

            if (Number(`${value[2]}${value[3]}`) >= 0 && Number(`${value[2]}${value[3]}`) <= 12) {
                valueIndex += 1;
                result += value[3] + '.'
                return converter(value, valueIndex, result)
            }

            valueIndex += 1;
            result += '0' + value[2] + '.'
            return converter(value, valueIndex, result)
        }

        return result
    }

    return result
}

/**
 * @param {string} value
 * @returns {string}
 */
const removeSeparators = (value) => value.replaceAll(/\./g, '')

/**
 * @param {string} value
 * @returns {number} 
 * */
const isSeparatorRemoved = (value) => {
    if (value[1] && value[2] !== '.') return 2
    if (value[4] && value[5] !== '.') return 5

    return 0
}

/**
 * 
 * @param {string} value
 * @returns {string} 
 */
const toConverterValue = (value) => {
    if (value.length === 2) {
        return value[0]
    }
    if (value.length > 2 && value[2] !== '.') {
        return removeSeparators(value.slice(0, 2) + value.slice(3, value.length))
    }
    if (value.length === 5) {
        return removeSeparators(value.slice(0, 4))
    }
    if (value.length > 5 && value[5] !== '.') {
        return removeSeparators(value.slice(0, 5) + value.slice(6, value.length))
    }

    return removeSeparators(value)
}

const onInputFrom = () => {
    const inputFrom = document.querySelector('#input_from').querySelector('input')
    const fromValue = document.querySelector('#input_from').querySelector('.input__text')
    const convertedValue = converter(toConverterValue(inputFrom.value))
    console.log(convertedValue, 'convertedValue')
    console.log(toConverterValue(inputFrom.value), 'toConverterValue(inputFrom.value)')
    console.log(inputFrom.value, 'inputFrom.value')
    fromValue.innerHTML = convertedValue
    inputFrom.value = convertedValue
}

window.onload = () => {
    const inputFrom = document.querySelector('#input_from').querySelector('input')
    const inputTo = document.querySelector('#input_to').querySelector('input')
    const fromValue = document.querySelector('#input_from').querySelector('.input__text')
    const toValue = document.querySelector('#input_to').querySelector('.input__text')

    inputFrom.addEventListener('input', onInputFrom)
}