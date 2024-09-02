import React from 'react';

export default function RadioGroup({
  name,
  options,
  required,
  register = () => {},
}) {
  return (
    <div className="radio-group">
      {options.map((option) => (
        <label className={`category-btn`} key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            required={required}
            {...register(name)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
