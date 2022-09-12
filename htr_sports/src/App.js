import Header from './components/header'
import Home from './pages/home'
import Soccer from './pages/soccer'
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
        <Header />
        <Routes >
          <Route path={Paths[0].path} element={<Home />} />
          <Route path={Paths[1].path} element={<Soccer />} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;
