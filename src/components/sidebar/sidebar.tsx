import SideBarLink from "./sidebarlink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faArrowRight,
  faArrowLeft,
  faGear,
  faRightFromBracket,
  faPen,
  faHome,
  faPenRuler,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetModules from "../../hooks/useGetModules";
import useGetDrafts from "../../hooks/useGetDrafts";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IModule, IModules } from "../../lib/interfaces";

interface ISideBar {
  width: number;
  shouldHideNavText: boolean;
  expandIcon: string;
  handleChangeWidth: () => void;
}

export default function SideBar(props: ISideBar) {
  const { user, signout } = useAuth();
  const { modules, deletedModules } = useGetModules();
  const { drafts } = useGetDrafts();

  const navigate = useNavigate();

  const { shouldHideNavText, expandIcon } = props;

  function handleChangeWidth() {
    props.handleChangeWidth();
  }

  function handleSignout() {
    signout();
    navigate("/");
  }

  interface IRoute {
    to: string;
    label: string;
    icon: IconDefinition;
    moduleGroups?: IModules[];
    deletedModules?: IModule[];
    count?: number;
  }

  const routes: IRoute[] = [
    { to: "/", label: "Home", icon: faHome },
    {
      to: "/modules",
      label: "Modules",
      icon: faBox,
      count: modules.length,
    },
    { to: "/create-intro", label: "Create", icon: faPen },
    { to: "/settings", label: "Settings", icon: faGear },
  ];

  if (drafts.length > 0) {
    routes.push({
      to: "/drafts",
      label: "Drafts",
      icon: faPenRuler,
      count: drafts.length,
    });
  }

  if (deletedModules.length > 0) {
    routes.push({
      to: "/trash",
      label: "Trash",
      icon: faTrashCan,
      count: deletedModules.length,
    });
  }

  console.log(deletedModules);

  return (
    <nav
      className={`fixed min-w-[80px] w-[20%] min-h-[100vh] bg-white border-r-2 border-stone-200 z-50`}
      id="navBar"
      style={{ width: props.width }}
    >
      <div className="w-[100%] flex h-[50px] pl-[10px] mb-[22px] bg-slate-700 text-white">
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
                <div className="flex">
                  <div className="flex-shrink-0">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Profile pic"
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

                  {!shouldHideNavText && (
                    <div className="ml-3">
                      <span
                        className="inline-block h-[42px] w-[100%] py-0.2 px-5 bg-transparent cursor-pointer text-[1.3rem]"
                        onClick={handleSignout}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </span>
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
                moduleGroups={item.moduleGroups}
                deletedModules={item.deletedModules}
                count={item.count}
              />
            );
          })}
        </ul>

        <div className="relative w-[100%]">
          <ul>
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
