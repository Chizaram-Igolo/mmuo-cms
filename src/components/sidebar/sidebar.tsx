import SideBarLink from "./sidebarlink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faArrowRight,
  faArrowLeft,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../contexts/AuthContext";
import useGetModuleList from "../../hooks/useGetModuleList";
import { useNavigate } from "react-router-dom";

interface ISideBar {
  width: number;
  shouldHideNavText: boolean;
  expandIcon: string;
  handleChangeWidth: () => void;
}

export default function SideBar(props: ISideBar) {
  const { user, signout } = useAuth();
  const { docs, error, loading, latestDoc } = useGetModuleList();
  const navigate = useNavigate();

  //   console.log(docs, error, loading, latestDoc);

  const { shouldHideNavText, expandIcon } = props;

  function handleChangeWidth() {
    props.handleChangeWidth();
  }

  function handleSignout() {
    signout();
    navigate("/");
  }

  const routes = [
    {
      to: "/",
      label: "Modules",
      icon: faBox,
      childList: docs,
    },
    { to: "/settings", label: "Settings", icon: faGear },
  ];

  return (
    <nav
      className={`absolute min-w-[80px] w-[20%] min-h-[100vh] bg-white border-r-2 border-stone-200 z-50`}
      id="navBar"
      style={{ width: props.width }}
    >
      <div className="w-[100%] flex h-[50px] pl-[10px] mb-[22px] bg-slate-900 text-white">
        {/* <div>
          <h2 className="h-[50px] p-1">
            <Link href="/cms">
              <a className={`${styles["icon-link-item"]}`}>m</a>
            </Link>
          </h2>
        </div> */}

        <div>
          {user && (
            <>
              <div className="pt-2 border-gray-400">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Profile Picture"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    {!user.photoURL && user.displayName && (
                      <div className="inline-block h-8 w-8 text-center bg-slate-800 rounded-full">
                        {user && "displayName" in user && (
                          <span className="text-white leading-8">
                            {user.displayName[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {!shouldHideNavText && (
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none">
                        {user.displayName.length > 18
                          ? user.displayName.slice(0, 18) + "..."
                          : user.displayName}
                      </div>
                      <div className="text-sm font-medium leading-none">
                        {user.email.length > 20
                          ? user.email.slice(0, 20) + "..."
                          : user.email}
                        {/* {user.email} */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3 px-2 space-y-1 text-left">
                  {/* {userNavigation.map((item) => (
                    <Link href={item.route} key={item.name}>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-slate-200">
                        {item.name}
                      </a>
                    </Link>
                  ))} */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <ul>
          {routes.map((item) => {
            return (
              <SideBarLink
                to={item.to}
                icon={item.icon}
                title={item.label}
                shouldHideNavText={shouldHideNavText}
                key={item.label}
                childList={item.childList}
              />
            );
          })}
        </ul>

        <div className="absolute w-[100%] bottom-5">
          <ul>
            <li>
              <span
                className="inline-block h-[42px] w-[100%] py-0.5 px-5 bg-transparent cursor-pointer text-[1.4rem]"
                onClick={handleSignout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </li>
            <li>
              <span
                className="inline-block h-[42px] w-[100%] py-0.5 px-5 bg-transparent cursor-pointer text-[1.4rem]"
                onClick={handleChangeWidth}
              >
                {expandIcon === "left" && (
                  <FontAwesomeIcon icon={faArrowLeft} />
                )}

                {expandIcon === "right" && (
                  <FontAwesomeIcon icon={faArrowRight} />
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
