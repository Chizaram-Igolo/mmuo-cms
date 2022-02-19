import {
  collection,
  collectionGroup,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { IModule } from "../lib/interfaces";

export default function useGetModuleList(extent?: string) {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);
  const [latestDoc, setLatestDoc] = useState(null);

  useEffect(() => {
    // const p = projectFirestore.
    // const q = query(
    //   collection(projectFirestore, "modules"),
    //   orderBy("date", "asc")
    // );

    const q = query(
      collectionGroup(projectFirestore, "modules")
      // orderBy("date", "asc")
    );

    let unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const foundDocs: IModule[] = [];

        if ((extent = "detailed")) {
          querySnapshot.forEach((doc) => {
            foundDocs.push({
              name: doc.data().name,
              bgColor: doc.data().moduleColor,
              intro: doc.data().intro,
            });
          });
        } else {
          querySnapshot.forEach((doc) => {
            foundDocs.push(doc.data().name);
          });
        }

        // @ts-ignore
        setDocs(foundDocs);
        setLoading(false);
      },
      (err) => {
        // @ts-ignore
        setError(err);
      }
    );

    return unsubscribe;
  }, []);

  return { docs, error, loading, latestDoc };
}
