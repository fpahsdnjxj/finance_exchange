import React, { useState, useEffect } from 'react';
import '../App.css';
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

const currencyOptions = [
    { value: "USD", label: "미국", flag: "US" },
    { value: "EUR", label: "유럽", flag: "EU" },
    { value: "JPY", label: "일본", flag: "JP"},
    { value: "KRW", label: "한국", flag: "KR" },  
    
];
  
  
const currencySymbols = {
    USD: "$",
    EUR: "€",
    KRW: "₩",
    JPY: "¥",
};

function Exchange() {
  const [leftAmount, setLeftAmount] = useState("");     
  const [rightAmount, setRightAmount] = useState("");  
  const [leftCurrency, setLeftCurrency] = useState("KRW");
  const [rightCurrency, setRightCurrency] = useState("KRW");
  const [activeSide, setActiveSide] = useState("left");

  const currencyRates = {
    USD: 0.00069,
    EUR: 0.00066,
    JPY: 0.11,
    KRW: 1,
  };

  const convert = (amount, fromCurrency, toCurrency) => {
    if (!amount) return "";
    const amt = parseFloat(amount);
    if (isNaN(amt)) return "";
    const rateFrom = currencyRates[fromCurrency];
    const rateTo = currencyRates[toCurrency];
    const result = amt * (rateTo/rateFrom);
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

export default Exchange;