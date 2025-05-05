import React, { useState, useEffect, useMemo } from 'react';

const AdditionalConditions = ({ selectedCondition, onAdditionalConditionsChange, onValidityChange }) => {
  const {
    amountconditions = [],
    timeconditions = [],
    otherconditions = [],
    is_amount_required,
    is_time_required,
    is_additional_required,
  } = selectedCondition;

  const conditionBlocks = useMemo(() => {
    const blocks = [];
    if (amountconditions.length > 0) {
      blocks.push({
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
      blocks.push({
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
      blocks.push({
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
    return blocks;
  }, [amountconditions, timeconditions, otherconditions, is_amount_required, is_time_required, is_additional_required]);

  const [selectedValues, setSelectedValues] = useState({ amount: null, time: null, other: null });

  useEffect(() => {
    let isValid = true;
    conditionBlocks.forEach(block => {
      if (block.required && !selectedValues[block.type]) {
        isValid = false;
      }
    });
    if (onValidityChange) {
      onValidityChange(isValid ? 1 : 0);
    }
  }, [selectedValues, conditionBlocks, onValidityChange]);

  if (conditionBlocks.length === 0) return null;

  const handleCheckboxChange = (category, conditionItem) => {
    setSelectedValues(prev => {
      const newValue = prev[category] === conditionItem ? null : conditionItem;
      if (onAdditionalConditionsChange) {
        onAdditionalConditionsChange(category, newValue ? [newValue] : []);
      }
      return { ...prev, [category]: newValue };
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
                marginBottom: "7px",
                position: "relative",
                display: "inline-block",
                paddingBottom: "4px",
                fontWeight: "bolder",
                color: "#3d3d3d",
              }}
            >
              {block.label}
              <div />
            </div>
            {block.data.map((conditionItem, idx) => (
              <div key={idx} style={{ marginBottom: "4px" }}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={`${block.type}-${idx}`}
                  checked={selectedValues[block.type] === conditionItem}
                  onChange={() => handleCheckboxChange(block.type, conditionItem)}
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
