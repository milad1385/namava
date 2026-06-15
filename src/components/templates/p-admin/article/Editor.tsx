"use client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
function Editor({article , onArticle} : any) {

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
  return (
    <CKEditor
      editor={ClassicEditor as any}
      config={uploadConfig}
      data={article}
      onChange={(event, editor) => {
        const data = editor.getData();
        onArticle(data);
      }}
    />
  );
}

export default Editor;
