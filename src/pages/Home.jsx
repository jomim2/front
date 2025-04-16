import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { useViewTransitionState } from "react-router-dom";

const Home = () => {
  const images = [
    { src: "sky1.jpg", title: "hello1" },
    { src: "sky2.jpg", title: "hello2" },
    { src: "sky3.jpg", title: "hello3" },
  ];
  const [index, setIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const API_KEY = "85a3913003f04a7c204a0f01bda12e04";
    const CITY = "ansan";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(URL);
        console.log(res.data);
        setWeather({
          temp: res.data.main.temp,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
        });
      } catch (error) {
        console.error("Err :", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="home-container">
      {
        images.map((img, idx) => (
          <div
            key={idx}
            className={`slide ${index === idx ? "active" : ""}`}
            style={{
              backgroundImage: `url(/images/${img.src})`, //${process.env.Public_URL}배포할 때, pakage.json 에 Homepage : "내 git 주소"
            }} // 스타일이라서 중괄호 두개임. 중괄호 하나는 자바스크립트로 인식하기 때문
          >
            <h1
              key={idx}
              className={`slide-title ${index === idx ? "title-show" : ""}`}
            >
              {img.title}
            </h1>
          </div>
        ))
        // () 리턴값 없어도 됨
        // {} 리턴값 있어야 됨.
      }
      {weather && (
        <div className="weather">
          <img
            src={"http://openweathermap.org/img/wn/" + weather.icon + "@2x.png"}
            alt={weather.description}
            referrerPolicy="no-referrer"
          ></img>
          <div>{weather.temp}℃</div>
          <div>{weather.description}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
