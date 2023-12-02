/**
 * @typedef {Object} Day
 * @param {number} id
 * @param {'default' | 'active' | 'selected'} type
 */

/**
 * @typedef {'start' | 'end'} CalendarType
 * */

class Calendar {
    /**
     * @type {HTMLDivElement}
     * */
    #calendarElement
    /**
     * @type {HTMLDivElement}
     * */
    #rootElement
    /**
     * @type {(Day | null)[]}
     */
    #list = []
    /**
     * @type {number}
     * */
    #month
    /**
     * @type {number}
     * */
    #year
    /**
     * @type {number | null}
     * */
    #start = null
    /**
     * @type {number | null}
     * */
    #end = null
    /**
     * @type {CalendarType}
     * */
    #type = 'start'
    /**
     * @type {(date: {start?: number, end?: number}) => void}
     * */
    #onChange

    get calendarElement() {
        return this.#calendarElement
    }

    set calendarElement(element) {
        this.#calendarElement = element
    }

    get rootElement() {
        return this.#rootElement
    }

    set rootElement(element) {
        this.#rootElement = element
    }

    get list() {
        return this.#list
    }

    set list(newList) {
        this.#list = newList
    }

    get month() {
        return this.#month
    }

    set month(newMonth) {
        this.#month = newMonth
    }

    get year() {
        return this.#year
    }

    set year(newYear) {
        this.#year = newYear
    }

    get start() {
        return this.#start
    }

    set start(value) {
        this.#start = value
    }

    get end() {
        return this.#end
    }

    set end(value) {
        this.#end = value
    }

    get type() {
        return this.#type
    }

    set type(type) {
        this.#type = type
    }

    get onChange() {
        return this.#onChange
    }

    set onChange(handler) {
        this.#onChange = handler
    }

    /**
     * @param {string} id
     * @param {CalendarType} type
     */
    constructor(id, type) {
        this.calendarElement = document.querySelector(`#${id}`).querySelector('.calendar')
        this.rootElement = this.calendarElement.querySelector('.calendar__list')
        this.type = type
    }

    /**
     * @param {number} date
     * */
    onPressOption(date) {
        if (this.type === 'start') {
            this.start = date.id
            this.onChange(date.id)
        } else {
            this.end = date.id
            this.onChange(date.id)
        }
        this.onBreakProintsChange()
    }

    /**
     * @param {number} date
     * */
    getDayType(date) {
        if (date === this.start || date === this.end) return 'active'
        if (typeof this.start === 'number' && typeof this.end === 'number' && date > this.start && date < this.end) return 'selected'
        return 'default'
    }

    generateList() {
        const newList = []
        const dateCount = new Date(this.year, this.month, 0).getDate()
        const firstDay = new Date(this.year, this.month, 0).getDay()

        if (firstDay !== 1) {
            for (let empty = 0; empty < firstDay; empty++) {
                newList.push(null)
            }
        }

        for (let date = 1; date < dateCount; date++) {
            newList.push({
                id: date,
                type: this.getDayType(date)
            })
        }

        const emptyEndLength = newList.length % 7 ? 7 - newList.length % 7 : 0

        for (let emptyEnd = 1; emptyEnd <= emptyEndLength; emptyEnd++) {
            newList.push(null)
        }

        this.list = newList
        this.rootElement.innerHTML = ''
        this.list.forEach(day => {
            const option = document.createElement('button')
            option.classList.add(`calendar__option`)
            if (day) {
                option.innerText = `${day.id}`
                option.addEventListener('click', () => this.onPressOption(day))
            }
            this.rootElement.appendChild(option)
        })
    }

    onBreakProintsChange() {
        this.rootElement.childNodes.forEach(dayButton => {
            if (Number(dayButton.innerText)) {
                dayButton.classList = `calendar__option calendar__option--${this.getDayType(Number(dayButton.innerText))}`
            }
        })
    }

    /**
     * @param {number} newYear
     * */
    setYear(newYear) {
        this.year = newYear

        const isMonth = typeof this.month !== 'undefined' && this.month !== null
        const isYear = typeof this.year !== 'undefined' && this.year !== null
        const isCalendar = isMonth && isYear

        if (isCalendar) {
            this.generateList()
            this.calendarElement.classList.remove('is-hidden')
        } else {
            if (!this.calendarElement.classList.contains('is-hidden')) {
                this.calendarElement.classList.add('is-hidden')
            }
        }
    }

    /**
     * @param {number} newMonth
     * */
    setMonth(newMonth) {
        this.month = newMonth

        const isMonth = typeof this.month !== 'undefined' && this.month !== null
        const isYear = typeof this.year !== 'undefined' && this.year !== null
        const isCalendar = isMonth && isYear

        if (isCalendar) {
            this.generateList()
            this.calendarElement.classList.remove('is-hidden')
        } else {
            if (!this.calendarElement.classList.contains('is-hidden')) {
                this.calendarElement.classList.add('is-hidden')
            }
        }
    }

    /**
     * @param {number} newStart
     * */
    setStart(newStart) {
        this.start = newStart
        this.onBreakProintsChange()
    }

    /**
     * @param {number} newEnd
     * */
    setEnd(newEnd) {
        this.end = newEnd
        this.onBreakProintsChange()
    }

    show() {
        this.rootElement.classList.remove('is-hidden')
    }

    hide() {
        this.rootElement.classList.add('is-hidden')
    }

    setOnChange(handler) {
        this.onChange = handler
    }

    reset() {
        if (this.type === 'start') {
            this.start = null
            this.onChange(null)
        } else {
            this.end = null
            this.onChange(null)
        }
    }
}