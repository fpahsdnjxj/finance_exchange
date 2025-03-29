import React, { useState } from 'react';

const AdditionalConditions = ({ selectedCondition, onAdditionalConditionsChange }) => {
  const [selectedValues, setSelectedValues] = useState({});

  const {
    amountconditions = [],
    timeconditions = [],
    otherconditions = [],
    is_amount_required,
    is_time_required,
    is_additional_required,
  } = selectedCondition;

  const conditionBlocks = [];

  if (amountconditions.length > 0) { // true가 오면 필수 문구 띄우도록록
    conditionBlocks.push({
      label: (
        <>
          조건 적용 기준 금액{" "}
          {is_amount_required && <span style={{ color: "red", marginLeft: "4px" }}>* 필수 선택</span>}
        </>
      ),
      type: "amount",
      data: amountconditions,
      required: is_amount_required
    });
  }
  if (timeconditions.length > 0) {
    conditionBlocks.push({
      label: (
        <>
          시간에 따른 조건{" "}
          {is_time_required && <span style={{ color: "red", marginLeft: "4px" }}>* 필수 선택</span>}
        </>
      ),
      type: "time",
      data: timeconditions,
      required: is_time_required
    });
  }
  if (otherconditions.length > 0) {
    conditionBlocks.push({
      label: (
        <>
          기타 추가 조건{" "}
          {is_additional_required && <span style={{ color: "red", marginLeft: "4px" }}>* 필수 선택</span>}
        </>
      ),
      type: "other",
      data: otherconditions,
      required: is_additional_required
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
              <div/>
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
