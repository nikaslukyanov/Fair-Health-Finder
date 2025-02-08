import React from "react";
import { Formik, Field, Form } from "formik";

function Register() {
  return (
    <Formik
    initialValues={{ username: "" }} // ✅ Required initial values
      onSubmit={(values) => {
        console.log("Form submitted:", values);
      }}
        >
        <Form>
            <Field name = "username" type = "text"/>
            <button type="submit">
                Register
            </button>
        </Form>

    </Formik>
  );
}

export default Register;
