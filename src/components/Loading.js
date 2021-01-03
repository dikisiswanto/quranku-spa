import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

const Loading = ({ children }) => (
  <SkeletonTheme color="#fcfcfc" highlightColor="#f0f0f0">
    {children}
  </SkeletonTheme>
);

export default Loading;
