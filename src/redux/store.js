import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tripsReducer from "./tripsSlice";
import filterReducer from "./filterSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  trips: tripsReducer,
  filter: filterReducer,
});

const tripsPersistConfig = {
  key: "trips",
  storage,
  whitelist: ["trips"],
};

const persistedTripsReducer = persistReducer(tripsPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedTripsReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
