import React from 'react';

export default function ColumnsContainer({ style, columns }) {
  return (
    <table
      width="100%"
      style={{
        borderCollapse: 'collapse',
        ...style
      }}
    >
      <tbody>
        <tr>
          {columns?.map((column, index) => (
            <td key={index} width={`${100 / columns.length}%`} valign="top">
              {column}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
} 