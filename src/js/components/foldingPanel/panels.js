import { getData } from "./../getDataFromAPI.js";
let getIData = new getData();
getIData.fetch().then(function(result) {
    addContent(result);
 })
function addContent(data) {
	const foldingContent = document.querySelector('.cd-fold-content');

	var gallery = document.querySelector('.cd-gallery'),
		foldingPanel = document.querySelector('.cd-folding-panel'),
		moreButtons = document.querySelectorAll('button.more'),
		closeButton = document.querySelector('.cd-close'),
		mainContent = document.querySelector('.cd-main');

	/* open folding content */
	moreButtons.forEach((moreButton) => {
		moreButton.addEventListener('click', function(event) {
			event.preventDefault();
			openItemInfo(this.getAttribute('data-type'));
		})
	})
	
	/* close folding content */
	foldingPanel.addEventListener('click',  function (event) {
		if (event.target == closeButton) {
			event.preventDefault();
			toggleContent('', false);
		}
	}, true);
	gallery.addEventListener('click', function (event) {
		/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
		if (event.target == '.cd-gallery' && document.querySelector('.fold-is-open').length > 0) {
			toggleContent('', false)
		}
	})

	function openItemInfo(url) {
		toggleContent(url, true);
	}
	
	function toggleContent(url, bool) {
		if (bool) {
			addDataToPanel();
			setTimeout(function () {
				document.body.classList.add('overflow-hidden');
				foldingPanel.classList.add('is-open');
				mainContent.classList.add('fold-is-open');
			}, 100);
		} else {
			/* close the folding panel */
			foldingPanel.classList.remove('is-open');
			mainContent.classList.remove('fold-is-open');
		}
		function addDataToPanel() {
			while (foldingContent.firstChild) {
				foldingContent.removeChild(foldingContent.firstChild)
			}
			if (url === 'alerts') {
				let alerts = data.alerts;
				const ul = document.createElement('ul');
				ul.classList.add('folding-panel--list');

				alerts.forEach((alert) => {
					let	li = document.createElement('li'),
						img = document.createElement('img'),
						p1 = document.createElement('p'),
						p2 = document.createElement('p'),
						p3 = document.createElement('p'),
						p4 = document.createElement('p'),
						p5 = document.createElement('p'),
						p6 = document.createElement('p');
					
					img.setAttribute('src', alert.mission.reward.thumbnail);
					p6.innerHTML = `${alert.eta}`;
					p2.innerHTML = `${alert.mission.reward.asString}`;
					p3.innerHTML = `${alert.mission.type}`;
					p4.innerHTML = `${alert.mission.faction}`;
					p5.innerHTML = `Уровни Врагов: ${alert.mission.minEnemyLevel}  -  ${alert.mission.maxEnemyLevel}`;
					p1.innerHTML = `${alert.mission.node}`;
					
					li.appendChild(img)
					li.appendChild(p1);
					li.appendChild(p2);
					li.appendChild(p3);
					li.appendChild(p4);
					li.appendChild(p5);
					li.appendChild(p6);
					ul.appendChild(li);
				});
				
				foldingContent.appendChild(ul);
				
			} else if(url === 'sorties') {
				let sorties = data.sortie;
				let missions = data.sortie.variants;
				const ul = document.createElement('ul');
				ul.classList.add('folding-panel--list');

				missions.forEach((mission) => {
					let	li = document.createElement('li'),
						h2 = document.createElement('h2'),
						p1 = document.createElement('p'),
						p2 = document.createElement('p'),
						p3 = document.createElement('p'),
						p4 = document.createElement('p'),
						p5 = document.createElement('p');
					
					h2.classList.add('sorties-date');
					p2.innerHTML = `${mission.modifier}`;
					p3.innerHTML = `${mission.modifierDescription}`;
					p4.innerHTML = `${mission.node}`;
					p1.innerHTML = `${mission.missionType}`;
					
					li.appendChild(h2);
					li.appendChild(p1);
					li.appendChild(p2);
					li.appendChild(p3);
					li.appendChild(p4);
					ul.appendChild(li);
				});
				foldingContent.appendChild(ul);
			} else {
				
			}
			return foldingContent
			
		}
	}
}
