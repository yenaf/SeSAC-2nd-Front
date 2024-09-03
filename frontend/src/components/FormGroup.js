import React from 'react';

export default function FormGroup({ label, children }) {
  return (
    <div className="form-group">
      <h3 className="post-title">{label}</h3>
      {children}
    </div>
  );
}
