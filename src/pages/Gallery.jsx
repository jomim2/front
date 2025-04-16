import React from "react";
import { useState, useEffect } from "react";
import { motion, progress } from "framer-motion";
import "./Gallery.css";

function Gallery() {
  const [dataImg, setDataImg] = useState([]);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetch(process.env.PUBLIC_URL + "/data/data.json");
        const data = await res.json();
        console.log(data);
        setDataImg(data);
      } catch (err) {
        console.error("실패", err);
      }
    };
    fetchImg();
  }, []);

  return (
    <div className="gallery-outBox">
      {/* 흐르는 이미지 시작 */}
      <div className="scroll-imgBox">
        <div className="scroll-track">
          {dataImg.concat(dataImg).map((item, index) => (
            <div key={item} className="scroll-inbox">
              <div>{item.title}</div>
              <img src={process.env.PUBLIC_URL + item.src} alt={item.title} />
              <div>{item.dis}</div>
            </div>
          ))}
        </div>
      </div>
      {/* 페이드 이미지 */}
      {/* 모션으로 큰 테두리 잡기 */}
      <motion.div
        className="fade-section"
        // 초기값
        initial={{ opacity: 0, y: 60 }}
        // 촤종
        whileInView={{ opacity: 1, y: 0 }}
        // 애니매이션 효과 진행 속도 설정 우아하게~
        transition={{ duration: 1.5, ease: "easeOut" }}
        // 일단 조금이라도 보이면 한번 실행해라 40%보이면 실행해라
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="img-box">
          <img
            src={process.env.PUBLIC_URL + "/images/space1.jpg"}
            alt="space1"
          ></img>
        </div>
        <div className="text-box">
          <h2>hello</h2>
          <p>this picture is my universe</p>
        </div>
      </motion.div>
      <motion.div
        className="fade-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="img-box">
          <img
            src={process.env.PUBLIC_URL + "/images/space2.jpg"}
            alt="space1"
          ></img>
        </div>
        <div className="text-box">
          <h2>hello</h2>
          <p>this picture is my potato</p>
        </div>
      </motion.div>
      {/* 모아지는 이미지 */}
      <div className="group-img">
        {[1, 2, 3, 4].map((i) => (
          <motion.img
            key={i}
            src={process.env.PUBLIC_URL + `/images/sky${i}.jpg`}
            alt="skyPicture"
            initial={{
              opacity: 0,
              // -100 ~ +100
              y: Math.floor(Math.random() * 201) - 100,
              x: Math.floor(Math.random() * 201) - 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              x: 0,
            }}
            transition={{
              duration: 1.2,
              delay: Math.floor(Math.random() * 2),
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
