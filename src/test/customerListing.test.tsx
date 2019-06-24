import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";
import { shallow, mount, configure } from "enzyme";
import { store as appStore } from "../store/configureStore";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";
import { ManageCustomer } from "../types/customer";
import { getInitialData } from "./initialData";
import CustomerList from "../components/CustomerListing";
import { addingCustomer } from "../actions/customers";

const mockStore = configureMockStore([thunk]);
const store = mockStore(() => getInitialData());
configure({ adapter: new Adapter() });

describe("Actions - ViewAllMeeting", () => {
  let wrapper: any;
  beforeEach(function() {
    //TODO: seems Jest 24 has a problem with shallow
    //downgrade to Jest 23 and see
    wrapper = mount(
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
    wrapper
      .find(CustomerList)
      .find("button")
      .first()
      .simulate("click");
    expect(store.getActions()[0].type).toEqual("SELECTED_CUSTOMER");
    expect(store.getActions()[1].type).toEqual("SHOW_HIDE_MANAGE_CUSTOMER");
  });

  it("verifying filter action", async () => {
    //For filter action i will be using the real store. by this i will test the number of rows and actual data.
    appStore.dispatch(addingCustomer(getInitialData().customers[0]));
    appStore.dispatch(addingCustomer(getInitialData().customers[1]));
    //using the actual store
    wrapper = mount(
      <Provider store={appStore}>
        <CustomerList />
      </Provider>
    );
    expect(appStore.getState().manageCustomerList.customers.length).toEqual(2); //should be 2 for customers in store
    expect(wrapper.find(".row").length).toEqual(4); //Without any filter there should be 4 rows

    //Act is there when state is updated.
    act(() => {
      wrapper.find("input").prop("onChange")({
        currentTarget: { value: "Syed" }
      });
    });
    wrapper.update();
    expect(wrapper.find(".row").length).toEqual(3); //After filter has applied should be 3 rows (one for customer)
  });

  //TODO: Write test for edit, delete, adddialog.
});
