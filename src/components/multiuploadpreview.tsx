import React from "react";

interface IItem {
  name: string;
  type: string;
  url: string;
}

interface IMultiUploadPreview {
  fileArray: IItem[];
  handleRemoveThumbnail: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const MultiUploadPreview: React.FC<IMultiUploadPreview> = ({
  fileArray,
  handleRemoveThumbnail,
}) => {
  return (
    <div className="form-group multi-preview mb-0" id="multiPreview">
      {(fileArray || []).map((item: IItem) => (
        <div className="relative float-left mr-4" key={item.url}>
          <div>
            <p className="px-4 pr-12 py-2 rounded-sm bg-slate-800 text-sm text-white">
              {item.name.split(".").slice(0, -1).join(".").slice(0, 30) +
                "." +
                item.name.split(".").slice(-1)}
            </p>
          </div>

          <button
            type="button"
            className="close closeThumbnail absolute top-[1.4rem] right-3 text-white"
            aria-label="Close"
          >
            <span
              aria-hidden="true"
              id={item.url}
              onClick={handleRemoveThumbnail}
              className="text-2xl"
            >
              ×
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultiUploadPreview;
