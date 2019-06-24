import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { Customer } from "./types/customer";
import { rootReducer, AppState, store } from "./store/configureStore";
import { applyMiddleware, compose } from "redux";
import { AppActions } from "./types/actions";

// const mockStore = configureMockStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
//   ));
// const mockStore = configureMockStore(rootReducer, compose(applyMiddleware( thunk) ));
const mockStore = configureMockStore([thunk]);

// const c : Customer = {
//   id: "1",
//   firstName: "first",
//   lastName: "last",
//   dob: new Date()
// }
// const store = mockStore({ customers: [] });
configure({ adapter: new Adapter() });

it("checking button click", done => {
  let wrapper = mount(
    <Provider store={store}>
      <App />{" "}
    </Provider>
  );
  wrapper
    .find("button")
    .at(0)
    .simulate("click");
  wrapper
    .find("button")
    .at(0)
    .simulate("click");
  let customers = store.getState().manageCustomerList;
  setTimeout(() => {
    wrapper.update();

    //  console.log('store',store.getActions());
    console.log("store", store.getState());
    // expect(wrapper.find('button').length).toEqual(1);
    done();
  }, 500);
});
