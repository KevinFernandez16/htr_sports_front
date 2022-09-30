import { useEffect, useState } from "react";
import { MainLayout } from "./mainLayout";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Soccer = () => {
  const [standings, setStandings] = useState([]);
  const [leagueID, setleagueID] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    if (leagueID) {
      fetch(
        `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${leagueID}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setStandings(data.response[0].league.standings[0]);
        });
    }
  }, [leagueID]);

  const dropDownOptions = [39, 40, 41, 42, 43];

  // fetch('https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39', options)

  return (
    <div className="page">
      <MainLayout>
        <div>
          <Dropdown
            options={dropDownOptions}
            onChange={(value) => {
              setleagueID(value.label);
            }}
            placeholder="Select an option"
          />
          <div>
            {standings.length > 0 &&
              standings.map((standing) => {
                return (
                  <div
                    key={standing.team.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <h1>{standing.team.name}</h1>
                      <div>
                        <img
                          style={{ height: 50, width: 50 }}
                          src={standing.team.logo}
                          alt="Team Logo"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p>Played : {standing.all.played}</p>
                      <p>Wins: {standing.all.win}</p>
                      <p>Losses: {standing.all.lose}</p>
                      <p>Goals For: {standing.all.goals.for}</p>
                      <p>Goals Against: {standing.all.goals.against}</p>
                      <p>Form: {standing.form}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Soccer;
