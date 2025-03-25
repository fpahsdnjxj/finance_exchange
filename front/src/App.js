import React, { useState, useEffect } from 'react';
import './App.css';
import ReactCountryFlag from "react-country-flag";

import axios from 'axios';

import Exchange from './components/Exchange';
import AdditionalConditions from './components/AdditionalConditions';
import CountryDropdown from './components/CountryDropdown';
import Popup from './components/Popup';


import TermsModal from './components/TermsModal';
import PrivacyModal from './components/PrivacyModal';

const Banks = [
  "하나은행", "NH 농협은행", "신한은행",
  "KB국민은행", "우리은행",
];

const airportBanks = ["하나은행", "국민은행", "우리은행", "신한은행"];

const currencyOptions = [
  { value: "USD", label: "미국", flag: "US" },
  { value: "EUR", label: "유럽", flag: "EU" },
  { value: "JPY", label: "일본", flag: "JP"},
  
];

const currencySymbols = {
  USD: "$",
  EUR: "€",
  KRW: "₩",
  JPY: "¥",
};

const CurrencyCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");

  const [selectedLocation, setSelectedLocation] = useState("일반영업점");
  const [selectedBank, setSelectedBank] = useState(null);
  
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [exchangeRate, setExchangeRate]=useState(0); 
  const [finalFee, setFinalFee]=useState(0);
  const [rate, setRate]=useState(0);

  const [popupContent, setPopupContent] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); 

  const [conditions, setConditions] = useState([]);
  const [selectedBasicCondition, setSelectedBasicCondition] = useState("");
  const [detailConditions, setDetailConditions] = useState({
    amountconditions: [],
    timeconditions: [],
    otherconditions: []
  });
  const [additionalConditionsSelections, setAdditionalConditionsSelections] = useState({
    amount: [],
    time: [],
    other: []
  });

  const [cards, setCards] = useState(null);
  const [discountRate, setDiscountRate]=useState("");

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);


const openPopup = (card) => {
  setPopupContent(card);
  setIsExpanded(false);
};

const closePopup = () => {
  setPopupContent(null);
  setIsExpanded(false);
};

useEffect(()=>{
  if (!selectedCurrency) return;
  axios
    .get(`/api/currency/base-rate?currency_code=${selectedCurrency}`) 
    .then((response) => {
      setExchangeRate(response.data.P_per_Won)
    })
    .catch((error) => {
      console.error("기본 환율을 불러오는 중 오류 발생:", error);
    });
}, [selectedCurrency])

  useEffect(() => {
    if (!selectedBank || !selectedCurrency) return;
    axios
      .get(`/api/bank/bank-conditions?bank_name=${selectedBank}&currency_code=${selectedCurrency}`)
      .then((response) => {
        setConditions(response.data.conditions);
      })
      .catch((error) => {
        console.error("조건을 불러오는 중 오류 발생:", error);
      });
  }, [selectedBank, selectedCurrency]);


const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
    setConditions([]);
    setSelectedBasicCondition("");
  };

    // 기본 조건을 바탕으로 세부 조건 백엔드에 요청하는 useEffect 부분입니다!
useEffect(() => {
  if (selectedBasicCondition.length > 0) {
    axios.get(`/api/bank/additional-conditions?default_condition=${encodeURIComponent(selectedBasicCondition)}`)
        .then((response) => {
          setDetailConditions(response.data);
        })
        .catch((error) => {
          console.error("세부 조건을 불러오는 중 오류 발생:", error);
          setDetailConditions({ amountconditions: [], timeconditions: [], otherconditions: [] });
    })
  } else {
    setDetailConditions({ amountconditions: [], timeconditions: [], otherconditions: [] });
  }
}, [selectedBasicCondition]);    

  


useEffect(() =>{
  const currency = currencyOptions.find(option => option.flag === selectedCountry);
  if(!currency) return;
  const currency_code=currency.value;
  const fetchCards = async () => {
    try {
      const response = await axios.get(`/api/card/default-card-info?currency_code=${currency_code}`); 
      setCards(response.data); 
    } catch (error) {
      console.error("카드 정보를 불러오는 중 오류 발생:", error);
    }
  };

  fetchCards();
}, [selectedCountry]);

const calculate_final_fee = () => {
  const numericExchangeAmount = parseFloat(exchangeAmount);
  const numericExchangeRate = parseFloat(exchangeRate);
  const numericDiscountRate = parseFloat(discountRate);

  if (isNaN(numericExchangeAmount) || numericExchangeAmount <= 0) return;
  if (isNaN(numericExchangeRate) || numericExchangeRate <= 0) return;
  if (isNaN(numericDiscountRate) || numericDiscountRate < 0) return;

  const discountedRate = numericExchangeRate * ((100 - numericDiscountRate) / 100);
  const final_fee = numericExchangeAmount / discountedRate;

  setFinalFee(final_fee.toFixed(2));
  setRate(discountedRate.toFixed(2));
};

useEffect(() => {
  if (!isNaN(parseFloat(exchangeAmount)) && discountRate !== null && exchangeRate !== 0) {
    calculate_final_fee();
  }
}, [exchangeAmount, discountRate, exchangeRate]);



// 선택된 값들 back으로 보내는 부분입니다!
useEffect(() => {
  if (!selectedBank || !selectedCurrency) return;

  const encodedBankname = encodeURIComponent(selectedBank);

  const fetchExchangefeerate = async () => { 
    try {
      let url = `/api/bank/bank-exchange-fee?bank_name=${encodedBankname}&currency_code=${selectedCurrency}`;

      if (selectedBasicCondition !== "") {
        url += `&condition_type=${encodeURIComponent(selectedBasicCondition)}`;
      }
      if(additionalConditionsSelections.amount.length===0){
        additionalConditionsSelections.amount.push("default")
      }
      if(additionalConditionsSelections.time.length===0){
        additionalConditionsSelections.time.push("default")
      }
      if(additionalConditionsSelections.other.length===0){
        additionalConditionsSelections.other.push("default")
      }
      const flatAdditional = [
        ...additionalConditionsSelections.amount,
        ...additionalConditionsSelections.time,
        ...additionalConditionsSelections.other,
      ];
      if (flatAdditional.length > 0) {
        url += `&additional_conditions=${encodeURIComponent(flatAdditional.join(","))}`;
      } 
      const response = await axios.get(url);
      setDiscountRate(response.data.final_fee_rate);
    } catch (error) {
      console.error("은행 수수료 정보를 불러오는 중 오류 발생:", error);
    }
  };
  fetchExchangefeerate();
}, [selectedBank, selectedCurrency, selectedBasicCondition, additionalConditionsSelections]);


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


  const formatKRW = (amount) => {
    const number = parseInt(amount, 10);
    if (isNaN(number) || number === 0) return "0";
  
    const cho = Math.floor(number / 1000000000000);
    const remainder1 = number % 1000000000000;
    const uk = Math.floor(remainder1 / 100000000);
    const remainder2 = remainder1 % 100000000;
    const man = Math.floor(remainder2 / 10000);
    const remainder3 = remainder2 % 10000;
    const chun = Math.floor(remainder3 / 1000);
    const rest = remainder3 % 1000;
  
    let result = "";
    if (cho > 0) result += `${cho}조 `;
    if (uk > 0) result += `${uk}억 `;
    if (man > 0) result += `${man}만 `;
    if (chun > 0) result += `${chun}천 `;
    if (rest > 0 || (man === 0 && chun === 0)) result += `${rest}`;
    return result.trim();
  };

  const RealTimeClock = () => {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
  
      return `ⓘ ${year}.${month}.${day} ${hours}:${minutes} 기준`;
    };
  
    return (
      <div style={{ fontSize: "11px", fontWeight: "100", textAlign: "left", paddingLeft: "80px", color: "#444" }}>
        {formatTime(time)}
      </div>
    );
  };  

  const handleAdditionalConditionsChange = (type, selected) => {
    setAdditionalConditionsSelections((prev) => ({
      ...prev,
      [type]: selected
    }));
    console.log(additionalConditionsSelections)
  };

  // 추가 데이터
  const noticeData = [
    "여행자 보험의 경우\n미화기준 300$ 상당액 이상 환전시 가입 가능합니다.",
    "여행자 보험의 경우\n미화기준 300$ 상당액 이상 환전시 가입 가능합니다.",
    "여행자 보험의 경우\n미화기준 300$ 상당액 이상 환전시 가입 가능합니다.",
    "여행자 보험의 경우\n미화기준 300$ 상당액 이상 환전시 가입 가능합니다.",
  ];

  return (
    <div className='container'>
      <div className='top-container exchange-rate-calculator'>
        <h2>기준 환율 계산기</h2>
        <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    ></div>
    <div>{RealTimeClock()}</div>
      <div style={{ marginTop: "-25px", marginBottom: "-15px"}}>{Exchange()}</div>
      <div style={{ fontSize: "11px", fontFamily: "sans-serif", textAlign: 'center', color: "#555" }}>기준 환율 계산기는 단순 참고용으로 위 계산 결과는 우대율에 따른 환 차이는 고려되지 않았습니다.</div>
      </div>
    <div className='bottom-container'>
        <div className='left-box exchange-rate-calculator'>
          <h2>은행별 환율 계산기</h2>
          <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    ></div>
          <div style={{ marginBottom: "20px" }}>
            {[
              "일반영업점", "인천공항점"
            ].map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: selectedLocation === location ? "#c4c4c4" : "#ededed",
                  color: "black",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: 13
                }}
              >
                {location}
              </button>
            ))}
          </div>

          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td className="under-t">{selectedLocation === "일반영업점" ? "은행" : "공항 은행"}</td>
                <td style={{ borderRight: "none" }}>
                  <select
                    value={selectedBank}
                    onChange={handleBankChange}
                    style={{ fontSize: 12 }}
                  >
                    <option value="" disabled selected>
                      {selectedLocation === "일반영업점" ? "은행 선택" : "공항 은행 선택"}
                    </option>
                    {(selectedLocation === "일반영업점" ? Banks : airportBanks).map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="under-t">환전 화폐</td>
                <td style={{ borderRight: "none" }}>
                  <select 
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    style={{ fontSize: 12 }}
                  >
                    <option value="" disabled>화폐 선택</option>
                    {currencyOptions.map((currency, index) => (
                      <option key={index} value={currency.value}>
                        {currency.label} ({currency.value})
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="under-t">조건 선택</td>
                <td style={{ borderRight: "none" }}>
                  <select
                    value={selectedBasicCondition}
                    onChange={(e) => setSelectedBasicCondition(e.target.value)}
                    style={{ fontSize: 12 }}
                  >
                    <option value="" disabled>
                      조건 선택
                    </option>
                    {conditions.map((cond, index) => (
                      <option key={index} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              {selectedBasicCondition !== "" &&
                (detailConditions.amountconditions.length > 0 ||
                  detailConditions.timeconditions.length > 0 ||
                  detailConditions.otherconditions.length > 0) && (
                  <AdditionalConditions
                    selectedCondition={detailConditions}
                    onAdditionalConditionsChange={handleAdditionalConditionsChange}
                  />
                )
              }
              <tr>
                <td className="under-t">환전 금액</td>
                <td style={{ borderRight: "none" }}>
                  <div className="input-bank">
                    <input
                      type="text"
                      value={exchangeAmount}
                      onChange={(e) => setExchangeAmount(e.target.value)}
                      style={{ width: "90%" }}
                      placeholder="환전할 원화를 입력하세요"
                    />
                    <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "5px", marginRight: "45px", textAlign: 'right' }}>
                      {formatKRW(exchangeAmount)}원
                    </div>
                  </div>
                </td>
              </tr> 
              <tr>
                <td className="under-t">최대 우대 적용 금액</td>
                <td style={{ borderRight: "none" }}>
                  <div
                    className="input-bankch"
                    data-currency-symbol={currencySymbols[selectedCurrency]}                 
                  >
                    <input type="text" value={finalFee || 0} disabled style={{ width: "90%" }} /> 
                  </div>
                </td>
              </tr>
              <tr>
                <td className="under-t">최대 우대율</td>
                <td style={{ borderRight: "none" }}>
                  <div
                  className='input-rate'>
                    <input type="text" value={rate || 0} disabled style={{ width: "90%" }} /> 
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="box">

      <div className="notice-box"> 
        <h2 className="notice-title">
          Notice for <span>{selectedBank}</span>
        </h2>

        {noticeData.map((notice, index) => (
          <div key={index} className="notice-item">
            {notice.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>

        </div>

        <div className='right-box exchange-rate-calculator'>
          <h2>카드별 환율 계산기</h2>
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
          <div
            style={{
            display: "flex",
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflow: "visible",
            width: "100%",
            margin: "0 auto",
            height: "40px",
          }}
          >
          <div
            style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontSize: 14,
          }}
          >
          기준 국가
          </div>

            <div
              style={{
              display: "flex",
              alignItems: "center",
              borderLeft: "1px solid #ccc",
              paddingLeft: "20px",
              marginLeft: "0px",
              flex: 1, 
              }}
              >
              <ReactCountryFlag
                countryCode={selectedCountry}
                svg
                style={{ width: 20, height: 15, marginRight: "10px" }}
              />
              <CountryDropdown
                selectedCountry={selectedCountry}
                onCountrySelect={setSelectedCountry}                
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <table className="card-table">
  <thead>
    <tr>
      <th style={{borderTopLeftRadius: '20px',}}></th>
      <th>카드명(카드사)</th>
      <th>조건 및 혜택</th>
      <th style={{borderTopRightRadius: '20px',}}>환전 금액</th>
    </tr>
  </thead>
  <tbody>
  {cards && cards.card_infos && cards.card_infos.length > 0 && cards.card_infos.map((card, index) => (
            <tr key={index}>
              <td>
                <img src={getImagePath(card.card_name)} alt={card.card_name} className="card-image"/>
              </td>

              <td
                className="benefits-cell"
                onClick={() => openPopup(card)}>{card.card_name}
              </td>

              <td style={{ textAlign: "left" }}>
  <div style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
    {Array.isArray(card.benefits)
      ? card.benefits.map((benefit, index) => (
          <div key={index}>• {benefit}</div>
        ))
      : ""}
  </div>
</td>
              <td className='fixed'>
                <span style={{fontSize: 12}}>
                  {(!(formatKRW(exchangeAmount)) || (formatKRW(exchangeAmount)) === "")
                    ? "0"
                    : (formatKRW(exchangeAmount)).length > 10
                    ? (formatKRW(exchangeAmount)).substring(0, 10) + "..."
                    : (formatKRW(exchangeAmount))}
                원</span>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupContent && (
      <Popup 
      popupContent={popupContent} 
      closePopup={closePopup} 
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded} 
      />
      )}
        </div>
      </div>
      
      
      <footer className='footer'>
      <span onClick={() => setIsTermsOpen(true)} className='footer-link'>
        이용약관
      </span>

      <span className='footer-divider'>|</span>

      <strong onClick={() => setIsPrivacyOpen(true)} className='footer-link'>
        개인정보처리방침
      </strong>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
    <div className="top-bar">
    <img
            src={`/assets/topicon.png`}
            alt="아이콘"
            style={{ width: "100px", borderRadius: "5px", marginRight: "15px" }}
          />
    </div>     

      
      
      </div>
  );
};

export default CurrencyCalculator;
