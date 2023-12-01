class Field {
    #value = ''

    /**
     * @type {HTMLDivElement}
     * */
    #rootElement
    /**
     * @type {HTMLInputElement}
     * */
    #inputElement
    /**
     * @type {HTMLSpanElement}
     * */
    #contentElement
    /**
     * @type {HTMLSpanElement}
     * */
    #cursorElement

    /**
     * @type {(value: string) => void}
     * */
    #onChange

    /**
     * @type {() => void}
     * */
    #onFieldFocus

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

    get cursorElement() {
        return this.#cursorElement
    }

    /**
     * @param {HTMLSpanElement} element
     */
    set cursorElement(element) {
        this.#cursorElement = element
    }

    get rootElement() {
        return this.#rootElement
    }

    /**
     * @param {HTMLDivElement} element
     */
    set rootElement(element) {
        this.#rootElement = element
    }

    get onChange() {
        return this.#onChange
    }

    set onChange(handler) {
        this.#onChange = handler
    }

    get onFieldFocus() {
        return this.#onFieldFocus
    }

    set onFieldFocus(handler) {
        this.#onFieldFocus = handler
    }

    /**
     * @param {string} id
     * */
    constructor(id) {
        this.rootElement = document.querySelector(`#${id}`)
        this.rootElement.addEventListener('click', (e) => this.onRootPress(e))
        this.inputElement = this.rootElement.querySelector('.input__value')
        this.inputElement.addEventListener('input', () => this.onInput())
        this.inputElement.addEventListener('focus', () => this.onFocus())
        this.inputElement.addEventListener('blur', () => this.onBlur())
        this.contentElement = this.rootElement.querySelector('.input__text')
        this.cursorElement = this.rootElement.querySelector('.input__cursor')
    }

    onRootPress(e) {
        console.log(e.target.tagName)

        if (
            !e.target?.classList?.contains('input__toggle-picker') &&
            !e.target?.classList?.contains('input__clear') &&
            e.target.tagName !== 'IMG') {
            this.inputElement.focus()
        }
    }

    /**
     * @param {string} newValue
     * */
    isSeparatorRemoved(newValue) {
        if (this.value[2] === '.' && newValue[2] !== '.' && this.value.length > newValue.length) return 2
        if (this.value[5] === '.' && newValue[5] !== '.' && this.value.length > newValue.length) return 5
        return 0
    }

    /**
     * @param {string} newValue
     * */
    backspaceFormated(newValue) {
        const removedIndex = this.isSeparatorRemoved(newValue)
        if (!!removedIndex) {
            const withBackspace = newValue.slice(0, removedIndex - 1) + newValue.slice(removedIndex + 1, newValue.length)

            return removeSeparators(withBackspace)
        }

        return removeSeparators(newValue)
    }

    onFocus() {
        this.rootElement.classList.add('is-focused')
        this.onFieldFocus()
        if (this.inputElement.value) {
            this.onInput()
        }
    }

    onBlur() {
        if (this.value.length === 0) {
            this.rootElement.classList.remove('is-focused')
        }
        this.submit()
    }

    /**
     * @param {string} newValue 
     */
    toContentValue(newValue) {
        let result = 'ДД.ММ.ГГГГ'

        for (let i = 0; i < newValue.length; i++) {
            result = result.slice(0, i) + newValue[i] + result.slice(i + 1, result.length)
        }

        return result.replaceAll(/\./g, '<span class="input__dot">.</span>')
    }

    onInput() {
        const newValue = this.inputElement.value
        const convertedValue = this.converter(this.backspaceFormated(newValue))

        this.value = convertedValue
        this.inputElement.value = convertedValue
        this.contentElement.innerHTML = this.toContentValue(convertedValue)
        this.rootElement.classList.remove('is-submited')

        if (convertedValue.length === 10) {
            this.onChange(convertedValue)
        }
        if (convertedValue.length > 0 && !this.contentElement.classList.contains('is-filled')) {
            this.contentElement.classList.add('is-filled')
        } else if (convertedValue.length === 0) {
            this.contentElement.classList.remove('is-filled')
        }
    }

    /**
     * @param {{day: number, month: number, year: number}} newValue 
     */
    setValue({ day, month, year }) {
        const stringDay = day > 9 ? `${day}` : `0${day}`
        const stringMonth = month + 1 > 9 ? `${month + 1}` : `0${month + 1}`
        const convertedValue = `${stringDay}.${stringMonth}.${year}`

        this.value = convertedValue
        this.inputElement.value = convertedValue
        this.submit()
    }

    submit() {
        if (this.value.length === 10) {
            const [day, month, year] = this.value.split('.')
            const monthName = monthMap[Number(month) - 1]

            this.contentElement.innerText = `${day} ${monthName} ${year}`
            this.rootElement.classList.add('is-submited')
        }
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
            if (isYearField(valueIndex) && isNumber(value[valueIndex])) {
                result += value[valueIndex]
                valueIndex += 1;
                return this.converter(value, valueIndex, result)
            }

            return result
        }

        return result
    }

    setOnChange(handler) {
        this.onChange = handler
    }

    setOnFieldFocus(handler) {
        this.onFieldFocus = handler
    }

    reset() {
        this.value = ''
        this.inputElement.value = ''
        this.contentElement.innerText = 'ДД.ММ.ГГГГ'
        this.rootElement.classList.remove('is-submited')
    }
}