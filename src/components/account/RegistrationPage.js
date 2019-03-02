import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import api from "../../apis/api";
import { request } from "graphql-request";
import { graphql_server } from "../../endpoints";
import gql from "graphql-tag";

const createUser = (name, email, fibauid) => {
  const mutation = gql`
    mutation createUser{
        createUser(name:"${name}", email:"${email}", fibauid: "${fibauid}")
        {
            id
            name
        }
    }
  `;
  return request(graphql_server, mutation);
};

const getName = name => {
  const query = gql`
    query getName($name: String!){
        userByName(name:$name)
        {
            name
            id
        }
    }`;
  return request(graphql_server, query, { name });
};

const RegistrationPage = ({ touched, values, errors }) => {
  const { name, email, password } = values;
  return <React.Fragment>
      <div className="title">Register</div>
      <Form className="login-form">
        <div className="credentials">
          <Field name="name" value={name.toLowerCase()} placeholder={"displayname"} />
          {errors.name && <div>{errors.name}</div>}

          <Field name="email" value={email} placeholder={"Email Address"} />
          {touched.email && errors.email && <div>{errors.email}</div>}

          <Field name="password" type="password" placeholder={"password"} />
          {touched.password && errors.password && <div>
              {errors.password}
            </div>}
        </div>
        <div className="error" />
        {errors.submitter && <p>{errors.submitter}</p>}
        {errors.api && <p>{`Error while registering : ${errors.api}`}</p>}

        <button type="submit" title="Sign up" disabled={!email || !password || !name}>
          Submit
        </button>
      </Form>
    </React.Fragment>;
};
const RegistrationMeta = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: ""
    //Login + passwordRepeated = Register
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("You need a display name")
      .min(3, "minimum 3 chars")
      .matches(/^([a-z\d]+_)*[a-z\d]+$/i, "no weird signs pls"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("A Password would be a good idea")
      .min(6, "Password is too short - should be 6 chars minimum.")
  }),
  async handleSubmit(
    { email, password, name } /* form values */,
    { resetForm, setErrors, setSubmitting } /* formikExtras */
  ) {
    try {
      const data = await getName(name);
      console.log(data, "getname");
      if (data.userByName) {
        setErrors({ submitter: "Displayname is taken :( " });
        return;
      }
    } catch (error) {
      setErrors({ submitter: error.message });
      return;
    }

    try {
      const user = await api.register(email, password);
      console.log("user fiba", user);
      const { uid } = user;
      const data = await createUser(name, email, uid);
    } catch (error) {
      setErrors({ submitter: error.message });
      resetForm();
    }
    setErrors({ submitter: "success!" });
    setSubmitting(false);
  }
});

export default RegistrationMeta(RegistrationPage);
