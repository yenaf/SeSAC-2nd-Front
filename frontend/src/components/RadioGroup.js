import React from 'react';

export default function RadioGroup({ name, options, required }) {
  return (
    <div className="radio-group">
      {options.map((option) => (
        <label className="category-btn" key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            required={required}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
