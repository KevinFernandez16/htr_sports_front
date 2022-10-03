import { useEffect, useState } from "react";
import { MainLayout } from "./mainLayout";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link } from "react-router-dom";

const Soccer = () => {
  const [standings, setStandings] = useState([]);
  const [inputSearch, setInputSearch] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [leagueList, setLeagueList] = useState([]);
  const [leagueID, setleagueID] = useState();

  // A function that runs right away, in this case it getting the league ID
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

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    if (searchTerm) {
      fetch(
        `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${searchTerm}&season=2022&type=league`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.response.length > 1) {
            const countryLeagues = data.response.map((obj) => {
              return { label: obj.league.name, value: obj.league.id };
            });
            setLeagueList(countryLeagues);
            console.log(countryLeagues)
          }
        });
    }
  }, [searchTerm]);

  return (
    <div className="page">
      <MainLayout>
        <h1>Search the country of your league</h1>
        <input
          value={inputSearch}
          onChange={(event) => {
            const text = event.target.value;
            setInputSearch(text);
          }}
        />
        <button
          onClick={(event) => {
            setSearchTerm(inputSearch);
          }}
        >
          Search
        </button>
        <div>
          <h2>Find your league</h2>
          <Dropdown
            options={leagueList}
            onChange={(item) => {
              setleagueID(item.value);
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
                      <Link to={`/soccer/team/${standing.team.id}`}>
                      <h1>{standing.team.name}</h1>
                      </Link>
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
