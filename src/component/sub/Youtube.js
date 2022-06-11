import Layout from "../common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import Popup from "../common/Popup";

function Youtube() {
  const fetchYoutube = () => {
    const key = "AIzaSyCghGCPSnUES2vmjiTpjw_xeg9PhKxKa90";
    const num = 8;
    const playList = "PLE5psCknqIPLt8dWGEUEoonb_DANXf3iZ";
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;
    axios.get(url).then((json) => {
      setVids(json.data.items);
    });
    console.log(Vids);
  };

  const hadlePopup = (idx) => {
    setOpen(true);
    setTarget(idx);
  };
  const [Vids, setVids] = useState([]);
  const [Open, setOpen] = useState(false);
  const [Target, setTarget] = useState("");
  useEffect(fetchYoutube, []);

  return (
    <>
      <Layout name={"youtube"}>
        {Vids.map((vid, idx) => {
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
              <div
                className="pic"
                onClick={() => {
                  hadlePopup(idx);
                }}
              >
                <img
                  src={vid.snippet.thumbnails.medium.url}
                  alt={vid.snippet.title}
                />
              </div>
            </article>
          );
        })}
      </Layout>
      {Open && (
        <Popup setOpen={setOpen}>
          <iframe
            src={`https://www.youtube.com/embed/${Vids[Target].snippet.resourceId.videoId}`}
            frameBorder="1"
          ></iframe>
        </Popup>
      )}
    </>
  );
}

export default Youtube;
