import { createGlobalState } from 'react-hooks-global-state';

const initialState: { photoScrollTo: null | number } = { photoScrollTo: null };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState('photoScrollTo');
};