import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./GuestBook.css";
// import { authPlugins } from "mysql2";

const GuestBook = () => {
  const GCPURL = "https://guest3-887602221647.us-central1.run.app/guest";
  // GET 으로 받은거  넣는 변수
  const [apiMessage, setApiMessage] = useState([]);

  // POST 로 받은거 넣는 변수
  const [postData, setPostData] = useState({ name: "", message: "" });
  useEffect(() => {
    showMessage();
  }, [apiMessage]);
  const showMessage = async () => {
    try {
      const response = await axios.get(GCPURL);
      // res.data 를 가지고 와야함. data라는 거에 들어가 있음 axios 는
      console.log(response);
      setApiMessage(response.data);
    } catch (err) {
      console.error("GET요청 실패!", err);
    }
  };
  const submitPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(GCPURL, postData);
      setPostData({ name: "", message: "" });
      showMessage();
    } catch (err) {
      console.error("POST 실패", err);
    }
  };

  return (
    <div className="guest-outbox">
      <h1>GUEST BOOK</h1>
      <form onSubmit={submitPost} className="formClass">
        <input
          type="text"
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          placeholder="name"
          required
        />
        <textarea
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          placeholder="message"
          required
        ></textarea>
        <button type="submit" onClick={showMessage}>
          등록
        </button>
      </form>
      <div className="messageArea">
        {apiMessage.map((msg) => (
          <div key={msg.id} className="message-card">
            <p>
              <strong> 닉네임 : {msg.name}</strong>
            </p>
            <p> 내용 : {msg.message}</p>
            <p>{new Date(msg.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestBook;
