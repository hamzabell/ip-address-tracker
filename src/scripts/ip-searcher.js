// create a map in the "map" div, set the view to a given place and zoom
const map = L.map('map').setView([51.505, -0.09], 13);

// add an OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);






document.getElementById('app-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { ipAddress } =Object.fromEntries(data.entries());


    fetch(`https://ipapi.co/${ipAddress}/json/`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        const { ip, region, country_name, latitude, longitude, utc_offset, org  } = data;
        document.getElementById('ip-address').innerText = ip;
        document.getElementById('location').innerText = `${region}, ${country_name}`;
        document.getElementById('timezone').innerText = `UTC${utc_offset}`;
        document.getElementById('isp').innerText = org;

        L.marker([latitude, longitude], {
            autoPan: true
        }).addTo(map);
        map.panTo(new L.LatLng(latitude, longitude));
    })
    .catch(err => console.log(err))

})