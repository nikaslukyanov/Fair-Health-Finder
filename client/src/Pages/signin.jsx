import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100 items-left">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    try {
                        const response = await axios.post('http://localhost:3000/login', {
                            username: values.username,
                            password: values.password
                        });

                        if (response.data.success) {
                            // Login successful
                            alert('Login successful!');
                            // You can store the user data or token in localStorage if needed
                            localStorage.setItem('user', JSON.stringify(response.data.user));
                            // Redirect to home page or dashboard
                            navigate('/dashboard');
                        }
                    } catch (error) {
                        console.error('Login error:', error);
                        setStatus({
                            error: error.response?.data?.message || 'Invalid username or password'
                        });
                    } finally {
                        setSubmitting(false);
                    }
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = "Required";
                    }
                    if (!values.password) {
                        errors.password = "Required";
                    }
                    return errors;
                }}
            >
                {({ isSubmitting, isValid, dirty, status }) => (
                    <div className="form-container">
                        <Form className="form">
                            {status && status.error && (
                                <div className="error-message text-red-500 mb-4">
                                    {status.error}
                                </div>
                            )}
                            <div className="form-field py-6">
                                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                                    Username
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter Username"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="username" component="div" className="error-message text-red-500" />
                            </div>
                            <div className="form-field pb-6">
                                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <ErrorMessage name="password" component="div" className="error-message text-red-500" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid || !dirty}
                                className="inline-block rounded px-4 py-3 text-white font-bold transition-colors bg-blue-600 hover:bg-primary-700 active:bg-primary-800 disabled:cursor-not-allowed disabled:bg-red-300"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </button>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default Signin;