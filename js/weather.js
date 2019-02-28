class Weather {
  constructor(lat,long) {
    this.apiKey = '91c2a4b6f6e2349733c1d8ee3f5bd37a';
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

