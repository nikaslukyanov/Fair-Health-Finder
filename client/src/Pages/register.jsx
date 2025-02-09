import React, {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Register() {
    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100 items-left">
            <Formik
            initialValues={{ username: '' , password: '', firstname: '', lastname: '', race: ''}}
            onSubmit={(values) => {
                console.log(values);
            }}
            validateOnChange={true}
            validateOnBlur={true}
            validate={(values) => {
                const errors = {}
                if(!values.username) {
                    errors.username = "Required"
                }
                if(!values.password) {
                    errors.password = "Required"
                }
                if(!values.firstname) {
                    errors.firstname = "Required"
                }
                if(!values.lastname) {
                    errors.lastname = "Required"
                }
                if(!values.gender) {
                    errors.gender = "Required"
                }
                if(!values.race) {
                    errors.race = "Required"
                }
                if(!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(values.zipcode)) {
                    errors.zipcode = "Not a valid zipcode"
                }
                return errors
            }}
        >
            {({ isSubmitting, isValid, dirty}) => (
                <div className="form-container">
                    <Form className="form">
                        <h1 className='font-bold text-lg text-center'> Registration Form </h1>
                        
                        <h2 className='font-bold'> Section 1: Account & Demographic Information</h2>
                        <div className="form-field py-6">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter Username"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="username" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2"> Password </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="password" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="firstname" className="block text-gray-700 font-semibold mb-2">First Name</label>
                                <Field
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter First Name"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="firstname" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="lastname" className="block text-gray-700 font-semibold mb-2">Last Name (Surname)</label>
                                <Field
                                    type="text"
                                    name="lastname"
                                    placeholder="Enter Last Name"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="lastname" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2"> Gender </label>       
                            <Field
                                    as="select"
                                    name="gender"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="" label="Select an option" />
                                    <option value="male" label="Male" />
                                    <option value="female" label="Female" />
                                    <option value="other" label="Other" />
                                </Field>
                            <ErrorMessage name="gender" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="race" className="block text-gray-700 font-semibold mb-2"> Race/Ethnicity </label>       
                            <Field
                                    as="select"
                                    name="race"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="" label="Select an option" />
                                    <option value="asian" label="Asian" />
                                    <option value="black" label="Black or African American" />
                                    <option value="hispanic" label="Hispanic or Latino" />
                                    <option value="white" label="White" />
                                    <option value="native" label="Native American or Alaska Native" />
                                    <option value="other" label="Other" />
                                </Field>
                            <ErrorMessage name="race" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="zipcode" className="block text-gray-700 font-semibold mb-2">Zip Code</label>
                                <Field
                                    type="numeric"
                                    name="zipcode"
                                    placeholder="Enter Zipcode"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            <ErrorMessage name="zipcode" component="div" className="error-message text-red-500" />
                        </div>
                        <h2 className='font-bold pb-6'> Section 2: Health Information</h2>
                        
                        <button type="submit" disabled={isSubmitting || !isValid || !dirty} className="inline-block rounded px-4 py-3 text-white font-bold transition-colors bg-blue-600 hover:bg-primary-700 active:bg-primary-800 disabled:cursor-not-allowed disabled:bg-red-300">
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
