import Layout from "../common/Layout";
import { useRef, useState, useEffect } from "react";

function Community() {
  const input = useRef(null);
  const textarea = useRef(null);
  const dummyPost = [
    { title: "Hello", content: "Here comes description in detail" },
    { title: "Hello", content: "Here comes description in detail" },
    { title: "Hello", content: "Here comes description in detail" },
    { title: "Hello", content: "Here comes description in detail" },
    { title: "Hello", content: "Here comes description in detail" },
    { title: "Hello", content: "Here comes description in detail" },
  ];
  const [Posts, setPost] = useState(dummyPost);
  const createPost = () => {
    if (
      input.current.value.trim() === "" ||
      textarea.current.value.trim() === ""
    ) {
      resetPost();
      return alert("제목과 본문을 입력해주세요.");
    }

    setPost([
      { title: input.current.value, content: input.current.value },
      ...Posts,
    ]);

    resetPost();
  };

  const deletePost = (idx) => {
    console.log(idx);
    setPost(Posts.filter((post, index) => idx !== index));
  };

  const resetPost = () => {
    input.current.value = "";
    textarea.current.value = "";
  };

  useEffect(() => {
    console.log(Posts);
  }, [Posts]);

  return (
    <Layout name={"Community"}>
      <div className="inputBox">
        <input type="text" ref={input} placeholder="제목을 입력해주세요" />{" "}
        <br />
        <textarea
          ref={textarea}
          cols="30"
          rows="5"
          placeholder="본문을 입력해주세요"
        ></textarea>
        <br />
        <div className="btnSet">
          <button onClick={resetPost}>CANCLE</button>
          <button onClick={createPost}>WRITE</button>
        </div>
      </div>

      <div className="showBox">
        {Posts.map((post, idx) => {
          return (
            <article key={idx}>
              <div className="txt">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="btnSet">
                <div className="btnSet">
                  <button>EDIT</button>
                  <button onClick={() => deletePost(idx)}>DELETE</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Community;
