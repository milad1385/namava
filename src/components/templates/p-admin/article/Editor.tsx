"use client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import EditorSkeleton from "./EditorSkeleton";

function Editor({ article, onArticle }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const uploadConfig = {
    ckfinder: {
      uploadUrl: "http://localhost:3001/upload",
      withCredentials: true,
      headers: {
        "X-CSRF-TOKEN": "CSFR-TOKEN",
        Authorization: `Bearer <JSON Web Token>`,
      },
    },
    language: "fa",
    direction: "rtl",
  };

  if (!isClient) {
    return <EditorSkeleton />;
  }

  return (
    <div className="[&_.ck-editor__editable]:min-h-[350px] [&_.ck-editor__main]:h-auto [&_.ck-content]:min-h-[350px] w-full">
      <CKEditor
        editor={ClassicEditor as any}
        config={uploadConfig}
        data={article}
        onChange={(event, editor) => {
          const data = editor.getData();
          onArticle(data);
        }}
        onReady={(editor) => {
          const editable = editor.editing.view.document.getRoot();
          if (editable) {
            editor.editing.view.change((writer) => {
              writer.setStyle("min-height", "350px", editable);
            });
          }
        }}
      />
    </div>
  );
}

export default Editor;
