import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { IModule, IModules } from "../lib/interfaces";

interface IPlainListCollapse {
  modules: IModule[];
}

const PlainListCollapse: React.FC<IPlainListCollapse> = ({ modules }) => {
  return (
    <div className="w-full pt-8">
      <div className="w-full py-2 mx-auto bg-white rounded-2xl">
        {modules.map((item, idx) => (
          <Disclosure as="div" className={`${idx > 0 ? "mt-2" : ""}`}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span className="text-base">{item.name}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-slate-500`}
                  />
                </Disclosure.Button>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default PlainListCollapse;
