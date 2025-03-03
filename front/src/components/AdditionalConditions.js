import React from "react";
import DropdownAdd from "./DropdownAdd";

const AdditionalConditions = ({ selectedCondition }) => {
  if (!selectedCondition) return null;

  const {
    amountconditions = [],
    timeconditions = [],
    otherconditions = []
  } = selectedCondition;

  const conditionBlocks = [];

  if (amountconditions.length > 0) {
    conditionBlocks.push({
      label: "조건 적용 기준 금액",
      data: amountconditions
    });
  }
  if (timeconditions.length > 0) {
    conditionBlocks.push({
      label: "시간에 따른 조건",
      data: timeconditions
    });
  }
  if (otherconditions.length > 0) {
    conditionBlocks.push({
      label: "기타 추가 조건",
      data: otherconditions
    });
  }

  if (conditionBlocks.length === 0) return null;

  return (
    <>
      {conditionBlocks.map((block, index) => (
        <tr key={index}>         
          {index === 0 && (
            <td rowSpan={conditionBlocks.length} className="under-t">
              추가 조건
            </td>
          )}

          <td style={{ borderRight: "none", textAlign: "left", padding: "8px" }}>
            <div
              style={{
                fontSize: 12,
                marginBottom: "13px",
                position: "relative",
                display: "inline-block",
                paddingBottom: "4px",
                fontWeight: "bolder",
                color: "#636363",
              }}
            >
              {block.label}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  borderBottom: "3px solid rgba(9, 9, 9, 0.31)",
                  transform: "translateY(-1px)"
                }}
              />
            </div>

            <DropdownAdd
              conditions={block.data}
              onConditionsChange={(selected) =>
                console.log(`${block.label}:`, selected)
              }
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default AdditionalConditions;
