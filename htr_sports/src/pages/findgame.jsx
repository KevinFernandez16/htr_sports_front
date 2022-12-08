import { MainLayout } from "./mainLayout";
import {GoogleMap,useJsApiLoader, MarkerF, Autocomplete, DirectionsRenderer,} from "@react-google-maps/api";
import {render} from "react-dom";
import React, { Component, useState, useRef } from "react";
import { Box } from '@material-ui/core';
import "./findgame.css";
//geolocation begin
class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    });
  }

  render(){
    return(
      <div>
        <h4></h4>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
//geolocation end
function Map(){
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey:"AIzaSyB-TWLwxfG9pVuLNmDSEp3dA-CW9VHWvBs",
    libraries: ['places'],
  })
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [direction ,setDirection] = useState(null);
  const [position, setPosition] = useState({lat: 40.74988916, lng: -73.8771786});

  const originRef = useRef()
  const destinationRef = useRef()



  if(!isLoaded){
    return
  }

async function calculateRoute(){
  if (originRef.current.value === '' || destinationRef.current.value === '') {
    return
}
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService()
  const results = await directionsService.route({
    origin: originRef.current.value,
    destination: destinationRef.current.value,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  
  })
  setDirection(results)
  setDistance(results.routes[0].legs[0].distance.text)
  setDuration(results.routes[0].legs[0].duration.text)
}

  return(
<MainLayout>
    <>
    <div style ={{position:'absolute', top:60, right:300}}>
    <button onClick={() => setPosition({lat: 40.74988916, lng: -73.8771786})}>Back to Center</button>
    </div>
    <div style ={{position:'absolute', top:80, right:300}}>
    <button type = 'submit' onClick = {calculateRoute}>Calculate Route</button>
    </div>
    <div style ={{position:'absolute', top:100, right:300}}>
    <text>Distance: {distance}</text>
    </div>
    <div style ={{position:'absolute', top:120, right:300}}>
    <text>Amount of Time: {duration}</text>
    </div>


  <GoogleMap
    zoom = {15}
    center = {position}
    mapContainerClassName = "measure"
    >
      <MarkerF position = {position}/>
      {direction  && (
        <DirectionsRenderer directions = {direction}/>)}

  </GoogleMap>
    </>
  <Box style ={{position:'absolute', top:55, right:720}}>
    <Autocomplete>
      <input type = 'text' placeholder = 'Start' ref = {originRef}/>
    </Autocomplete>
  </Box>

  <Box style ={{position:'absolute', top:75, right:720}}>
    <Autocomplete>
      <input type = 'text' placeholder = 'Destination' ref = {destinationRef}/>
    </Autocomplete>
  </Box>
</MainLayout>
  );
}
export default Map
