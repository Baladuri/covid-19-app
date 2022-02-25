import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Summary.css";
import SummaryCountry from "./SummaryCountry";
import { CurrentCountryContext } from "./CurrentCountryContext";

function Summary() {
  const [summary, setSummary] = useState([]);
  const [date, setDate] = useState("");
  const [countrySummary, setCountrySummary] = useState("");
  const [countriesFromApi, setCountriesFromApi] = useState([]);

  const { currentCountry, setCurrentCountry } = useContext(
    CurrentCountryContext
  );
  console.log("summary");
  useEffect(() => {
    async function fetchSummary() {
      const req1 = await axios.get(
        `https://corona.lmao.ninja/v2/countries?yesterday&sort`
      );
      console.log(req1);
      // const req = await axios.get("https://ipapi.co/json/");
      // console.log(req.data.country_name);
      const request = await axios.get("https://api.covid19api.com/summary");
      console.log(request.data);
      setSummary(request.data.Global);
      setCountriesFromApi(request.data.Countries);
      const getDate = request.data.Date.split("T");
      setDate(getDate[0]);

      console.log(request.data.Countries);
      console.log();
    }
    fetchSummary();

    return () => {};
  }, []);

  useEffect(() => {
    Object.values(countriesFromApi).map((country) =>
      country.Country === currentCountry ? setCountrySummary(country) : ""
    );
  });
  // console.log(summary);
  console.log(currentCountry);

  return (
    <div className="summary__container">
      <div className="date">
        <h4>Date</h4>
        <h4>{date}</h4>
      </div>
      <h1 className="title">World</h1>
      <div className="summary">
        <div className="keys">
          <h3>New Confirmed</h3>
          <h2 style={{ color: "red" }}>{summary.NewConfirmed}</h2>
        </div>
        <div className="keys">
          <h3>New Deaths</h3>
          <h2 style={{ color: "gray" }}>{summary.NewDeaths}</h2>
        </div>
        <div className="keys">
          <h3>New Recovered</h3>
          <h2 style={{ color: "green" }}>{summary.NewRecovered}</h2>
        </div>
        <div className="keys">
          <h3>Total Confirmed</h3>
          <h2 style={{ color: "darkslategray" }}>{summary.TotalConfirmed}</h2>
        </div>
        <div className="keys">
          <h3>Total Deaths</h3>
          <h2 style={{ color: "gray" }}>{summary.TotalDeaths}</h2>
        </div>
        <div className="keys">
          <h3>Total Recovered</h3>
          <h2 style={{ color: "green" }}>{summary.TotalRecovered}</h2>
        </div>
      </div>
      <SummaryCountry summary={countrySummary} />
    </div>
  );
}

export default Summary;
