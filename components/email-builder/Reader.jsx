import React from 'react';
import Container from './blocks/Container';
import ColumnsContainer from './blocks/ColumnsContainer';
import EmailLayout from './blocks/EmailLayout';

const BLOCK_COMPONENTS = {
  Container,
  ColumnsContainer,
  EmailLayout,
  Text: ({ style, props }) => (
    <p style={style}>{props.text}</p>
  ),
  Image: ({ style, props }) => (
    <img 
      src={props.src} 
      alt={props.alt} 
      style={style}
    />
  ),
  Divider: ({ style }) => (
    <hr style={style} />
  ),
};

export default function Reader({ document, rootBlockId }) {
  const renderBlock = (blockId) => {
    const block = document[blockId];
    if (!block) return null;

    const Component = BLOCK_COMPONENTS[block.type];
    if (!Component) return null;

    const children = block.data?.props?.childrenIds?.map(renderBlock);

    return (
      <Component 
        key={blockId}
        {...block.data}
      >
        {children}
      </Component>
    );
  };

  return renderBlock(rootBlockId);
} 