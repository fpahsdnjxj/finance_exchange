import React from "react";
import '../App.css';

const clause2 = `① 이 약관에서 사용하는 용어의 의미는 다음과 같습니다.
1. "서비스"라 함은 유 · 무선으로, 접근 기기(PC, 휴대폰, 태블릿 등을 의미하며, 이에 한정되지 아니하고 향후 개발되는 콘텐츠 등 정보 접근의 도구로 사용되는 여하한 형태의 하드웨어, 기기 등의유형물이 포함되며, 이하 동일)의 종류를 불문하고 콘텐츠 등 정보와 네이버파이낸셜 및 네이버 주식회사(이하 "네이버") 등 그 계열사의 프로그램 등 소프트웨어(플랫폼, 앱 등이 이에 해당됨)를 통해 콘텐츠 제공, 정보 검색, 게시판 등 커뮤니티 등 다양한 서비스가 이용자에게 제공되는 것을 말합니다.
2. "이용자"라 함은 네이버파이낸셜이 제공하는 서비스를 이용하는 회원과 비회원을 말합니다.
3. "회원"이라 함은 네이버 이용약관에 따라 네이버에 가입한 이용자로서 이 약관에 동의하고 네이버파이낸셜 서비스를 이용하는 자를 말합니다.
4. "게시물"이라 함은 "회원"이 서비스를 이용함에 있어 서비스에 게시한 부호, 문자, 이미지, 음성, 음향, 화상, 동영상, 링크 등의 정보 형태의 글, 그림, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다. ② 이 약관에서 사용하는 용어 중 본 조`


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
          <strong>제 2 조 (용어의 정의)</strong> 
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
          <strong>제 2 조 (용어의 정의)</strong> 
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
          <strong>제 2 조 (용어의 정의)</strong> 
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
          <strong>제 2 조 (용어의 정의)</strong> 
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
          <strong>제 2 조 (용어의 정의)</strong> 
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
          <strong>제 2 조 (용어의 정의)</strong> 
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
          
        <strong>제 2 조 (용어의 정의)</strong> 
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
      </div>
    </div>
  );
};

export default PrivacyModal;
