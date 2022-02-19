import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { projectFirestore, timestamp } from "../firebase/config";

import { useToasts } from "react-toast-notifications";
import Toast from "../components/Toast";
import SelectMenu from "../components/inputs/selectmenu";
import TextInput from "../components/inputs/textinput";
import ColorPicker from "../components/colorpicker";
import IconPicker from "../components/iconpicker";
import { IModuleGroupValue } from "../lib/interfaces";
import { colors } from "../lib/colors";
import { CreateModuleSchema } from "../lib/validationSchema";
import { Formik } from "formik";

const people = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Home() {
  const [moduleGroupSelect, setModuleGroupSelect] = useState(people[3]);
  const [moduleColor, setModuleColor] = useState("white");
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();

  function handleChangeModuleGroupSelect(val: IModuleGroupValue) {
    setModuleGroupSelect(val);

    console.log("moduleGroupSelect", moduleGroupSelect);
    console.log("moduleColor", moduleColor);
  }

  function handleModuleColor(val: string) {
    setModuleColor(val);
  }

  type FormValues = {
    name: string;
    intro: string;
    moduleGroup: string;
  };

  // Add a new document in collection "cities"
  async function submitHandler(values: FormValues) {
    const { name, intro, moduleGroup } = values;

    setLoading(true);

    try {
      await addDoc(
        collection(projectFirestore, "modules", moduleGroup, "modules"),
        {
          name,
          intro,
          moduleColor,
          date: timestamp(),
        }
      );

      addToast(<Toast>Your post was uploaded.</Toast>, {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err: any) {
      addToast(
        <Toast heading="We're sorry">
          We couldn't upload your post. {err}
        </Toast>,
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }

    setLoading(false);
  }

  return (
    <section className="py-4 pb-24 px-8 md:px-18 lg:px-20 xl:px-24 z-20 min-h-[28rem] bg-white border border-gray-100">
      <div className="py-6 w-[100%]">
        <h2 className="text-[#333333] mb-4">Create Module</h2>
        <Formik
          initialValues={{
            moduleGroup: "",
            name: "",
            intro: "",
          }}
          validationSchema={CreateModuleSchema}
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
            isSubmitting,
          }) => (
            <form className="relative" onSubmit={handleSubmit}>
              <p className="mb-6 text-sm font-medium text-slate-700">
                Use Module Groups to organize your Modules.
              </p>
              <div className="w-full flex gap-x-4">
                <div className="flex-1">
                  <label className="block mb-6">
                    <span className="block text-sm font-medium text-slate-700">
                      Create new Module Group
                    </span>
                    <TextInput
                      type="text"
                      name="moduleGroup"
                      placeholder="e.g Basics or Group 1"
                      value={values.moduleGroup}
                      onBlurFunc={handleBlur}
                      onChangeFunc={handleChange}
                      // onChangeFunc={handleChangeModuleGroup}
                    />
                    {errors.moduleGroup && touched.moduleGroup && (
                      <span className="block text-sm pt-2 text-red-600">
                        {errors.moduleGroup}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex-1">
                  <SelectMenu
                    label="Select existing Module Group"
                    value={moduleGroupSelect}
                    people={people}
                    onChangeFunc={handleChangeModuleGroupSelect}
                  />
                </div>
              </div>

              <div className="w-full flex gap-x-4">
                <div className="basis-[50%]">
                  <label className="block mb-6">
                    <span className="block text-sm font-medium text-slate-700">
                      Name
                    </span>
                    <TextInput
                      type="text"
                      name="name"
                      placeholder="e.g Verbs"
                      value={values.name}
                      onBlurFunc={handleBlur}
                      onChangeFunc={handleChange}
                      // onChangeFunc={handleChangeName}
                    />
                    {errors.name && touched.name && (
                      <span className="block text-sm pt-2 text-red-600">
                        {errors.name}
                      </span>
                    )}
                  </label>
                </div>

                <div className="basis-[20%]">
                  <ColorPicker
                    label="Select Color"
                    value={moduleColor}
                    colors={colors}
                    onChangeFunc={handleModuleColor}
                  />
                </div>

                <div className="basis-[30%]">
                  <IconPicker label="Module Icon" />
                </div>
              </div>

              <label className="block">
                <span className="block text-sm font-medium text-slate-700">
                  Introduction (Preface)
                </span>
                <textarea
                  value={values.intro}
                  name="intro"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Detail what you want the learner to be aware of before they begin the module."
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 textarea
    "
                />
                {errors.intro && touched.intro && (
                  <span className="block text-sm pt-2 text-red-600">
                    {errors.intro}
                  </span>
                )}
              </label>

              <button
                type="submit"
                disabled={isSubmitting || !!Object.keys(errors).length}
                className="absolute right-0 mt-4 bg-green-500 hover:bg-green-600 active:bg-green-900 disabled:bg-gray-400 text-white px-6 py-2 rounded-sm focus:outline-none active:outline-none"
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}
