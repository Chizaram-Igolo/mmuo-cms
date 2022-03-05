import { ChangeEvent, useState } from "react";
import "./styles/richtexteditor.css";

export default function RichTextEditor() {
  const [style, setStyle] = useState("span-0");

  // function gText(e: Event) {
  //   if (typeof window !== "undefined") {
  //     const t = window.getSelection();

  //     // window.captureEvents(React.MOUSEUP);

  //     // @ts-ignore
  //     console.log(t);

  //     // @ts-ignore
  //     console.log(t.baseNode.parentElement);
  //   }
  // }

  // document.onmouseup = gText;

  function changeStyle(e: ChangeEvent<HTMLSelectElement>) {
    setStyle(e.target.value);

    if (typeof window !== "undefined") {
      var sel = window.getSelection(); // Gets selection

      // @ts-ignore
      console.log(sel!.parentElement);

      if (sel!.rangeCount) {
        // Creates a new element, and insert the selected text with the chosen style

        if (!sel?.getRangeAt(0).cloneContents().querySelector("span")) {
          let oldClassList = sel
            ?.getRangeAt(0)
            .cloneContents()
            .querySelector("span")?.classList;

          let spanElem = document.createElement("span");
          spanElem.classList.add(e.target.value); // Selected style (class)
          spanElem.innerHTML = sel!.toString(); // Selected texts

          // https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
          var range = sel!.getRangeAt(0);
          range.deleteContents(); // Deletes selected text…
          range.insertNode(spanElem); // … and inserts the new element at its place
        } else {
          console.log("got here");
        }
      }

      // let editableDiv = document.querySelector(".editable") as HTMLDivElement;

      // let spanElem = document.createElement("span");

      // spanElem.classList.add(e.target.value);

      // // console.log(spanElem.classList);

      // if (e.target.value === "span-0") {
      //   // console.log("here");
      //   if (sel?.getRangeAt(0).cloneContents().querySelector("span")) {
      //     let oldClassList = sel
      //       ?.getRangeAt(0)
      //       .cloneContents()
      //       .querySelector("span")?.classList;
      //     spanElem.classList.remove(...Array.from(oldClassList!));

      //     // console.log(spanElem.classList);
      //   }
      // } else {
      //   spanElem.classList.add(e.target.value);

      //   let oldElem = sel?.getRangeAt(0).cloneContents().querySelector("span");

      //   let oldClassList = oldElem?.classList;

      //   if (oldElem) {
      //     if (!Array.from(oldClassList!).includes(e.target.value)) {
      //       console.log(spanElem.classList);

      //       let oldClassList = sel
      //         ?.getRangeAt(0)
      //         .cloneContents()
      //         .querySelector("span")?.classList;

      //       console.log(oldClassList);

      //       spanElem.classList.add(...Array.from(oldClassList!));

      //       console.log(spanElem.classList);

      //       oldElem.remove();

      //       // editableDiv.replaceChild(oldElem, spanElem);

      //       // console.log(spanElem);

      //       // console.log(oldClassList);
      //     }
      //   } else {
      //     console.log(spanElem.classList);
      //     spanElem.innerHTML = sel!.toString();
      //     var range = sel!.getRangeAt(0);
      //     range.deleteContents(); // Deletes selected text…
      //     range.insertNode(spanElem); // … and inserts the new element at its place
      //   }
      // }

      // console.log(
      //   sel?.getRangeAt(0).cloneContents().querySelector("span")?.classList
      // );
    }
  }

  return (
    <>
      <select
        id="select_font"
        name="select_font"
        onChange={changeStyle}
        value={style}
      >
        <option value="span-0">None</option>
        <option value="span-b">Bold</option>
        <option value="span-u">Underlined</option>
        <option value="span-i">Italic</option>
      </select>
      <div
        contentEditable="true"
        className="editable"
        suppressContentEditableWarning={true}
        // @ts-ignore
        // onMouseUp={gText}
      >
        Okay
      </div>
    </>
  );
}
