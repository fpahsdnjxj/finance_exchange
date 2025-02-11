import React, { useRef } from 'react';
import '../App.css';

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
        {popupContent.image && (
          <img
            src={popupContent.image}
            alt="카드 이미지"
            style={{ width: "30%", borderRadius: "5px", marginRight: "15px" }}
          />
        )}

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "12px", margin: 0.5 }}>{popupContent.card}</p>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>{popupContent.title}</h3>
          <p style={{ fontSize: "14px", color: "#333", margin: 1, whiteSpace: "pre-wrap" }}>
            {popupContent.description}
          </p>
        </div>
      </div>

      <div
        onClick={() => setIsExpanded([!isExpanded[0], isExpanded[1]])}
        style={{
          cursor: "pointer",
          fontSize: "13px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "10px",
        }}
      >
        {isExpanded[0] ? "▼" : "▶"} 해외 이용
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

      {isExpanded[0] && (
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
          {popupContent.features1.map((feature, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <div
        onClick={() => setIsExpanded([isExpanded[0], !isExpanded[1]])}
        style={{
          cursor: "pointer",
          fontSize: "13px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "10px",
        }}
      >
        {isExpanded[1] ? "▼" : "▶"} 해외 편의점
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

      {isExpanded[1] && (
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
          {popupContent.features2.map((feature, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {feature}
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