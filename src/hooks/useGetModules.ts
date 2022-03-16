import { useEffect, useState } from "react";
import { IModule, IModules } from "../lib/interfaces";
import useGetModuleGroups from "./useGetModuleGroups";
import useGetModuleList from "./useGetModuleLists";

export default function useGetModules() {
  const { moduleGroups } = useGetModuleGroups("moduleGroups");
  const { docs, deletedDocs } = useGetModuleList("modules", "detailed");

  const [modules, setModules] = useState<IModules[]>([]);

  const deletedModules = deletedDocs as IModule[];

  useEffect(() => {
    let moduleGroups_clone = [];
    moduleGroups_clone = moduleGroups.slice(0);

    setModules([]);

    for (let i = 0; i < docs.length; i++) {
      let idx = moduleGroups_clone.findIndex(
        (item) =>
          (item as IModules).moduleGroupId ===
          (docs[i] as IModule).moduleGroupId
      );

      if (
        idx !== -1 &&
        (moduleGroups_clone[idx] as IModules).modules.findIndex(
          (item) => item.name === (docs[i] as IModule).name
        ) === -1
      ) {
        (moduleGroups_clone[idx] as IModules).modules.push(docs[i]);
      }
    }

    let moduleGroups_clone_with_modules = (
      moduleGroups_clone as IModules[]
    ).filter((item) => item.modules.length > 0);

    setModules(moduleGroups_clone_with_modules);

    console.log(deletedModules);
  }, [moduleGroups, docs, deletedModules]);

  return { modules, deletedModules };
}
