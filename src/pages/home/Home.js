import React from "react";
import s from "./Home.module.css";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";

export default function Home() {
  return (
    <div className={s.Home}>
      <Navbar />
      <div className={s.content}></div>
    </div>
  );
}
