import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import useGetModule from "../hooks/useGetModule";
import { IModule } from "../lib/interfaces";

import TopBarProgress from "react-topbar-progress-indicator";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { MDialog } from "../components";
import { doc, collection, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";
import Toast from "../components/Toast";
import { useToasts } from "react-toast-notifications";

TopBarProgress.config({
  barThickness: 4,
  barColors: {
    "0": "rgba(26,  188, 156, .7)",
    ".3": "rgba(41,  128, 185, .7)",
    "1.0": "rgba(231, 76,  60,  .7)",
  },
  shadowBlur: 5,
  shadowColor: "rgba(0, 0, 0, .5)",
});

interface ILocState {
  moduleId: string;
  moduleGroupId: string;
}

export default function Module() {
  const location = useLocation();
  const { moduleGroupId, moduleId } = location.state as ILocState;

  const { _doc, loading } = useGetModule(moduleGroupId, moduleId);
  const moduleDoc = _doc as IModule;

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { addToast } = useToasts();

  async function handleConfirm() {
    setConfirmDialogOpen(false);

    try {
      const docRef = doc(
        projectFirestore,
        "moduleGroups",
        moduleGroupId,
        "modules",
        moduleId
      );

      await updateDoc(docRef, {
        isDeleted: true,
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
  }

  return (
    <section className="py-4 pb-24 px-8 md:px-18 lg:px-20 xl:px-24 z-20 min-h-[28rem] bg-white border border-gray-100">
      {loading && <TopBarProgress />}
      <div className="py-6 w-[100%]">
        <div>
          <h4 className="text-[#333333] mb-4">
            Module Group: {moduleDoc.moduleGroup}
          </h4>
          <div className="float-right">
            <button
              type="button"
              className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600/90 active:ring-4 focus:ring-red-200 active:ring-red-200 active:ring-offset-1"
              onClick={() => setConfirmDialogOpen(true)}
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              Delete Module
            </button>
          </div>
        </div>

        <h3 className="text-[#333333] mb-10">Module: {moduleDoc.name}</h3>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ errors, handleSubmit, isValid, dirty, isSubmitting }) => (
            <form className="relative" onSubmit={handleSubmit}>
              <div className="w-full flex gap-x-4"></div>

              <div className="flex">
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: moduleDoc.intro as string,
                  }}
                ></div>
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

              <MDialog
                open={confirmDialogOpen}
                setOpen={setConfirmDialogOpen}
                heading="Delete Module"
                confirmButtonText="Delete"
                handleConfirm={handleConfirm}
              >
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this module? It will be
                  unpublished and sent to the recycle bin.
                </p>
              </MDialog>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}
