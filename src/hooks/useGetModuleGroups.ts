import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { IModules } from "../lib/interfaces";

export default function useGetModuleGroups() {
  const [loading, setLoading] = useState(true);
  const [moduleGroups, setModuleGroups] = useState([]);
  const [error, setError] = useState(null);
  const [latestDoc, setLatestDoc] = useState(null);

  useEffect(() => {
    const q = query(collection(projectFirestore, "moduleGroups"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const foundDocs: IModules[] = [];

        querySnapshot.forEach((doc) => {
          if (
            foundDocs.findIndex((item) => item.moduleGroupId === doc.id) === -1
          ) {
            foundDocs.push({
              moduleGroupId: doc.id,
              moduleGroup: doc.data().moduleGroup,
              modules: [],
            });
          }
        });

        // @ts-ignore
        setModuleGroups(foundDocs);
        setLoading(false);
      },
      (err) => {
        // @ts-ignore
        setError(err);
      }
    );

    return unsubscribe;
  }, []);

  return { moduleGroups, error, loading, latestDoc };
}
