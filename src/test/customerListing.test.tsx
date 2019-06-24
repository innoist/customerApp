import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { Customer } from "../types/customer";
import { applyMiddleware, compose } from "redux";
import { AppActions } from "../types/actions";
import { getInitialData } from "./initialData";
import CustomerList from "../components/CustomerListing";

const mockStore = configureMockStore([thunk]);
const store = mockStore(() => getInitialData());
configure({ adapter: new Adapter() });

it("checking button click", done => {
  let wrapper = shallow(
    <Provider store={store}>
      <CustomerList />{" "}
    </Provider>
  );

  setTimeout(() => {
    wrapper.update();

    //  console.log('store',store.getActions());
    console.log("store", store.getState());
    // expect(wrapper.find('button').length).toEqual(1);
    done();
  }, 500);
});
