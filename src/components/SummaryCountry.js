import React from "react";
import "./SummaryCountry.css";

function SummaryCountry({ summary }) {
  return (
    <div className="container__country">
      <p className="country__name">{summary.Country}</p>
      <div className="summary__country">
        <div className="keys__country">
          <h3>New Confirmed</h3>
          <h2 style={{ color: "red" }}>{summary.NewConfirmed}</h2>
        </div>
        <div className="keys__country">
          <h3>New Deaths</h3>
          <h2 style={{ color: "gray" }}>{summary.NewDeaths}</h2>
        </div>
        <div className="keys__country">
          <h3>New Recovered</h3>
          <h2 style={{ color: "green" }}>{summary.NewRecovered}</h2>
        </div>
        <div className="keys__country">
          <h3>Total Confirmed</h3>
          <h2 style={{ color: "darkslategray" }}>{summary.TotalConfirmed}</h2>
        </div>
        <div className="keys__country">
          <h3>Total Deaths</h3>
          <h2 style={{ color: "gray" }}>{summary.TotalDeaths}</h2>
        </div>
        <div className="keys__country">
          <h3>Total Recovered</h3>
          <h2 style={{ color: "green" }}>{summary.TotalRecovered}</h2>
        </div>
      </div>
    </div>
  );
}

export default SummaryCountry;
