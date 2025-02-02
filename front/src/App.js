import React, { useState, useEffect } from 'react';
import './App.css';
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import axios from 'axios';

const countries = [
  "미국 달러", "아랍에미리트 디르함", "호주 달러", "바레인 디나르", "브루나이 달러",
  "캐나다 달러", "스위스 프랑", "위안화", "덴마아크 크로네", "유로", "영국 파운드",
  "홍콩 달러", "인도네시아 루피아", "일본 옌", "한국 원", "쿠웨이트 디나르",
  "말레이지아 링기트", "노르웨이 크로네", "뉴질랜드 달러", "사우디 리 얄",
  "스웨덴 크로나", "싱가포르 달러", "태국 바트"
];

const Banks = [
  "하나은행", "KDB산업은행", "전북은행", "한국씨티은행", "NH농협은행", "신한은행",
  "KB국민은행", "IBK기업은행", "BNK경남은행", "제주은행", "광주은행",
  "BNK부산은행", "iM뱅크", "SC제일은행", "우리은행", "Sh수협은행"
];

const airportBanks = ["하나은행", "국민은행", "우리은행", "신한은행"];

const currencies = [
  "USD", "GBP", "CNY", "JPY", "EUR", "HKD", "TWD", "VND", "THB",
  "SGD", "PHP", "IDR", "MYR", "CAD", "AUD", "NZD", "CHF"
];

const currencyOptions = [
  { value: "USD", label: "미국", flag: "US" },
  { value: "EUR", label: "유럽", flag: "EU" },
  { value: "JAP", label: "일본", flag: "JP"},
  { value: "KRW", label: "한국", flag: "KR" },
  

];

const currencyRates = {
  USD: 0.00069,
  EUR: 0.00066,
  KRW: 1,
  JAP: 0.11
};

const CountryDropdown = ({ onCountrySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCountries = countries.filter((country) =>
    country.includes(searchTerm)
  );

  const handleSelect = (country) => {
    setSelectedCountry(country);
    onCountrySelect(country);
    setSearchTerm(country);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ width: "300px", margin: "20px auto", fontFamily: "Arial, sans-serif", position: "relative" }}>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        style={{
          fontSize: 11,
          width: "100%",
          overflow: "hidden",          
          whiteSpace: "nowrap"         
        }}
      />
      {isDropdownOpen &&searchTerm && (
        <ul
          style={{
            fontSize: 11,
            listStyleType: "none",
            padding: 0,
            margin: 0,
            maxHeight: "140px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            position: "absolute",
            textAlign: 'left',
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
    </div>
  );
};




const DropdownAdd = () => {
  const [selectedConditionsList, setSelectedConditionsList] = useState([""]);
  const conditions = [
    "A 카드 발급",
    "B 계좌 개설",
    "우대율 조건 C",
    "우대율 조건 D",
  ]; // 임시 조건 목록

 
  const handleDropdownChange = (index, value) => {
    const newSelectedConditions = [...selectedConditionsList];
    newSelectedConditions[index] = value;
    setSelectedConditionsList(newSelectedConditions);
  };

 
  const handleAddDropdown = () => {
    if (selectedConditionsList.includes("")) return;
    setSelectedConditionsList([...selectedConditionsList, ""]);
  };


  const handleRemoveDropdown = (index) => {
    if (selectedConditionsList.length > 1) {
      const newSelectedConditions = selectedConditionsList.filter(
        (_, idx) => idx !== index
      );
      setSelectedConditionsList(newSelectedConditions);
    }
  };

  return (
    <div>
      {selectedConditionsList.map((selectedCondition, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            maxWidth: "600px",
          }}
        >
          <select
            value={selectedCondition}
            onChange={(e) => handleDropdownChange(index, e.target.value)}
            style={{
              flex: 1,
              fontSize: 12,
              padding: "4px",
            }}
          >
            <option value="" disabled>
              조건 선택
            </option>
            {conditions.map((condition, idx) => (
              <option key={idx} value={condition}>
                {condition}
              </option>
            ))}
          </select>
          
          {selectedConditionsList.length > 1 && (
            <button
              onClick={() => handleRemoveDropdown(index)}
              style={{
                marginLeft: "5px",
                padding: "5px 10px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                cursor: "pointer",               
                fontSize: "0.8rem"
              }}
            >
              x
            </button>
          )}
        </div>
      ))}

      <button
        onClick={handleAddDropdown}
        style={{
          width: "100%",
          padding: "5px",
          backgroundColor: "#4d4d4d",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        ＋
      </button>
    </div>
  );
};


function Exchange() {

  const currencyOptions = [
    { value: "USD", label: "미국", flag: "US" },
    { value: "EUR", label: "유럽", flag: "EU" },
    { value: "KRW", label: "한국", flag: "KR" },
    { value: "JAP", label: "일본", flag: "JP" },
  ];

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    KRW: "₩",
    JAP: "¥",
  };

  const [leftAmount, setLeftAmount] = useState("");     
  const [rightAmount, setRightAmount] = useState("");  
  const [leftCurrency, setLeftCurrency] = useState("KRW");
  const [rightCurrency, setRightCurrency] = useState("KRW");
  const [activeSide, setActiveSide] = useState("left");

  const convert = (amount, fromCurrency, toCurrency) => {
    if (!amount) return "";
    const amt = parseFloat(amount);
    if (isNaN(amt)) return "";
    const rateFrom = currencyRates[fromCurrency];
    const rateTo = currencyRates[toCurrency];
    const result = amt * (rateFrom / rateTo);
    return result.toFixed(2);
  };

  useEffect(() => {
    if (activeSide === "left") {
      const converted = convert(leftAmount, leftCurrency, rightCurrency);
      setRightAmount(converted);
    }
  }, [leftAmount, leftCurrency, rightCurrency]);

  useEffect(() => {
    if (activeSide === "right") {
      const converted = convert(rightAmount, rightCurrency, leftCurrency);
      setLeftAmount(converted);
    }
  }, [rightAmount, rightCurrency, leftCurrency]);

  const handleLeftChange = (e) => {
    setActiveSide("left");
    setLeftAmount(e.target.value.replace(/^0+/, ""));
  };

  const handleRightChange = (e) => {
    setActiveSide("right");
    setRightAmount(e.target.value.replace(/^0+/, ""));
  };

  const handleLeftSelectChange = (selectedOption) => {
    setLeftCurrency(selectedOption.value);
  };

  const handleRightSelectChange = (selectedOption) => {
    setRightCurrency(selectedOption.value);
  };

  const handleLeftAddAmount = (addValue) => {
    setActiveSide("left");
    const current = parseFloat(leftAmount) || 0;
    const newAmount = current + addValue;
    setLeftAmount(newAmount.toString());
  };

  const handleRightAddAmount = (addValue) => {
    setActiveSide("right");
    const current = parseFloat(rightAmount) || 0;
    const newAmount = current + addValue;
    setRightAmount(newAmount.toString());
  };

  const handleLeftClear = () => {
    setActiveSide("left");
    setLeftAmount("");
  };

  const handleRightClear = () => {
    setActiveSide("right");
    setRightAmount("");
  };

  const formatOptionLabel = (option, { context }) => {
    if (context === "menu") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ReactCountryFlag
            countryCode={option.flag}
            svg
            style={{ width: "24px", height: "24px", marginRight: "8px" }}
            title={option.label}
          />
          <span>{option.label}</span>
        </div>
      );
    } else {
      return (
        <ReactCountryFlag
          countryCode={option.flag}
          svg
          style={{ width: "24px", height: "24px" }}
          title={option.label}
        />
      );
    }
  };

  const selectStyles = {
    container: (provided) => ({
      ...provided,
      width: "20%",
    }),
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      border: "none",
      boxShadow: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div style={{ padding: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>        
            <td style={{ width: "48%", verticalAlign: "top", border: "none" }}>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  overflow: "visible",
                  width: "100%",
                  height: "40px",
                }}
              >
                <Select
                  value={currencyOptions.find(
                    (opt) => opt.value === leftCurrency
                  )}
                  onChange={handleLeftSelectChange}
                  options={currencyOptions}
                  formatOptionLabel={formatOptionLabel}
                  styles={selectStyles}
                  isSearchable={false}
                  menuPortalTarget={document.body}
                />
                <div
                  className="input-with-currency"
                  data-currency-symbol={currencySymbols[leftCurrency]}
                  style={{ flex: 1 }}                 
                >
                  <input
                    type="number"
                    value={leftAmount}
                    onChange={handleLeftChange}
                    placeholder={`${leftCurrency} 금액 입력`}
                    style={{
                      width: "100%",
                      fontSize: 14,
                      border: "none",
                      height: "40px",
                      padding: "0 40px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <div className="amount-buttons" style={{ marginTop: "8px" }}>
                <button onClick={() => handleLeftAddAmount(1000000000000)}>
                  조
                </button>
                <button onClick={() => handleLeftAddAmount(100000000)}>
                  억
                </button>
                <button onClick={() => handleLeftAddAmount(10000000)}>
                  천만
                </button>
                <button onClick={() => handleLeftAddAmount(1000000)}>
                  백만
                </button>
                <button onClick={() => handleLeftAddAmount(100000)}>
                  십만
                </button>
                <button onClick={() => handleLeftAddAmount(10000)}>
                  만
                </button>
                <button onClick={() => handleLeftAddAmount(1000)}>천</button>
                <button onClick={handleLeftClear}>AC</button>
              </div>
            </td>

            <td
              style={{ width: "4%", textAlign: "center", border: "none" }}
            >
              <div style={{ fontSize: 35 }}>=</div>
            </td>

            <td style={{ width: "48%", verticalAlign: "top", border: "none" }}>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  overflow: "visible",
                  width: "100%",
                  height: "40px",
                }}
              >
                <Select
                  value={currencyOptions.find(
                    (opt) => opt.value === rightCurrency
                  )}
                  onChange={handleRightSelectChange}
                  options={currencyOptions}
                  formatOptionLabel={formatOptionLabel}
                  styles={selectStyles}
                  isSearchable={false}
                  menuPortalTarget={document.body}
                />
                 <div
                  className="input-with-currency"
                  data-currency-symbol={currencySymbols[rightCurrency]}
                  style={{ flex: 1 }}                 
                >
                  <input
                    type="number"
                    value={rightAmount}
                    onChange={handleRightChange}
                    placeholder={`${rightCurrency} 금액 입력`}
                    style={{
                      width: "100%",
                      fontSize: 14,
                      border: "none",
                      height: "40px",
                      padding: "0 40px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <div className="amount-buttons" style={{ marginTop: "8px" }}>
                <button onClick={() => handleRightAddAmount(1000000000000)}>
                  조
                </button>
                <button onClick={() => handleRightAddAmount(100000000)}>
                  억
                </button>
                <button onClick={() => handleRightAddAmount(10000000)}>
                  천만
                </button>
                <button onClick={() => handleRightAddAmount(1000000)}>
                  백만
                </button>
                <button onClick={() => handleRightAddAmount(100000)}>
                  십만
                </button>
                <button onClick={() => handleRightAddAmount(10000)}>
                  만
                </button>
                <button onClick={() => handleRightAddAmount(1000)}>
                  천
                </button>
                <button onClick={handleRightClear}>AC</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const CurrencyCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("일반영업점");
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  return (
    <div className='container'>
      <div className='top-box exchange-rate-calculator'>
        <h2>기준 환율 계산기</h2>
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
      {Exchange()}
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
    >   
    </div>
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

          <table>
            <tbody>
              <tr>
                <td className="under">{selectedLocation === "일반영업점" ? "은행(복수 선택)" : "공항 은행(복수 선택)"}</td>
                <td style={{borderRight: "none"}}>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    style={{ fontSize: 12 }}
                  >
                    <option value="" disabled>{selectedLocation === "일반영업점" ? "은행(복수 선택)" : "공항 은행(복수 선택)"}</option>
                    {(selectedLocation === "일반영업점" ? Banks : airportBanks).map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="under">조건 선택</td>
                <td style={{borderRight: "none"}}>
                  <DropdownAdd />
                </td>
              </tr>
              <tr>
                <td className="under">환전 화폐</td>
                <td style={{borderRight: "none"}}>
                  <select 
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    style={{ fontSize: 12 }}
                  >
                    <option value="" disabled>화폐 선택</option>
                    {currencies.map((currency, index) => (
                      <option key={index} value={currency}>{currency}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="under">환전 금액</td>
                <td style={{borderRight: "none"}}>
                <div className='input-bank'><input type="text"   style={{ width: "90%" }} />
                </div></td>
              </tr>
              <tr>
                <td className="under">최대 우대 적용 환율</td>
                <td style={{borderRight: "none"}}>
                  <div className='input-bank'><input type="text" value={2 * 2 || 0} disabled style={{ width: "90%" }} />
                </div></td>
              </tr>
            </tbody>
          </table>
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
       <div><CountryDropdown onCountrySelect={setSelectedCountry} /></div>       
        </div>
      </div></div>
  );
};

export default CurrencyCalculator;
