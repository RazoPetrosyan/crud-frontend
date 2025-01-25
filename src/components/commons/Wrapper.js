import React from 'react';
import Header from './Header';

function Wrapper(props) {
  const { children } = props;
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      {children}
    </div>
  );
}

export default Wrapper;
