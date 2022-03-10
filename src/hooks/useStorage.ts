import { useState, useEffect } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

import { FileDownLoadUrls, FilePost } from "../lib/interfaces";

export default function useStorage(post: FilePost) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<any>("");
  const [success, setSuccess] = useState(0);
  const [fileDownLoadUrls, setFileDownloadUrls] = useState<FileDownLoadUrls[]>(
    []
  );

  const storage = getStorage();
  const storageRef = ref(storage);

  useEffect(() => {
    // let fileUrls: { id: string; url: string }[] = [];

    const promises: any[] = [];

    let allFiles = post.files!;

    function generateUniqueCode(len: number) {
      let length = len,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }

    if (allFiles.length > 0) {
      let totalBytesTransferred = 0;

      allFiles.forEach((file) => {
        let uploadTask: any;

        try {
          if (file.type.includes("audio")) {
            const tempNameArr = file.name.split(".");
            const tempName = tempNameArr.slice(0, -1).join("_");
            const tempExt = tempNameArr.slice(-1);

            const uniqueNameCode = generateUniqueCode(12);

            const storageRef = ref(
              storage,
              `audios/${tempName}_${uniqueNameCode}.${tempExt}`
            );

            // @ts-ignore
            uploadTask = uploadBytesResumable(storageRef, file, {
              contentType: file.type,
            });
            //   .ref(`audios/${file.name}`)
            //   .put(file, { contentType: file.type });
          }
        } catch (err) {
          setProgress(0);
          setError(err);
          console.log(err);
          return;
        }

        promises.push(uploadTask);

        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            totalBytesTransferred += snapshot.bytesTransferred;

            let percentage = Math.round(
              (totalBytesTransferred / post.totalBytes!) * 100
            );
            setProgress(percentage);
          },
          (err: string) => {
            setError(err);
            uploadTask.cancel();
            return;
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
              if (file.type.includes("audio")) {
                // setFileDownloadUrls((prevState) => [
                //   ...prevState,
                //   { url: url, id: file["id"] },
                // ]);

                // console.log(url);

                fileDownLoadUrls.push({ url: url, id: file["id"] });
              }
            });
          }
        );
      });
    }

    Promise.all(promises).then(() => {
      setSuccess(Math.random());
    });
  }, [post]);

  return { progress, error, success, fileDownLoadUrls };
}
