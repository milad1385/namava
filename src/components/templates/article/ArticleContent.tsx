import React from "react";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

function ArticleContent({ content }: any) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return;

  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    ></div>
  );
}

export default ArticleContent;
