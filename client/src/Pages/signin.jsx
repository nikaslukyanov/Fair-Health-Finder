import { Formik, Form, Field, ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom"
import { Heart } from "lucide-react"

function Signin() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-purple-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">FairHealth</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              // Simulated API call
              await new Promise(resolve => setTimeout(resolve, 1000))
              navigate("/map_view")
            } catch (error) {
              setStatus({
                error: "Invalid username or password"
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
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-sm font-medium text-purple-600 hover:text-purple-500"
                >
                  Don't have an account? Register here
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Signin