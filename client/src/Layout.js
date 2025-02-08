// Layout.js
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100 items-center">
      <div className="mb-8 text-lg font-semibold text-center">Welcome to our [insert team project here]</div>
      <div className="flex flex-row gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="max-w-sm border-r border-gray-300 pr-6 order-1">
          <h3 className="text-xl font-bold mb-2">Don't have an account?</h3>
          <p className="mb-4">Create an account to get started.</p>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register</Link>
        </div>

        <div className="max-w-sm order-2">
          <h3 className="text-xl font-bold mb-2">Already have an account?</h3>
          <p className="mb-4">Let's get you signed in.</p>
          <Link to="/signin" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Sign In</Link>
        </div>
      </div>

    </div>
  );
}