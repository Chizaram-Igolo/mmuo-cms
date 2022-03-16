import TopBarProgress from "react-topbar-progress-indicator";
import { Collapse } from "../components";
import useGetDrafts from "../hooks/useGetDrafts";
import useGetModules from "../hooks/useGetModules";

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

export default function Drafts() {
  const { drafts } = useGetDrafts();

  return (
    <section className="py-4 pb-24 px-8 md:px-18 lg:px-20 xl:px-24 z-20 min-h-[28rem] bg-white border border-gray-100">
      <div className="py-6 w-[100%]">
        <h3 className="mt-[20px]">Course Content</h3>
        <Collapse modules={drafts} />
      </div>
    </section>
  );
}
