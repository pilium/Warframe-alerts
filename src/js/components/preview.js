import { compareTierNum } from "./../helpers/sortFunc.js";
import { getData } from "./getDataFromAPI.js";
import ftime from  "../helpers/ftime.js";


let getAPIData = new getData();

let data = getAPIData.fetch().then(function(result) {    
    setDataFromApi(result);
 })
 
function setDataFromApi(data) {

    const alertsPreviewList = document.querySelector('.alerts-preview-list');
    const sortiesPreviewList = document.querySelector('.sorties-preview-list');
    const breachPreviewList = document.querySelector('.breach-preview-list');
    
    let alerts = data.alerts;
    let sorties = data.sortie;
    let breaches = data.fissures;

    
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
    let li = document.createElement('li'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p');
    li.style.padding = '10px';
    p1.innerHTML = `${sorties.faction}`;
    p3.innerHTML = `${sorties.variants[0].missionType}, ${sorties.variants[1].missionType}, ${sorties.variants[2].missionType}`;
    let s = Date.parse(sorties.expiry);
    let eta = expiry(s);
    p4.innerHTML = `${eta}`;
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);

    sortiesPreviewList.appendChild(li);
    
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
       
}
function expiry(ex) {
    let now = Date.now() /1000;
    let expiry = ex / 1000;
    let diff = expiry - now;
    console.log(diff);
    let b = ftime(diff)
    console.log(b);
    return b
    
}