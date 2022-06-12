import React from "react";
import { useState, useEffect } from "react";

function News() {
  const getCmntData = () => {
    const dummyPost = [
      { title: "Hello", content: "Here comes description in detail" },
      { title: "Hello", content: "Here comes description in detail" },
      { title: "Hello", content: "Here comes description in detail" },
      { title: "Hello", content: "Here comes description in detail" },
      { title: "Hello", content: "Here comes description in detail" },
      { title: "Hello", content: "Here comes description in detail" },
    ];
    const comunityData = localStorage.getItem("post");

    if (comunityData) {
      return JSON.parse(comunityData);
    }
    return dummyPost;
  };

  const [Cmnt] = useState(getCmntData());

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(Cmnt));
  }, []);

  return (
    <section id="news">
      <h2>- 커뮤니티글 미리보기 -</h2>
      <div className="content">
        {Cmnt.map((item, idx) => {
          if (idx < 4) {
            return (
              <article key={idx}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </article>
            );
          }
        })}
      </div>
    </section>
  );
}

export default News;
