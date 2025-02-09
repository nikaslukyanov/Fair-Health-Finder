import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import MapView from './Pages/map_view';
import Register from './Pages/register';
import Signin from './Pages/signin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/map_view" element={<MapView />} />
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>
  );
}

export default App;