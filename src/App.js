import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

//custom routes from custom router//
import CustomRoutes from './CustomRoutes'

function App() {
  return (
    <div className="App">
      <Router>
        <CustomRoutes/>
      </Router>
    </div>
  );
}

export default App;
