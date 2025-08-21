import React, { forwardRef, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillWrapper = forwardRef(({ value, onChange, ...props }, ref) => {
  const wrapperRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      if (ref) {
        if (typeof ref === "function") {
          ref(editor);
        } else {
          ref.current = editor;
        }
      }
    }
  }, [ref]);

  return (
    <div ref={wrapperRef} className="quill-wrapper">
      <ReactQuill
        ref={editorRef}
        value={value || ""}
        onChange={onChange}
        {...props}
        bounds={".quill-wrapper"}
      />
    </div>
  );
});

QuillWrapper.displayName = "QuillWrapper";

export default QuillWrapper;
