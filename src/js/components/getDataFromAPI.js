import { compareTierNum } from "./../helpers/sortFunc.js";
import ftime from  "../helpers/ftime.js";



function getData() {
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

        let data = fetch('https://ws.warframestat.us/pc', myInit)
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
    while (alertsPreviewList.lastChild) {
        alertsPreviewList.removeChild(alertsPreviewList.lastChild)
    }
    while (sortiesPreviewList.lastChild) {
        sortiesPreviewList.removeChild(sortiesPreviewList.lastChild)
    }
    while (breachPreviewList.lastChild) {
        breachPreviewList.removeChild(breachPreviewList.lastChild)
    }
    while (baroPreviewList.lastChild) {
        baroPreviewList.removeChild(baroPreviewList.lastChild)
    }
    while (baroInvetary.lastChild) {
        baroInvetary.removeChild(baroInvetary.lastChild)
    }
    
    let alerts = data.alerts;
    let sorties = data.sortie;
    let breaches = data.fissures;
    let baro = data.voidTrader;

    
    alerts.forEach((alert) => {
        let done = createItem(alert.mission.type, alert.mission.faction, alert.mission.reward.asString, alert.expiry);
        alertsPreviewList.appendChild(done);
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
    let done = createItem(breach.enemy,breach.missionType, breach.tier, breach.expiry);
    breachPreviewList.appendChild(done);
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
function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => (element[key] = props[key]));

    console.log(tag, children);

    if (children.length > 0) {
      children.forEach(child => {
        if (typeof child === "string") {
          child = document.createTextNode(child);
        }

        element.appendChild(child);
      });
    }

    return element;
  }
  function createItem(item1, item2, item3, item4) {
    let b = Date.parse(item4);
    let eta = expiry(b);
    const p1 = createElement(
        "p",
        {className: "alertsText"},
        `${item1}`
    );
    const p2 = createElement(
        "p",
        {className: "alertsText"},
        `${item2}`
    );
    const p3 = createElement(
        "p",
        {className: "alertsText"},
        `${item3}`
    );
    const p4 = createElement(
        "p",
        {className: "alertsText"},
        `${eta}`
    );
    const listItem = createElement(
        "li",
        { className: "todo-item" },
        p1,
        p2,
        p3,
        p4
    );
    return listItem;             
}
 })

timer = setTimeout(tick, 1000);
}, 100);