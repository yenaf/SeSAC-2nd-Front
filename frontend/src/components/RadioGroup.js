import React, { useState, useEffect } from 'react';

// 라디오버튼 그룹 컴포넌트
export default function RadioGroup({
  name,
  options,
  required,
  defaultValue = null,
  register = () => {},
}) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (defaultValue !== null) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="radio-group">
      {options.map((option) => (
        <label
          className={`category-btn ${selectedValue === option.value ? 'checked' : ''}`}
          key={option.value}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            required={required}
            {...register(name)}
            onChange={() => handleRadioChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
