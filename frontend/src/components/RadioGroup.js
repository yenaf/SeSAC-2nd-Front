import React, { useState } from 'react';

export default function RadioGroup({
  name,
  options,
  required,
  register = () => {},
}) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

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
