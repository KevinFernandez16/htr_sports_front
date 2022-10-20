import { MainLayout } from "../mainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LeagueStats.css";

const LeagueStats = () => {
  let { id } = useParams();
  console.log({ id });
  const [topScorers, settopScorers] = useState([]);
  const [topAssisters, settopAssisters] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState({});

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    if (id) {
      fetch(
        `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${id}&season=2022`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          settopScorers(data.response);
          console.log("Scorer");
        });
    }
  }, [id]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    if (id) {
      fetch(
        `https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=${id}&season=2022`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          settopAssisters(data.response);
          setLeagueInfo(data.response[0].statistics[0].league);
          console.log("Assist");
        });
    }
  }, [id]);

  return (
    <div className="page">
      <MainLayout>
        <h1> {leagueInfo.name} 2022/2023 Top Goal Scorers and Top Assisters</h1>
        <div>
          <h2>
            <p
              style={{
                textAlignLast: "left",
                paddingLeft: 400,
              }}
            >
              Top Scorers
            </p>
            <p
              style={{
                textAlignLast: "right",
                paddingRight: 300,
              }}
            >
              Top Assisters
            </p>
          </h2>
          <tbody
            style={{
              float: "left",
              textAlignLast: "center",
            }}
          >
            <tr>
              <th>Player Name</th>
              <th>Player Photo</th>
              <th>Team Name</th>
              <th>Nationality</th>
              <th>Games Played</th>
              <th>Goals Scored</th>
            </tr>
            {topScorers.map((item, i) => (
              <tr key={i}>
                <td>{item.player.name}</td>
                <td>
                  <img
                    src={item.player.photo}
                    alt="Player Logo"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </td>
                <td>{item.statistics[0].team.name}</td>
                <td>{item.player.nationality}</td>
                <td>{item.statistics[0].games.appearences}</td>
                <td>{item.statistics[0].goals.total}</td>
              </tr>
            ))}
          </tbody>
          <div>
            <tbody
              style={{
                float: "right",
                textAlignLast: "center",
              }}
            >
              <tr>
                <th>Player Name</th>
                <th>Player Photo</th>
                <th>Team Name</th>
                <th>Nationality</th>
                <th>Games Played</th>
                <th>Assists</th>
              </tr>
              {topAssisters.map((item, i) => (
                <tr key={i}>
                  <td>{item.player.name}</td>
                  <td>
                    <img
                      src={item.player.photo}
                      alt="Player Logo"
                      style={{
                        width: 50,
                        height: 50,
                      }}
                    />
                  </td>
                  <td>{item.statistics[0].team.name}</td>
                  <td>{item.player.nationality}</td>
                  <td>{item.statistics[0].games.appearences}</td>
                  <td>{item.statistics[0].goals.assists}</td>
                </tr>
              ))}
            </tbody>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default LeagueStats;
