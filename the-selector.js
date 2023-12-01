class TheSelector {
    /**
     * @type {HTMLDivElement}
     */
    #rootElement
    /**
     * @type {HTMLSpanElement}
     */
    #textElement
    /**
     * @type {undefined | (value: number) => string}
     */
    #textElementGetter
    /**
     * @type {HTMLButtonElement}
     */
    #selectorToggleElement
    /**
     * @type {HTMLButtonElement}
     */
    #selectorElement

    /**
     * @type {null | number}
     */
    #value = null

    /**
     * @type {(value: number) => void}
     * */
    #onChange

    /**
     * @type {string}
     * */
    #emptyValue

    /**
     * @type {string}
     */
    #searchValue

    /**
     * @type {HTMLInputElement}
     */
    #searchElement

    /**
     * @type {HTMLButtonElement}
     */
    #submitButton

    /**
     * @type {HTMLButtonElement}
     */
    #resetButton

    /**
     * @type {HTMLButtonElement[]}
     */
    #closeButtons

    get rootElement() {
        return this.#rootElement
    }

    set rootElement(element) {
        this.#rootElement = element
    }

    get textElement() {
        return this.#textElement
    }

    set textElement(element) {
        this.#textElement = element
    }

    get textElementGetter() {
        return this.#textElementGetter
    }

    set textElementGetter(getter) {
        this.#textElementGetter = getter
    }

    get selectorElement() {
        return this.#selectorElement
    }

    set selectorElement(element) {
        this.#selectorElement = element
    }

    get selectorToggleElement() {
        return this.#selectorToggleElement
    }

    set selectorToggleElement(element) {
        this.#selectorToggleElement = element
    }

    get value() {
        return this.#value
    }

    set value(newValue) {
        this.#value = newValue
    }

    get onChange() {
        return this.#onChange
    }

    set onChange(handler) {
        this.#onChange = handler
    }

    get emptyValue() {
        return this.#emptyValue
    }

    set emptyValue(content) {
        this.#emptyValue = content
    }

    get searchValue() {
        return this.#searchValue
    }

    set searchValue(newSearch) {
        this.#searchValue = newSearch
    }

    get searchElement() {
        return this.#searchElement
    }

    set searchElement(element) {
        this.#searchElement = element
    }

    get submitButton() {
        return this.#submitButton
    }

    set submitButton(element) {
        this.#submitButton = element
    }

    get resetButton() {
        return this.#resetButton
    }

    set resetButton(element) {
        this.#resetButton = element
    }

    get closeButtons() {
        return this.#closeButtons
    }

    set closeButtons(buttons) {
        this.#closeButtons = [...buttons]
    }

    /**
     * @param {HTMLDivElement} root
     * @param {undefined | ((value: number) => string)} textGetter
     * @param {string} emptyContent
     */
    constructor(root, textGetter, emptyContent) {
        this.emptyValue = emptyContent
        this.rootElement = root
        this.textElement = this.rootElement.querySelector('.selector__content')
        this.textElementGetter = textGetter
        this.selectorElement = this.rootElement.querySelector('.selector__dropdown')
        this.selectorToggleElement = this.rootElement.querySelector('.selector__dropdown-toggle')
        this.selectorToggleElement.addEventListener('click', () => this.onToggleDropdown())
        this.rootElement.querySelector('.selector__button--left').addEventListener('click', () => this.onPrevYear())
        this.rootElement.querySelector('.selector__button--right').addEventListener('click', () => this.onNextYear())
        if (device_type === 'mobile') {
            this.searchElement = this.rootElement.querySelector('.selector__value')
            this.searchElement.addEventListener('input', () => this.onSearch())
            this.submitButton = this.rootElement.querySelector('.selector__submit')
            this.submitButton.addEventListener('click', () => this.onToggleDropdown())
            this.resetButton = this.rootElement.querySelector('.selector__reset')
            this.resetButton.addEventListener('click', () => this.reset())
            this.closeButtons = this.rootElement.querySelectorAll('.selector__close')
            this.closeButtons.forEach(button => button.addEventListener('click', () => this.onToggleDropdown()))
        }
    }

    enableSubmit() {
        this.submitButton.classList.remove('is-disabled')
    }

    disableSubmit() {
        if (!this.submitButton.classList.contains('is-disabled')) {
            this.submitButton.classList.add('is-disabled')
        }
    }

    onSearch() {
        const currentSearch = this.searchElement.value
        const options = this.selectorElement.querySelector('.selector__list').childNodes

        for (let i = 1; i < options.length; i++) {
            if (!options[i].innerText.includes(currentSearch) && !options[i].classList.contains('is-hidden')) {
                options[i].classList.add('is-hidden')
            } else if (options[i].innerText.includes(currentSearch)) {
                options[i].classList.remove('is-hidden')
            }
        }
    }

    onToggleDropdown() {
        document.querySelectorAll('.selector__dropdown').forEach(element => {
            if (element !== this.selectorElement) {
                element.classList.add('is-hidden')
            }
        })
        this.selectorElement.classList.toggle('is-hidden')
    }

    onValueUpdate() {
        this.textElement.innerText = this.value !== null ? this.textElementGetter ? this.textElementGetter(this.value) : `${this.value}` : this.emptyValue
        const prevActiveOption = this.rootElement.querySelector('.selector__option.is-active')
        if (prevActiveOption) {
            this.rootElement.querySelector('.selector__option.is-active').classList.remove('is-active')
        }

        this.rootElement.querySelector(`.selector__option.selector__option--${this.value}`)?.classList.add('is-active')
        this.rootElement.querySelectorAll('.selector__button').forEach(element => element.classList.remove('is-disabled'))
        this.onChange(this.value)
    }

    /**
     * @param {number} year 
     */
    onOptionPress(year) {
        this.value = year
        this.onValueUpdate()
        if (device_type === 'desktop') {
            const timeout = setTimeout(() => {
                this.onToggleDropdown()
                clearTimeout(timeout)
            }, 100)
        } else {

            this.enableSubmit()
        }
    }

    onNextYear() {
        this.value = this.value + 1
        this.onValueUpdate()
    }

    onPrevYear() {
        this.value = this.value - 1
        this.onValueUpdate()
    }

    setOnChange(handler) {
        this.onChange = handler
    }

    setValue(newValue) {
        this.value = newValue
        this.onValueUpdate()
    }

    reset() {
        this.value = null
        this.rootElement.querySelectorAll('.selector__button').forEach(element => element.classList.add('is-disabled'))
        this.onValueUpdate()
        if (device_type === 'mobile') {
            this.disableSubmit()
        }
    }
}