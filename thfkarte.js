  'use strict';

  import zaehlung from './birds.js'

  let meinmarker;

  let map = L.map('map').setView([52.4728, 13.404], 14.35);

  let OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright ">OpenStreetMap</a> contributors'
  }).addTo(map);


  ///// SET MARKERS /////

  let marker1 = L.marker([52.46664960695899, 13.400390961321909]).addTo(map);
  marker1.bindPopup("Aussichtsplattform ").openPopup();

  let marker2 = L.marker([52.47405425600462, 13.41576773261861]).addTo(map);
  marker2.bindPopup("Aussichtsplattform ").openPopup();

  let marker3 = L.marker([52.472061562306195, 13.387803735400057]).addTo(map);
  marker3.bindPopup("Aussichtsplattform ").openPopup();



  ///// LOCATE //////

  function onLocationFound(e) {
      // CUSTOM ICON //
      const myCustomColour = 'white'

      const markerHtmlStyles = `
            background-color: ${myCustomColour};
        
            width: 3rem;
            height: 3rem;
            display: block;
            left: -1.5rem;
            top: -1.8rem;
            position: relative;
            border-radius: 3rem 3rem 0;
            transform: rotate(45deg);
            border: 3px solid #FFFFFF`

      const meinicon = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 30],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -20],
          html: `<span style="${markerHtmlStyles}" />`
      })



      //
      let radius = e.accuracy / 2;
      let location = e.latlng
      meinmarker = L.marker(location, {
          draggable: true,
          icon: meinicon,

      });
      meinmarker.bindPopup("<b>Hier bist du gerade</b><br>Wenn du die Vögel woanders gesichtet hast, verschiebe einfach den Marker.").openPopup();

      meinmarker.addTo(map);
      meinmarker.id = "standort";
      let meincircle = L.circle(location, radius);
      meincircle.addTo(map);
  }



  function onLocationError(e) {
      alert(e.message);
  }

  function getLocationLeaflet() {
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);

      map.locate({
          setView: true,
          maxZoom: 16
      });
  }


  function init() {
      console.log(zaehlung.birds)
      document.querySelector('#btnaddbirds').addEventListener('click', getLocationLeaflet);

  }

  init()


  //VOGELLISTE

  let birdlist = document.createElement("div");
  birdlist.id = "birdelements";
  birdlist.innerHTML = "Welche Vögel siehst du?";
  document.querySelector('#btnaddbirds').addEventListener
  document.body.appendChild(birdlist);


  //let indibird = document.createElement("div");
  //indibird.innerHTML = zaehlung.birds.name[0];
  //birdlist.appendChild(indibird);
  /*

    let removeauswahlButtons = document.getElementByClassName('.remove')
    console.log(removeauswahlButtons)
    for (let i = 0; i < removeauswahlButtons.length; i++)
        let button = removeauswahlButtons[i]
    button.addEventListener('click'),
        function(event) {
            let buttoClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
        };
        */