import './App.css';
import Register from './register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap the Layout around nested routes */}
        <Route path="/" element={<Layout />}>
          {/* Register route */}
          <Route path="/register" element={<Register />} />

          {/* Add more nested routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;