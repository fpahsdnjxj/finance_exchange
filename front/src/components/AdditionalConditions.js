import React from "react";
import DropdownAdd from "./DropdownAdd";

const AdditionalConditions = ({ selectedCondition }) => {
  if (!selectedCondition) return null;

  const { amountconditions = [], timeconditions = [], otherconditions = [] } = selectedCondition;

  const hasAdditional =
    amountconditions.length > 0 ||
    timeconditions.length > 0 ||
    otherconditions.length > 0;

  if (!hasAdditional) return null;

  return (
    <tr>
      <td className="under-t">추가 조건</td>
      <td style={{ borderRight: "none" }}>
        {amountconditions.length > 0 && (
          <div style={{ marginBottom: "8px", textAlign: 'left' }}>
            <div style={{ 
              fontSize: 12,
              marginBottom: "13px",
              position: "relative",
              display: "inline-block",
              paddingBottom: "4px",
              fontWeight: "bolder",
              color: "#636363",
            }}>
            조건 적용 기준 금액
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              borderBottom: "3px solid rgba(9, 9, 9, 0.31)", 
              transform: "translateY(-1px)"
            }} />
            </div>
            <DropdownAdd
              conditions={amountconditions}
              onConditionsChange={(selected) =>
                console.log("조건 적용 기준 금액:", selected)
              }
            />
          </div>
        )}
        <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0",
      }}
    ></div>
        {timeconditions.length > 0 && (
          <div style={{ marginBottom: "8px", textAlign: 'left' }}>
             <div style={{ 
              fontSize: 12,
              marginBottom: "13px",
              position: "relative",
              display: "inline-block",
              paddingBottom: "4px",
              fontWeight: "bolder",
              color: "#636363",
            }}>
            시간에 따른 조건
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              borderBottom: "3px solid rgba(9, 9, 9, 0.31)",
              transform: "translateY(-1px)"
            }} />
            </div>
            <DropdownAdd
              conditions={timeconditions}
              onConditionsChange={(selected) =>
                console.log("시간에 따른 조건:", selected)
              }
            />
          </div>
        )}
        <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0",
      }}
    ></div>
        {otherconditions.length > 0 && (
          <div style={{ marginBottom: "4px", textAlign: 'left' }}>
             <div style={{ 
              fontSize: 12,
              marginBottom: "13px",
              position: "relative",
              display: "inline-block",
              paddingBottom: "4px",
              fontWeight: "bolder",
              color: "#636363",
            }}>
            기타 추가 조건
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              borderBottom: "3px solid rgba(9, 9, 9, 0.31)",
              transform: "translateY(-1px)"
            }} />
            </div>
            <DropdownAdd
              conditions={otherconditions}
              onConditionsChange={(selected) =>
                console.log("기타 추가 조건:", selected)
              }
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default AdditionalConditions;
