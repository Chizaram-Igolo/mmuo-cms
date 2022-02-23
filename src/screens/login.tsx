import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";

import { SigninSchema } from "../lib/validationSchema";

import { useAuth } from "../contexts/AuthContext";
import TextInput from "../components/inputs/authtextinput";
import AuthHeader from "../components/authheader";
import AuthFooter from "../components/authfooter";
import AlertMessage from "../components/alertmessage";

import { projectDatabase, ref } from "../firebase/config";
import {
  equalTo,
  get,
  limitToFirst,
  orderByChild,
  query,
} from "firebase/database";

export default function Signin() {
  const { signin } = useAuth();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  type FormValues = {
    email: string;
    password: string;
  };

  function clearMessages() {}

  function isEmail(email: string) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  }

  async function submitHandler(values: FormValues) {
    try {
      setError("");

      if (isEmail(values.email)) {
        await signin(values.email, values.password);
      } else {
        const snapshot = await get(
          query(
            ref(projectDatabase, "users"),
            orderByChild("username"),
            equalTo(values.email),
            limitToFirst(1)
          )
        );

        if (snapshot.exists()) {
          const snapshotObj = snapshot.val();
          let userObj;

          for (var propName in snapshotObj) {
            if (snapshotObj.hasOwnProperty(propName)) {
              userObj = snapshotObj[propName];
            }
          }

          await signin(userObj.email, values.password);
        } else {
          throw new Error("No account exists with this username.");
        }
      }

      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        setError(
          "The password is invalid or the user does not have a password."
        );
      } else if (err.code === "auth/network-request-failed") {
        setError(
          "It seems your internet connection isn't very good right now."
        );
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
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
            password: "",
          }}
          validationSchema={SigninSchema}
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
                Sign In
              </h2>
              <p className="font-medium text-slate-700">
                Please, sign in to continue.
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
                    Username or Email
                  </span>

                  <TextInput
                    type="text"
                    name="email"
                    placement="auth-form"
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
                  {isSubmitting ? "Please wait..." : "Sign in"}
                </button>

                <div className="text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/signup" className="underline text-blue-600">
                      Sign up here
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
