class DatePicker {
    /**
     * @type {HTMLButtonElement}
     * */
    #clearButton
    /**
     * @type {HTMLButtonElement}
     * */
    #togglePickerButton
    /**
     * @type {HTMLDivElement}
     * */
    #dropdown
    /**
     * @type {{ day?: number, month?: number, year?: number }}
     * */
    #value
    /**
     * @type {(value: { day?: number, month?: number, year?: number }) => void}
     * */
    #onChange
    /**
     * @type {Field}
     * */
    #field
    /**
     * @type {YearSelector}
     * */
    #yearPicker
    /**
     * @type {MonthSelector}
     * */
    #monthPicker
    /**
     * @type {Calendar}
     * */
    #calendar
    /**
     * @type {(value: boolean) => void}
     */
    #onToggleDropdown

    get clearButton() {
        return this.#clearButton
    }

    set clearButton(element) {
        this.#clearButton = element
    }

    get togglePickerButton() {
        return this.#togglePickerButton
    }

    set togglePickerButton(element) {
        this.#togglePickerButton = element
    }

    get dropdown() {
        return this.#dropdown
    }

    set dropdown(element) {
        this.#dropdown = element
    }

    get value() {
        return this.#value
    }

    /**
     * @param {{ day?: number, month?: number, year?: number }} partial
     * */
    set value(partial) {
        this.#value = {
            ...this.#value,
            ...partial
        }
    }

    get onChange() {
        return this.#onChange
    }

    set onChange(handler) {
        this.#onChange = handler
    }

    get field() {
        return this.#field
    }

    set field(element) {
        this.#field = element
    }

    get yearPicker() {
        return this.#yearPicker
    }

    set yearPicker(element) {
        this.#yearPicker = element
    }

    get monthPicker() {
        return this.#monthPicker
    }

    set monthPicker(element) {
        this.#monthPicker = element
    }

    get calendar() {
        return this.#calendar
    }

    set calendar(element) {
        this.#calendar = element
    }

    get onToggleDropdown() {
        return this.#onToggleDropdown
    }

    set onToggleDropdown(handler) {
        this.#onToggleDropdown = handler
    }

    /**
     * @param {string} id
     * @param {string} dropdownId
     * @param {'start' | 'end'} type
     * */
    constructor(id, dropdownId, type) {
        this.dropdown = document.querySelector(`#${dropdownId}`)
        this.clearButton = document.querySelector(`#${id}`).querySelector('.input__clear')
        this.clearButton.addEventListener('click', () => this.reset())
        this.togglePickerButton = document.querySelector(`#${id}`).querySelector('.input__toggle-picker')
        this.togglePickerButton.addEventListener('click', () => this.togglePicker())
        this.field = new Field(id)
        this.yearPicker = new YearSelector(dropdownId)
        this.monthPicker = new MonthSelector(dropdownId)
        this.calendar = new Calendar(dropdownId, type)

        this.yearPicker.setOnChange((year) => {
            this.calendar.setYear(year)
            this.value = { year }

            this.onChange({
                ...this.value,
                start: type === 'start' ? this.value.day : undefined,
                end: type === 'end' ? this.value.day : undefined
            })
        })
        this.monthPicker.setOnChange((month) => {
            console.log(month, 'month')
            this.calendar.setMonth(month)
            this.value = { month }

            this.onChange({
                ...this.value,
                start: type === 'start' ? this.value.day : undefined,
                end: type === 'end' ? this.value.day : undefined
            })
        })
        this.calendar.setOnChange((day) => {
            this.value = { day }

            this.onChange({
                ...this.value,
                start: type === 'start' ? this.value.day : undefined,
                end: type === 'end' ? this.value.day : undefined
            })
        })
        this.field.setOnChange((fieldValue) => {
            this.value = {
                day: Number(fieldValue.split('.')[0]),
                month: Number(fieldValue.split('.')[1]),
                year: Number(fieldValue.split('.')[2]),
            }
            this.yearPicker.setValue(this.value.year)
            this.monthPicker.setValue(this.value.month - 1)
            if (type === 'start') {
                this.calendar.setStart(this.value.day)
            } else {
                this.calendar.setEnd(this.value.day)
            }

            this.onChange({
                ...this.value,
                start: type === 'start' ? this.value.day : undefined,
                end: type === 'end' ? this.value.day : undefined
            })
        })
        this.field.setOnFieldFocus(() => this.onToggleDropdown(true))
    }

    /**
    * @param {{ day?: number, month?: number, year?: number, start?: number, end?: number }} partial
    * */
    updateValue({ start, end, ...partial }) {
        this.value = partial
        if (typeof start !== 'undefined') {
            this.calendar.setStart(start)
        }
        if (typeof end !== 'undefined') {
            this.calendar.setEnd(end)
        }
    }

    /**
    * @param {{ day?: number, month?: number, year?: number, start?: number, end?: number }} partial
    * */
    setInititalValue({ start, end, ...partial }) {
        this.value = {
            ...this.value,
            ...partial
        }
        this.monthPicker.setValue(this.value.month)
        this.yearPicker.setValue(this.value.year)
        if (typeof start !== 'undefined') {
            this.calendar.setStart(start)
        }
        if (typeof end !== 'undefined') {
            this.calendar.setEnd(end)
        }
    }

    setOnChange(changeHandler) {
        this.onChange = changeHandler
    }

    setOnToggleDropdown(onOpenHandler) {
        this.onToggleDropdown = onOpenHandler
    }

    reset() {
        this.field.reset()
        this.yearPicker.reset()
        this.monthPicker.reset()
        this.calendar.reset()
        this.hideDropdown()
        this.clearButton.classList.add('is-hidden')
        this.value = {
            day: undefined,
            month: undefined,
            year: undefined
        }
    }

    togglePicker() {
        console.log('togglePicker', this.dropdown.classList.contains('is-hidden'))
        this.onToggleDropdown(this.dropdown.classList.contains('is-hidden'))
    }

    /**
     * @param {boolean} value 
     */
    toggleDropdown(value) {
        console.log(value, 'toggleDropdown')
        if (value) {
            this.dropdown.classList.remove('is-hidden')
        } else {
            this.dropdown.classList.add('is-hidden')
        }
    }

    hideDropdown() {
        if (!this.dropdown.classList.contains('is-hidden')) {
            this.dropdown.classList.add('is-hidden')
        }
    }

    submit() {
        this.field.setValue(this.value)
        this.clearButton.classList.remove('is-hidden')
        this.hideDropdown()
    }
}