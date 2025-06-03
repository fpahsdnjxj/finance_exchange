import React, { useEffect, useState } from 'react';

const CookieConsentPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (agree) => {
    localStorage.setItem("cookie_consent", agree ? "true" : "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      padding: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <p style={{
        marginBottom: '15px',
        fontSize: '14px',
        color: '#333'
      }}>
        본 사이트는 사용자 경험 향상을 위해 쿠키를 사용합니다. 쿠키 수집에 동의하십니까?
      </p>
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => handleConsent(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dbdbdb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          동의함
        </button>
        <button
          onClick={() => handleConsent(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dbdbdb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          동의하지 않음
        </button>
      </div>
    </div>
  );
};

export default CookieConsentPopup;
