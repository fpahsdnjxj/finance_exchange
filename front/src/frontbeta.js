import React, { useState, useEffect } from 'react';
import axios from 'axios'
// 이름 목록
const countries = ["미국 달러","아랍에미리트 디르함", "호주 달러", "바레인 디나르", "브루나이 달러", "캐나다 달러", "스위스 프랑", "위안화", "덴마아크 크로네", "유로", "영국 파운드", "홍콩 달러", "인도네시아 루피아", "일본 옌", "한국 원", "쿠웨이트 디나르", "말레이지아 링기트", "노르웨이 크로네", "뉴질랜드 달러", "사우디 리 얄", "스웨덴 크로나", "싱가포르 달러", "태국 바트"];
const banks = ["하나은행", "KDB산업은행", "전북은행", "한국씨티은행", "NH농협은행", "신한은행", "KB국민은행", "IBK기업은행", "BNK경남은행", "제주은행", "광주은행", "BNK부산은행", "iM뱅크", "SC제일은행", "우리은행", "Sh수협은행"];
const airportBanks = ["하나은행", "국민은행", "우리은행", "신한은행"];
const currencies = ["USD", "GBP", "CNY", "JPY", "EUR", "HKD", "TWD", "VND", "THB", "SGD", "PHP", "IDR", "MYR", "CAD", "AUD", "NZD", "CHF"];
const exchangeRates = {
  "미국 달러": 1441
}; // 저기 있는 나라 이름에 맞춰서 환율 추가해주시면 됩니다.



function CurrencyCalculator() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [krwAmount, setKrwAmount] = useState(0);  
  const [selectedLocation, setSelectedLocation] = useState("은행 일반영업점");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  // KRW 입력 값을 설정하는 함수
  const handleKrwInput = (value) => {
    setKrwAmount((prev) => Number(prev || 0) + value);
  };

  // 지우기 버튼
  const handleClear = () => {
    setKrwAmount("");    
  };

  const convertedAmount = selectedCountry&&exchangeRate
  ? (Number(krwAmount)/ exchangeRate).toFixed(2)
  : "N/A";//나라가 바뀌면서 적용된 exchangeRate를 적용합니다.

  /*const getBasicCurrency=async()=>{
    try{
    const response=await axios.get(`/api/base-rate`,{
      params:{
        country_name:selectedCountry//나라 이름을 보내주시면 됩니다.
      }  
    });
    const currency_data=response.data
    console.log(currency_data)
    setExchangeRate(currency_data.P_per_Won)
  }catch(error){
    console.error("Error fetching basic currency:", error)
    throw error;
  }
  }*/

  useEffect(() => {
    if (selectedCountry) {
      setExchangeRate(exchangeRates[selectedCountry])
      /*getBasicCurrency()*/
    }
  }, [selectedCountry]);//선택한 나라가 바뀌면 환율을 설정합니다.

  return (
    <div>
      <h1>환율 계산기</h1>

      {/* 기준 환율 계산기 part */}
      <div>
      <h2>기준 환율 계산기</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
        <tbody>
          {/* 국가 선택 */}
          <tr>
            <td style={{ padding: "10px", border: "1px solid black" }}>국가 선택</td>
            <td style={{ padding: "10px", border: "1px solid black" }}>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="" disabled>
                  국가 선택
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {/* KRW 금액 입력 */}
          <tr>
            <td style={{ padding: "10px", border: "1px solid black" }}>KRW 금액 입력</td>
            <td style={{ padding: "10px", border: "1px solid black" }}>
              <input
                type="number"
                value={krwAmount}
                onChange={(e) => setKrwAmount(e.target.value)}
                placeholder="원화 입력"
                style={{ width: "100%" }}
              />
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleKrwInput(100000000)}>억</button>
                <button onClick={() => handleKrwInput(10000000)}>천만</button>
                <button onClick={() => handleKrwInput(1000000)}>백만</button>
                <button onClick={() => handleKrwInput(100000)}>십만</button>
                <button onClick={() => handleKrwInput(10000)}>만</button>
                <button onClick={() => handleKrwInput(1000)}>천</button>
                <button onClick={handleClear}>AC</button>
              </div>
            </td>
          </tr>

          {/* 환전 결과 */}
          <tr>
            <td style={{ padding: "10px", border: "1px solid black" }}>환전 결과</td>
            <td style={{ padding: "10px", border: "1px solid black" }}>
              {selectedCountry ? (
                <span>
                  {krwAmount} KRW → {convertedAmount} {selectedCountry}
                </span>
              ) : (
                <span>국가를 선택하세요.</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      {/* 은행별 환율 계산기 part */}
      <div>
      <h2>은행별 환율 계산기</h2>

      {/* 은행 전환환 */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setSelectedLocation("은행 일반영업점")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: selectedLocation === "은행 일반영업점" ? "#007BFF" : "#CCC",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          은행 일반영업점
        </button>
        <button
          onClick={() => setSelectedLocation("인천국제공항점")}
          style={{
            padding: "10px 20px",
            backgroundColor: selectedLocation === "인천국제공항점" ? "#007BFF" : "#CCC",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          인천국제공항점
        </button>
      </div>
      
      {selectedLocation === "은행 일반영업점" ? (
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <tbody>
            {/* 은행 선택 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>은행 선택</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="" disabled>
                    은행 선택
                  </option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* 환전 화폐 선택 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 화폐 선택</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="" disabled>
                    화폐 선택
                  </option>
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* 환전 금액 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 금액</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <input
                  type="text"
                  value={krwAmount}
                  disabled
                  style={{ width: "100%" }}
                />
              </td>
            </tr>

            {/* 최대 우대 적용 환율 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>최대 우대 적용 환율</td>
              <td style={{ padding: "10px", border: "1px solid black" }} />
            </tr>
          </tbody>
        </table>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <tbody>
            {/* 공항 은행 선택 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>공항 은행 선택</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="" disabled>
                    공항 은행 선택
                  </option>
                  {airportBanks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* 환전 화폐 선택 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 화폐 선택</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <option value="" disabled>
                    화폐 선택
                  </option>
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* 환전 금액 */}
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>환전 금액</td>
              <td style={{ padding: "10px", border: "1px solid black" }}>
                <input
                  type="text"
                  value={krwAmount}
                  disabled
                  style={{ width: "100%" }}
                />
              </td>
            </tr>

            {/* 최대 우대 적용 환율 -> 이 부분은 아직 논의가 안 된 부분이라 비워뒀습니다. */} 
            <tr>
              <td style={{ padding: "10px", border: "1px solid black" }}>최대 우대 적용 환율</td>
              <td style={{ padding: "10px", border: "1px solid black" }} />
            </tr>
          </tbody>
        </table>
      )}
    </div>
  </div>
  );
}

export default CurrencyCalculator;
