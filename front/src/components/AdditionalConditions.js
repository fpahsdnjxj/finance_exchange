import React, { useState } from 'react';

const AdditionalConditions = ({ selectedCondition, onAdditionalConditionsChange }) => {
  const [selectedValues, setSelectedValues] = useState({});

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
      type: "amount",
      data: amountconditions
    });
  }
  if (timeconditions.length > 0) {
    conditionBlocks.push({
      label: "시간에 따른 조건",
      type: "time",
      data: timeconditions
    });
  }
  if (otherconditions.length > 0) {
    conditionBlocks.push({
      label: "기타 추가 조건",
      type: "other",
      data: otherconditions
    });
  }

  if (conditionBlocks.length === 0) return null;

  const handleCheckboxChange = (category, conditionItem, event) => {
    const isChecked = event.target.checked;
    setSelectedValues(prev => {
      const newSelected = { ...prev };

      if (isChecked) {
        newSelected[category] = conditionItem;
        onAdditionalConditionsChange(category, conditionItem, true);
      } else {
        if (newSelected[category] === conditionItem) {
          delete newSelected[category];
          onAdditionalConditionsChange(category, conditionItem, false);
        }
      }

      return newSelected;
    });
  };

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
            {block.data.map((conditionItem, idx) => (
              <div key={idx} style={{ marginBottom: "4px" }}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={`${block.type}-${idx}`}
                  checked={selectedValues[block.type] === conditionItem}
                  onChange={(e) => handleCheckboxChange(block.type, conditionItem, e)}
                />
                <label
                  htmlFor={`${block.type}-${idx}`}
                  style={{ marginLeft: "4px", fontSize: "12px", verticalAlign: "middle" }}
                >
                  {conditionItem}
                </label>
              </div>
            ))}
          </td>
        </tr>
      ))}
    </>
  );
};

export default AdditionalConditions;
