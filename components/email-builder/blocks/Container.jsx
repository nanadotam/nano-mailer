import React from 'react';

export default function Container({ style, children }) {
  return (
    <div
      style={{
        backgroundColor: style?.backgroundColor,
        padding: `${style?.padding?.top || 0}px ${style?.padding?.right || 0}px ${style?.padding?.bottom || 0}px ${style?.padding?.left || 0}px`,
        borderRadius: style?.borderRadius,
        border: style?.borderColor ? `1px solid ${style.borderColor}` : undefined,
        ...style
      }}
    >
      {children}
    </div>
  );
} 