import React, { useState } from "react";
import {
  Input,
  Container,
  Label,
  Header,
  Icon,
  Button,
  Grid,
  Divider,
  Segment,
  Message
} from "semantic-ui-react";
import { DivCustom } from "../styledComponent/div";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/configureStore";
import { Customer, newCustomer } from "../types/customer";
import {
  deletingCustomer,
  showHideManagecustomer,
  selectingCustomer
} from "../actions/customers";
import AddCustomer from "./AddCustomer";
import { ToastContainer } from "react-toastify";

const CustomerList: React.FC = () => {
  const customers = useSelector((state: AppState) =>
    state.manageCustomerList ? state.manageCustomerList.customers : []
  );

  const customerSelected =
    useSelector((state: AppState) =>
      state.manageCustomerList
        ? state.manageCustomerList.selectedCustomer
        : newCustomer
    ) || newCustomer;

  let [filter, setFilter] = useState<string>("");
  const filteredList: Customer[] =
    filter === ""
      ? customers
      : customers.filter(
          ({ firstName, lastName }) =>
            firstName.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
            lastName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        );

  const dispatch = useDispatch();
  const onDeleteCustomer = (id: string) => {
    dispatch(deletingCustomer(id));
  };
  const addCustomer = () => {
    dispatch(selectingCustomer(newCustomer));
    dispatch(showHideManagecustomer(true));
  };
  const onEditCustomer = (customer: Customer) => {
    dispatch(selectingCustomer(customer));
    dispatch(showHideManagecustomer(true));
  };
  const updatingFilter = (e: React.FormEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };
  const noUser =
    filteredList.length === 0 ? (
      <DivCustom marginTop="2%">
        <Segment secondary>
          There are no records to display. Please change your searc string or
          add New customer
        </Segment>
      </DivCustom>
    ) : (
      ""
    );
  const customerListHeader = (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            fluid
            icon="search"
            onChange={updatingFilter}
            value={filter}
            placeholder="Search..."
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row bold>
        <Grid.Column className="bold" width={5}>
          <Header as="h4">First Name</Header>
        </Grid.Column>
        <Grid.Column width={5}>
          <Header as="h4">Last Name</Header>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4">Date of Birth</Header>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid.Row>
      <Divider />
    </Grid>
  );

  const customerList = (
    <Grid>
      {filteredList.map(customer => {
        return (
          <Grid.Row key={customer.id}>
            <Grid.Column width={5}>{customer.firstName}</Grid.Column>
            <Grid.Column width={5}>{customer.lastName}</Grid.Column>
            <Grid.Column width={4}>
              {customer.dob
                ? customer.dob.toDateString()
                : "Date of Birth not provided"}
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon
                onClick={() => onEditCustomer(customer)}
                color="grey"
                name="edit"
              />
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon
                onClick={() => onDeleteCustomer(customer.id)}
                color="red"
                name="trash"
              />
            </Grid.Column>
          </Grid.Row>
        );
      })}
    </Grid>
  );

  return (
    <Container>
      <DivCustom marginTop="5%" marginBottom="5%">
        <Divider horizontal>
          <Header as="h3">
            <Icon name="user" />
            Welcome to the customer listing page.
          </Header>
        </Divider>
      </DivCustom>

      <DivCustom>
        <DivCustom orientation="left">
          <Button name="addCustomer" color="blue" onClick={addCustomer}>
            <Icon name="add" /> Add New Customer
          </Button>
        </DivCustom>
        <DivCustom orientation="right">
          <Label as="a" color="grey" tag>
            Displaying {filteredList.length}/{customers.length} customers
          </Label>
        </DivCustom>
      </DivCustom>
      <DivCustom clear={true}>
        {customerListHeader}
        {customerList}
        {noUser}
      </DivCustom>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <AddCustomer selectedCustomer={customerSelected} />
      <DivCustom marginTop="5%">
        <Message info>
          <Message.Header>
            Customer Listing App (feature and tech stack)
          </Message.Header>
          <ul>
            <li>You can add customer using `Add New Customer` buttton</li>
            <li>
              Filtered/Total record count is displayed on top right hand side
            </li>
            <li>Search is based on first and last name</li>
          </ul>
          <div></div>
          <ul>
            <li> npm run start : to start the app in dev mode</li>
            <li>npm run test-coverage: to run the test and coverage report </li>
          </ul>
          <ul>
            <li>React using Hooks</li>

            <li>Redux supporting hooks</li>
            <li>Tests using Jest and enzyme: (using mock and app store)</li>
            <li>
              Basic usage of styled component (styled div to left and right
              component) passing props as well
            </li>
            <li>Using React semantic UI controls and React date picker</li>
            <li>Keeping Responsiveness of UI intact</li>
            <li>Generating the boiler plate using Create React App</li>
          </ul>
        </Message>
      </DivCustom>
    </Container>
  );
};

export default CustomerList;
