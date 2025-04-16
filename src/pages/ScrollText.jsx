import React from "react";
import { useEffect, useState } from "react";
import "./ScrollText.css";

const ScrollText = () => {
  const [idx, setidx] = useState(0);
  const textScroll = () => {
    // 스크롤을 할 때 y 값 알려주는 애
    const scrollY = window.scrollY;
    const heigh = window.innerHeight; // 천제 화면
    if (scrollY < heigh * 0.8) {
      setidx(0);
    } else if (scrollY < heigh * 1.8) {
      setidx(1);
    } else {
      setidx(2);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", textScroll);
    textScroll();
    return () => window.removeEventListener("scroll", textScroll);
    // 메모리 없애기 위해서
  }, []);

  return (
    <div className="scroll-Text">
      <section className={`scrollT ${idx === 0 ? "show" : ""}`}>
        <h1>First Page</h1>
      </section>
      <section className={`scrollT ${idx === 1 ? "show" : ""}`}>
        <h1>Second Page</h1>
      </section>
      <section className={`scrollImg ${idx === 2 ? "show" : ""}`}>
        <img src={process.env.PUBLIC_URL + "/images/space2.jpg"} alt="image" />
      </section>
    </div>
  );
};

export default ScrollText;
