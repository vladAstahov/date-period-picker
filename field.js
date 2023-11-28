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

class Field {
    #value = ''

    /**
     * @type {HTMLInputElement}
     * */
    #inputElement = 'test'
    /**
     * @type {HTMLSpanElement}
     * */
    #contentElement

    get value() {
        return this.#value
    }

    /**
     * @param {string} value
     * */
    set value(value) {
        this.#value = value
    }

    get inputElement() {
        return this.#inputElement
    }

    /**
     * @param {HTMLInputElement} element
     * */
    set inputElement(element) {
        this.#inputElement = element
    }

    get contentElement() {
        return this.#contentElement
    }

    /**
     * @param {HTMLSpanElement} element
     * */
    set contentElement(element) {
        this.#contentElement = element
    }

    /**
     * @param {string} id
     * */
    constructor(id) {
        this.inputElement = document.querySelector(`#${id}`).querySelector('.input__value')
        this.inputElement.addEventListener('input', () => this.onInput())
        this.contentElement = document.querySelector(`#${id}`).querySelector('.input__text')
    }

    /**
     * @param {string} newValue
     * */
    isSeparatorRemoved(newValue) {
        if (this.value[2] === '.' && newValue[2] !== '.' && this.value.length > newValue.length) return 2
        if (this.value[5] === '.' && newValue[5] === '.' && this.value.length > newValue.length) return 5
        return 0
    }

    /**
     * @param {string} newValue
     * */
    backspaceFormated(newValue) {
        const removedIndex = this.isSeparatorRemoved(newValue)
        if (!!removedIndex) {
            console.log(removedIndex)
        }

        return removeSeparators(newValue)
    }

    onInput() {
        const newValue = this.inputElement.value
        const convertedValue = this.converter(this.backspaceFormated(newValue))
        const currentValue = this.value

        console.log(convertedValue, currentValue)
        this.value = convertedValue
        this.contentElement.innerText = convertedValue
    }

    /**
     * @param {string} value
     * @param {number} [valueIndex = 0]
     * @param {string} [result = '']
     * @return {string}
     */
    converter(value, valueIndex = 0, result = '') {
        if (valueIndex < value.length && result.length < 10) {
            if (isDayField(valueIndex) && isNumber(value[valueIndex])) {
                if (valueIndex === 0) {
                    if (['0', '1', '2', '3'].includes(value[0])) {
                        valueIndex += 1;
                        result += value[0]
                        return this.converter(value, valueIndex, result)
                    }

                    valueIndex += 2;
                    result += '0' + value[0] + '.'
                    return this.converter(value, valueIndex, result)
                }

                if (Number(`${value[0]}${value[1]}`) >= 0 && Number(`${value[0]}${value[1]}`) <= 31) {
                    valueIndex += 1;
                    result += value[1] + '.'
                    return this.converter(value, valueIndex, result)
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
                        return this.converter(value, valueIndex, result)
                    }

                    valueIndex += 2;
                    result += '0' + value[2] + '.'
                    return this.converter(value, valueIndex, result)
                }

                if (Number(`${value[2]}${value[3]}`) >= 0 && Number(`${value[2]}${value[3]}`) <= 12) {
                    valueIndex += 1;
                    result += value[3] + '.'
                    return this.converter(value, valueIndex, result)
                }

                valueIndex += 1;
                result += '0' + value[2] + '.'
                return this.converter(value, valueIndex, result)
            }

            return result
        }

        return result
    }
}

window.onload = () => {
    const fromField = new Field('input_from')
}