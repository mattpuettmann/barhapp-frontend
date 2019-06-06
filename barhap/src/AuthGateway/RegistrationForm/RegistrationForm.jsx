import React, {Component} from 'react';

class RegistrationForm extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            email: "",
            city: "",
            state: "",
            password: "",
            verify_password: "",
            lat: "",
            lng: ""
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state)


    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }



    render(){
        return <div className="regForm">
            <form onSubmit={this.handleSubmit}>
                <h3>New User? Sign Up Here:</h3>
                <div className="regFormInput">

                    <input onChange={this.handleChange} type="text" name="username" placeholder="Username"/><br/>

                    <input onChange={this.handleChange} type="text" name="email" placeholder="Email"/><br/>

                    <input onChange={this.handleChange} type="password" name="password" placeholder="Password"/><br/>

                    <input onChange={this.handleChange} type="password" name="verify_password" placeholder="Verify Password"/><br/>
                </div>
                <input type="submit"/>
            </form>
        </div>
    }
}



export default RegistrationForm