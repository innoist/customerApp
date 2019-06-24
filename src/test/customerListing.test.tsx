import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { Customer, ManageCustomer } from "../types/customer";
import { applyMiddleware, compose } from "redux";
import { AppActions } from "../types/actions";
import { getInitialData } from "./initialData";
import CustomerList from "../components/CustomerListing";
import { wrap } from "module";

const mockStore = configureMockStore([thunk]);
const store = mockStore(() => getInitialData());
configure({ adapter: new Adapter() });

describe("Actions - ViewAllMeeting", () => {
  let wrapper: any;
  beforeEach(function() {
    wrapper = shallow(
      <Provider store={store}>
        <CustomerList />
      </Provider>
    );
  });

  it("verifying inital setup", () => {
    var initialStore = store.getState() as ManageCustomer;
    expect(initialStore.customers.length).toEqual(2);
  });

  it("verifying add Action", () => {
    // wrapper.update();
    // wrapper
    //   .find("button")
    //   .at(0)
    //   .simulate("click");
    wrapper = shallow(
      <Provider store={store}>
        <CustomerList />
      </Provider>
    ).dive();
    console.log(
      "wrapper",
      wrapper
        .find("button")
        .first()
        .html()
    );
  });
});
