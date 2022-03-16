import { useEffect, useState } from "react";
import { IModule, IModules } from "../lib/interfaces";
import useGetModuleGroups from "./useGetModuleGroups";
import useGetModuleList from "./useGetModuleLists";

export default function useGetDrafts() {
  const { moduleGroups } = useGetModuleGroups("draftGroups");
  const { docs } = useGetModuleList("drafts", "detailed");

  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    let draftGroups_clone = [];
    draftGroups_clone = moduleGroups.slice(0);

    setDrafts([]);

    for (let i = 0; i < docs.length; i++) {
      let idx = draftGroups_clone.findIndex(
        (item) =>
          (item as IModules).moduleGroupId ===
          (docs[i] as IModule).moduleGroupId
      );

      if (
        idx !== -1 &&
        (draftGroups_clone[idx] as IModules).modules.findIndex(
          (item) => item.date === (docs[i] as IModule).date
        ) === -1
      ) {
        (draftGroups_clone[idx] as IModules).modules.push(docs[i]);
      }
    }

    setDrafts(draftGroups_clone);
  }, [moduleGroups, docs]);

  return { drafts };
}
