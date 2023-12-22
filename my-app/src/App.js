import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to UCITT Software in Development.
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Youtube
        </a>
      </header>
    </div>
  );
}

export default App;
