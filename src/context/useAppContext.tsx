'use client';
import { useContext } from 'react';
import { AppContext } from './GlobalState';

export const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};
