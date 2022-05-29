import Layout from "../common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import Popup from "../common/Popup";

function Youtube() {
  const key = "AIzaSyCghGCPSnUES2vmjiTpjw_xeg9PhKxKa90";
  const num = 5;
  const playList = "PLE5psCknqIPLt8dWGEUEoonb_DANXf3iZ";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;
  const [vids, setvids] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(url).then((json) => {
      setvids(json.data.items);
    });
  }, []);
  console.log(vids);
  return (
    <>
      <Layout name={"youtube"}>
        {vids.map((vid, idx) => {
          const tit = vid.snippet.title;
          const desc = vid.snippet.description;
          const date = vid.snippet.publishedAt;

          return (
            <article key={idx}>
              <h2>{tit.length > 50 ? tit.slice(0, 50) : tit}</h2>
              <div className="txt">
                <p>{desc.length > 200 ? desc.slice(0, 200) : desc}</p>
                <span>{date.split("T")[0]}</span>
              </div>
              <div className="pic" onClick={() => setOpen(true)}>
                <img
                  src={vid.snippet.thumbnails.medium.url}
                  alt={vid.snippet.title}
                />
              </div>
            </article>
          );
        })}
      </Layout>
      {open ? <Popup setOpen={setOpen} /> : null}
    </>
  );
}

export default Youtube;
