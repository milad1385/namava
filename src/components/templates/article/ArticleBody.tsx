"use client";
import DOMPurify from "dompurify";
import React from "react";

function ArticleBody({ content }: any) {
  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    ></div>
  );
}

export default ArticleBody;
