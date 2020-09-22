import React from 'react';
import { SyncLoader } from 'react-spinners';
import CONSTANTS from '../data/constants';

const Loading = () => (
  <div className="my-10 text-center flex flex-col row-gap-4 justify-center">
    <SyncLoader size="16px" color={CONSTANTS.PRIMARY_COLOR} />
    <span className="text-gray-700">{CONSTANTS.LOADING_MESSAGE}</span>
  </div>
);

export default Loading;
