import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;