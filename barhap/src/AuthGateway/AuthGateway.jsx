import React, {Component} from 'react';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';

class AuthGateway extends Component {
    constructor(){
        super();
        this.state = {
            activeTab: '1'
        }
    }
    render(){
        return <div className="homePage">
            <div className="authDiv">
                <LoginForm handleLogin={this.props.handleLogin} handleGeo={this.props.handleGeo}/>  
                <RegistrationForm handleRegister={this.props.handleRegister} handleGeo={this.props.handleGeo}/>  
            </div>
        </div>
    }
}

export default AuthGateway