import { IProps } from "./FileSelector.types";
import React, { useRef } from "react";

export default function FileSelector(props: IProps) {
  const { acceptedFileFormats, maximumSize, multiple, handleSave, onError } =
    props;

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files && files.length > 0) {
      const filesToUpload: File[] = Array.from(files);

      // Check for Maximum Size
      if (maximumSize) {
        const filesExceedSize = filesToUpload.some((file) => {
          // from bytes to kb
          const fileSize = file.size / 1024;
          return fileSize > maximumSize;
        });
        if (filesExceedSize) {
          // TODO: Handle when file size exceeds maximum size
          onError?.("MAX_SIZE_EXCEED");
          return;
        }
      }

      // Saving
      handleSave && handleSave(filesToUpload);
      // reset input
      if (hiddenFileInputRef.current) {
        hiddenFileInputRef.current.value = "";
      }
    }
  }

  //
  //
  const isChildrenFunction = typeof props.children === "function";
  return (
    <div onClick={isChildrenFunction ? undefined : openFilePicker}>
      {/* Hidden FilePicker */}
      <input
        type="file"
        name="file"
        style={{ display: "none" }}
        ref={hiddenFileInputRef}
        onChange={onFileChange}
        accept={acceptedFileFormats.join(",")}
        multiple={multiple}
      />

      {isChildrenFunction
        ? (props.children as Function)(openFilePicker)
        : props.children}
    </div>
  );
}
