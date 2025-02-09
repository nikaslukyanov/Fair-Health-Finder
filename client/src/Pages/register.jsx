import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Slider } from '@mui/material';
function Register() {
    const sliderConfig = [
        {
          name: "hypertension",
          label: "Hypertension"
        },
        {
          name: "arrhythmia",
          label: "Arrhythmia"
        },
        {
          name: "chest_pain",
          label: "Chest Pain"
        },
        {
          name: "palpitations",
          label: "Palpitations"
        },
        {
          name: "allergies",
          label: "Allergies"
        },
        {
          name: "fatigue",
          label: "Fatigue"
        },
        {
          name: "headache",
          label: "Headache"
        },
        {
          name: "bruising",
          label: "Bruising"
        },
        {
          name: "cough",
          label: "Cough"
        },
        {
          name: "nausea",
          label: "Nausea"
        },
        {
          name: "joint_pain",
          label: "Joint Pain"
        },
        {
          name: "weight_gain",
          label: "Weight Gain"
        },
        {
          name: "preterm_birth",
          label: "Preterm Birth"
        },
        {
          name: "fever",
          label: "Fever"
        }
      ];
      
      const marks = [
        { value: 1, label: 'None' },
        { value: 2, label: 'Mild' },
        { value: 3, label: 'Moderate' },
        { value: 4, label: 'Severe' },
        { value: 5, label: 'Very Severe' }
      ];
      
    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100 items-left">
            <Formik
            initialValues={{ username: '' , password: '', firstname: '', lastname: '', race: '', zipcode:'', insurance: '', gender: ''}}
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
                if(!values.race || values.race == "") {
                    errors.race = "Required"
                }
                if(!values.hispanic || values.hispanic == "") {
                    errors.hispanic = "Required"
                }
                if(!values.insurance || values.insurance == "") {
                    errors.insurance = "Required"
                }
                if(!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(values.zipcode)) {
                    errors.zipcode = "Not a valid zipcode"
                }
                return errors
            }}
        >
            {({ isSubmitting, isValid, dirty, values, setFieldValue}) => (
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
                                    <option value="white" label="White" />
                                    <option value="native" label="Native American or Alaska Native" />
                                    <option value="other" label="Other" />
                                </Field>
                            <ErrorMessage name="race" component="div" className="error-message text-red-500" />
                        </div>
                        <div className="form-field pb-6">
                        <label htmlFor="hispanic" className="block text-gray-700 font-semibold mb-2"> Do you identity as Hispanic? </label>       
                            <Field
                                    as="select"
                                    name="hispanic"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="" label="Select an option" />
                                    <option value="Yes" label="Yes" />
                                    <option value="No" label="No" />
                                    <option value="Other" label="Prefer not to say" />
                                </Field>
                            <ErrorMessage name="hispanic" component="div" className="error-message text-red-500" />
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
                        <h2 className='font-bold pb-6'> Section 2: Health Information & Questionaire</h2>
                        <div className="form-field pb-6">
                        <label htmlFor="insurance" className="block text-gray-700 font-semibold mb-2"> Do you have insurance? </label>       
                            <Field
                                    as="select"
                                    name="insurance"
                                    className="w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="" label="Select an option" />
                                    <option value="Yes" label="Yes" />
                                    <option value="No" label="No" />
                                    <option value="Other" label="Prefer not to say" />
                                </Field>
                            <ErrorMessage name="insurance" component="div" className="error-message text-red-500" />

                        </div>
                        <div className="space-y-6">
    {sliderConfig.map(({ name, label }) => (
      <div key={name}>
        <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
          {label}
        </label>
        <div className="flex items-center">
          <Slider
            name={name}
            value={values[name]}
            onChange={(event, newValue) => setFieldValue(name, newValue)}
            min={1}
            max={5}
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
            className="w-3/4"
          />
        </div>
      </div>
    ))}
  </div>
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
