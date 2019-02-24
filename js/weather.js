class Weather {
  constructor(lat,long) {
    this.apiKey = '426bb42b1f3ed2c07ccb6ced4de7416b';
    this.lat = lat;
    this.long = long;
    
  }

  //Fetch from API
  async getWeather() {  
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(`${proxy}https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.long}?units=si`);
    const responseData = await response.json();    
    return responseData;
  }

}

