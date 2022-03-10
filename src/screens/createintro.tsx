import React, { useEffect, useRef, useState } from "react";

import { useToasts } from "react-toast-notifications";
import Toast from "../components/Toast";
import { colors } from "../lib/colors";
import { CreateModuleSchema } from "../lib/validationSchema";
import { Formik } from "formik";

import useGetModuleGroups from "../hooks/useGetModuleGroups";
import {
  ColorPicker,
  IconPicker,
  TextEditor,
  SelectMenu,
  TextInput,
  MultiUploadPreview,
  UploadProgressBar,
} from "../components";
import { FileDownLoadUrls, IModules } from "../lib/interfaces";
import { uploadMultipleFiles } from "../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

import submitHandler from "../lib/createintro";
import { history } from "../components/inputs/customrouter";

const CreateIntro: React.FC = () => {
  const formikRef = useRef(null);

  const { moduleGroups } = useGetModuleGroups();
  const { addToast } = useToasts();

  const [moduleGroupSelect, setModuleGroupSelect] = useState(
    localStorage.getItem("moduleGroup")
      ? (localStorage.getItem("moduleGroup") as string)
      : ""
  );
  const [moduleColor, setModuleColor] = useState("white");
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [files, setFiles] = useState([]);
  const [totalBytes, setTotalBytes] = useState(0);
  const [fileArray, setFileArray] = useState([]);
  const fileUploadRef = useRef(null);
  const [post, setPost] = useState({});
  const [fileDownloadUrls, setFileDownloadUrls] = useState<FileDownLoadUrls[]>(
    []
  );

  const [useModuleGroupSelect, setUseModuleGroupSelect] = useState(true);

  useEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      console.log(action, location.pathname, location.state);

      submitHandler(
        // @ts-ignore
        formikRef.current.values,
        moduleGroupSelect,
        intro,
        moduleColor,
        setLoading,
        addToast,
        true
      );
    });

    return unlisten;
  });

  function handleEditorChange(content: string) {
    setIntro(content);
  }

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
    moduleGroupTextInput: string;
  };

  function handleUploadMultipleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    uploadMultipleFiles(
      e,
      files,
      fileArray,
      setTotalBytes,
      addToast,
      fileUploadRef,
      setLoading
    );
  }

  function handleRemoveThumbnail(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    let fA = [...fileArray];

    let splicedItem = fA.splice(
      // @ts-ignore
      fA.findIndex((item) => item.url === e.target.id),
      1
    );

    let _files = [...files];

    // @ts-ignore
    if (splicedItem[0]) {
      _files.splice(
        // @ts-ignore
        _files.findIndex((item) => item.name === splicedItem[0].name),
        1
      );
    }

    setFileArray(fA);
    setFiles(_files);
  }

  async function handleUpload() {
    setUploading(true);

    setPost({
      files: [...files],
      totalBytes: (totalBytes * 1024) / 1000,
    });
  }

  function cleanUp(successState: boolean) {
    // Clear state
    setTotalBytes(0);
    setPost({});
    setLoading(false);

    let message = "";

    if (files.length > 1) {
      message = "Your files were uploaded.";
    } else {
      message = "Your file was uploaded.";
    }

    if (successState) {
      setFileArray([]);
      setFiles([]);

      addToast(<Toast>{message}</Toast>, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }

  return (
    <section className="py-4 pb-24 px-8 md:px-18 lg:px-20 xl:px-24 xl:pr-16 z-20 min-h-[28rem] bg-white border border-gray-100">
      <div className="py-6 w-[100%]">
        <h2 className="text-[#333333] mb-4">Create Module</h2>
        <Formik
          innerRef={formikRef}
          initialValues={{
            moduleGroupTextInput: "",
            moduleGroupSelect: moduleGroupSelect,
            name: "",
          }}
          validationSchema={CreateModuleSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            submitHandler(
              values,
              moduleGroupSelect,
              intro,
              moduleColor,
              setLoading,
              addToast,
              false
            ).then(() => {
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

              <div className="w-full flex gap-x-4">
                <div className="basis-[100%]">
                  <label className="block mb-3">
                    <span className="block text-sm font-medium text-slate-700">
                      Upload the audio files you would like to use in your
                      "Introduction" here:
                    </span>
                  </label>

                  <div>
                    <div className="pt-0 float-left mr-2 upload-btn-wrapper bg-gray-400/30 hover:bg-gray-400/50 active:bg-gray-400/75 rounded-sm cursor-pointer border-2 border-dashed border-gray-600">
                      <input
                        type="file"
                        id="fileUpload"
                        className="cursor-pointer"
                        onChange={handleUploadMultipleFiles}
                        accept="audio/*"
                        multiple
                        ref={fileUploadRef}
                      />

                      <div className="flex items-center justify-center">
                        <span className="inline-block h-[40px] align-middle mt-[0.4rem] text-center text-sm text-zinc-700">
                          Select Files
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="ml-2"
                          />
                        </span>
                      </div>
                    </div>

                    {fileArray.length > 0 && (
                      <button
                        type="button"
                        disabled={uploading}
                        className={`bg-orange-400 hover:bg-orange-500 active:bg-orange-600 ${
                          uploading ? "cursor-default" : "cursor-pointer"
                        } disabled:bg-gray-400 text-white text-center text-sm px-6 py-2 rounded-sm`}
                        onClick={handleUpload}
                      >
                        Upload Files
                      </button>
                    )}
                  </div>

                  {Object.keys(post).length !== 0 ? (
                    <UploadProgressBar
                      post={post}
                      cleanUp={cleanUp}
                      setFileDownloadUrls={setFileDownloadUrls}
                    />
                  ) : (
                    <div></div>
                  )}

                  {Object.keys(post).length === 0 && (
                    <div className="h-[10px]"></div>
                  )}

                  <MultiUploadPreview
                    fileArray={fileArray}
                    handleRemoveThumbnail={handleRemoveThumbnail}
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block text-sm font-medium text-slate-700">
                  Introduction (Preface)
                </span>

                <TextEditor
                  name="intro"
                  className="mt-3 w-[100%] border"
                  placeholder="Detail what you want the learner to be aware of before they begin the module."
                  onChangeFunc={handleEditorChange}
                />
              </div>

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
};

export default CreateIntro;
