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

let device_type = window.innerWidth > 640 ? 'desktop' : 'mobile'

window.addEventListener('resize', () => {
    device_type = window.innerWidth > 640 ? 'desktop' : 'mobile'
})