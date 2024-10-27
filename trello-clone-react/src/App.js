import './App.css';
import Board from './components/Board';
/* <img src={`${process.env.PUBLIC_URL}/images/Capture001.png`} alt="Background" /> */

function App() {
  return (
    <div className="App">
      <h1>Trello Board</h1>
      <br></br>
      <Board></Board>
    </div>
  );
}

export default App;
