import React, { useState } from "react";
import {
  Input,
  Container,
  Label,
  Header,
  Icon,
  Button,
  Grid
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

const CustomerList: React.FC = () => {
  const customers =
    useSelector((state: AppState) => state.manageCustomerList.customers) || [];

  const customerSelected =
    useSelector(
      (state: AppState) => state.manageCustomerList.selectedCustomer
    ) || newCustomer;

  let [filter, setFilter] = useState<string>("");
  console.log("filter", filter);
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
      <Grid.Row>
        <Grid.Column width={5}>First Name</Grid.Column>
        <Grid.Column width={5}>Last Name</Grid.Column>
        <Grid.Column width={4}>Date Of Birth</Grid.Column>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid.Row>
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
      <Header as="h1">Welcome to the customer listing page.</Header>
      <DivCustom>
        <DivCustom orientation="left">
          <Button color="blue" onClick={addCustomer}>
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
      </DivCustom>
      <AddCustomer selectedCustomer={customerSelected} />
    </Container>
  );
};

export default CustomerList;
