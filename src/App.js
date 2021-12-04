import "./App.css";
import "./config/config";
import "./config/persistence";
import Landing from "./landing/Landing";
import Store from "./store/Store";

function App() {
  return (
    <Store>
      <div
        className="App"
        style={{ backgroundImage: 'url("./image/1 blur.jpg")' }}
      >
        <Landing />
      </div>
    </Store>
  );
}

export default App;
