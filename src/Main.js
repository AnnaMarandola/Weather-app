import React, {Component} from 'react'
import './Main.css'

export default class Main extends Component{
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'http://openweathermap.org/img/wn/'

        }
    }

    format(){
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        return new Date().toLocaleDateString([], options);
    }

    render() {
        const children = this.props
        const forecast = children.forecast
        return(
        <div className="card-container">
        <div className="card-body">
            <h1 className="location">{forecast.city}</h1>
            <h2 className="date">{this.format()}</h2>
            <div className="weather-icon">
                <div className="sunny"><img src={this.state.baseURL + forecast.icon + "@2x.png"}/></div>
            </div>
            <p className="temp">{(forecast.temp - 273.15).toFixed(1)}°</p>
            <p className="conditions">{forecast.description}</p>
        </div>
        </div>
        )
    }
}