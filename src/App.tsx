import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MainPage } from './component/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path={'/'} component={MainPage} />
      </Router>
    </div>
  );
}

export default App;
