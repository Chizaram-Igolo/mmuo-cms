import { title } from "process";
import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(12, "Email address is too short")
    .max(50, "Email address is too long")
    .required("Please enter your email")
    .email("Invalid email address"),
  username: Yup.string()
    .min(4, "Username is too short")
    .max(25, "Username is too long")
    .required("Please enter your username"),
  password: Yup.string()
    .min(8, "Password is too short!")
    .max(25, "Password is too long!")
    .required("Please enter your password"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords do not match")
  //   .required("Please confirm the password"),
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password is too short")
    .required("Please enter your password"),
});

export const CreateModuleSchema = Yup.object().shape({
  moduleGroup: Yup.string()
    .min(3, "Module Group name is too short")
    .max(50, "Email address is too long")
    .required("Please enter a Module Group name"),
  name: Yup.string()
    .min(3, "Name is too short")
    .max(25, "Name is too long")
    .required("Please enter a name"),
  intro: Yup.string()
    .min(100, "Introduction is too short")
    .max(900, "Introduction is too long")
    .required("Please enter an introduction for the module"),
  // password: Yup.string()
  //   .min(8, "Password is too short!")
  //   .max(25, "Password is too long!")
  //   .required("Please enter your password"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords do not match")
  //   .required("Please confirm the password"),
});
