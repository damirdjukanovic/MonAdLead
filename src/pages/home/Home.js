import React from "react";
import s from "./Home.module.css";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import DashboardCard from "../../components/dashboardCard/DashboardCard";

import DvrIcon from "@mui/icons-material/Dvr";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Home() {
  const renderPortfolioPerformanceTop = () => {
    return (
      <div className={s.portfolioPerformanceTop}>
        <p>Portfolio Performance</p>
        <button type="button">View All</button>
      </div>
    );
  };

  const renderPortfolioPerformanceMain = () => {
    return (
      <div className={s.portfolioPerformanceMain}>
        <div className={s.portfolioItem}>
          <div className={s.despositsCircle}>
            <DvrIcon />
          </div>
          <div className={s.performanceText}>
            <div className={s.cashDeposits}>Cash Deposits</div>
            <div className={s.earnings}>1,7M</div>
            <div className={s.earningsBottom}>
              <div>
                <KeyboardArrowDownIcon fontSize="small" /> 54.1%{" "}
              </div>
              <span>less earnings</span>
            </div>
          </div>
        </div>
        <div className={s.portfolioItem}>
          <div className={`${s.despositsCircle} ${s.depositCircleRed}`}>
            <SchoolOutlinedIcon />
          </div>
          <div className={s.performanceText}>
            <div className={s.cashDeposits}>Invested Dividents</div>
            <div className={s.earnings}>9M</div>
            <div className={`${s.earningsBottom}`}>
              <span>Grow Rate: </span>
              <div className={s.earningsBottomGreen}>
                <KeyboardArrowDownIcon fontSize="small" /> 14.1%{" "}
              </div>
            </div>
          </div>
        </div>
        <div className={s.portfolioItem}>
          <div className={`${s.despositsCircle} ${s.despositsCircleGreen}`}>
            <HomeWorkOutlinedIcon />
          </div>
          <div className={s.performanceText}>
            <div className={s.cashDeposits}>Capital Gains</div>
            <div className={`${s.earnings} ${s.earningsGreen}`}>$563</div>
            <div className={`${s.earningsBottom}`}>
              <span>Increased by</span>
              <div className={s.earningsBottomYellow}>
                <KeyboardArrowUpIcon fontSize="small" /> 7.35%{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPortfolioPerformanceBottom = () => {
    return (
      <div className={s.portfolioPerformanceBottom}>
        <button type="button">View Complete Report</button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className={s.Home}>
          <div className={s.portfolioPerformance}>
            {renderPortfolioPerformanceTop()}
            {renderPortfolioPerformanceMain()}
            {renderPortfolioPerformanceBottom()}
          </div>
          <div className={s.Cards}>
            <DashboardCard color="red" />
            <DashboardCard color="green" />
            <DashboardCard color="blue" />
            <DashboardCard color="green" />
          </div>
        </div>
      </div>
    </>
  );
}
