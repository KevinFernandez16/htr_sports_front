import { MainLayout } from "./mainLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/css/basketball.css";

const Basketball = () => {
  const [easternConference, seteasternConference] = useState({});
  const [westernConference, setwesternConference] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
      },
    };

    if ([]) {
      fetch(
        "https://api-basketball.p.rapidapi.com/standings?league=12&season=2021-2022&stage=NBA%20-%20Regular%20Season&group=Eastern%20Conference",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          seteasternConference(data.response[0]);
        });
      console.log(easternConference);
      console.log("Working");
    }
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
      },
    };

    if ([]) {
      fetch(
        "https://api-basketball.p.rapidapi.com/standings?league=12&season=2021-2022&stage=NBA%20-%20Regular%20Season&group=Western%20Conference",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setwesternConference(data.response[0]);
        });
      console.log(westernConference);
      console.log("Working");
    }
  }, []);

  return (
    <div className="basketball">
      <MainLayout>
        <div>
          <h1 className="Headtitle">HTR Sports Basketball</h1>
          <div className="flexbox-container">
            <div className="Basketball-Links">
              <h2 className="Titles" style={{color: "#ec6a00", fontSize: 'xxx-large'}}>Eastern Conference Standings 21/22 Season</h2>
              <div className="basketball" >
                <table className="basketball">
                  <tr>
                    <th>Team Logo</th>
                    <th>Team Name</th>
                    <th>Position</th>
                    <th>Games Played</th>
                    <th>Games Won</th>
                    <th>Games Lost</th>
                  </tr>
                  {easternConference.length > 0 &&
                    easternConference.map((standing) => {
                      return (
                        <tr key={standing.team.id}>
                          <td>
                            <img
                              src={standing.team.logo}
                              alt="League Logo"
                              style={{
                                width: 100,
                                height: 100,
                              }}
                            />
                          </td>
                          <td>{standing.team.name}</td>
                          <td>{standing.position}</td>
                          <td>{standing.games.played}</td>
                          <td>{standing.games.win.total}</td>
                          <td>{standing.games.lose.total}</td>
                        </tr>
                      );
                    })}
                </table >
              </div>
            </div>
            <div className="Basketball-News">
              <h2 className="Titles" style={{color: "#ec6a00", fontSize: 'xxx-large'}}>Western Conference Standings 21/22 Season</h2>

              <div>
                <table className="basketball">
                  <tr>
                    <th>Team Logo</th>
                    <th>Team Name</th>
                    <th>Position</th>
                    <th>Games Played</th>
                    <th>Games Won</th>
                    <th>Games Lost</th>
                  </tr>
                  {westernConference.length > 0 &&
                    westernConference.map((standing) => {
                      return (
                        <tr key={standing.team.id}>
                          <td>
                            <img
                              src={standing.team.logo}
                              alt="League Logo"
                              style={{
                                width: 100,
                                height: 100,
                              }}
                            />
                          </td>
                          <td>{standing.team.name}</td>
                          <td>{standing.position}</td>
                          <td>{standing.games.played}</td>
                          <td>{standing.games.win.total}</td>
                          <td>{standing.games.lose.total}</td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Basketball;
