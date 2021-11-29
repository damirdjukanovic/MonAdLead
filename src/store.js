import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWare = [thunk];

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleWare), composeWithDevTools())
  );

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
