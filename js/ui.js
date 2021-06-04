class UI {
  constructor() {
    this.hum = document.getElementById('humidity');
    this.temp = document.getElementById('temp');
    this.rft = document.getElementById('real-feel-temp');
    this.pres = document.getElementById('pressure');
    this.icon = document.getElementById('weather-icon');
    this.state = document.getElementById('state');
    this.vid = document.getElementById("myVideo");


  }

  display(weather) {
    this.hum.textContent = `Humidity: ${weather.currently.humidity}`;
    this.temp.textContent = `${weather.currently.temperature} ℃`;
    this.rft.textContent = `Feels Like: ${weather.currently.apparentTemperature} ℃`;
    this.pres.textContent = `Pressure: ${weather.currently.temperature} mb`;
    this.state.textContent = `${weather.daily.summary}`;
 
    if (weather.currently.icon === 'clear-day') {
      this.icon.src = "./img/sunny.png";
      this.vid.src = "./vid/cloudy.mp4";

    }
    if (weather.currently.icon === 'rain') {
      this.icon.src = "./img/rain.png";
      this.vid.src = "./vid/rainy.mp4";

    }
    if (weather.currently.icon === 'snow') {
      this.icon.src = "./img/snow.png";
      this.vid.src = "./vid/snow.mp4";
    }
    if (weather.currently.icon === 'sleet') {
      this.icon.src = "./img/freeze.png";
      this.vid.src = "./vid/snow.mp4";
    }
    if (weather.currently.icon === 'wind') {
      this.icon.src = "./img/windy.png";
      this.vid.src = "./vid/cloudy.mp4";
    }
    if (weather.currently.icon === 'cloudy' || weather.currently.icon === 'clear-night') {
      this.icon.src = "./img/cloudy.png";
      this.vid.src = "./vid/cloudy.mp4";
    }
    if (weather.currently.icon === 'partly-cloudy-day' || weather.currently.icon === 'partly-cloudy-night') {
      this.icon.src = "./img/partialcloud.png";
      this.vid.src = "./vid/cloudy.mp4";
    }
    if (weather.currently.icon === 'fog') {
      this.icon.src = "./img/fog.png";
      this.vid.src = "./vid/cloudy.mp4";
    }
    if (weather.currently.temperature < 0) {      
      this.vid.src = "./vid/ice.mp4";
    }
  }

  searchCity(e) {
    const input = e.target.value.toLowerCase();
    const tbody = document.querySelector('#search-output');
    if (input.length > 3) {
      document.getElementById('search-table').style.display = 'block';
      fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json').then(function (res) {
        return res.json();
      })
        .then(function (data) {      
          let table = '';
          data.every(function(loc, index) {
            if (loc.name.toLowerCase().includes(input)) {
              console.log(index);
              table += `
              <tr style="border:0px; font-size:1.2rem">
              <td><a href="#" class="city-name">${loc.name}</a></td> 
              <td><span style="color:#38a9e3">,</span></td>
              <td><span style="color:#38a9e3">${loc.country}</span></td>
              </tr> `;
            }
          })
          tbody.innerHTML = table;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    else {
      tbody.innerHTML = '';
      document.getElementById('search-table').style.display = 'none';
    }
  }

  addCity(target) {
    if (target.className === 'city-name') {
      const city = target.parentElement.parentElement.children[0].children[0].innerHTML;
      const land = target.parentElement.parentElement.children[2].children[0].innerHTML;
      document.getElementById('autocomplete-input').value = city;
      document.getElementById('search-table').style.display = 'none';
      document.getElementById('location').textContent = `${city} , ${land}`;
      document.getElementById('location').style.fontSize = '3rem';
      this.getCoordinates(city,land);
    }
  }

  getCoordinates(city,land) {
    fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json').then(function (res) {
      return res.json();
    })
      .then(function (data) {
        data.forEach(function (loc) {
          if (loc.name.toLowerCase() === city.toLowerCase() && loc.country.toLowerCase() === land.toLowerCase()) {
            const lat = loc.lat;
            const long = loc.lng;
            const weather = new Weather(lat, long);
            const ui = new UI;
            weather.getWeather()
              .then(results => {
                ui.display(results);
                console.log(results);
              })
              .catch(err => console.log(err));
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        document.getElementById('location').textContent = "Frankfurt, DE";
      document.getElementById('location').style.fontSize = '3rem';
        const weather = new Weather(50.110924, 8.682127);
            const ui = new UI;
            weather.getWeather()
              .then(results => {
                ui.display(results);
                console.log(results);
              })
              .catch(err => console.log(err));
        break;
      case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
      console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
        break;
    }
  }
}




