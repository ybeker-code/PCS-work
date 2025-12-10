import './App.css'
import { Component } from 'react';
import GetInput from './getInput';
import DisplayWeather from './displayWeather';

export default class App extends Component {

  state = {
    key: 'f4d8cb3845d58ed59c61c603ca5dca0e',
    zip: 44118,
    weather: {},
    error: null
  }

  async fetchWeather() {
    try {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip}&appid=${this.state.key}&units=imperial&lang=he`);
      const weatherData = await r.json();
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
      }
      console.log(weatherData);

      this.setState({
        error: null,
        weather: {
          location: weatherData.name,
          imgSrc: weatherData.weather[0].icon,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description
        }
      })

    } catch (e) {
      console.error(e);
      this.setState({
        error: e.message
      })
    }
  }
  componentDidMount() {
    this.fetchWeather();
  }
  render() {
    return (
      <>
        <GetInput />
        {this.state.error ? <div>{this.state.error}</div> : null}
        <DisplayWeather weather={this.state?.weather} />
      </>
    );
  }
}



