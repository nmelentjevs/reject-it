import React, { useState } from 'react';

import { setNavigator } from './src/navigationRef';
import Navigation from './src/navigation';

const images = [];

export default () => {
  return (
    <Navigation
      ref={navigator => {
        setNavigator(navigator);
      }}
    />
  );
};
