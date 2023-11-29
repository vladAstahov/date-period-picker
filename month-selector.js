const monthMap = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
}

/**
 * @param {number} index
 */
const getMonthByIndex = (index) => {
    return monthMap[index]
}

class MonthSelector extends TheSelector {
    /**
     * @param {string} id 
     */
    constructor(id) {
        const root = document.querySelector(`#${id}`).querySelector('.input__month')
        super(root, getMonthByIndex, 'Выберите месяц')
        this.generateOptions()
    }

    generateOptions() {
        for (let month = 0; month < 12; month++) {
            const option = document.createElement('button')
            option.classList = `selector__option selector__option--${month}`
            option.innerText = `${getMonthByIndex(month)}`
            option.addEventListener('click', () => this.onOptionPress(month))

            this.selectorElement.appendChild(option)
        }
    }
}