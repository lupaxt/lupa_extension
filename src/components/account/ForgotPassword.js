import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import api from "../../apis/api";

const ForgotPasswordMeta = withFormik({
  mapPropsToValues: () => ({ email: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required")
  }),
  handleSubmit(
    { email } /* form values */,
    { setValues, resetForm, setSubmitting } /* formikExtras */
  ) {
    api.sendPasswordResetEmail(email).then(res => {
      setValues({ sent: `Reset email sent to: ${email}` });
      setSubmitting(false);
    });
    // resetForm()
  }
});

const ForgotPassword = ({ values, errors, touched, isSubmitting }) => (
  <React.Fragment>
    <div className="title">Forgot password</div>
    <Form className="login-form">
      <div className="credentials">
        <Field type="email" name="email" placeholder={"your email"} />
        {/* TODO: This is error.email is somehow firing, even with email  */}
        {/* {touched.email && errors.email && <p>{errors.email}</p>} */}
      </div>
      {errors.api && <p>{`There was an error: ${errors.api}`}</p>}
      {values.sent && <p>{values.sent}</p>}

      <button type="submit" title="Continue" disabled={isSubmitting}>
        SUBMIT
      </button>
    </Form>
  </React.Fragment>
);

export default ForgotPasswordMeta(ForgotPassword);
