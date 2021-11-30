import React from "react";
import s from "./DashboardCard.module.css";

export default function DashboardCard({ color }) {
  return (
    <div style={{ border: `0.5px solid ${color}` }} className={s.Card}>
      <p className={s.price}>
        <span>$</span> 874
      </p>
      <p className={s.cardText}>sales last month</p>
    </div>
  );
}
