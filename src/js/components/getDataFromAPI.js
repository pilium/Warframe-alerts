import { compareTierNum } from "./../helpers/sortFunc.js";
import ftime from  "../helpers/ftime.js";

const status = function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  }

const myInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    data: 'JSON'
};

function getData() {
        var data = fetch('https://ws.warframestat.us/pc', myInit)
        .then(status)
        .then((data) => data.json())
        .catch((error) => {
            console.log('error', error)
        });
    return data;
}
const alertsPreviewList = document.querySelector('.alerts-preview-list');

const sortiesPreviewList = document.querySelector('.sorties-preview-list');
const sortiesItem = document.querySelector('.sorties-item');
const sortiesFaction = document.querySelector('.sorties-faction');
const sortiesVariants = document.querySelector('.sorties-variants');
const sortiesEta = document.querySelector('.sorties-eta');

const breachPreviewList = document.querySelector('.breach-preview-list');

const baroPreviewList = document.querySelector('.baro-preview-list');
const baroInvetary = document.querySelector('.baro-invetary');
const baroItem = document.querySelector('.baro-item');
const baroLocation = document.querySelector('.baro-location');
const baroExpiry = document.querySelector('.baro-expiry');
const baroBtn = document.querySelector('a.trigger');

var timer = setTimeout(function tick() {
let getAPIData = getData();

getAPIData.then(function get(data) {    
    while (alertsPreviewList.firstChild) {
        alertsPreviewList.removeChild(alertsPreviewList.firstChild)
    }
    while (sortiesPreviewList.firstChild) {
        sortiesPreviewList.removeChild(sortiesPreviewList.firstChild)
    }
    while (breachPreviewList.firstChild) {
        breachPreviewList.removeChild(breachPreviewList.firstChild)
    }
    while (baroPreviewList.firstChild) {
        baroPreviewList.removeChild(baroPreviewList.firstChild)
    }
    while (baroInvetary.firstChild) {
        baroInvetary.removeChild(baroInvetary.firstChild)
    }
    
    let alerts = data.alerts;
    let sorties = data.sortie;
    let breaches = data.fissures;
    let baro = data.voidTrader;

    
    alerts.forEach((alert) => {
        let li = document.createElement('li'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p');
        
        p1.innerHTML = `${alert.mission.type}`; 
        p2.innerHTML = `${alert.mission.faction}`;
        p3.innerHTML = `${alert.mission.reward.asString}`;    
        let a = Date.parse(alert.expiry);

        let eta = expiry(a);
        p4.innerHTML = `${eta}`;

        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);

        alertsPreviewList.appendChild(li);

    });

    // Sortie
    sortiesFaction.innerHTML = `${sorties.faction}`;
    sortiesVariants.innerHTML = `${sorties.variants[0].missionType}, ${sorties.variants[1].missionType}, ${sorties.variants[2].missionType}`;
    let s = Date.parse(sorties.expiry);
    
    let eta = expiry(s);
    sortiesEta.innerHTML = `${eta}`;
    
    sortiesItem.appendChild(sortiesFaction);
    sortiesItem.appendChild(sortiesVariants);
    sortiesItem.appendChild(sortiesEta);

    sortiesPreviewList.appendChild(sortiesItem);
    
    // BREACHES
    breaches.sort(compareTierNum);
    breaches.forEach((breach) => {
        let li = document.createElement('li'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p');

    p1.innerHTML = `${breach.enemy}`; 
    p2.innerHTML = `${breach.missionType}`;
    p3.innerHTML = `${breach.tier}`;
    let b = Date.parse(breach.expiry);
    let eta = expiry(b);
    p4.innerHTML = eta;
    li.dataset.sort = `${breach.tierNum}`; 


    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    breachPreviewList.appendChild(li);
    });

    //Baro       
    if(baro.active) {
        baroBtn.style.display = 'inline-block';
        let inv = baro.inventory;
        baroLocation.innerHTML = `${baro.location}`;
        baroExpiry.innerHTML = `${baro.endString}`;
    
        inv.forEach((an) => {
            let li = document.createElement('li'),
                p1 = document.createElement('p'),
                p2 = document.createElement('p'),
                p3 = document.createElement('p');

            p1.innerHTML = `${an.item}`;
            p2.innerHTML = `${an.ducats}`;
            p3.innerHTML = `${an.credits}`;
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        baroInvetary.appendChild(li);
        })
    } else {
        baroBtn.style.display = 'none';
        baroLocation.innerHTML = `${baro.location}`;
        baroExpiry.innerHTML = `${baro.startString}`.substr(0, 7);
    }
        

    baroItem.appendChild(baroLocation);
    baroItem.appendChild(baroExpiry);
   
    baroPreviewList.appendChild(baroItem);
    
    
    
function expiry(ex) {
    let now = Date.now() /1000;
    let expiry = ex / 1000;
    
    let diff = expiry - now;
    let b = ftime(diff)

    return b
    
}
 })

timer = setTimeout(tick, 1000);
}, 100);