import React, {Component} from 'react';

class ConditionsContainer extends Component {
    constructor(){
        super();
        this.state = {
            temperature: ""
        }
    }

    render(){
        return <div className="weatherConditions">
            <h5>{this.props.temperature}°F</h5>
            <h5>{this.props.summary}</h5>
            <h5>{this.props.precip}% Chance of rain</h5>
        </div>
    }
}



export default ConditionsContainer