//DOM Load Event
document.addEventListener('DOMContentLoaded', function () {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {
      document.getElementById('location').textContent = 'Current Weather at Your Location';
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const weather = new Weather(lat, long);
      const ui = new UI;
      weather.getWeather()
        .then(results => {
          ui.display(results);
          console.log(results);
        })
        .catch(err => console.log(err));

    });
  } else {
    console.log('Couldnt located');
    const ui = new UI();
    ui.addCity('Frankfurt');
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










