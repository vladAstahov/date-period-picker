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

    /**
     * @param {number} newValue
     */
    set value(newValue) {
        this.#value = newValue
    }

    /**
     * @param {HTMLDivElement} root
     * @param {undefined | (value: number) => string} textGetter 
     */
    constructor(root, textGetter) {
        this.rootElement = root
        this.textElement = this.rootElement.querySelector('.selector__content')
        this.textElementGetter = textGetter
        this.selectorElement = this.rootElement.querySelector('.selector__dropdown')
        this.selectorToggleElement = this.rootElement.querySelector('.selector__dropdown-toggle')
        this.selectorToggleElement.addEventListener('click', () => this.onToggleDropdown())
        this.rootElement.querySelector('.selector__button--left').addEventListener('click', () => this.onPrevYear())
        this.rootElement.querySelector('.selector__button--right').addEventListener('click', () => this.onNextYear())
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
        this.textElement.innerText = this.textElementGetter ? this.textElementGetter(this.value) : `${this.value}`
        const prevActiveOption = this.rootElement.querySelector('.selector__option.is-active')
        if (prevActiveOption) {
            this.rootElement.querySelector('.selector__option.is-active').classList.remove('is-active')
        }
        this.rootElement.querySelector(`.selector__option.selector__option--${this.value}`).classList.add('is-active')
        this.rootElement.querySelectorAll('.selector__button').forEach(element => element.classList.remove('is-disabled'))
    }

    /**
     * @param {number} year 
     */
    onOptionPress(year) {
        this.value = year
        this.onValueUpdate()
        const timeout = setTimeout(() => {
            this.onToggleDropdown()
            clearTimeout(timeout)
        }, 100)
    }

    onNextYear() {
        this.value = this.value + 1
        this.onValueUpdate()
    }

    onPrevYear() {
        this.value = this.value - 1
        this.onValueUpdate()
    }
}