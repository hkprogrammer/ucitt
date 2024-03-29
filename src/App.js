import './App.css';
import NavBar from './Components/NavBar';
// eslint-disable-next-line
import Home from './pages/Home';
// eslint-disable-next-line
import Events from './pages/Events';
// eslint-disable-next-line
import SignIn from './pages/SignIn';
// eslint-disable-next-line
import Ratings from './pages/Ratings';
// eslint-disable-next-line
import League from './pages/League';
// eslint-disable-next-line
import Announcements from './pages/Announcements'
// eslint-disable-next-line
import EventPage from './pages/EventPage';

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
			<Route path="/league" element = {<League />} />
			<Route path="/event" element={<EventPage />} />
			{/*<Route path="/sign-up" element = {<SignUp />} />*/}
		</Routes>
	</BrowserRouter>
  );
}

export default App;
