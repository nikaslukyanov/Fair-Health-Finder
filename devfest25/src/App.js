import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <p className="mb-8 text-lg font-semibold">Welcome to our [insert team project here]</p>
      
      <div className="flex flex-row md:flex-row items-center md:items-stretch bg-white p-6 rounded-lg shadow-md">
        <div className="max-w-sm mb-6 md:mb-0 md:mr-6 md:border-r border-gray-300 pr-6 text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Don't have an account?</h3>
          <p className="mb-4">Create an account to get started.</p>
          <a href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register</a>
        </div>
        
        <div className="text-center md:text-left md:ml-6">
          <h3 className="text-xl font-bold mb-2">Already have an account?</h3>
          <p className="mb-4">Let's get you signed in.</p>
          <a href="/signin" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Sign In</a>
        </div>
      </div>
    </div>
  );
}

export default App;
