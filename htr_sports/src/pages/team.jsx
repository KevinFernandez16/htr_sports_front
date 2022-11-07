import { MainLayout } from "./mainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/css/soccerCss/soccerTeam.css"


const Team = () => {
  let { id } = useParams();
  console.log({ id });
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);

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
        `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${id}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setTeam(data.response[0].team);
          setPlayers(data.response[0].players);
          console.log(data);
          console.log("Working");
        });
    }
  }, [id]);

  return (
    <div className="mainTeam">
      <MainLayout>
        <div>
          {team.logo && <img src={team.logo} alt="Team Logo" />}
          <div>
            <p>{team.name} Players 2022/2023 </p>

            {players.length > 0 &&
              players.map((players) => {
                return (
                  <div key={players.id}>
                    <div>
                      {players.photo && (
                        <img src={players.photo} alt="Player Logo" />
                      )}
                      <Link to={`/soccer/player/${players.id}`}>
                        <h1>{players.name}</h1>
                      </Link>
                      <p>Number: {players.number}</p>
                      <p>Position: {players.position}</p>
                      <p>Age: {players.age}</p>
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

export default Team;
