import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Summary from "./components/Summary";
import Nav from "./components/Nav";
import DayOneLive from "./components/DayOneLive";
import { UserData } from "./components/Data";
import BarChart from "./components/BarChart";
import AllCountries from "./components/AllCountries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./components/News";
import Map from "./components/Map";
import {
  CountryContext,
  CurrentCountryContext,
} from "./components/CurrentCountryContext";

function App() {
  const [currentCountry, setCurrentCountry] = useState("");
  console.log("App");
  useEffect(() => {
    async function getCountry() {
      const res = await axios.get("https://ipapi.co/json/");
      console.log(res.data.country_name);
      setCurrentCountry(res.data.country_name);
      //setCurrentCountry(res.data.country_name);
      console.log(currentCountry);
    }
    getCountry();
    //console.log(currentCountry);
  }, []);

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "User Gained",
        data: UserData.map((data) => data.userGain),
      },
    ],
  });

  return (
    <CurrentCountryContext.Provider
      value={{ currentCountry, setCurrentCountry }}
    >
      {/* <img
        src={require("./components/covid-banner.jpeg")}
        alt=""
        className="banner"
      /> */}
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Nav />
                  <Summary />
                  <div>{currentCountry}</div>
                  <DayOneLive chartData={userData} />
                </div>
              }
            />
            <Route
              path="/countries"
              element={
                <div>
                  <Nav />
                  <AllCountries />
                </div>
              }
            />
            <Route
              path="/news"
              element={
                <div>
                  <Nav />
                  <News />
                </div>
              }
            />
            <Route
              path="/map"
              element={
                <div>
                  <Nav />
                  <Map />
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </CurrentCountryContext.Provider>
  );
}
export default App;

// import "./App.css";
// import React, { useState } from "react";
// import Summary from "./components/Summary";
// import Nav from "./components/Nav";
// import DayOneLive from "./components/DayOneLive";
// import { UserData } from "./components/Data";
// import BarChart from "./components/BarChart";

// function App() {
//   const [userData, setUserData] = useState({
//     labels: UserData.map((data) => data.year),
//     datasets: [
//       {
//         label: "Users Gained",
//         data: UserData.map((data) => data.userGain),
//       },
//     ],
//   });
//   return (
//     <div className="App">
//       {/* <Nav />
//       <Summary /> */}
//       <DayOneLive chartData={userData} />
//     </div>
//   );
// }

// export default App;
