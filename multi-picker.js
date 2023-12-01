class MultiPicker {
    /**
     * @type {HTMLDivElement}
     * */
    #root
    /**
     * @type {DatePicker}
     * */
    #from
    /**
     * @type {DatePicker}
     * */
    #to
    /**
     * @type {boolean}
     */
    #isToExpand
    /**
     * @type {boolean}
     */
    #isFromExpand
    /**
     * @type {HTMLButtonElement}
     * */
    #resetButton
    /**
     * @type {HTMLButtonElement}
     * */
    #submitButton
    /**
     * @type {HTMLDivElement}
     * */
    #actionsElement

    get root() {
        return this.#root
    }

    set root(element) {
        this.#root = element
    }

    get from() {
        return this.#from
    }

    set from(obj) {
        this.#from = obj
    }

    get to() {
        return this.#to
    }

    set to(obj) {
        this.#to = obj
    }

    get resetButton() {
        return this.#resetButton
    }

    set resetButton(element) {
        this.#resetButton = element
    }

    get submitButton() {
        return this.#submitButton
    }

    set submitButton(element) {
        this.#submitButton = element
    }

    get isToExpand() {
        return this.#isToExpand
    }

    set isToExpand(state) {
        this.#isToExpand = state
    }

    get isFromExpand() {
        return this.#isFromExpand
    }

    set isFromExpand(state) {
        this.#isFromExpand = state
    }

    get actionsElement() {
        return this.#actionsElement
    }

    set actionsElement(element) {
        this.#actionsElement = element
    }

    constructor() {
        this.root = document.querySelector(`#picker`)
        this.resetButton = this.root.querySelector('.picker__reset')
        this.submitButton = this.root.querySelector('.picker__submit')
        this.actionsElement = this.root.querySelector('.picker__action')
        this.from = new DatePicker('input_from', 'dropdown_from', 'start')
        this.to = new DatePicker('input_to', 'dropdown_to', 'end')

        this.from.setOnChange(() => this.onChange())
        this.from.setOnToggleDropdown(v => this.onToggleDropdown(v, 'start'))
        this.to.setOnChange(() => this.onChange())
        this.to.setOnToggleDropdown(v => this.onToggleDropdown(v, 'end'))
        this.resetButton.addEventListener('click', () => this.reset())
        this.submitButton.addEventListener('click', () => this.submit())

        // const currentDate = new Date()
        // this.to.setInititalValue({
        //     day: currentDate.getDate(),
        //     month: currentDate.getMonth(),
        //     year: currentDate.getFullYear(),
        //     end: currentDate.getDate()
        // })
        // this.to.submit()
    }

    isToFilled() {
        return typeof this.to.value?.month !== 'undefined' &&
            typeof this.to.value?.year !== 'undefined' &&
            typeof this.to.value?.day !== 'undefined'
    }

    isFromFilled() {
        return typeof this.from.value?.month !== 'undefined' &&
            typeof this.from.value?.year !== 'undefined' &&
            typeof this.from.value?.day !== 'undefined'
    }

    onChange() {
        if (
            this.isToFilled() &&
            this.isFromFilled() &&
            this.to.value.month >= this.from.value.month && this.to.value.year >= this.from.value.year) {
            if (this.to.value.month === this.from.value.month && this.to.value.year === this.from.value.year) {
                this.to.updateValue({
                    start: this.from.value.day
                })
                this.from.updateValue({
                    end: this.to.value.day
                })
            } else {
                this.to.updateValue({
                    start: 0
                })
                this.from.updateValue({
                    end: 32
                })
            }
            this.enableSubmitButton()
            this.enableResetButton()
        }
        if (this.isToFilled() && this.actionsElement.classList.contains('is-right')) {
            this.enableSubmitButton()
            this.enableResetButton()
        }
        if (this.isFromFilled() && this.actionsElement.classList.contains('is-left')) {
            this.enableSubmitButton()
            this.enableResetButton()
        }
    }

    enableSubmitButton() {
        this.submitButton.classList.remove('is-disabled')
        this.resetButton.classList.remove('is-disabled')
    }

    disableSubmitButton() {
        this.submitButton.classList.add('is-disabled')
        this.resetButton.classList.add('is-disabled')
    }

    enableResetButton() {
        this.submitButton.classList.remove('is-disabled')
    }

    disableResetButton() {
        if (!this.resetButton.classList.contains('is-disabled')) {
            this.resetButton.classList.add('is-disabled')
        }
    }

    /**
     * @param {boolean} state
     * @param {'start' | 'end'} type
     */
    onToggleDropdown(state, type) {
        if (device_type === 'desktop') {
            if (type === 'start') {
                this.from.toggleDropdown(state)
                this.isFromExpand = state
            } else {
                this.to.toggleDropdown(state)
                this.isToExpand = state
            }
            this.toggleActions()
        }
        else {
            if (type === 'start') {
                this.from.toggleDropdown(state)
                if (state) {
                    this.to.toggleDropdown(!state)
                    this.isToExpand = !state
                }
                this.isFromExpand = state
            } else {
                this.to.toggleDropdown(state)
                if (state) {
                    this.from.toggleDropdown(!state)
                    this.isFromExpand = !state
                }
                this.isToExpand = state
            }
            this.toggleActions()
        }
    }

    toggleActions() {
        if (this.isFromExpand && this.isToExpand) {
            this.actionsElement.classList.remove('is-left')
            this.actionsElement.classList.remove('is-right')
            this.actionsElement.classList.add('is-both')
            this.actionsElement.classList.remove('is-hidden')
        } else if (this.isFromExpand) {
            this.actionsElement.classList.add('is-left')
            this.actionsElement.classList.remove('is-right')
            this.actionsElement.classList.remove('is-both')
            this.actionsElement.classList.remove('is-hidden')
        } else if (this.isToExpand) {
            this.actionsElement.classList.add('is-right')
            this.actionsElement.classList.remove('is-left')
            this.actionsElement.classList.remove('is-both')
            this.actionsElement.classList.remove('is-hidden')
        } else {
            this.actionsElement.classList.add('is-hidden')
            this.actionsElement.classList.remove('is-left')
            this.actionsElement.classList.remove('is-right')
            this.actionsElement.classList.remove('is-both')
        }
    }

    reset() {
        if (this.isFromExpand && this.isToExpand) {
            this.from.reset()
            this.to.reset()
            this.disableSubmitButton()
            this.disableResetButton()
            this.isFromExpand = false
            this.isToExpand = false
        } else if (this.isFromExpand) {
            this.from.reset()
            this.disableSubmitButton()
            this.disableResetButton()
            this.isFromExpand = false
        } else {
            this.to.reset()
            this.disableSubmitButton()
            this.disableResetButton()
            this.isToExpand = false
        }
        this.toggleActions()
        this.removeErrors()
    }

    removeErrors() {
        this.root.querySelector('.error__different').classList.add('is-hidden')
        this.root.querySelector('.error__current-date').classList.add('is-hidden')
    }

    validate() {
        if (this.isFromFilled() && this.isToFilled()) {
            const fromDate = new Date(this.from.value.year, this.from.value.month, this.from.value.day)
            const toDate = new Date(this.to.value.year, this.to.value.month, this.to.value.day)
            const currentDate = new Date()

            console.log(fromDate, 'fromDate')
            console.log(toDate, 'toDate')
            if (currentDate < toDate || currentDate < fromDate) {
                this.root.querySelector('.error__current-date').classList.remove('is-hidden')
                return
            }
            if (fromDate > toDate) {
                this.root.querySelector('.error__different').classList.remove('is-hidden')
                return
            }

            console.log('valid')
        }
    }

    submit() {
        if (this.isFromExpand && this.isToExpand) {
            this.from.submit()
            this.to.submit()
            this.isFromExpand = false
            this.isToExpand = false
        } else if (this.isFromExpand) {
            this.from.submit()
            this.isFromExpand = false
        } else {
            this.to.submit()
            this.isToExpand = false
        }
        this.toggleActions()
        this.disableSubmitButton()
        this.removeErrors()
        this.validate()
    }
}