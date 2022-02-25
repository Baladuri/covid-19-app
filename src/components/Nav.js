import React, { useEffect, useState, useContext, Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { CurrentCountryContext } from "./CurrentCountryContext";
import Select from "react-select";

function Nav() {
  const [countries, setCountries] = useState([]);
  const [changeCountry, setChangeCountry] = useState("");
  const { currentCountry, setCurrentCountry } = useContext(
    CurrentCountryContext
  );
  useEffect(() => {
    async function getCountriesList() {
      const request = await axios.get("https://api.covid19api.com/summary");
      console.log(request.data.Countries);
      let countriesArray = [];

      Object.entries(request.data.Countries).map((element) =>
        countriesArray.push({
          value: element[1].Country,
          label: element[1].Country,
        })
      );

      console.log(countriesArray);
      setCountries(countriesArray);
    }
    getCountriesList();
  }, []);

  const selectCountry = (event) => {
    console.log(event.value);
    setCurrentCountry(event.value);
  };

  return (
    <nav className="navbar">
      <div className="title__div">
        <Link to="/" className="link__home">
          <h1 className="title__1">
            Covid19<span className="title__2">-meter</span>
          </h1>
        </Link>
      </div>
      <div className="header__navs">
        <Link className="header__btn" to="/countries">
          <div>
            <span>All Countries</span>
          </div>
        </Link>
        <Link className="header__btn" to="/news">
          <div>
            <span>News</span>
          </div>
        </Link>
      </div>
      <div className="countries__list">
        <p>{currentCountry}</p>
        <Select
          options={countries}
          defaultValue={{ value: "Default", label: "Default" }}
          className="select__countries"
          onChange={selectCountry}
        />
      </div>
      <div className="logo__div">
        <img src={require("./covid-logo.png")} alt="" className="covid__logo" />
      </div>
    </nav>
  );
}

export default Nav;
