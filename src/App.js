import './App.css';
import './components/Punchclock'
import Punchclock from './components/Punchclock';

function App() {
  return (
    <div className="App">
      <header className="App-header bg-gray-700">
        <Punchclock />
      </header>
    </div>
  );
}

export default App;