import React from "react";
import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";

function Main() {
  return (
    <>
      <Header type={"main"} />
      <Visual />
      <News />
      <Pics />
      <Vids />
    </>
  );
}

export default Main;
