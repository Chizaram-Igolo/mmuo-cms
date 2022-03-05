import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useGetModuleList(
  moduleGroupId: string,
  moduleId: string
) {
  const [loading, setLoading] = useState(true);
  const [_doc, _setDoc] = useState({});

  useEffect(() => {
    const docRef = doc(
      projectFirestore,
      `moduleGroups/${moduleGroupId}/modules/${moduleId}`
      //   moduleId
    );

    const getDocSnap = async () => {
      setLoading(true);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        _setDoc({
          name: docSnap.data()!.name,
          bgColor: docSnap.data()!.moduleColor,
          intro: docSnap.data()!.intro,
          moduleId: docSnap.id,
          moduleGroup: docSnap.data()!.moduleGroup,
          moduleGroupId: docSnap.ref.parent.parent!.id,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      setLoading(false);
    };

    getDocSnap();
  }, [moduleGroupId, moduleId]);

  return { _doc, loading };
}
