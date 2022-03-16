import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { IModule } from "../lib/interfaces";

export default function useGetModuleList(
  readCollection: string,
  extent?: string
) {
  const [loading2, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [deletedDocs, setDeletedDocs] = useState([]);
  const [error2, setError] = useState(null);
  const [latestDoc2, setLatestDoc] = useState(null);

  useEffect(() => {
    const q = query(
      collectionGroup(projectFirestore, readCollection),
      orderBy("date", "asc")
    );

    let unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const foundDocs: IModule[] = [];
        const foundDeletedDocs: IModule[] = [];

        if (extent === "detailed") {
          querySnapshot.forEach((doc) => {
            if (doc.data().isDeleted === true) {
              foundDeletedDocs.push({
                name: doc.data().name,
                bgColor: doc.data().moduleColor,
                intro: doc.data().intro,
                moduleId: doc.id,
                moduleGroupId: doc.ref.parent.parent!.id,
                date: doc.data().date,
                isDeleted: doc.data().isDeleted,
              });
            } else {
              foundDocs.push({
                name: doc.data().name,
                bgColor: doc.data().moduleColor,
                intro: doc.data().intro,
                moduleId: doc.id,
                moduleGroupId: doc.ref.parent.parent!.id,
                date: doc.data().date,
              });
            }
          });
        } else {
          querySnapshot.forEach((doc) => {
            if (doc.data().isDeleted === true) {
              foundDeletedDocs.push(doc.data().name);
            } else {
              foundDocs.push(doc.data().name);
            }
          });
        }

        // console.log(foundDocs);
        // console.log(foundDeletedDocs);

        // @ts-ignore
        setDocs(foundDocs);
        // @ts-ignore
        setDeletedDocs(foundDeletedDocs);
        setLoading(false);
      },
      (err) => {
        // @ts-ignore
        setError(err);
      }
    );

    return unsubscribe;
  }, [extent]);

  return { docs, deletedDocs, error2, loading2, latestDoc2 };
}
