function displayTeam(data){
  const team = data.response[0].team
  const teamname = team.name
  const testDiv = document.getElementById("Test");
  const heading = document.createElement("h1");
  heading.innerHTML = teamname;
  testDiv.appendChild(heading);
}

function displayAPI(){
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'bdefdf6252mshd65ff5a8d5f6fbfp160062jsn5854d118e453',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };
  const data = fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=215662&team=463', options)
  	.then(response => response.json())
  	.then(response => { //If data is retrieved then run displayteam
      console.log(response);
      displayTeam(response)})
  	.catch(err => console.error(err)); //Any error will then be put in console
}
