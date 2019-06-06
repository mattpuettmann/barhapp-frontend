import React, {Component} from 'react';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            email: "",
            city: "",
            state: "",
            password: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    render(){
        return <div className="loginForm">
            <form onSubmit={this.handleSubmit}>
                <h3>Login:</h3>
                <div className="loginFormInput">

                    <input onChange={this.handleChange} type="text" name="username" placeholder="Username"/><br/>

                    <input onChange={this.handleChange} type="password" name="password" placeholder="Password"/><br/>
                </div>
                <input type="submit"/>
            </form>
        </div>
    }
}



export default LoginForm