import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { Link, useMatch } from "react-router-dom";
import { IModule, IModules } from "../../lib/interfaces";

interface ISideBarLink {
  to: string;
  title: string;
  icon: IconDefinition;
  shouldHideNavText: boolean;
  moduleGroups?: IModules[];
}

function SideBarLink({
  to,
  title,
  icon,
  shouldHideNavText,
  moduleGroups,
}: ISideBarLink) {
  const match = useMatch({ path: to });

  const [showSubList, setShowSubList] = useState(false);
  const [showModules, setShowModules] = useState(
    Array(moduleGroups ? moduleGroups.length : 0).fill(false)
  );

  function toggleShowSubList() {
    if (!shouldHideNavText) {
      setShowSubList(!showSubList);
    }
  }

  function toggleShowModules(idx: number) {
    let showModules_clone = [...showModules];

    showModules_clone[idx] = !showModules_clone[idx];
    setShowModules(showModules_clone);
  }

  return (
    <li
      className={`h-auto py-[0.20rem] border-b border-gray-300 last:border-b-0`}
    >
      {moduleGroups && (
        <span
          className={`w-[100%] flex pt-[6px] pb-[0px] px-4 border-l-4 cursor-pointer ${
            match ? "border-gray-800" : "border-transparent"
          }`}
          onClick={toggleShowSubList}
        >
          <span className={`basis-[15%] text-[1.2rem] text-gray-800`}>
            <FontAwesomeIcon icon={icon} />
          </span>

          <span
            className={`basis-[85%] h-[inherit] inline-block pr-[10px] pl-[10px]
              ${shouldHideNavText === true ? "hidden" : ""}
            `}
          >
            {title}
          </span>
        </span>
      )}

      {!moduleGroups && (
        <Link
          to={to}
          className={`w-[100%] flex p-[6px] px-4 border-l-4  ${
            match ? "border-gray-800" : "border-transparent"
          }`}
        >
          <span className={`basis-[15%] text-[1.2rem] text-gray-800`}>
            <FontAwesomeIcon icon={icon} />
          </span>

          <span
            className={`basis-[85%] inline-block pr-[10px] pl-[10px]
              ${shouldHideNavText === true ? "hidden" : ""}
            `}
          >
            {title}
          </span>
        </Link>
      )}

      {showSubList && moduleGroups && (
        <ul
          className={`relative ml- pt-2 max-h-[300px] overflow-y-auto ${
            shouldHideNavText === true ? "hidden" : ""
          }`}
        >
          {moduleGroups.map((item, idx) => (
            <li
              className={`py-2 px-0 border-b last:border-b-0 cursor-pointer ${
                showModules[idx] ? "pb-0" : "pb-2"
              }`}
              key={item.moduleGroup}
              onClick={() => toggleShowModules(idx)}
            >
              {/* <span className="px-8 py-2">{item.moduleGroup}</span> */}
              {/* <span className="inline-block w-[100%] bg-transparent cursor-pointer text-[1.1rem]">
                  <FontAwesomeIcon icon={faEllipsis} />
                </span> */}

              <div className="flex">
                <span className="inline-block px-8 py-0 basis-[90%]">
                  {item.moduleGroup}
                </span>
                <div className="inline-block basis-[10%] w-auto mr-auto bg-transparent cursor-pointer text-[1rem]">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>

              {showModules[idx] && item.modules && (
                <ul
                  className={`relative ml-0 pt-2 max-h-[300px] overflow-y-auto ${
                    shouldHideNavText === true ? "hidden" : ""
                  }`}
                >
                  {item.modules.map((module) => (
                    <li
                      className="py-2 px-8 border-b last:border-b-0 cursor-pointer odd:bg-gray-200"
                      key={module.name}
                    >
                      <span className="px-4">{module.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default SideBarLink;
