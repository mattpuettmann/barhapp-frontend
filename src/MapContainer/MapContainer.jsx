import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

class MapContainer extends Component {
    constructor(){
        super();
        this.state = {
            center: {
                lat: 39.742043,
                lng: -104.991531
            },
            zoom: 7
        }
    }
    componentDidMount(){
        this.setState({
          center: {
            lat: this.props.lat,
            lng: this.props.lng
          }
        })
      }
    render() {
    return (
        <div className="mapContainer" style={{ height: '410px', width: '600px' }}> 
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDrIbIKBD3WPDwHWhiq7i9yaOEJp-C8xi4'}}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
            >
            </GoogleMapReact>
        </div>
    )
    }
}

export default MapContainer