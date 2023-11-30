class MultiPicker {
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
        this.resetButton = document.querySelector(`#picker`).querySelector('.picker__reset')
        this.submitButton = document.querySelector(`#picker`).querySelector('.picker__submit')
        this.actionsElement = document.querySelector(`#picker`).querySelector('.picker__action')
        this.from = new DatePicker('input_from', 'dropdown_from', 'start')
        this.to = new DatePicker('input_to', 'dropdown_to', 'end')

        this.from.setOnChange(() => this.onChange())
        this.from.setOnToggleDropdown(v => this.onToggleDropdown(v, 'start'))
        this.to.setOnChange(() => this.onChange())
        this.to.setOnToggleDropdown(v => this.onToggleDropdown(v, 'end'))
        this.resetButton.addEventListener('click', () => this.reset())
        this.submitButton.addEventListener('click', () => this.submit())
    }

    onChange() {
        if (
            typeof this.to.value?.month !== 'undefined' &&
            typeof this.to.value?.year !== 'undefined' &&
            typeof this.to.value?.day !== 'undefined' &&
            typeof this.from.value?.month !== 'undefined' &&
            typeof this.from.value?.year !== 'undefined' &&
            typeof this.from.value?.day !== 'undefined') {
            if (this.to.value.month === this.from.value.month && this.to.value.year === this.from.value.year) {
                console.log(this.from.value.day, this.to.value.day)
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
        }
    }

    /**
     * @param {boolean} state
     * @param {'start' | 'end'} type
     */
    onToggleDropdown(state, type) {
        console.log(state, 'onToggleDropdown')
        if (device_type === 'desktop') { 
            this.from.toggleDropdown(state)
            // if (type === 'start') {
            //     this.from.toggleDropdown(state)
            //     this.isFromExpand = state
            // } else {
            //     this.to.toggleDropdown(state)
            //     this.isToExpand = state
            // }
            // this.toggleActions(this.isFromExpand && this.isToExpand)
        }
        // else {
        //     if (type === 'start') {
        //         this.from.toggleDropdown(state)
        //         this.to.toggleDropdown(!state)
        //         this.isFromExpand = state
        //     } else {
        //         this.to.toggleDropdown(state)
        //         this.from.toggleDropdown(!state)
        //         this.isToExpand = state
        //     }
        //     this.toggleActions(this.isFromExpand || this.isToExpand)
        // }
    }

    /**
     * @param {boolean} state 
     */
    toggleActions(state) {
        if (state) {
            this.actionsElement.classList.remove('is-hidden')
        } else {
            this.actionsElement.classList.add('is-hidden')
        }
    }

    reset() {
        this.from.reset()
        this.to.reset()
    }

    submit() {
        this.from.submit()
        this.to.submit()
    }
}