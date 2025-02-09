import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MapView from './Pages/map_view';
import Register from './Pages/register';
import Signin from './Pages/signin';
import ProtectedRoute from './components/ProtectedRoute';
import ChatInterface from './Pages/aichat';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route 
          path="/map_view" 
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatInterface />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;