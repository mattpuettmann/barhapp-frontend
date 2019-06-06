import React, {Component} from 'react';
import './App.css';
import AuthGateway from './AuthGateway/AuthGateway';
import UserContainer from './UserContainer/UserContainer';

class App extends Component {
  constructor(){
    super();
    this.state= {
      loggedIn: false,
      username: null,
      email: null,
      city: null,
      state: null,
      lat: null,
      lng: null,
      isSearched: null
    }
  }

  handleRegister = async (formData) => {
    const response = await fetch ('http://localhost:8000/users/registration', {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*'
      }
    })
    const parsedResponse = await response.json()
    if(response.status === 201){
      this.setState({
        loggedIn: true,
        username: parsedResponse.username,
        city: parsedResponse.city,
        email: parsedResponse.email,
        state: parsedResponse.state
      })  
    }
  }

  handleLogin = async (formData) => {
    try{
      const response = await fetch('http://localhost:8000/users/login', {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await response.json()
      if(response.status === 201){
        this.setState({
          loggedIn: true,
          username: formData.username,
          email: parsedResponse.email,
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  handleLogout =  () => {
    this.setState({
      loggedIn: false,
      username: null,
      email: null,
      city: null,
      state: null,
      lat: null,
      lng: null,
      isSearched: false
    })
  }

  handleQuery = async (city) => {
    console.log('query firing')
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg`)
    const parsedResponse = await response.json();
    await this.setState({
      lat: parsedResponse.results[0].geometry.location.lat,
      lng: parsedResponse.results[0].geometry.location.lng,
      isSearched: true
    })
  }

  render(){
    console.log(this.state);
    return <div className="wholePage">
      <div className="App">
        <div className="header">
          <h2>Barhapp</h2>
        </div>
        {this.state.loggedIn ?
        <UserContainer isSearched={this.state.isSearched} loggedIn={this.state.loggedIn} lat={this.state.lat} lng={this.state.lng} handleLogout={this.handleLogout} handleQuery={this.handleQuery} username={this.state.username} city={this.state.city} state={this.state.state} showState={this.showState}/>
        :
        <AuthGateway handleRegister={this.handleRegister} handleLogin={this.handleLogin} handleGeo={this.handleGeo}/>
        }
      <div className="footer">© 2019 RARE BREED COLLECTIVE // <a href="https://www.linkedin.com/in/matthewpuettmann/" target="_blank">HIRE MATT</a></div>
      </div>
    </div>
  }
}


export default App;