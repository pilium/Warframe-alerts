
import { getData } from "./getDataFromAPI.js";
let getAPIData = new getData();
let data = getAPIData.fetch().then(function(result) {
    setDataFromApi(result);
    console.log(result.alerts[0].eta)
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
            p4 = document.createElement('p'),
            p5 = document.createElement('p');
        p1.innerHTML = `${alert.mission.type}`; 
        p2.innerHTML = `${alert.mission.faction}`;
        p3.innerHTML = `${alert.mission.reward.asString}`;
        // p4.innerHTML = `Уровни: ${alert.mission.minEnemyLevel}  -  ${alert.mission.maxEnemyLevel}`;
        p5.innerHTML = `${alert.eta}`;
        

        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        // li.appendChild(p4);
        li.appendChild(p5);
        
        alertsPreviewList.appendChild(li);
    });

    // Sortie
    let li = document.createElement('li'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p');
    li.style.padding = '50px';
    p1.innerHTML = `${sorties.faction}`;
    if (sorties.boss) {
        p2.innerHTML = `${sorties.boss}`;
    }
    p3.innerHTML = `${sorties.variants[0].missionType}, ${sorties.variants[1].missionType}, ${sorties.variants[2].missionType}`;
    p4.innerHTML = `${sorties.eta}`;
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);

    sortiesPreviewList.appendChild(li);
    
    // BREACHES
    breaches.forEach((breach) => {
        let li = document.createElement('li'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            p4 = document.createElement('p');

    p1.innerHTML = `${breach.enemy}`; 
    p2.innerHTML = `${breach.missionType}`;
    p3.innerHTML = `${breach.tier}`;
    p4.innerHTML = breach.eta;
    li.dataset.sort = `${breach.tierNum}`; 


    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    breachPreviewList.appendChild(li);
    });
}