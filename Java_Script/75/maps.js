/* global google */
(async function () {
    'use strict';
    const resultList = document.querySelector('#resultList');
    const input = document.querySelector('#input');
    const button = document.querySelector('#button');
    button.addEventListener('click', getData);
    let itemArray = [];
    // Google maps stuff
    let location = { lat: 31.7769, lng: 35.2224 };
    const { Map } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const map = new Map(document.querySelector('#containsMap'), {
        center: location,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapId: 'DEMO_MAP_ID'
    });


    const infoWindow = new google.maps.InfoWindow({

    });

    const marker = new AdvancedMarkerElement({
        map,
        position: location,
        title: 'Jerusalem'
    });

    infoWindow.setContent('The center of the world');

    marker.addListener('click', () => {

        infoWindow.open({
            anchor: marker
        });
    });

    // Get the data
    async function getData(event) {
        event.preventDefault();
        try {
            const r = await fetch(`http://api.geonames.org/wikipediaSearch?q=${input.value}&maxRows=10&username=key&type=json`);
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            const data = await r.json();

            // Remove old data
            const items = document.querySelectorAll('.item');
            items.forEach(element => element.remove());
            itemArray = [];

            // Display new data
            for (let index = 0; index < data.geonames.length; index++) {
                itemArray[index] = document.createElement("li");
                itemArray[index].textContent = data.geonames[index].title;
                if (data.geonames[index].thumbnailImg) {
                    const thumbnail = document.createElement("img");
                    thumbnail.setAttribute('src', data.geonames[index].thumbnailImg);
                    thumbnail.style.display = 'block';
                    itemArray[index].appendChild(thumbnail);
                }
                itemArray[index].classList.add('item');
                itemArray[index].addEventListener('click', () => displaySelection(index));
                resultList.appendChild(itemArray[index]);
            }

            // Display the selected item on the map
            function displaySelection(index) {
                const targetLocation = { lat: data.geonames[index].lat, lng: data.geonames[index].lng };
                map.panTo(targetLocation);
                map.setZoom(15);
                marker.position = targetLocation;
                marker.title = data.geonames[index].title;
                infoWindow.setContent(`${data.geonames[index].summary} For more info see <a href="${data.geonames[index].wikipediaUrl}">wikipedia</a>`);
            }
        }
        catch (e) {
            console.error(e);
        };
    }
}());
