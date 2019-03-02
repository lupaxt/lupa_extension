import React from "react";
// import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form, Field, withFormik } from "formik";
import api from "../../apis/api";

// import "./account.css";

const LoginPage = ({ values, errors, touched, isSubmitting }) => (
  <React.Fragment>
    <div className="title">Sign In</div>
    <Form className="login-form">
      <div className="credentials">
        <Field type="email" name="email" placeholder={"email"} />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field type="password" name="password" placeholder={"password"} />
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <div className="login-links" />
      {errors.api && <p>{`There was an error: ${errors.api}`}</p>}

      <button
        type="submit"
        title="Sign in"
        disabled={!values.email || !values.password || isSubmitting}
      >
        Log In
      </button>
    </Form>
  </React.Fragment>
);

const LoginMeta = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("A Password would be a good idea")
      .min(6, "Password is too short - should be 6 chars minimum.")
  }),
  handleSubmit(
    { email, password } /* form values */,
    { resetForm, setErrors, setSubmitting } /* formikExtras */
  ) {
    console.log("here account");
    api
      .signIn(email, password)
      .then(res => setSubmitting(false))
      .catch(err => {
        resetForm();
        setErrors({ api: err })
      });
  }
});

export default LoginMeta(LoginPage);
