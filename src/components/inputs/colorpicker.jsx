import { Listbox } from "@headlessui/react";
import { useRef, useState } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

const ColorPicker = ({ label, value, colors, onChangeFunc }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectOutsideClick(dropdownRef, false);

  const [colorSelected, setColorSelected] = useState("white");

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function setColor(color) {
    setColorSelected(color);
  }

  return (
    <div className="antialiased sans-serif py-0 h-auto">
      <Listbox value={value} onChange={onChangeFunc}>
        <div className="max-w-sm py-0 my-0">
          <div className="mb-5">
            <div className="flex items-center">
              <div>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  {label}
                </Listbox.Label>
                <input
                  id="colorSelected"
                  type="text"
                  value=""
                  className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm mt-1 pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  readOnly
                  x-model="colorSelected"
                  style={{
                    background: value,
                    color: value === "white" ? "#222222" : "white",
                  }}
                />
              </div>
              <div className="relative ml-3 mt-5" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleIsOpen}
                  className="w-10 h-10 rounded-full focus:outline-none focus:shadow-outline inline-flex p-2 shadow-sm border border-gray-300"
                  style={{
                    background: value,
                    color: value === "white" ? "#222222" : "white",
                  }}
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      d="M15.584 10.001L13.998 8.417 5.903 16.512 5.374 18.626 7.488 18.097z"
                    />
                    <path d="M4.03,15.758l-1,4c-0.086,0.341,0.015,0.701,0.263,0.949C3.482,20.896,3.738,21,4,21c0.081,0,0.162-0.01,0.242-0.03l4-1 c0.176-0.044,0.337-0.135,0.465-0.263l8.292-8.292l1.294,1.292l1.414-1.414l-1.294-1.292L21,7.414 c0.378-0.378,0.586-0.88,0.586-1.414S21.378,4.964,21,4.586L19.414,3c-0.756-0.756-2.072-0.756-2.828,0l-2.589,2.589l-1.298-1.296 l-1.414,1.414l1.298,1.296l-8.29,8.29C4.165,15.421,4.074,15.582,4.03,15.758z M5.903,16.512l8.095-8.095l1.586,1.584 l-8.096,8.096l-2.114,0.529L5.903,16.512z" />
                  </svg>
                </button>

                {/* @click.away="isOpen = false" */}

                {isOpen && (
                  <div
                    // x-transition:enter-start="opacity-0 scale-95"
                    // x-transition:enter-end="opacity-100 scale-100"
                    // x-transition:leave="transition ease-in duration-75 transform"
                    // x-transition:leave-start="opacity-100 scale-100"
                    // x-transition:leave-end="opacity-0 scale-95"
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg"
                  >
                    <div className="rounded-md bg-white shadow-xs px-4 py-3">
                      <div className="flex flex-wrap -mx-2">
                        {colors.map((color) => {
                          return (
                            <div className="px-2" key={color}>
                              {value === color ? (
                                <div
                                  className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white"
                                  style={{
                                    background: color,
                                    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
                                  }}
                                ></div>
                              ) : (
                                <div
                                  onClick={() => onChangeFunc(color)}
                                  tabIndex={0}
                                  className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white focus:outline-none focus:shadow-outline"
                                  style={{ background: color }}
                                ></div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Listbox>
    </div>
  );
};

export default ColorPicker;
