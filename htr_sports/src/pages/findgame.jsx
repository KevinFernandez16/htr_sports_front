import {useState, useMemo} from "react";
import { MainLayout } from "./mainLayout";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
import {render} from "react-dom";
import React, { Component } from "react";
import "./findgame.css";
import usePlacesAutocomplete,{getGeocode, getLatLng,}from "use-places-autocomplete";
import{Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
    libraries: ["places"],
  });

  if(!isLoaded) return <div>Error</div>;
  return <Map />;
}

function Map(){
  const center = useMemo(() => ({lat: 40.7498916, lng: -73.8771786}), []);
  const [selected, setSelected] = useState(null);
  return(
    <>
    <div className = "places-container">
      <PlacesAutocomplete setSelected={setSelected}/>
    </div>
  
    <GoogleMap
    zoom = {10}
    center = {center}
    mapContainerClassName = "measure"
    >
      {selected && <MarkerF position= {selected} />}
    </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({setSelected}) => {
  const{ ready, value, setValue, suggestions: {status, data}, clearSuggestions,} = usePlacesAutocomplete();

  const handleSelect = async(address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    setSelected({lat, lng});

  };
  return (
    <MainLayout>
  <Combobox onSelect ={handleSelect} >
    <ComboboxInput value = {value} onChange = {event => setValue(event.target.value)} disabled = {!ready}
    className = "comboinput" placeholder = "Search"
    />
    <ComboboxPopover>
      <ComboboxList>
        {status == "OK" && data.map(({place_id, description}) => (<ComboboxOption key = {place_id}
        value = {description} />
        ))}
      </ComboboxList>
    </ComboboxPopover>
  </Combobox>
  </MainLayout>
  );
}
