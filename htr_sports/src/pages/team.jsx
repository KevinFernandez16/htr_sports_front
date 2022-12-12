import { MainLayout } from "./mainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/css/soccerCss/soccerTeam.css";

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
    <div>
      <MainLayout>
        <div className="TeamLogoHeader">
          {team.logo && <img src={team.logo} alt="Team Logo" />}
        </div>

        <div className="TeamNameText">
          <h1>{team.name} Players 2022/2023 </h1>
        </div>

        <div className="mainTeam">
          <tbody>
            <tr>
              <th>Player Image</th>
              <th>Player Name</th>
              <th>Number</th>
              <th>Position</th>
              <th>Age</th>
            </tr>
            {players.length > 0 &&
              players.map((players, i) => (
                <tr key={i}>
                  <td>
                    <img
                      className="photo"
                      src={players.photo}
                      alt="Player Logo"
                    />{" "}
                  </td>
                  <td>
                    <Link to={`/soccer/player/${players.id}`}>
                      {players.name}
                    </Link>
                  </td>
                  <td>{players.number}</td>
                  <td>{players.position}</td>
                  <td>{players.age}</td>
                </tr>
              ))}
          </tbody>
        </div>
      </MainLayout>
    </div>
  );
};

export default Team;
