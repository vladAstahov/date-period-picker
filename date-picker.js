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

    /**
     * @param {string} id
     * @param {'start' | 'end'} type
     * */
    constructor(id, type) {
        this.dropdown = document.querySelector(`#${id}`).querySelector('.input__dropdown')
        this.clearButton = document.querySelector(`#${id}`).querySelector('.input__clear')
        this.clearButton.addEventListener('click', () => this.reset())
        this.togglePickerButton = document.querySelector(`#${id}`).querySelector('.input__toggle-picker')
        this.togglePickerButton.addEventListener('click', () => this.togglePicker())
        this.field = new Field(id)
        this.yearPicker = new YearSelector(id)
        this.monthPicker = new MonthSelector(id)
        this.calendar = new Calendar(id, type)
        console.log(this.calendar)

        this.yearPicker.setOnChange((year) => {
            console.log(this.calendar)
            this.calendar.setYear(year)
            this.value = { year }

            this.onChange({
                ...this.value,
                start: type === 'start' ? this.value.day : undefined,
                end: type === 'end' ? this.value.day : undefined
            })
        })
        this.monthPicker.setOnChange((month) => {
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
    }

    /**
    * @param {{ day?: number, month?: number, year?: number, start?: number, end?: number }} partial
    * */
    updateValue({ start, end, ...partial }) {
        this.value = {
            ...this.value,
            ...partial
        }
        console.log(start, end, 'PARTIAL')
        if (start) {
            this.calendar.setStart(start)
        }
        if (end) {
            this.calendar.setEnd(end)
        }
    }

    setOnChange(changeHandler) {
        this.onChange = changeHandler
    }

    reset() {
        this.field.reset()
        this.yearPicker.reset()
        this.monthPicker.reset()
        this.calendar.reset()
    }

    togglePicker() {
        this.dropdown.classList.toggle('is-hidden')
    }
}