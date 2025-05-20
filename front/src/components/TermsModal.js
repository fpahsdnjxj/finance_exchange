import React from "react";
import '../App.css';

const clause1 = `이 약관은 환전고수(이하 "회사")가 제공하는 환율 정보 비교 서비스(이하 "서비스")의 이용과 관련하여, 이용자의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.`
const clause2 = `본 서비스는 이용자에게 은행, 카드사, 핀테크사의 환전 우대율 및 관련 정보(이하 “정보”)를 제공하는 기능만을 포함합니다.
본 서비스는 특정 금융사와의 홍보 목적 제휴 없이, 누구에게나 공정한 정보를 제공하는 것을 목표로 합니다.
본 서비스는 환전 기능, 자금 이체, 결제 대행 등의 전자금융거래 서비스를 제공하지 않습니다.`
const clause3 = `회사는 제공된 정보의 정확성 또는 최신성을 보장하지 않으며, 이용자가 정보를 참고하여 환전, 결제 등 재정 행위를 수행함으로써 발생한 손해에 대해 책임을 지지 않습니다.
정보 제공 기준은 각 금융사 또는 제3자 사이트에 따라 달라질 수 있으며, 이에 따른 불일치에 대해 회사는 책임지지 않습니다.
회사는 서비스 제공을 위한 시스템 유지보수, 기술적 장애 등으로 인해 서비스 이용이 일시적으로 중단될 수 있습니다.` 
const clause4 = `서비스에서 제공하는 콘텐츠, 데이터, UI 등은 회사에 저작권이 있으며, 무단 복제 및 사용을 금합니다.`
const clause5= `본 약관은 필요 시 개정될 수 있으며, 개정 시 홈페이지에 사전 공지합니다.`


const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>이용 약관</h2>
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
          <strong>제 1 조 (목적)</strong> 
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
          <strong>제 2 조 (서비스의 내용)</strong> 
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
          <strong>제 3 조 (면책 조항)</strong> 
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
          <strong>제 4 조 (지적재산권)</strong> 
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
          <strong>제 5 조 (개정)</strong> 
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

export default TermsModal;
