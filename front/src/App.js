import './App.css';
import NavBar from './Components/NavBar';
// eslint-disable-next-line
import Home from './pages/Home';
// eslint-disable-next-line
import Events from './pages/Events';
// eslint-disable-next-line
import EventBracket from './pages/EventBracket';
import SignIn from './pages/SignIn';


function App() {

  // add events here:
  // (eventually, we will swap this out with a backend API call)

  // eslint-disable-next-line
  const events = [
    {
        name:"Junior Varsity Tryouts",
        time:"11:00 AM",
        date:"12/25/2024",
        capacity:"8/16",
        location:"Activity Annex",
        registrationCloseDate:"12/26/2024 16:48"
    },
    {
        name:"Varsity Tryouts",
        time:"11:00 AM",
        date:"12/25/2023",
        capacity:"5/16",
        location:"Activity Annex",
        registrationCloseDate:"12/25/2023 21:00"
    }
  ];

  return (
    <section>
      <NavBar />

      {/* <Events events={events}/>
      {
        //<EventBracket />
      } */}
      <SignIn />    

    </section>

  );
}

export default App;
