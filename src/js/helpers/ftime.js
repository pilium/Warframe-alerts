export default function ftime(s) {
    if (s < 0) return '-'
    var hours   = Math.floor(s / 3600)
    var minutes = Math.ceil((s - (hours * 3600)) / 60)
    
    var result = ''
    if (hours > 0) result = hours.toString() + 'ч'
    result += ' ' + minutes.toString() + 'мин'

    return result
}