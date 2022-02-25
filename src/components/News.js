import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import "./News.css";
import { CurrentCountryContext } from "./CurrentCountryContext";

function News() {
  const [headlines, setHeadlines] = useState("");
  const [everything, setEverything] = useState("");
  const [countries, setCountries] = useState("");
  const { currentCountry, setCurrentCountry } = useContext(
    CurrentCountryContext
  );

  useEffect(() => {
    async function fetchNews() {
      const responseEverything = await axios.get(
        "http://newsapi.org/v2/everything?q=covid&sortBy=popularity&apiKey=845e6a63d3314b6d9d81f5d77f1b9764"
      );

      console.log("hello news");
      console.log(responseEverything.data);

      setEverything(responseEverything.data.articles);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get(`https://restcountries.com/v2/all`);
      console.log(response.data);

      let countryCode;
      Object.values(response.data).map((element) => {
        if (element.name === currentCountry) {
          console.log(element.alpha2Code.toLowerCase());
          countryCode = element.alpha2Code.toLowerCase();
        }
      });
      const responseHeadlines = await axios.get(
        `http://newsapi.org/v2/top-headlines?country=${countryCode}&q=covid&apiKey=845e6a63d3314b6d9d81f5d77f1b9764`
      );
      console.log(responseHeadlines.data.articles);
      setHeadlines(responseHeadlines.data.articles);
    }
    fetchCountries();
  }, [currentCountry]);
  return (
    <Fragment>
      <div className="news__container">
        <div className="headlines__container">
          {/* <img
            src={require("./covid-banner.jpeg")}
            alt=""
            className="headlines__banner"
          /> */}
          <div className="headlines__title">
            <p>Headlines</p>
            <p style={{ fontSize: "13px" }}>{currentCountry} </p>
          </div>

          {headlines.length ? (
            Object.values(headlines).map((headline) => (
              <div key={headline.title} className="headline__card">
                <div className="headline__header">
                  <p>{headline.source.name}</p>
                  <p>{headline.publishedAt.split("T")[0]}</p>
                </div>
                <p className="headline__author">
                  Author:{" "}
                  {headline.author != null ? headline.author : "undefined"}
                </p>
                <a
                  href={headline.url}
                  className="headline__url"
                  target="_blank"
                >
                  <p className="headline__title">Title: {headline.title}</p>
                  <p className="headline__description">
                    {headline.description}...
                  </p>
                </a>
              </div>
            ))
          ) : (
            <p className="no__headlines">
              No Headlines from {currentCountry}...
            </p>
          )}
        </div>
        <div className="everything__container">
          <div className="everything__title">
            <p>World News on Covid19</p>
          </div>
          {Object.values(everything).map((allnews) => (
            <div key={allnews.title} className="everything__card">
              <div className="everything__header">
                <p>{allnews.source.name}</p>
                <p>{allnews.publishedAt.split("T")[0]}</p>
              </div>
              <p className="everything__author">
                Author: {allnews.author != null ? allnews.author : "undefined"}
              </p>
              <a href={allnews.url} className="everything__url" target="_blank">
                <p className="news__title">Title: {allnews.title}</p>
                <p className="everything__description">
                  {allnews.description}...
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default News;
