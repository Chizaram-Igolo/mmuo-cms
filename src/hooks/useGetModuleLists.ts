import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { IModule } from "../lib/interfaces";

export default function useGetModuleList(extent?: string) {
  const [loading2, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [error2, setError] = useState(null);
  const [latestDoc2, setLatestDoc] = useState(null);

  useEffect(() => {
    const q = query(
      collectionGroup(projectFirestore, "modules"),
      orderBy("date", "asc")
    );

    let unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const foundDocs: IModule[] = [];

        if (extent === "detailed") {
          querySnapshot.forEach((doc) => {
            if (
              foundDocs.findIndex((item) => item.name === doc.data().name) ===
              -1
            ) {
              foundDocs.push({
                name: doc.data().name,
                bgColor: doc.data().moduleColor,
                intro: doc.data().intro,
                moduleId: doc.id,
                moduleGroupId: doc.ref.parent.parent!.id,
              });
            }
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
  }, [extent]);

  return { docs, error2, loading2, latestDoc2 };
}
