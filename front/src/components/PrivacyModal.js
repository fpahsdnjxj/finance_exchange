import React from "react";
import '../App.css';

const clause1 = `회사는 원칙적으로 개인정보를 수집하지 않습니다.
다만, 다음의 정보는 자동으로 수집될 수 있습니다:
IP 주소, 브라우저 정보, 접속 시간, 쿠키 등 비식별 정보`
const clause2 = `수집된 정보는 다음의 목적에 한하여 사용됩니다:
서비스 개선 및 통계 분석
비정상 접속 시 보안 대응`
const clause3 = `회사는 웹사이트의 사용자 환경 개선을 위해 쿠키를 사용할 수 있습니다.
이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.`
const clause4 = `수집된 정보는 서비스 운영 목적 이외에는 사용되지 않으며, 일정 기간 경과 후 자동 파기됩니다.
회사는 개인정보보호법에 따라 필요한 조치를 이행합니다.`
const clause5 = `이용자는 본인의 정보에 대해 열람, 정정, 삭제를 요청할 수 있으며, 아래 메일로 문의하실 수 있습니다:
📧 exchangegosu@googlegroups.com`

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button onClick={onClose} className="close-button">X</button>
        <h2>개인정보처리방침</h2>
        <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "2px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
          <strong>제 1 조 (수집하는 개인정보 항목)</strong> 
        <p>
          {clause1.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
          <strong>제 2 조 (개인정보 수집 목적))</strong> 
        <p>
          {clause2.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
          <strong>제 3 조 (쿠키의 사용 및 거부)</strong> 
        <p>
          {clause3.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
          <strong>제 4 조 (개인정보의 보관 및 파기)</strong> 
        <p>
          {clause4.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
          <strong>제 5 조 (이용자 권리 및 문의처)</strong> 
        <p>
          {clause5.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div
            style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 0 20px",
            }}
          >   
          </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
