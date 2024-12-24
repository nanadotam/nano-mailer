import { renderToString } from 'react-dom/server';
import React from 'react';
import Reader from './Reader';

export function renderToStaticMarkup(document, { rootBlockId }) {
  return '<!DOCTYPE html>' + 
    renderToString(
      <html>
        <body>
          <Reader document={document} rootBlockId={rootBlockId} />
        </body>
      </html>
    );
} 