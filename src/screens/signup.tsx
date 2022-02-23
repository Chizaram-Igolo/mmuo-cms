import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";

import { SignupSchema } from "../lib/validationSchema";

import { useAuth } from "../contexts/AuthContext";
import TextInput from "../components/inputs/authtextinput";
import AuthHeader from "../components/authheader";
import AuthFooter from "../components/authfooter";
import AlertMessage from "../components/alertmessage";

import {
  dbTimestamp,
  projectDatabase,
  ref,
  set,
  appAuth,
} from "../firebase/config";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  type FormValues = {
    email: string;
    username: string;
    password: string;
  };

  function clearMessages() {}

  async function submitHandler(values: FormValues) {
    try {
      setError("");

      const userCredential = await signup(values.email, values.password);
      const { user } = userCredential;

      await appAuth.updateProfile(user, {
        displayName: values.username,
      });

      await set(ref(projectDatabase, "courseCreators/" + user.uid), {
        email: user.email,
        username: user.displayName,
        photoURL: user.photoURL,
        showOnlineStatus: true,
        showLastSeenDate: true,
        creationDate: dbTimestamp(),
      });

      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email address already in use.");
      } else if (err.code === "auth/network-request-failed") {
        setError(
          "It seems your internet connection isn't very good right now."
        );
      } else if (err.message.indexOf("offline") !== -1) {
        setError("You don't have an internet connection.");
      } else {
        setError(err.message);
      }
    }
  }

  return (
    <section className="py-4 pb-24 z-20 min-h-[28rem] h-[100vh] px-4 sm:px-8 md:px-18 lg:px-20 xl:px-24 bg-white/10">
      <AuthHeader />
      <div className="w-[100%] lg:w-[80%] min-h-[70vh] mx-auto py-2 flex flex-col justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            submitHandler(values).then(() => {
              setSubmitting(false);
              resetForm();
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <form
              className="w-[80%] sm:w-[80%] md:w-[60%] lg:w-[70%] xl:w-[60%] h-fit flex-1 md:px-16"
              onSubmit={handleSubmit}
            >
              <h2 className="mb-5 font-medium text-slate-800 text-[2rem]">
                Sign Up
              </h2>
              <p className="font-medium text-slate-700">
                Please, sign up to continue.
              </p>

              {error && (
                <AlertMessage
                  message={error}
                  severity="error"
                  isOpen={error.length > 0}
                  keepOpen={true}
                  clearMessages={clearMessages}
                />
              )}

              <div className="mt-6">
                <label className="block mb-6">
                  <span className="block text-sm font-medium text-slate-700">
                    Username
                  </span>

                  <TextInput
                    type="text"
                    name="username"
                    placement="auth-form"
                    onBlurFunc={handleBlur}
                    onChangeFunc={handleChange}
                    placeholder=""
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <span className="block text-sm pt-2 text-red-600">
                      {errors.username}
                    </span>
                  )}
                </label>

                <label className="block mb-6">
                  <span className="block text-sm font-medium text-slate-700">
                    Email Address
                  </span>
                  <TextInput
                    type="email"
                    name="email"
                    onBlurFunc={handleBlur}
                    onChangeFunc={handleChange}
                    placeholder=""
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <span className="block text-sm pt-2 text-red-600">
                      {errors.email}
                    </span>
                  )}
                </label>

                <label className="block mb-6">
                  <span className="block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <TextInput
                    type="password"
                    name="password"
                    onBlurFunc={handleBlur}
                    onChangeFunc={handleChange}
                    placeholder=""
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <span className="block text-sm pt-2 text-red-600">
                      {errors.password}
                    </span>
                  )}
                </label>

                <button
                  disabled={
                    !(isValid && dirty) ||
                    !!Object.keys(errors).length ||
                    isSubmitting
                  }
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 text-white px-6 py-2 rounded-sm focus:ring-4 active:ring-4 focus:ring-blue-500 active:ring-blue-500 font-medium"
                >
                  {isSubmitting ? "Please wait..." : "Sign up"}
                </button>

                <div className="text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="underline text-blue-600">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          )}
        </Formik>

        <AuthFooter />
      </div>
    </section>
  );
}
