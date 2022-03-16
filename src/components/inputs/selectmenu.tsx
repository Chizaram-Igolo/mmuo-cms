/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { IModules } from "../../lib/interfaces";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ISelectMenu {
  label: string;
  name: string;
  value: string;
  moduleGroups: IModules[];
  onBlurFunc?: (e: React.FocusEvent<any, Element>) => void;
  onChangeFunc: (e: any) => void;
  _classNames?: string;
}

export default function SelectMenu({
  label,
  name,
  value,
  moduleGroups,
  onBlurFunc,
  onChangeFunc,
  _classNames,
}: ISelectMenu) {
  // const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={value} onChange={onChangeFunc}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-base font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div
            className={`mt-1 relative ${_classNames}`}
            onBlur={onBlurFunc ? (e) => onBlurFunc(e) : () => {}}
          >
            <Listbox.Button
              name={name}
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <span className="flex items-center">
                {/* <img
                  src={value.avatar}
                  alt=""
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                /> */}
                <span className="ml-3 block truncate text-base">{value}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {moduleGroups.map((item) => (
                  <Listbox.Option
                    key={item.moduleGroup}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={item.moduleGroup}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {/* <img
                            src={item.avatar}
                            alt=""
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          /> */}
                          <span
                            className={classNames(
                              selected ? "semibold" : "font-normal",
                              "ml-3 block truncate text-base"
                            )}
                          >
                            {item.moduleGroup}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
