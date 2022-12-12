import { MainLayout } from "./mainLayout";
import {GoogleMap,useJsApiLoader, Autocomplete, DirectionsRenderer,} from "@react-google-maps/api";
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
  const [position, setPosition] = useState({lat: 40.768538, lng: -73.964741});

  const originRef = useRef()
  const destinationRef = useRef()

  if(!isLoaded){
    return
  }

async function calculate(){
  if (originRef.current.value === '' || destinationRef.current.value === '') {
    return
}
    //eslint-disable-next-line no-undef
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
  <div style={{ backgroundColor: "#1A1A1A" }}> 
    <Box style ={{}}>
      <Autocomplete>
        <input type = 'text' placeholder = 'Start' ref = {originRef} className = "fontclass"/>
      </Autocomplete>
    </Box>

    <Box style ={{top:0, left: 0}}>
      <Autocomplete>
        <input type = 'text' placeholder = 'Destination' ref = {destinationRef} className = "fontclass"/>
      </Autocomplete>
    </Box>

  <div class = "middle">
  {/*Center Button */}
    <button className = "click fontclass button-right" onClick={() => setPosition({lat: 40.768538, lng: -73.964741})}>Back to Center</button>
  {/*Calculate Button */}
    <button className = "click fontclass" type = 'submit' onClick = {calculate}>Calculate</button>
  </div>

  <div>
    {/*Distance*/}
    <text style={{ color: "#ec6a00" }} className = "fontclass">Distance: {distance}</text>
  </div>
  <div>
    {/*Time*/}
    <text style={{ color: "#ec6a00" }} className = "fontclass">Amount of Time: {duration}</text>
  </div>

<GoogleMap
  zoom = {14}
  center = {position}
  mapContainerClassName = "measure">
    {direction  && (
      <DirectionsRenderer directions = {direction}/>)}

</GoogleMap>
    
  </div>
  </MainLayout>
  );
}
export default Map
