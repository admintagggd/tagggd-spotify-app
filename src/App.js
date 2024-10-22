import logo from "./logo.svg";
import "./App.css";
import SpotifyLogin from "./spotifyLogin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SpotifyLogin />
    </div>
  );
}

export default App;
