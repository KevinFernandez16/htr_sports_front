import { MainLayout } from "./mainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pages/css/soccerCss/player.css";

const Player = () => {
  let { id } = useParams();
  console.log({ id });
  const [playerStats, setPlayerStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});

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
        `https://api-football-v1.p.rapidapi.com/v3/players?id=${id}&season=2022`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setPlayerInfo(data.response[0].player);
          setPlayerStats(data.response[0].statistics);
          console.log(data);
        });
    }
  }, [id]);

  return (
    <div className="PlayerPage">
      <MainLayout>
        <div className="PlayerPhoto">
          {playerInfo.photo && (
            <img
              src={playerInfo.photo}
              alt="Player Logo"
              style={{
                width: 400,
                height: 400,
              }}
            />
          )}
        </div>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1 style={{fontSize: 'xxx-large' }}>Player's Information</h1>
        </div>
        <div className="PlayerInfo">
          <strong>Name : {playerInfo.name}</strong>
          <br></br>
          <strong>Nationality: {playerInfo.nationality}</strong>
          <br></br>
          <strong>Age: {playerInfo.age}</strong>
          <br></br>
          <strong>Height: {playerInfo.height}</strong>
          <br></br>
          <strong>Weight: {playerInfo.weight}</strong>
        </div>
        <br></br>

        <div>
          <h2 style={{fontSize: 'xxx-large', color:'#ec6a00'}} > Statistics </h2>
        </div>

        <div className="PlayerTable">
          <table >
            <tr>
              <th>Competition Logo</th>
              <th>Competition Name</th>
              <th>Position</th>
              <th>Appearances</th>
              <th>Total Minutes Played</th>
              <th>Goals Scored</th>
              <th>Assists</th>
              <th>Yellow Cards </th>
              <th>Red Cards</th>
            </tr>
            {playerStats.length > 0 &&
              playerStats.map((playerStats) => {
                return (
                  <tr>
                    <td>
                      {playerStats.league.logo && (
                        <img
                          src={playerStats.league.logo}
                          alt="League Logo"
                          style={{
                            width: 175,
                            height: 175,
                          }}
                        />
                      )}
                    </td>
                    <td>{playerStats.league.name}</td>
                    <td>{playerStats.games.position}</td>
                    <td>{playerStats.games.appearences}</td>
                    <td>{playerStats.games.minutes}</td>
                    <td>{playerStats.goals.total}</td>
                    <td>{playerStats.goals.assists}</td>
                    <td>{playerStats.cards.yellow}</td>
                    <td>{playerStats.cards.red}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </MainLayout>
    </div>
  );
};

export default Player;
