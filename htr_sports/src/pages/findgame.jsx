import {useMemo} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
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
    googleMapsApiKey:"",
  });

  if(!isLoaded) return <div>Error</div>;
  return <Map />;
}

function Map(){
  const center = useMemo(() => ({lat: 40.7498916, lng: -73.8771786}), []);
  return(
    <GoogleMap
    zoom = {10}
    center = {center}
    mapContainerClassName = "measure"
    >
      <MarkerF position= {{lat: 40.7498916, lng: -73.8771786}} />
    </GoogleMap>
  );
}