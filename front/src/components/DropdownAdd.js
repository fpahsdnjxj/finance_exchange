import React, { useState, useEffect } from 'react';
import '../App.css';

const DropdownAdd = ({ conditions, onConditionsChange }) => {
  const [selectedConditionsList, setSelectedConditionsList] = useState([]);

  const handleDropdownChange = (index, value) => {
    if (selectedConditionsList.includes(value)) {
      alert("같은 조건을 중복되게 선택할 수 없습니다.");
      return;
    }

    const newSelectedConditions = [...selectedConditionsList];
    newSelectedConditions[index] = value;
    setSelectedConditionsList(newSelectedConditions);
    onConditionsChange(newSelectedConditions);
  };

  const handleAddDropdown = () => {
    if (selectedConditionsList.includes("")) return;
    const newList = [...selectedConditionsList, ""];
    setSelectedConditionsList(newList);
    onConditionsChange(newList);
  };

  const handleRemoveDropdown = (index) => {
    if (selectedConditionsList.length > 1) {
      const newSelectedConditions = selectedConditionsList.filter((_, idx) => idx !== index);
      setSelectedConditionsList(newSelectedConditions);
      onConditionsChange(newSelectedConditions);
    }
  };

  useEffect(() => {
    setSelectedConditionsList([]); 
  }, [conditions]);

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
                fontSize: "0.8rem",
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


export default DropdownAdd;