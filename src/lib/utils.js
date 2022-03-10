import Toast from "../components/Toast";

export async function uploadMultipleFiles(
  e,
  files,
  fileArray,
  setTotalBytes,
  addToast,
  fileUploadRef,
  setLoading
) {
  for (let i = 0; i < e.target.files.length; i++) {
    const newFile = e.target.files[i];

    if (!newFile.type.match(/(audio)/g)) {
      addToast(<Toast children="File is not an audio file." />, {
        appearance: "error",
        autoDismiss: true,
      });

      fileUploadRef.current.value = null;
      return;
    } else if (
      fileArray.length &&
      fileArray.findIndex((item) => item.name === newFile.name) !== -1
    ) {
      addToast(<Toast children="You have already included this file." />, {
        appearance: "error",
        autoDismiss: true,
      });

      fileUploadRef.current.value = null;
      return;
    } else {
      setLoading(true);

      fileArray.push({
        ...newFile,
        url: URL.createObjectURL(newFile),
        name: newFile.name,
        size: newFile.size,
      });

      newFile["id"] = i;

      files.push(newFile);

      setLoading(false);
    }
  }

  let totalBytes = fileArray.reduce((acc, elem) => {
    return acc + elem.size;
  }, 0);

  setTotalBytes((prevState) => prevState + totalBytes);

  fileUploadRef.current.value = null;
}
