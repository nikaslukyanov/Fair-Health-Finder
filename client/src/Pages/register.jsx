import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Slider } from '@mui/material';
import axios from 'axios';

function Register() {
    const diseaseData = [
        {
          disease_group: "Cardiac Conditions",
          symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue', 'Palpitations']
        },
        {
          disease_group: "Cancer-Related Conditions",
          symptoms: ['Fatigue', 'Nausea and vomiting', 'Unexplained weight loss', 'Pain (localized or generalized)']
        },
        {
          disease_group: "Neurological Disorders",
          symptoms: ['Headaches', 'Dizziness or vertigo', 'Numbness or weakness in limbs', 'Seizures']
        },
        {
          disease_group: "Trauma & Injury",
          symptoms: ['Bruising', 'Swelling or inflammation', 'Pain (localized to injury)', 'Restricted movement']
        },
        {
          disease_group: "Respiratory Conditions",
          symptoms: ['Coughing', 'Shortness of breath', 'Wheezing', 'Chest tightness']
        },
        {
          disease_group: "Digestive Disorders",
          symptoms: ['Abdominal pain', 'Nausea or vomiting', 'Diarrhea', 'Bloating or indigestion']
        },
        {
          disease_group: "Musculoskeletal Disorders",
          symptoms: ['Joint pain', 'Muscle stiffness', 'Swelling or inflammation in joints', 'Decreased range of motion']
        },
        {
          disease_group: "Endocrine & Metabolic Disorders",
          symptoms: ['Unexplained weight changes', 'Increased thirst or urination', 'Fatigue or weakness', 'Hot or cold intolerance']
        },
        {
          disease_group: "Delivery and Neonatal Procedures",
          symptoms: ['Preterm labor (contractions before 37 weeks)', 'Bleeding during pregnancy', 'High blood pressure', 'Premature rupture of membranes']
        },
        {
          disease_group: "Infectious Diseases",
          symptoms: ['Fever', 'Chills', 'Cough', 'Fatigue']
        },
        {
            disease_group: "Other",
            symptoms: ['Headaches', 'Dizziness', 'Insomnia', 'Weight loss or gain']
        },
    ];

    const sliderConfig = diseaseData.map(({ disease_group, symptoms }) => ({
        name: disease_group,
        symptoms: symptoms.map((symptom, index) => ({
            name: `${disease_group}_${index+1}`,
            label: symptom,
        }))
    }));    
      
    const marks = [
        { value: 1, label: 'None' },
        { value: 2, label: 'Mild' },
        { value: 3, label: 'Moderate' },
        { value: 4, label: 'Severe' },
        { value: 5, label: 'Very Severe' }
    ];

    // Create initial values object for all sliders
    const initialSliderValues = {};
    sliderConfig.forEach(({ symptoms }) => {
        symptoms.forEach(({ name }) => {
            initialSliderValues[name] = 1; // Set default value to 1
        });
    });

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100 items-left">
            <Formik
                initialValues={{ 
                    username: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    race: '',
                    zipcode: '',
                    insurance: '',
                    gender: '',
                    hispanic: '',
                    ...initialSliderValues // Add initial slider values
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        // Calculate disease group averages with corrected field names
                        const diseaseGroupMapping = {
                            'Cardiac Conditions': 'cardiac_conditions',
                            'Cancer-Related Conditions': 'cancer_related_conditions',
                            'Neurological Disorders': 'neurological_disorders',
                            'Trauma & Injury': 'trauma_injury',
                            'Respiratory Conditions': 'respiratory_conditions',
                            'Digestive Disorders': 'digestive_disorders',
                            'Musculoskeletal Disorders': 'musculoskeletal_disorders',
                            'Endocrine & Metabolic Disorders': 'endocrine_metabolic_disorders',
                            'Delivery and Neonatal Procedures': 'delivery_neonatal_procedures',
                            'Infectious Diseases': 'infectious_diseases',
                            'Other': 'other_conditions'
                        };

                        // Calculate disease group averages
                        const diseaseGroupAverages = {};
                        diseaseData.forEach(({ disease_group, symptoms }) => {
                            const dbFieldName = diseaseGroupMapping[disease_group];
                            if (!dbFieldName) {
                                console.error(`No mapping found for disease group: ${disease_group}`);
                                return;
                            }

                            let sum = 0;
                            let count = 0;
                            symptoms.forEach((_, index) => {
                                const symptomName = `${disease_group}_${index + 1}`;
                                const value = parseInt(values[symptomName]) || 0;
                                sum += value;
                                count++;
                            });
                            diseaseGroupAverages[dbFieldName] = count > 0 ? Math.round(sum / count) : 0;
                        });

                        // Create a mapping for symptoms to their correct field names
                        const symptomMapping = {
                            'Cardiac Conditions_1': 'chest_pain',
                            'Cardiac Conditions_2': 'shortness_of_breath',
                            'Cardiac Conditions_3': 'fatigue',
                            'Cardiac Conditions_4': 'palpitations',
                            'Cancer-Related Conditions_1': 'fatigue',
                            'Cancer-Related Conditions_2': 'nausea_vomiting',
                            'Cancer-Related Conditions_3': 'unexplained_weight_loss',
                            'Cancer-Related Conditions_4': 'pain',
                            'Neurological Disorders_1': 'headaches',
                            'Neurological Disorders_2': 'dizziness_vertigo',
                            'Neurological Disorders_3': 'numbness_weakness_limbs',
                            'Neurological Disorders_4': 'seizures',
                            'Trauma & Injury_1': 'bruising',
                            'Trauma & Injury_2': 'swelling_inflammation',
                            'Trauma & Injury_3': 'pain',
                            'Trauma & Injury_4': 'restricted_movement',
                            'Respiratory Conditions_1': 'coughing',
                            'Respiratory Conditions_2': 'shortness_of_breath',
                            'Respiratory Conditions_3': 'wheezing',
                            'Respiratory Conditions_4': 'chest_tightness',
                            'Digestive Disorders_1': 'abdominal_pain',
                            'Digestive Disorders_2': 'nausea_vomiting',
                            'Digestive Disorders_3': 'diarrhea',
                            'Digestive Disorders_4': 'bloating_indigestion',
                            'Musculoskeletal Disorders_1': 'joint_pain',
                            'Musculoskeletal Disorders_2': 'muscle_stiffness',
                            'Musculoskeletal Disorders_3': 'swelling_inflammation',
                            'Musculoskeletal Disorders_4': 'decreased_range_of_motion',
                            'Endocrine & Metabolic Disorders_1': 'unexplained_weight_changes',
                            'Endocrine & Metabolic Disorders_2': 'increased_thirst_urination',
                            'Endocrine & Metabolic Disorders_3': 'fatigue',
                            'Endocrine & Metabolic Disorders_4': 'hot_cold_intolerance',
                            'Delivery and Neonatal Procedures_1': 'preterm_labor',
                            'Delivery and Neonatal Procedures_2': 'bleeding_pregnancy',
                            'Delivery and Neonatal Procedures_3': 'high_blood_pressure',
                            'Delivery and Neonatal Procedures_4': 'premature_rupture_membranes',
                            'Infectious Diseases_1': 'fever',
                            'Infectious Diseases_2': 'chills',
                            'Infectious Diseases_3': 'coughing',
                            'Infectious Diseases_4': 'fatigue',
                            'Other_1': 'headaches',
                            'Other_2': 'dizziness_vertigo',
                            'Other_3': 'insomnia',
                            'Other_4': 'weight_loss_gain'
                        };

                        // Initialize all symptoms to 0
                        const symptoms = {};
                        Object.values(symptomMapping).forEach(dbField => {
                            symptoms[dbField] = 0;
                        });

                        // Map symptoms to their correct fields
                        Object.entries(symptomMapping).forEach(([formField, dbField]) => {
                            const value = parseInt(values[formField]) || 0;
                            symptoms[dbField] = Math.max(symptoms[dbField], value);
                        });

                        // Create payload with all form data
                        const payload = {
                            username: values.username,
                            password: values.password,
                            firstname: values.firstname,
                            lastname: values.lastname,
                            race: values.race,
                            zipcode: parseInt(values.zipcode),
                            insurance: values.insurance,
                            gender: values.gender.toLowerCase(),
                            hispanic: values.hispanic,
                            ...diseaseGroupAverages,
                            ...symptoms
                        };

                        console.log('Payload being sent:', payload); // For debugging

                        // Send POST request to backend
                        const response = await axios.post('http://localhost:3000/users', payload);
                        console.log('Registration successful:', response.data);
                        
                        alert('Registration successful!');
                        
                    } catch (error) {
                        console.error('Registration error:', error);
                        setErrors({ submit: error.response?.data?.error || 'Registration failed' });
                    } finally {
                        setSubmitting(false);
                    }
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
                            <h1 className='font-bold text-xl text-center'> Registration Form </h1>
                            
                            <h2 className='font-bold text-lg'> Section 1: Account & Demographic Information</h2>
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
                            <h2 className='text-lg font-bold pb-6'> Section 2: Health Information & Questionaire</h2>
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
                <h1> For the questionnaire below, please fill the severity of your symptoms from a scale from 1-5
                    <ul className='list-disc ml-4'>
                        <li> 1: Never or almost never have the symptom</li>
                        <li> 2: Occasionally have it, effect is not severe </li>
                        <li> 3: Occasionally have it, effect is severe </li>
                        <li> 4: Frequently have it, effect is not severe </li>
                        <li> 5: Frequently have it, effect is severe</li>
                    </ul>
                </h1>
                {sliderConfig.map(({ name, symptoms }) => (
                  <div key={name}>
                    <h3 className="text-md font-bold mb-4"> {name}</h3>
                    {symptoms.map(({name: symptomName, label}) => (
                        <div key = {symptomName}> 
                            <label htmlFor={symptomName} className="block text-gray-700 font-semibold mb-2">
                      {label}
                    </label>
                    <div className="flex items-center">
                      <Slider
                        name={symptomName}
                        value={values[symptomName] || 1}
                        onChange={(_, newValue) => {
                            setFieldValue(symptomName, newValue);
                        }}
                        min={1}
                        max={5}
                        step={1}
                        marks={marks}
                        valueLabelDisplay="auto"
                        className="w-3/4"
                      />
                      <span className="ml-4">
                        {values[symptomName] || 1}
                      </span>
                    </div>
                        </div>
                    ))}
                    
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
