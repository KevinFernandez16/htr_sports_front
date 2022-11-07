import { MainLayout } from "./mainLayout";
import {render} from "react-dom";
import React, { Component } from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { useEffect, useState } from "react"; //importing the hooks
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

const FindGame = () => {
  const [venue, setVenue] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": '5059162118mshc58ff3e3e67564ap1eea11jsn00e6db6f48d7',//import api key
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    if (!venue) {
      fetch(
        "https://api-football-v1.p.rapidapi.com/v3/venues?country=Ecuador",//grab from api
        options
      )
        .then((response) => response.json())
        // .then(response => console.log(response))
        .then((response) => {
          setVenue(response.response)
        });
    }
  }, [venue]);

//display the api (we got to make sure our code matches with the api's code in order to display specific information)
  return (
    <div className="page">
      <MainLayout>
        <div>

            {/* <h1> TESTING {venue.name} </h1> */}
          {venue &&
            venue.map((venue) => {
              return (
                <div key={venue.id}>
                  <h1>{venue.address} </h1>
                  <p> {venue.name} </p>
                  <p> {venue.id}</p>
                  <p> {venue.country}</p>
                </div>
              );
            })}
        </div>
      </MainLayout>
    </div>
  );
};
export default FindGame;

