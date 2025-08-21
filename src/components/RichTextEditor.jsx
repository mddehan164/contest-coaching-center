import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const handleEditorChange = (content) => {
    onChange({
      target: {
        name: "details",
        value: content,
      },
    });
  };

  return (
    <Editor
      apiKey="your-tiny-mce-key" // You can get a free API key from TinyMCE
      value={value || ""}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        placeholder: placeholder,
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
