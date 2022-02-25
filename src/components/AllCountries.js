import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllCountries.css";

function AllCountries() {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://api.covid19api.com/summary");
      console.log(response.data);
      const arr = [];
      for (const item of response.data.Countries) {
        arr.push(item);
      }

      console.log(arr[0].TotalConfirmed);
      arr.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      console.log(arr);
      setData(arr);
    }
    fetchData();
  }, []);

  return (
    <div className="countries__container">
      {Object.values(data).map((country) => (
        <div key={country.ID} className="country__data">
          <h3>{country.Country}</h3>
          <h3>{country.TotalConfirmed}</h3>
          <h3>{country.NewConfirmed}</h3>
          <h3>{country.ToalDeaths}</h3>
          <h3>{country.NewDeaths}</h3>
          <h3>{country.TotalRecovered}</h3>
          <h3>{country.NewRecovered}</h3>
        </div>
      ))}
    </div>
  );
}

export default AllCountries;
