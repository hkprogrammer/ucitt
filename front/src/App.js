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

import Announcements from './pages/Announcements'

// import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  // add events here:
  // (eventually, we will swap this out with a backend API call)

  // eslint-disable-next-line
  

  return (
	<BrowserRouter>
		<NavBar />
		<Routes basename="/">
			<Route path="/" element = {<Home />} />
			<Route path="/events" element = {<Events />} />
			<Route path="/ratings" element = {<Ratings />} />
			<Route path="/sign-in" element = {<SignIn />} />
			<Route path="/announcements" element = {<Announcements />} />
			{/*<Route path="/sign-up" element = {<SignUp />} />*/}
		</Routes>
		<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

		<script
		src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
		crossorigin></script>

		<script
		src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
		crossorigin></script>

		<script>var Alert = ReactBootstrap.Alert;</script>
	</BrowserRouter>
  );
}

export default App;
