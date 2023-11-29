class MultiPicker {
    /**
     * @type {DatePicker}
     * */
    #from
    /**
     * @type {DatePicker}
     * */
    #to

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

    constructor() {
        this.from = new DatePicker('input_from', 'start')
        this.to = new DatePicker('input_to', 'end')
        this.from.setOnChange((fromValue) => {
            if (
                typeof this.to.value?.month !== 'undefined' &&
                typeof this.to.value?.year !== 'undefined' &&
                typeof this.to.value?.day !== 'undefined' &&
                typeof fromValue.month !== 'undefined' &&
                typeof fromValue.year !== 'undefined' &&
                typeof fromValue.day !== 'undefined') {
                if (this.to.value.month === fromValue.month && this.to.value.year === fromValue.year) {
                    this.to.updateValue({
                        start: fromValue.day
                    })
                } else if (typeof toValue.day !== 'undefined') {
                    this.to.updateValue({
                        start: 0
                    })
                }
            }
        })
        this.to.setOnChange((toValue) => {
            if (
                typeof this.from.value?.month !== 'undefined' &&
                typeof this.from.value?.year !== 'undefined' &&
                typeof this.from.value?.day !== 'undefined' &&
                typeof toValue.month !== 'undefined' &&
                typeof toValue.year !== 'undefined' &&
                typeof toValue.day !== 'undefined') {
                if (toValue.month === this.from.value.month && toValue.year === this.from.value.year) {
                    this.from.updateValue({
                        end: toValue.day
                    })
                } else if (typeof toValue.day !== 'undefined') {
                    this.from.updateValue({
                        end: 32
                    })
                }
            }
        })
    }
}