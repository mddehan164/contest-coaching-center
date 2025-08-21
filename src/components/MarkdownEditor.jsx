import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({ value, onChange, placeholder }) => {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        height={300}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MarkdownEditor;
