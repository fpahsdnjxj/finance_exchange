import React, { useState, useEffect } from 'react';
import './design.css';
import axios from 'axios';

const countries = [
  "미국 달러", "아랍에미리트 디르함", "호주 달러", "바레인 디나르", "브루나이 달러",
  "캐나다 달러", "스위스 프랑", "위안화", "덴마아크 크로네", "유로", "영국 파운드",
  "홍콩 달러", "인도네시아 루피아", "일본 옌", "한국 원", "쿠웨이트 디나르",
  "말레이지아 링기트", "노르웨이 크로네", "뉴질랜드 달러", "사우디 리 얄",
  "스웨덴 크로나", "싱가포르 달러", "태국 바트"
];

const banks = [
  "하나은행", "KDB산업은행", "전북은행", "한국씨티은행", "NH농협은행", "신한은행",
  "KB국민은행", "IBK기업은행", "BNK경남은행", "제주은행", "광주은행",
  "BNK부산은행", "iM뱅크", "SC제일은행", "우리은행", "Sh수협은행"
];

const airportBanks = ["하나은행", "국민은행", "우리은행", "신한은행"];

const currencies = [
  "USD", "GBP", "CNY", "JPY", "EUR", "HKD", "TWD", "VND", "THB",
  "SGD", "PHP", "IDR", "MYR", "CAD", "AUD", "NZD", "CHF"
];

const exchangeRates = {
  "미국 달러": 1441,
  // Add more exchange rates as needed
};

const CountryDropdown = ({ onCountrySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country) => {
    setSelectedCountry(country);
    onCountrySelect(country);
    setSearchTerm("");
  };

  return (
    <div style={{ width: "300px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {searchTerm && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            position: "absolute",
            width: "100%",
            zIndex: 1000,
          }}
        >
          {filteredCountries.map((country, index) => (
            <li
              key={index}
              onClick={() => handleSelect(country)}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: selectedCountry === country ? "#f0f0f0" : "white",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <p style={{ marginTop: "10px", color: "grey" }}>
          선택한 통화: <strong>{selectedCountry}</strong>
        </p>
      )}
    </div>
  );
};

const CurrencyCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [krwAmount, setKrwAmount] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("은행 일반영업점");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      setExchangeRate(exchangeRates[selectedCountry] || null);
    }
  }, [selectedCountry]);

  const handleClear = () => {
    setKrwAmount("");
  };

  const convertedAmount = (() => {
    if (!selectedCountry || !exchangeRate) return "N/A";
    if (krwAmount <= 0 || exchangeRate <= 0) return "Invalid input";
    return (parseFloat(krwAmount) / exchangeRate).toFixed(2);
  })();

  return (
    <div className='currency-calculator-container'>    
      <div className='exchange-rate-calculator'>
        <h2>기준 환율 계산기</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>국가 선택</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <CountryDropdown onCountrySelect={setSelectedCountry} />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>KRW 금액 입력</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <input
                  type="number"
                  value={krwAmount}
                  onChange={(e) => setKrwAmount(e.target.value.replace(/^0+/, ""))}
                  placeholder="원화 입력"
                  style={{ width: "100%" }}
                />
                <div className='amount-buttons'>
                <button
                  onClick={handleClear}
                >AC</button>
                </div>
                
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 결과</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                {selectedCountry ? `${krwAmount || 0} KRW → ${convertedAmount} ${selectedCountry}` : "국가를 선택하세요."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='exchange-rate-calculator'>
        <h2>은행별 환율 계산기</h2>
        <div style={{ marginBottom: "20px" }}>
          {[
            "은행 일반영업점", "인천국제공항점"
          ].map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: selectedLocation === location ? "#007BFF" : "#CCC",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {location}
            </button>
          ))}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>{selectedLocation === "은행 일반영업점" ? "은행 선택" : "공항 은행 선택"}</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="" disabled>{selectedLocation === "은행 일반영업점" ? "은행 선택" : "공항 은행 선택"}</option>
                  {(selectedLocation === "은행 일반영업점" ? banks : airportBanks).map((bank, index) => (
                    <option key={index} value={bank}>{bank}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 화폐 선택</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="" disabled>화폐 선택</option>
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 금액</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <input type="text" value={krwAmount || 0} disabled style={{ width: "100%" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
