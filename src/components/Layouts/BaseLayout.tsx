import React from 'react';
import { CommonLayout } from './CommonLayout';

interface Props {}

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return <CommonLayout leftMenu={null}>{children}</CommonLayout>;
};

BaseLayout.displayName = 'BaseLayout';
