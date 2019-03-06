//DOM Load Event
document.addEventListener('DOMContentLoaded', function () {

  if (navigator.geolocation) {
    const ui = new UI;
    navigator.geolocation.getCurrentPosition(position => {
      document.getElementById('location').textContent = 'Current Weather at Your Location';
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const weather = new Weather(lat, long);
      
      weather.getWeather()
        .then(results => {
          ui.display(results);
          console.log(results);
        })
        .catch(err => console.log(err));

    },ui.showError);
  } 

});

document.getElementById('autocomplete-input').addEventListener('keyup',
  function (e) {
    const ui = new UI;
    ui.searchCity(e);
    e.preventDefault();
  });

document.getElementById('search-table').addEventListener('click',
  function (e) {
    const ui = new UI();
    ui.addCity(e.target);
    e.preventDefault();

  });










