import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ConditionsContainer from '../ConditionsContainer/ConditionsContainer';
import icon from '../map-pin-5.png';

const AnyReactComponent = ({ text }) => <div>{text}<img src={icon}></img></div>;

class BarsContainer extends Component {
    constructor(){
        super();
        this.state = {
            activeTab: '1',
            center: {
                lat: null,
                lng: null
            },
            zoom: 13,
            isLoading: true,
            bars: [],
            temperature: null,
            precip: null,
            summary: null,
            id: null,
            website: null
        }
    }

    componentDidMount(){
        console.log(this.props);
        this.setState({
            isLoading: false,
            center: {
                lat: this.props.lat,
                lng: this.props.lng
            }
        })
        this.searchBars()
        this.showLocalConditions()
        this.linkToBars()
    }

    searchBars = async () => {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+${this.props.city}&key=AIzaSyA2318qe8rH7UavfkasiDAngRA5wT3ESsw`)
        const parsedResponse = await response.json()
        this.setState({
            bars: parsedResponse.results
        })
    }
    showLocalConditions = async () => {
        console.log(this.props);
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5ade28f3e9751e874bf8fb87b199917e/${this.props.lat},${this.props.lng}`)
        const parsedResponse = await response.json()
        this.setState({
            temperature: parsedResponse.currently.temperature,
            precip: parsedResponse.currently.precipProbability,
            summary: parsedResponse.currently.summary
        })
    }

    linkToBars = async () => {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJWWhTTKtYXIYReBORjafOLT8&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg`)
        const parsedResponse = await response.json();
        console.log(parsedResponse.result.website)
    }

    render(){
        const mapStuff = this.state.bars.map((bar, index) => {
            return (
            <AnyReactComponent
                color='red'
                lat = {bar.geometry.location.lat}
                lng = {bar.geometry.location.lng}
                // text = {index + 1}
                />
            )           
        })
        const barList = this.state.bars.map((bar, index) => {

            return <div key={bar.id} className="barNames">
                <div className="barInfo">
                    <h5>{bar.name}, <span>{bar.rating}/5 stars</span></h5>
                    <h6>{bar.formatted_address}</h6>
                    {(bar.opening_hours && bar.opening_hours.open_now) ?
                    <h6><span className="open">Currently Open</span></h6>
                    :
                    <h6><span className="closed">Closed.</span></h6>
                    }
                </div>
                    <h3 className="map-number">{index + 1}</h3>
            </div>
        })
        return <div className="barsContainer">
            <div className="weather">
                <h4>Current conditions in {this.props.city}:</h4>
                <ConditionsContainer city={this.props.city} lat={this.state.center.lat} lng={this.state.center.lng} temperature={this.state.temperature} precip={this.state.precip} summary={this.state.summary}/>          
            </div>
            <h4>Bars in {this.props.city}:</h4>
            {this.props.lat &&
                <div className="mapContainer" style={{ height: '400px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDrIbIKBD3WPDwHWhiq7i9yaOEJp-C8xi4'}}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                        defaultOptions={{
                            style: "color: red"
                        }}
                    >
                    {mapStuff}
                    </GoogleMapReact>
                </div>
            }
            <div className="barList">
                {barList}
            </div>
        </div>
    }
}


export default BarsContainer