import { MainLayout } from "./mainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="page">
      <MainLayout>
        <div>
          <div
            style={{
              alignContent: "center",
              textAlignLast: "center",
            }}
          >
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
            <h1>Player's Information</h1>
            <p>{playerInfo.name}</p>
            <p>Nationality: {playerInfo.nationality}</p>
            <p>Age: {playerInfo.age}</p>
            <p>Height: {playerInfo.height}</p>
            <p>Weight: {playerInfo.weight}</p>
          </div>
          <div>
            <h2> Statistics </h2>
            <div>
              {playerStats.length > 0 &&
                playerStats.map((playerStats) => {
                  return (
                    <div key="playerID">
                      <div>
                        {playerStats.league.logo && (
                          <img
                            src={playerStats.league.logo}
                            alt="League Logo"
                            style={{
                              width: 175,
                              height: 175
                            }}
                          />
                        )}
                      </div>
                      <h3>Competion: {playerStats.league.name}</h3>
                      <div>
                        <p>Position : {playerStats.games.position}</p>
                        <p>Appearences : {playerStats.games.appearences}</p>
                        <p>Total Minutes : {playerStats.games.minutes}</p>
                        <p>Goals Scored: {playerStats.goals.total}</p>
                        <p>Assists : {playerStats.goals.assists}</p>
                        <p>Goals Conceded : {playerStats.goals.conceded}</p>
                        <p>Saves : {playerStats.goals.conceded}</p>
                        <p>Yellow Cards : {playerStats.cards.yellow}</p>
                        <p>Red Cards : {playerStats.cards.red}</p>
                        <br></br>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Player;
