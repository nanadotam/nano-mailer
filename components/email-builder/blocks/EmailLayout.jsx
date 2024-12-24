import React from 'react';

const fontFamilies = {
  MODERN_SANS: '"Helvetica Neue", Arial, sans-serif',
  BOOK_SANS: 'Optima, Candara, sans-serif',
  MODERN_SERIF: 'Charter, Cambria, serif',
  MONOSPACE: '"Courier New", monospace',
};

export default function EmailLayout({ 
  backdropColor = '#F5F5F5',
  canvasColor = '#FFFFFF',
  textColor = '#262626',
  fontFamily = 'MODERN_SANS',
  borderColor,
  borderRadius,
  children 
}) {
  return (
    <div
      style={{
        backgroundColor: backdropColor,
        
        color: textColor,
        fontFamily: fontFamilies[fontFamily],
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.5',
        margin: '0',
        padding: '32px 0',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <table
        align="center"
        width="100%"
        style={{
          margin: '0 auto',
          maxWidth: '600px',
          backgroundColor: canvasColor,
          borderRadius: borderRadius,
          border: borderColor ? `1px solid ${borderColor}` : undefined,
        }}
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr>
            <td>{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 