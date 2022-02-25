import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as CharJS } from "chart.js/auto";
import { UserData } from "./Data";

function DayOneLive({ chartData }) {
  const [Data, getData] = useState("");
  useEffect(() => {
    async function fetchSummary() {
      const req = await axios.get("https://ipapi.co/json/");
      console.log(req.data.country_name);
      const request = await axios.get(
        `https://api.covid19api.com/dayone/country/${req.data.country_name}/status/confirmed`
      );
      const request2 = await axios.get(
        `https://api.covid19api.com/dayone/country/south-africa`
      );
      console.log(request2);
      // console.log(country);
      console.log(request.data);
      getData(request.data);
      //setSummary(request.data.Global);
      //const getDate = request.data.Date.split("T");
      //setDate(getDate[0]);
    }
    // getCountry();
    fetchSummary();
    return () => {};
  }, []);

  console.log(Data);

  const dataset = {
    labels: Object.values(Data).map((data) => data.Date.split("T")[0]),
    datasets: [
      {
        label: "User Gained",
        data: Object.values(Data).map((data) => data.Cases),
      },
    ],
  };
  // return (
  //   <div>{Object.values(Data).map((value) => console.log(value.Cases))}</div>
  // );
  return <Bar data={dataset} height={1000} width={2000} />;
}

export default DayOneLive;
