import { useEffect, useState } from "react";
import { MainLayout } from "./mainLayout";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link } from "react-router-dom";
import "../pages/css/soccerCss/soccer.css";
// import LiveScoreWidget from "../components/LiveScoreWidget"

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
            console.log(countryLeagues);
          }
        });
    }
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: "#171717" }} id="doc3" class="yui-t7">
      <MainLayout>
        <div id="hd">
          <div style={titleStyles.title_div}>
            <h1 className="FontClass" style={titleStyles.title}>
              HTR Sports Soccer Page
            </h1>
          </div>
        </div>
        <div id="bd">
          <div id="yui-main">
            <div class="yui-b">
              <div class="yui-gd">
                <div class="yui-u first">
                  <div class="content">
                    <strong className="FontClass" style={{ color: "#ec6a00" }}>
                      Our Different Links
                    </strong>
                    <div className="mainHeader">
                      <Link to="/soccer/Livescore" style={{textDecoration: '#ec6a00'}}>
                        <h3
                          className="FontClass"
                          style={{
                            fontSize: "xx-large",
                            color: "#ec6a00",
                          }}
                        >
                          Link to Real Time Scores
                        </h3>
                      </Link>
                      <Link to="/soccer/SoccerNews" style={{textDecoration: '#ec6a00'}}>
                        <h3
                          className="FontClass"
                          style={{
                            fontSize: "xx-large",
                            color: "#ec6a00",
                          }}
                        >
                          Link to Soccer News
                        </h3>
                      </Link>
                      <img
                        style={{ height: 250, width: 250 }}
                        src="https://www.thegreatapps.com/application/upload/Apps/2021/10/all-football-live-score-and-live-soccer-24-189.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="yui-u">
                  <div class="content">
                    <strong className="FontClass" style={{ color: "#ec6a00" }}>
                      Country of League Search Bar
                    </strong>
                    <div className="soccerSearchBar">
                      <h1 className="headerOne">
                        <strong
                          className="FontClass"
                          style={{ color: "#ec6a00" }}
                        >
                          Search the country of your league
                        </strong>
                      </h1>
                      <input
                        className="soccerButton"
                        value={inputSearch}
                        onChange={(event) => {
                          const text = event.target.value;
                          setInputSearch(text);
                        }}
                      />
                      <button
                        className="soccerButton"
                        onClick={(event) => {
                          setSearchTerm(inputSearch);
                        }}
                      >
                        <strong
                          className="FontClass"
                          style={{ color: "#ec6a00" }}
                        >
                          Search Country
                        </strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="yui-b">
            <div id="SoccerLeague">
              <strong
                className="FontClass"
                id="headerSecond"
                style={{ color: "#ec6a00", 
                textAlign: 'center',
              display: 'block' }}
              >
                League Standings
              </strong>
              <div>
                <h2 className="FontClass" style={{ color: "#ec6a00" }}>
                  Find your league
                </h2>
                <Dropdown
                  className="Dropdown"
                  options={leagueList}
                  onChange={(item) => {
                    setleagueID(item.value);
                  }}
                  placeholder="Select an option"
                />
                <div>
                  <Link to={`/soccer/LeagueStats/${leagueID}`} style={{textDecoration: '#ec6a00'}}>
                    <h4 className="FontClass" style={{ color: "#ec6a00" }}>
                      League's Statistics
                    </h4>
                  </Link>

                  <div>
                    <tbody id="LeagueTable">
                      <tr>
                        <th>Team Name</th>
                        <th>Team Logo</th>
                        <th>Games Played</th>
                        <th>Games Won</th>
                        <th>Games Lossed</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Team Form</th>
                      </tr>
                      {standings.length > 0 &&
                        standings.map((standing) => {
                          return (
                            <tr key={standing.team.id}>
                              <td>
                                <Link to={`/soccer/team/${standing.team.id}`} style={{textDecoration: '#ec6a00'}}>
                                  <h1>{standing.team.name}</h1>
                                </Link>
                              </td>
                              <td>
                                <img
                                  style={{ height: 50, width: 50 }}
                                  src={standing.team.logo}
                                  alt="Team Logo"
                                />
                              </td>
                              <td>Games Played: {standing.all.played}</td>
                              <td>Wins: {standing.all.win}</td>
                              <td>Losses: {standing.all.lose}</td>
                              <td>Goals For: {standing.all.goals.for}</td>
                              <td>
                                Goals Against: {standing.all.goals.against}
                              </td>
                              <td>Team Form {standing.form}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Soccer;

const titleStyles = {
  title_div: {
    width: "60%",
    textAlign: "center",
    margin: "auto",
    paddingTop: "6rem",
    paddingBottom: "2rem",
  },
  title: {
    color: "#ec6a00",
    fontSize: "50px",
    fontFamily: "Helvetica",
    fontWeight: "700",
    lineHeight: "50px",
  },
};
