import './App.css';
//import Home from './pages/Home';
import Events from './pages/Events';
import NavBar from './Components/NavBar';

function App() {

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
      <Events events={events}/>
    </section>

  );
}

export default App;
