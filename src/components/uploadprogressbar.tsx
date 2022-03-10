import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../hooks/useStorage";
import { FilePost } from "../lib/interfaces";

interface IProgressBar {
  post: FilePost;
  cleanUp: (successState: boolean) => void;
  setFileDownloadUrls: (
    fileDownLoadUrls: { id: string; url: string }[]
  ) => void;
}

const ProgressBar: React.FC<IProgressBar> = ({
  post,
  cleanUp,
  setFileDownloadUrls,
}) => {
  let { success, error, progress, fileDownLoadUrls } = useStorage(post);

  // console.log(fileDownLoadUrls);

  useEffect(() => {
    if (success) {
      cleanUp(true);
      setFileDownloadUrls(fileDownLoadUrls);
    } else if (error) {
      cleanUp(false);
    }
  }, [success, error, cleanUp]);

  if (progress > 100) {
    progress = 100;
  }

  return (
    <motion.div
      className="progress-bar h-[5px] bg-[#007bff] mt-[5px]"
      initial={{ width: 0 + "%" }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
