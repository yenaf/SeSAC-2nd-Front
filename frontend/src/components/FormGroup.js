import React from 'react';

export default function FormGroup({ label, children }) {
  return (
    <div className="form-group">
      <h3>{label}</h3>
      {children}
    </div>
  );
}
