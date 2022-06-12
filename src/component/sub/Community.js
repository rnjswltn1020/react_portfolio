import Layout from "../common/Layout";
import { useRef, useState, useEffect } from "react";

function Community() {
  const input = useRef(null);
  const textarea = useRef(null);
  const inputEdit = useRef(null);
  const textareaEdit = useRef(null);

  const getLocalData = () => {
    const data = localStorage.getItem("post");
    return JSON.parse(data);
  };
  const [Posts, setPost] = useState(getLocalData());
  const [Allowed, setAllowed] = useState(true);
  const createPost = () => {
    if (
      input.current.value.trim() === "" ||
      textarea.current.value.trim() === ""
    ) {
      resetPost();
      return alert("제목과 본문을 입력해주세요.");
    }

    setPost([
      { title: input.current.value, content: textarea.current.value },
      ...Posts,
    ]);

    resetPost();
  };

  const deletePost = (idx) => {
    console.log(idx);
    if (window.confirm("해당 메모를 삭제하시겠습니까?")) {
      setPost(Posts.filter((post, index) => idx !== index));
    }
  };

  const updatePost = (idx) => {
    if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
      resetPost();
      return alert("수정할 제목과 본문을 모두 입력해주세요.");
    }

    setAllowed(true);
    setPost(
      Posts.map((post, index) => {
        if (index === idx) {
          post.title = inputEdit.current.value;
          post.content = textareaEdit.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    );
  };

  const resetPost = () => {
    input.current.value = "";
    textarea.current.value = "";
    if (inputEdit.current.value) {
      inputEdit.current.value = "";
      textareaEdit.current.value = "";
    }
  };

  // 수정가능모드로 변경하는 함수정의.
  const enableUpdate = (idx) => {
    if (!Allowed) return;
    setAllowed(false);
    setPost(
      Posts.map((post, index) => {
        if (index === idx) post.enableUpdate = true;
        return post;
      })
    );
  };

  const disableUpdate = (idx) => {
    setAllowed(true);
    setPost(
      Posts.map((post, index) => {
        if (index === idx) post.enableUpdate = false;
        return post;
      })
    );
  };

  useEffect(() => {
    console.log(Posts);
    localStorage.setItem("post", JSON.stringify(Posts));
  }, [Posts]);

  return (
    <Layout name={"Community"}>
      <div className="inputBox">
        <input type="text" ref={input} placeholder="제목을 입력해주세요" />
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
              {post.enableUpdate ? (
                <>
                  <div className="txt">
                    <input
                      type="text"
                      defaultValue={post.title}
                      ref={inputEdit}
                    />{" "}
                    <br />
                    <textarea
                      defaultValue={post.content}
                      cols="30"
                      rows="5"
                      ref={textareaEdit}
                    ></textarea>
                  </div>
                  <div className="btnSet">
                    <div className="btnSet">
                      <button onClick={() => disableUpdate(idx)}>CANCLE</button>
                      <button onClick={() => updatePost(idx)}>SAVE</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="txt">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </div>
                  <div className="btnSet">
                    <div className="btnSet">
                      <button onClick={() => enableUpdate(idx)}>EDIT</button>
                      <button onClick={() => deletePost(idx)}>DELETE</button>
                    </div>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Community;
