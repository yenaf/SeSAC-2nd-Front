import React from 'react';

// 폼 입력 컴포넌트
export default function FormGroup({ label, children }) {
  return (
    <div className="form-group">
      <h3 className="post-title">{label}</h3>
      {children}
    </div>
  );
}
