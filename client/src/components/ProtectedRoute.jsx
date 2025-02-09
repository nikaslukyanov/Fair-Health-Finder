import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by looking for user data in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute; 