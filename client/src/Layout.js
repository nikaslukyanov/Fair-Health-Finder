// Layout.js
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to FairHealthAI</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to continue</p>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/signin" className="w-full">
            <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Sign In
            </button>
          </Link>
          
          <Link to="/register" className="mt-4 text-sm text-purple-600 hover:text-purple-700">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}