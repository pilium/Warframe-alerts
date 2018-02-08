function ftime(s) {
    if (s < 0) return '-'
    var hours   = Math.floor(s / 3600)
    var minutes = Math.ceil((s - (hours * 3600)) / 60)
    
    var result = ''
    if (hours > 0) result = hours.toString() + 'ч'
    result += ' ' + minutes.toString() + 'мин'

    return result
}
debugger;
var isDay = false
document.getElementById('js-cetus-cycle').style.background = "url('img/moon.png') left center no-repeat";
function poeCycle() {
    var poeTimerText = document.getElementById('poe_timer_text');
    var cetusCycle = document.getElementById('js-cetus-cycle');

    var now = Date.now() / 1000 + (10 * 60 - 25)
    var timeThing = 8999.999421
    var localTime = ((24 * (now % timeThing) / timeThing) + 18) % 24

    var tDay = ftime( (16 - localTime) / 24 * timeThing );
    var tNight = ftime( (24 - localTime) / 24 * timeThing );

    if (localTime < 16) {
        if (!isDay) {
            isDay = true
            cetusCycle.style.background = "url('img/sun.png') left center no-repeat";
        }   
        poeTimerText.innerHTML = tDay;
    } else {
        if (isDay) {
            isDay = false
            cetusCycle.style.background = "url('img/moon.png') left center no-repeat";
        }
        poeTimerText.innerHTML = tNight;
    }
}
poeCycle()
setInterval(poeCycle, 1000);