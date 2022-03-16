import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { IModule, IModules } from "../lib/interfaces";

interface ICollapse {
  modules: IModules[];
}

const Collapse: React.FC<ICollapse> = ({ modules }) => {
  return (
    <div className="w-full">
      <div className="w-full py-2 mx-auto bg-white rounded-2xl">
        {modules.map((item, idx) => (
          <Disclosure as="div" className={`${idx > 0 ? "mt-2" : ""}`}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span className="text-base">{item.moduleGroup}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pl-4 pb-2 text-sm text-gray-500">
                  {item.modules && (
                    <ul>
                      {item.modules.map((module) => (
                        <li className="py-2 pl-8 border-b last:border-b-0 cursor-pointer odd:bg-gray-200 rounded text-base">
                          {module.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default Collapse;
