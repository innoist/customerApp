import React, { useContext } from 'react';
import { Input, Container,Label, Header, Icon, Button, Grid } from 'semantic-ui-react'
import {DivCustom} from '../styledComponent/div';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/configureStore';
import uuid from "uuid/v4";
import { Customer } from '../types/customer';
import { addingCustomer, deletingCustomer } from '../actions/customers';

const CustomerList : React.FC = () =>{
    const customers = useSelector((state: AppState) => state.customers) || [];
    const dispatch = useDispatch();
    const deleteCustomer = (id: string) =>{
        dispatch(deletingCustomer(id));
      } 
    const addCustomer = () =>{
        console.log('add customer');
        const c : Customer = {
          id: uuid(),
          firstName: "first",
          lastName: "last",
          dob: new Date()
        }
        dispatch(addingCustomer(c));
       
      }
    const customerListHeader =   <Grid>
            <Grid.Row>
        <Grid.Column width={16}>
        <Input fluid icon='search' placeholder='Search...' />
        </Grid.Column>
        </Grid.Row>
    <Grid.Row>
        <Grid.Column width={5}>
        First Name
        </Grid.Column>
        <Grid.Column width={5}>
        Last Name
        </Grid.Column>
        <Grid.Column width={4}>
        Date Of Birth
        </Grid.Column>
        <Grid.Column width={1}>
        
        </Grid.Column>
        <Grid.Column width={1}>

        
        </Grid.Column>
    </Grid.Row>
    </Grid>

    const customerList = 
        <Grid>
        {customers.map( (customer) => {
            return (

              
                <Grid.Row  key={customer.id}>
        <Grid.Column width={5}>
        {customer.firstName }
        </Grid.Column>
       <Grid.Column width={5}>
        {customer.lastName}
        </Grid.Column>
        <Grid.Column width={4}>
        {customer.dob.toDateString()}
        </Grid.Column>
        <Grid.Column width={1}>
        <Icon color="grey" name='edit' />
        </Grid.Column>
        <Grid.Column  width={1}>

        <Icon onClick={()=>deleteCustomer(customer.id)} color="red" name='trash' /> 
        </Grid.Column>
    </Grid.Row>
             
           
            )
          })}
    </Grid>

    

return (
    <Container>
        <Header as='h1'>Welcome to the customer listing page.</Header>
        <DivCustom>
            <DivCustom orientation="left">
    <Button color='blue' onClick={addCustomer}>
    <Icon name='add' /> Add New Customer</Button>
    </DivCustom>
    <DivCustom orientation="right">
        <Label  as='a'  color='grey' tag>Displaying 10/30 customers</Label></DivCustom>
  </DivCustom>
  <DivCustom clear={true}>
  {customerListHeader}
  {customerList}
  </DivCustom>
        
    </Container>
)


}

export default CustomerList;