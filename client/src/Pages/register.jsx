import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Register() {
    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100 items-left">
            <Formik
            initialValues={{ username: '' , password: ''}}
            onSubmit={(values) => {
                console.log(values);

            }}
        >
            {({ isSubmitting }) => (
                <div className="form-container">
                    <Form className="form">
                        <h1 className='font-bold text-lg text-center'> Registration Form </h1>
                        
                        <div className="form-field py-6">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter Username"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2"> Password </label>
                                <Field
                                    type="text"
                                    name="password"
                                    placeholder="Enter password"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="inline-block rounded px-4 py-3 text-white font-bold transition-colors bg-blue-600 hover:bg-primary-700 active:bg-primary-800 disabled:cursor-not-allowed disabled:bg-red-300">
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
        </div>
    );
}

export default Register;
