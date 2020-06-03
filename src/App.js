import React from 'react'
import './App.css'
import Main from '../src/Main'



const SearchBar = ({fetch, query, change}) => {
  return (<div class="navbar-fixed-top">
      <nav class="navbar_fixed-top">
        <div className="container margin-left">
          <form className="card my-6" onSubmit={(e) => { e.preventDefault() ; fetch()}}>
                <input
                  className="form-controm form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search ..."
                  value={query}
                  onChange={(e) => change (e)}
                />
          </form>
        </div>
      </nav>
    </div>
  );
};



const Footer = () => {
  return (
  <footer className="footer">
  <div className="container">
    <p>
      <span className="text-muted">
        Weather Data from
        {' '}
        <a
          href="https://openweathermap.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Openweathermap.org
        </a>
      </span>
    </p>
  </div>
</footer>
  )
}

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      baseURL: 'http://api.openweathermap.org/data/2.5/weather?',
      APIkey: 'bf06044bb0ca5b4d66b8a17f752a9fb2',
      query: 'paris',
      forecast: {},
      darkMode: false,
      noResults: false,
    };
  }

  componentDidMount () {
     this.query ();
  }


  query = () => {
    let url =
      this.state.baseURL +
      'q=' +
      this.state.query +
      '&appid=' +
      this.state.APIkey;
    fetch (url)
      .then (response => {
        if (response.ok) {
          console.log ('succes');
          return response.json ();
        } else { this.setState({noResults: true})}
      })
      .then (data => {
        let weather = data.weather[0];
        let description = weather.description;
        let main = data.main;
        let temp = main.temp;
        let icon = weather.icon;
        let sys = data.sys;
        let coutryCode = sys.country.toLowerCase ();
        let city = data.name;
        let forecast = {
          temp: temp,
          description: description,
          icon: icon,
          code: coutryCode,
          city: city,
        };
        this.setState ({forecast: forecast || {}})
        console.log ('forecast', forecast)
        this.setState({query : ''})
      });
  };

  handleChange = e => {
    this.setState ({query: e.target.value});
  };

  setDark = () => {
    !this.state.darkMode ?  
      this.setState ({darkMode: true})
      :this.setState({darkMode: false})
  }

  render () {
    return (
      <div className={ this.state.darkMode ? "AppDay" : "AppNight" }>
      <div>.
      <button type="button" class="btn btn-dark" onClick={this.setDark}>{this.state.darkMode ? 'Dark' : 'Light'}</button>
      <div className="searchbar-cont">
        <SearchBar 
        fetch={this.query} 
        change={this.handleChange} 
        query={this.state.query} 
        />
        { this.state.noResults ? 
        <div className="error">
          <p>Aucun résultat pour cette recherche...</p>
        </div>
        : null
        }
        </div>
        <Main forecast={this.state.forecast}/>
        <Footer/>
      </div>
      </div>
    );
  }
}

export default App;
