class YearSelector extends TheSelector {
    /**
     * @param {string} id 
     */
    constructor(id) {
        const root = document.querySelector(`#${id}`).querySelector('.input__year')
        super(root, v => v, 'Выберите год')
        this.generateOptions()
    }

    generateOptions() {
        const currentYear = new Date().getFullYear()

        for (let i = 0; i < 20; i++) {
            const optionYear = currentYear - i
            const option = document.createElement('button')
            option.classList = `selector__option selector__option--${optionYear}`
            option.innerText = `${optionYear}`
            option.addEventListener('click', () => this.onOptionPress(optionYear))

            console.assert(currentYear)
            this.selectorElement.querySelector('.selector__list').appendChild(option)
        }
    }
}