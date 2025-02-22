import React, { useRef } from 'react';
import '../App.css';

const getImagePath = (cardName) => { 
  let card = "default";

  if (cardName === "신한 SOL 트래블 카드") {
    card = "sol";
  }
  else if (cardName === "NH 트래블 체크카드") {
    card = "nh";
  }
  else if (cardName === "트래블로그 체크카드") {
    card = "travelog";
  }
  else if (cardName === "토스뱅크 체크카드") {
    card = "toss";
  }
  else if (cardName === "트래블제로카드") {
    card = "zero";
  }
  
  return `/assets/${card}.png`;
};

const Popup = ({ popupContent, closePopup, isExpanded, setIsExpanded }) => {
  const popupRef = useRef(null);
  
  return (
    <div
      ref={popupRef}
      className="popup"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        border: "15px solid #d7d8d9",
        zIndex: 1000,
        borderRadius: "0px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "400px",
        textAlign: "center",
        maxHeight: "600px",
        overflowY: "auto",
      }}
    >

      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", textAlign: "left" }}>
        {popupContent.card_name && (
          <img
            src={getImagePath(popupContent.card_name)}
            alt="카드 이미지"
            style={{ width: "25%", borderRadius: "5px", marginRight: "15px" }}
          />
        )}

        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: "15px", margin: 0.5 }}>{popupContent.card_name}</strong>
          <p style={{ fontSize: "13px", color: "#333", margin: 1, marginTop: "10px", whiteSpace: "pre-wrap" }}>
  {popupContent.condition.split("\n").map((line, index) => (
    <span key={index}>• {line}<br /></span>
  ))}
</p>
        </div>
      </div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: "pointer",
          fontSize: "13px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        {isExpanded ? "▼" : "▶"} <p style={{ fontSize: "13px", color: "#333", margin: 0.6, whiteSpace: "pre-wrap" }}>  해외 이용 혜택</p>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          borderBottom: "1px solid #aaa",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      ></div>

      {isExpanded && (
        <ul
          style={{
            textAlign: "left",
            fontSize: "12px",
            padding: "10px 10px 10px 20px",
            background: "#f9f9f9",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {popupContent.benefits.map((benefit, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              <strong>{benefit}</strong>
              <p style={{ fontSize: "12px", marginTop: "3px" }}>{popupContent.benefit_detail[index]}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={closePopup}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "#858585",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default Popup;