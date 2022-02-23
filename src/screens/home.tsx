import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { projectFirestore, timestamp } from "../firebase/config";

import { useToasts } from "react-toast-notifications";
import Toast from "../components/Toast";
import { colors } from "../lib/colors";
import { CreateModuleSchema } from "../lib/validationSchema";
import { Formik } from "formik";
import useGetModuleGroups from "../hooks/useGetModuleGroups";
import {
  ColorPicker,
  IconPicker,
  SelectMenu,
  TextArea,
  TextInput,
} from "../components";
import { IModules } from "../lib/interfaces";

export default function Home() {
  const { moduleGroups } = useGetModuleGroups();

  const [moduleGroupSelect, setModuleGroupSelect] = useState(
    localStorage.getItem("moduleGroup")
      ? (localStorage.getItem("moduleGroup") as string)
      : ""
  );
  const [moduleColor, setModuleColor] = useState("white");
  const [loading, setLoading] = useState(false);

  const [useModuleGroupSelect, setUseModuleGroupSelect] = useState(true);

  const { addToast } = useToasts();

  function handleChangeModuleGroupSelect(val: string) {
    setModuleGroupSelect(val);
  }

  function handleModuleColor(val: string) {
    setModuleColor(val);
  }

  function toggleUseModuleGroupSelect() {
    setUseModuleGroupSelect(!useModuleGroupSelect);
  }

  type FormValues = {
    name: string;
    intro: string;
    moduleGroupTextInput: string;
  };

  // useEffect(async () => {
  //   const docRef = query(
  //     collectionGroup(projectFirestore, "modules"),
  //     where("name", "==", "The fifth")
  //   );

  //   const docsSnap = await getDocs(docRef);

  //   console.log(docsSnap.docs[0].ref.parent.parent!.id);
  // }, []);

  // Add a new document in collection "cities"
  async function submitHandler(values: FormValues) {
    const { name, intro, moduleGroupTextInput } = values;

    let moduleGroup;

    if (moduleGroupTextInput && moduleGroupTextInput !== "") {
      moduleGroup = moduleGroupTextInput;
    } else {
      moduleGroup = moduleGroupSelect;
    }

    setLoading(true);

    // Store the last used moduleGroup name for use later.
    localStorage.setItem("moduleGroup", moduleGroup as string);

    try {
      // Check that document exists.
      const docRef = query(
        collectionGroup(projectFirestore, "modules"),
        where("moduleGroup", "==", moduleGroup)
      );

      const docsSnap = await getDocs(docRef);

      if (docsSnap.docs.length > 0) {
        await addDoc(
          collection(
            projectFirestore,
            "moduleGroups",
            docsSnap.docs[0].ref.parent.parent!.id,
            "modules"
          ),
          {
            name,
            intro,
            moduleColor,
            moduleGroup,
            date: timestamp(),
          }
        );
      } else {
        const doc = await addDoc(collection(projectFirestore, "moduleGroups"), {
          moduleGroup,
          date: timestamp(),
        });

        await addDoc(
          collection(projectFirestore, "moduleGroups", doc.id, "modules"),
          {
            name,
            intro,
            moduleColor,
            moduleGroup,
            date: timestamp(),
          }
        );
      }

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
            moduleGroupTextInput: "",
            moduleGroupSelect: moduleGroupSelect,
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
            setFieldValue,
            handleSubmit,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <form className="relative" onSubmit={handleSubmit}>
              <p className="mb-6 text-sm font-medium text-slate-700">
                Use Module Groups to organize your Modules.
              </p>
              <div className="w-full flex gap-x-4">
                {useModuleGroupSelect ? (
                  <div className="flex-1 mb-6">
                    <SelectMenu
                      name="moduleGroupSelect"
                      label="Select existing Module Group"
                      value={moduleGroupSelect}
                      onBlurFunc={handleBlur}
                      moduleGroups={moduleGroups}
                      onChangeFunc={(val) => {
                        handleChangeModuleGroupSelect(val);
                        setFieldValue("moduleGroupSelect", val);
                      }}
                    />

                    {errors.moduleGroupSelect && touched.moduleGroupSelect && (
                      <span className="block text-sm pt-2 text-red-600">
                        {errors.moduleGroupSelect}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex-1">
                    <label className="block mb-6">
                      <span className="block text-sm font-medium text-slate-700">
                        Create new Module Group
                      </span>
                      <TextInput
                        type="text"
                        name="moduleGroupTextInput"
                        placeholder="e.g Basics or Group 1"
                        value={values.moduleGroupTextInput}
                        onBlurFunc={handleBlur}
                        onChangeFunc={handleChange}
                      />
                      {errors.moduleGroupTextInput &&
                        touched.moduleGroupTextInput && (
                          <span className="block text-sm pt-2 text-red-600">
                            {errors.moduleGroupTextInput}
                          </span>
                        )}
                    </label>
                  </div>
                )}
                <div className="flex-1">
                  <label htmlFor="" className="block mb-6">
                    <p className="pt-3 block text-sm font-medium text-slate-700">
                      or &nbsp;
                      <button
                        type="button"
                        className="underline underline-offset-2"
                        onClick={toggleUseModuleGroupSelect}
                      >
                        {useModuleGroupSelect
                          ? "Create new Module Group"
                          : "Select existing Module Group"}
                      </button>
                    </p>
                  </label>
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

                <TextArea
                  value={values.intro}
                  name="intro"
                  placeholder="Detail what you want the learner to be aware of before they begin the module."
                  onBlurFunc={handleBlur}
                  onChangeFunc={handleChange}
                />
                {errors.intro && touched.intro && (
                  <span className="block text-sm pt-2 text-red-600">
                    {errors.intro}
                  </span>
                )}
              </label>

              <button
                type="submit"
                disabled={
                  !(isValid && dirty) ||
                  !!Object.keys(errors).length ||
                  isSubmitting
                }
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
