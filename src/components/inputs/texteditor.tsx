import SunEditor, { buttonList } from "suneditor-react";
import { template } from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import "./styles/richtexteditor.css";

interface ITextEditor {
  name: string;
  placeholder: string;
  className: string;
  onBlurFunc?: (e: FocusEvent, editorContents: string) => void;
  onChangeFunc: (e: string) => void;
}

const config = {
  code: "en",
  toolbar: {
    default: "Default",
    save: "Save",
    font: "Font",
    formats: "Formats",
    fontSize: "Size",
    bold: "Bold",
    underline: "Underline",
    italic: "Italic",
    strike: "Strike",
    subscript: "Subscript",
    superscript: "Superscript",
    removeFormat: "Remove Format",
    fontColor: "Font Color",
    hiliteColor: "Highlight Color",
    indent: "Indent",
    outdent: "Outdent",
    align: "Align",
    alignLeft: "Align left",
    alignRight: "Align right",
    alignCenter: "Align center",
    alignJustify: "Align justify",
    list: "List",
    orderList: "Ordered list",
    unorderList: "Unordered list",
    horizontalRule: "Horizontal line",
    hr_solid: "Solid",
    hr_dotted: "Dotted",
    hr_dashed: "Dashed",
    table: "Table",
    link: "Link",
    math: "Math",
    image: "Image",
    video: "Video",
    audio: "Audio",
    fullScreen: "Full screen",
    showBlocks: "Show blocks",
    codeView: "Code view",
    undo: "Undo",
    redo: "Redo",
    preview: "Preview",
    print: "print",
    tag_p: "Paragraph",
    tag_div: "Normal (DIV)",
    tag_h: "Header",
    tag_blockquote: "Quote",
    tag_pre: "Code",
    template: "Template",
    lineHeight: "Line height",
    paragraphStyle: "Paragraph style",
    textStyle: "Text style",
    imageGallery: "Image gallery",
    dir_ltr: "string",
    dir_rtl: "string",
    mention: "Mention",
  },
  dialogBox: {
    linkBox: {
      title: "Insert Link",
      url: "URL to link",
      text: "Text to display",
      newWindowCheck: "Open in new window",
      downloadLinkCheck: "Download link",
      bookmark: "Bookmark",
    },
    mathBox: {
      title: "Math",
      inputLabel: "Mathematical Notation",
      fontSizeLabel: "Font Size",
      previewLabel: "Preview",
    },
    imageBox: {
      title: "Insert image",
      file: "Select from files",
      url: "Image URL",
      altText: "Alternative text",
    },
    videoBox: {
      title: "Insert Video",
      file: "Select from files",
      url: "Media embed URL, YouTube/Vimeo",
    },
    audioBox: {
      title: "Insert Audio",
      file: "Select from files",
      url: "Audio URL",
    },
    browser: {
      tags: "Tags",
      search: "Search",
    },
    caption: "Insert description",
    close: "Close",
    submitButton: "Submit",
    revertButton: "Revert",
    proportion: "Constrain proportions",
    basic: "Basic",
    left: "Left",
    right: "Right",
    center: "Center",
    width: "Width",
    height: "Height",
    size: "Size",
    ratio: "Ratio",
  },
  controller: {
    edit: "Edit",
    unlink: "Unlink",
    remove: "Remove",
    insertRowAbove: "Insert row above",
    insertRowBelow: "Insert row below",
    deleteRow: "Delete row",
    insertColumnBefore: "Insert column before",
    insertColumnAfter: "Insert column after",
    deleteColumn: "Delete column",
    fixedColumnWidth: "Fixed column width",
    resize100: "Resize 100%",
    resize75: "Resize 75%",
    resize50: "Resize 50%",
    resize25: "Resize 25%",
    autoSize: "Auto size",
    mirrorHorizontal: "Mirror, Horizontal",
    mirrorVertical: "Mirror, Vertical",
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    maxSize: "Max size",
    minSize: "Min size",
    tableHeader: "Table header",
    mergeCells: "Merge cells",
    splitCells: "Split Cells",
    HorizontalSplit: "Horizontal split",
    VerticalSplit: "Vertical split",
  },
  menu: {
    spaced: "Spaced",
    bordered: "Bordered",
    neon: "Neon",
    translucent: "Translucent",
    shadow: "Shadow",
    code: "Code",
  },
};

const TextEditor: React.FC<ITextEditor> = ({
  name,
  placeholder,
  className,
  onChangeFunc,
}) => {
  const theButtonList = { ...buttonList };

  if (!theButtonList.complex[8].includes("audio")) {
    (theButtonList.complex[8] as string[]).push("audio");
  }

  if (theButtonList.complex[11].includes("save")) {
    (theButtonList.complex[11] as string[]).shift();
  }

  // @ts-ignore
  function handleAudioUpload(targetElement) {
    // @ts-ignore
    (targetElement as HTMLAudioElement).controlsList =
      "nodownload noplaybackrate";
  }

  return (
    <div className={className}>
      <SunEditor
        name={name}
        placeholder={placeholder}
        onChange={onChangeFunc}
        width="100%"
        height="150px"
        lang={config}
        defaultValue={`<script>let a = "The editor's default value"</script>`}
        setOptions={{
          buttonList: buttonList.complex,
          templates: [
            {
              name: "Template-1",
              html: "<p>HTML source1</p>",
            },
            {
              name: "Template-2",
              html: "<p>HTML source2</p>",
            },
          ],

          font: [
            "Arial",
            "Georgia",
            "tahoma",
            "Trebuchet MS",
            "Verdana",
            "WorkSans",
            "WorkSans_Medium",
            "WorkSans_SemiBold",
            "WorkSans_Bold",
            "WorkSans_MediumItalic",
            "WorkSans_BoldItalic",
          ],
        }}
        setDefaultStyle="font-family: WorkSans; font-size: 16px;"
        onAudioUpload={handleAudioUpload}
      />
    </div>
  );
};

export default TextEditor;
