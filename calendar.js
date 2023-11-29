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
        this.generateList()
    }

    /**
     * @param {number} date
     * */
    onPressOption(date) {
        if (this.type === 'start') {
            this.start = date
            this.onChange({
                start: date
            })
        } else {
            this.end = date
            this.onChange({
                end: date
            })
        }
    }

    /**
     * @param {number} date
     * */
    getDayType(date) {
        if (date === this.start || date === this.end) return 'active'
        if (this.start && this.end && date > this.start && date < this.end) return 'selected'
        return 'default'
    }

    generateList() {
        const newList = []
        const dateCount = new Date(this.year, this.month, 0).getDate()
        const firstDay = new Date(this.year, this.month, 0).getDay()
        const lastDay = new Date(this.year, this.month, dateCount).getDay()


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

        if (lastDay !== 0) {
            for (let empty = 0; empty <= 7 - lastDay; empty++) {
                newList.push(null)
            }
        }

        this.list = newList
        this.rootElement.innerHTML = ''
        this.list.forEach(day => {
            const option = document.createElement('button')
            option.classList.add('calendar__option')
            if (day) {
                option.innerText = `${day.id}`
                option.addEventListener('click', () => this.onPressOption(day))
            }
            this.rootElement.appendChild(option)
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
    }

    /**
     * @param {number} newEnd
     * */
    setEnd(newEnd) {
        this.end = newEnd
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
            this.onChange({start: null})
        } else {
            this.end = null
            this.onChange({end: null})
        }
    }
}