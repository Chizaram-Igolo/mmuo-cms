import { FormikValues } from "formik";

import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { projectFirestore, timestamp } from "../firebase/config";
import { AddToast } from "react-toast-notifications";
import Toast from "../components/Toast";

export default async function submitHandler(
  values: FormikValues,
  moduleGroupSelect: string,
  intro: string,
  moduleColor: string,
  setLoading: (loading: boolean) => void,
  addToast: AddToast,
  isDraft = false
) {
  const { name, moduleGroupTextInput } = values;

  let moduleGroup;

  if (moduleGroupTextInput && moduleGroupTextInput !== "") {
    moduleGroup = moduleGroupTextInput;
  } else {
    moduleGroup = moduleGroupSelect;
  }

  setLoading(true);

  // Store the last used moduleGroup name for use later.
  localStorage.setItem("moduleGroup", moduleGroup as string);

  try {
    // Check that document exists.
    const docRef = query(
      collectionGroup(projectFirestore, "modules"),
      where("moduleGroup", "==", moduleGroup)
    );

    const docsSnap = await getDocs(docRef);

    if (docsSnap.docs.length > 0) {
      await addDoc(
        collection(
          projectFirestore,
          "moduleGroups",
          docsSnap.docs[0].ref.parent.parent!.id,
          "modules"
        ),
        {
          name,
          intro,
          moduleColor,
          moduleGroup,
          date: timestamp(),
        }
      );
    } else {
      const doc = await addDoc(collection(projectFirestore, "moduleGroups"), {
        moduleGroup,
        date: timestamp(),
      });

      await addDoc(
        collection(projectFirestore, "moduleGroups", doc.id, "modules"),
        {
          name,
          intro,
          moduleColor,
          moduleGroup,
          date: timestamp(),
        }
      );
    }

    if (!isDraft) {
      addToast(<Toast>Your post was uploaded.</Toast>, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  } catch (err: any) {
    addToast(
      <Toast heading="We're sorry">We couldn't upload your post. {err}</Toast>,
      {
        appearance: "error",
        autoDismiss: true,
      }
    );
  }

  setLoading(false);
}
