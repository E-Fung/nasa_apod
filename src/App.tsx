import './App.css';
import { MainPage } from './component/MainPage';
import { AppContextProvider } from './AppContext';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <MainPage />
      </AppContextProvider>
    </div>
  );
}

export default App;
