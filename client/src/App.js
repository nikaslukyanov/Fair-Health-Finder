import logo from './logo.svg';
import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/home';
import MapView from './Pages/map_view';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map_view" element={<MapView />} />
  
      </Routes>
    </Router>
  );
}

export default App;