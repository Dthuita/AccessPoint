import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import './App.css'
import poke_bg from './imgs/pxfuel.jpg'

//custom routes from custom router//
import CustomRoutes from './CustomRoutes'

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${poke_bg})`, backgroundColor: '#7eac71', backgroundRepeat: 'no-repeat'}}>
      <Router>
        <CustomRoutes/>
      </Router>
    </div>
  );
}

export default App;
