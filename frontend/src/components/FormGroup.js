import React from 'react';

// 폼 입력 컴포넌트
const FormGroup = React.memo(({ label, children, style }) => {
  return (
    <div className="form-group" style={style}>
      <h3 className="post-title">{label}</h3>
      {children}
    </div>
  );
});

// displayName 설정
FormGroup.displayName = 'FormGroup';

export default FormGroup;
