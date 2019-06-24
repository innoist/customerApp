import { AppActions } from "./../types/actions";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import customersReducer from "../reducers/customers";
import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
  manageCustomerList: customersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);
