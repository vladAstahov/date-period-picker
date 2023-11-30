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
        this.rootElement = document.querySelector(`#${id}`).querySelector('.calendar')
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
        if (this.month) {
            this.generateList()
        }
    }

    /**
     * @param {number} newMonth
     * */
    setMonth(newMonth) {
        this.month = newMonth
        if (this.year) {
            this.generateList()
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
            this.onChange({ start: null })
        } else {
            this.end = null
            this.onChange({ end: null })
        }
    }
}