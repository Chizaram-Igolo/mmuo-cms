import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import useGetModule from "../hooks/useGetModule";
import { IModule } from "../lib/interfaces";

import TopBarProgress from "react-topbar-progress-indicator";

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
  const doc = _doc as IModule;

  return (
    <section className="py-4 pb-24 px-8 md:px-18 lg:px-20 xl:px-24 z-20 min-h-[28rem] bg-white border border-gray-100">
      {loading && <TopBarProgress />}
      <div className="py-6 w-[100%]">
        <h2 className="text-[#333333] mb-4">{doc.moduleGroup}</h2>

        <h3 className="text-[#333333] mb-4">{doc.name}</h3>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ errors, handleSubmit, isValid, dirty, isSubmitting }) => (
            <form className="relative" onSubmit={handleSubmit}>
              <div className="w-full flex gap-x-4"></div>

              <div className="flex">
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: doc.intro as string }}
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
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}
