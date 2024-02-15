import './App.css';
import NavBar from './Components/NavBar';
// eslint-disable-next-line
import Home from './pages/Home';
// eslint-disable-next-line
import Events from './pages/Events';
// eslint-disable-next-line
import EventBracket from './pages/EventBracket';
// eslint-disable-next-line
import SignIn from './pages/SignIn';
// eslint-disable-next-line
import Ratings from './pages/Ratings';

// eslint-disable-next-line
import League from './pages/League';

// import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route ,Link, Router} from "react-router-dom";

function App() {

  // add events here:
  // (eventually, we will swap this out with a backend API call)

  // eslint-disable-next-line
  

  return (
	<BrowserRouter>
		{/* <NavBar /> */}
		<Routes basename="/">
			<Route path="/" element = {<Home />} />
			<Route path="/events" element = {<Events />} />
			<Route path="/ratings" element = {<Ratings />} />
			<Route path="/signin" element = {<SignIn />} />
			<Route path="/league" element = {<League />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
