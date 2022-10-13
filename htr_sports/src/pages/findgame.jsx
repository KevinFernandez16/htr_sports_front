import { MainLayout } from "./mainLayout";

import { useEffect, useState } from "react"; //importing the hooks

const FindGame = () => {
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
<<<<<<< Updated upstream
        "X-RapidAPI-Key": '5059162118mshc58ff3e3e67564ap1eea11jsn00e6db6f48d7',
=======
        "X-RapidAPI-Key": '5059162118mshc58ff3e3e67564ap1eea11jsn00e6db6f48d7',//import the api (this is my profiles api key)
>>>>>>> Stashed changes
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

      fetch(
<<<<<<< Updated upstream
        "https://api-football-v1.p.rapidapi.com/v3/venues?country=Ecuador",
=======
        "https://api-football-v1.p.rapidapi.com/v3/venues?country=Ecuador",//its grabbing the venues located in Ecuador
>>>>>>> Stashed changes
        options
      )
        .then((response) => response.json())
        // .then(response => console.log(response))
        .then((data) => {
          setVenue(data.response)
          console.log(data);
        });
    }
  , [venue]);

<<<<<<< Updated upstream

=======
//this is where the variables are called and its important that it matches the variables used in the API
>>>>>>> Stashed changes
  return (
    <div className="page">
      <MainLayout>
        <div>

            {/* <h1> TESTING {venue.name} </h1> */}
<<<<<<< Updated upstream
          {venue > 0 &&
=======
          {venue> 0 &&
>>>>>>> Stashed changes
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