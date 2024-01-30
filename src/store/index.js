import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/todos/todo";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [""],
};

const todoPersistConfig = {
  key: "todo",
  storage: storageSession,
};

const reducers = combineReducers({
  todo: persistReducer(todoPersistConfig, todoReducer),
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, reducers),
});

export const persistor = persistStore(store);
