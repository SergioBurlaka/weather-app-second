import React from 'react';
import './App.scss';
import axios from 'axios';
import moment from 'moment'



const openWeatherApiKey = 'c792484ade42380886f51003cfcaf04d';


class App extends React.Component {

  constructor(props){
    super()
    this.state = {
     weather: null,
     forecasts: null,
  
    }
  }

 
  componentWillMount() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&units=metric&mode=json&appid=${openWeatherApiKey}`)
        .then(res => {
          console.log(res) 
          console.log(res.data) 
            this.setState({weather: res.data});

        });

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Kharkiv,ua&units=metric&mode=json&appid=${openWeatherApiKey}`)
        .then(res => {
          console.log("forecast", res)  
          console.log("forecast list ", res.data.list)  
          this.setState({forecasts: res.data.list});

        });
  }


  showTime = (date, index) => {
    let curentDay = date.substring(0,10)
    let result = null;

    if(index === 0 || ((index) % 8) === 0){
      result = curentDay;
    }

    return  result 
  }

  showTimeOfForecast = (date) => {
    let curentDay = date.substr(-8, 5);

    return  curentDay || null
  }

  msToTime = (ms) => {
    return moment.utc(ms*1000).local().format('HH:mm');
  }
  
  getNowTime = () => {
    let dateTime = new Date();
    return moment(dateTime).format('HH:mm') +" "+ moment(dateTime).format('MMMM') + " " + moment(dateTime).format('DD');
  }






  render() {

    const {weather, forecasts} = this.state


    return (

      <div>
      

        <div className="main-wrapper">

          {weather &&
            <div className="weather-wrapper" >
            <h2>Weather in {weather.name}, {weather.sys.country}</h2>
            <h3>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="forecast" width="50" height="50"/>
            {weather.main.temp} °C</h3>
            <p>{weather.weather[0].description}</p>
            <p>{this.getNowTime()}</p>

            <div className="weather-table" >
              <div className="weather-line shaded" >
                <div >Wind</div>
                <div>{weather.wind.speed} m/s</div>
              </div>
              <div className="weather-line" >
                <div >Cloudiness</div>
                <div>{weather.clouds.all}%</div>
              </div>
              <div className="weather-line shaded" >
                <div >Pressure</div>
                <div>{weather.main.pressure} hpa</div>
              </div>
              <div className="weather-line" >
                <div >Humidity</div>
                <div>{weather.main.humidity} %</div>
              </div>
              <div className="weather-line shaded" >
                <div >Sunrise</div>
                <div>{this.msToTime(weather.sys.sunrise)}</div>
              </div>
              <div className="weather-line" >
                <div >Sunset</div>
                <div>{this.msToTime(weather.sys.sunset)}</div>
              </div>
              <div className="weather-line shaded" >
                <div >Geo coords</div>
                <div>[ {weather.coord.lat}, {weather.coord.lon}]</div>
              </div>
            </div>
          </div>
         }
         
        
          <div className="forecast-wrapper">
            <h2 >
            Hourly weather and forecasts in {weather && weather.name}, {weather && weather.sys.country}
            </h2>
            <div>
              <div>
                  {forecasts && forecasts.map( (item, index) => {
                return (
                  <div key = {index}>
                    {this.showTime(item.dt_txt, index) &&   <div className="forecast-date">
                        {this.showTime(item.dt_txt, index)}
                      </div>}
                    
                      <div className="forecast-describe">
                        <div >
                          <div >
                            {this.showTimeOfForecast(item.dt_txt)}
                          </div>
                          <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="forecast" width="50" height="50"/>
                        </div>
                        <div >
                          <span >{item.main.temp} °C</span>
                          <span > {item.weather[0].description}</span>
                          <p > 
                            <span > {item.wind.speed}m/s</span>
                            <span > clouds:{item.clouds.all}%</span>
                            <span > {item.main.pressure} hPa</span>
                          </p>
                        
                        </div>
                      </div>
                  </div>
                )
              })}
              </div>
          </div>
          </div>
        </div>



      
        
      
      
      </div>
     
    );
  }
}


export default App;







   