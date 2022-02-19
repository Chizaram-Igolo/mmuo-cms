import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { Link, useMatch } from "react-router-dom";
import { IModule } from "../../lib/interfaces";

interface ISideBarLink {
  to: string;
  title: string;
  icon: IconDefinition;
  shouldHideNavText: boolean;
  childList?: IModule[];
}

function SideBarLink({
  to,
  title,
  icon,
  shouldHideNavText,
  childList,
}: ISideBarLink) {
  const match = useMatch({ path: to });

  const [showSubList, setShowSubList] = useState(false);

  function toggleShowSubList() {
    if (!shouldHideNavText) {
      setShowSubList(!showSubList);
    }
  }

  return (
    <li
      className={`h-auto py-[0.20rem] border-b border-gray-300 last:border-b-0`}
    >
      {childList && (
        <span
          className={`w-[100%] inline-block flex pt-[6px] pb-[0px] px-4 border-l-4 cursor-pointer ${
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

      {!childList && (
        <Link
          to={to}
          className={`w-[100%] inline-block flex p-[6px] px-4 border-l-4  ${
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

      {showSubList && childList && (
        <ul
          className={`relative ml- pt-2 max-h-[300px] overflow-y-auto ${
            shouldHideNavText === true ? "hidden" : ""
          }`}
        >
          {childList.map((item) => (
            <li
              className="py-2 px-8 border-b last:border-b-0 cursor-pointer odd:bg-gray-200"
              key={item.name}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default SideBarLink;
