import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
  render(){
    return (
        <Map
          google={this.props.google}
          zoom={13}
          initialCenter={{ lat: 41.957162, lng: -87.7273816 }} >
            <Marker position={{ lat: 41.957162, lng: -87.7273816}} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCyM13RLnAUE4x6V2DOhox_ypO4-LCzgKE"
})(MapContainer);
