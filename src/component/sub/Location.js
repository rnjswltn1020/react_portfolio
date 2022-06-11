import Layout from "../common/Layout";
import { useEffect, useState, useRef } from "react";

function Location() {
  const { kakao } = window;
  const container = useRef(null);
  // const btns = useRef(null);
  const [index, setIndex] = useState("0");

  const [Location, setLocation] = useState("");
  const [Traffic, setTraffic] = useState(false);
  const info = [
    {
      title: "삼성동 코엑스",
      latLng: new kakao.maps.LatLng(37.513688927617494, 127.05801425656341),
      imgSrc:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
      imgPos: { offset: new kakao.maps.Point(27, 69) },
      imgSize: new kakao.maps.Size(64, 69),
    },
    {
      title: "안양 유원지",
      latLng: new kakao.maps.LatLng(37.41846798940059, 126.91925690974793),
      imgSrc:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
      imgPos: { offset: new kakao.maps.Point(27, 69) },
      imgSize: new kakao.maps.Size(64, 69),
    },
    {
      title: "청계산",
      latLng: new kakao.maps.LatLng(37.42083052819009, 127.04261810372454),
      imgSrc:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
      imgPos: { offset: new kakao.maps.Point(27, 69) },
      imgSize: new kakao.maps.Size(64, 69),
    },
  ];
  const [Info] = useState(info);
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: Info[index].latLng, //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  useEffect(() => {
    container.current.innerHTML = "";

    const map_instance = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    const imageSrc = Info[index].imgSrc, // 마커이미지의 주소입니다
      imageSize = Info[index].imgSize, // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = Info[index].latLng;

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    marker.setMap(map_instance);
    setLocation(map_instance);

    // for (const btn of btns.current.children) {
    //   btn.classList.remove("on");
    //   btns.current.children[index].classList.add("on");
    // }

    // skyview 전환버튼 추가.
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map_instance.addControl(zoomControl, kakao.maps.ControlPosition.TOPRIGHT);

    const mapCenter = () => {
      console.log("함수호출");
      map_instance.setCenter(Info[index].latLng);
    };

    //마커 중심으로 이동.
    window.addEventListener("resize", mapCenter);
    return () => {
      window.removeEventListener("resize", mapCenter);
    };
  }, [index]);

  useEffect(() => {
    if (Location) {
      Traffic
        ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
  }, [Traffic]);

  return (
    <Layout name={"Location"}>
      <div id="map" ref={container}></div>
      <div className="btnSet">
        <button
          onClick={() => {
            setTraffic(!Traffic);
          }}
        >
          {Traffic ? "Traffic On" : "Traffic Off"}
        </button>

        <ul>
          {Info.map((info, idx) => {
            let on = null;
            {
              idx == index ? (on = "on") : (on = null);
            }
            return (
              <li
                className={on}
                key={idx}
                onClick={() => {
                  setIndex(idx);
                }}
              >
                {info.title}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default Location;
