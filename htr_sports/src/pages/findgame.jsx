import {useMemo} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import {render} from "react-dom";
import React, { Component } from "react";
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

export default function Home(){
  const {isLoaded} = useLoadScript({
    googleMapsApiKey:"AIzaSyB-TWLwxfG9pVuLNmDSEp3dA-CW9VHWvBs",
  });

  if(!isLoaded) return <div>Error</div>;
  return <Map />;
}

function Map(){
  return(
    <GoogleMap
    zoom = {10}
    center = {{lat: 40.7498916, lng: -73.8771786}}
    mapContainerClassName = "measure"
    ></GoogleMap>
  );
}