import Header from './components/header'
import Team from './pages/team'
import Home from './pages/home'
import Soccer from './pages/soccer'
import Basketball from './pages/basketball'
import Fantasy from './pages/fantasy'
import Forum from './pages/forum'
import FindGame from './pages/findgame'
import Paths from './utils/route'
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className='app-container'>
      <Router>
        {/* <Header /> */}
        <Routes >
          <Route path={Paths.home.path} element={<Home />} />
          <Route path={Paths.soccer.path} element={<Soccer />} />
          <Route path={`${Paths.soccer.path}/team/:id`} element={<Team />} />
          <Route path={Paths.basketball.path} element={<Basketball />} />
          <Route path={Paths.fantasy.path} element={<Fantasy />} />
          <Route path={Paths.forum.path} element={<Forum />} />
          <Route path={Paths.findGame.path} element={<FindGame />} />
          {/* <Route path={Paths[1].path} element={<Soccer />} />
          <Route path={Paths[4].path} element={<Forum />} /> */}
        </Routes >
      </Router>
    </div>
  );
}

export default App;
