import { Formik, Form, Field, ErrorMessage } from "formik"
import { useNavigate, Link } from "react-router-dom"
import { Heart } from "lucide-react"
import axios from 'axios'

function Signin() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-purple-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">FairHealthAI</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const response = await axios.post('http://localhost:3000/login', {
                username: values.username,
                password: values.password
              })

              if (response.data.success) {
                // Store the complete user object
                localStorage.setItem('user', JSON.stringify(response.data.user))
                console.log('Stored user data:', response.data.user) // For debugging
                navigate('/map_view')
              }
            } catch (error) {
              console.error('Login error:', error)
              setStatus({
                error: error.response?.data?.message || 'Invalid username or password'
              })
            } finally {
              setSubmitting(false)
            }
          }}
          validate={(values) => {
            const errors = {}
            if (!values.username) {
              errors.username = "Username is required"
            }
            if (!values.password) {
              errors.password = "Password is required"
            }
            return errors
          }}
        >
          {({ isSubmitting, isValid, dirty, status }) => (
            <Form className="mt-8 space-y-6">
              {status && status.error && (
                <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  {status.error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </div>

              <div className="text-center mt-4">
                <Link 
                  to="/register" 
                  className="text-sm text-purple-600 hover:text-purple-500"
                >
                  Don't have an account? Register here
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Signin