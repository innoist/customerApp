import React, { useState } from 'react'
import { Button, Header, Image, Modal, Divider, Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/configureStore';
import { showHideManagecustomer } from '../actions/customers';
import DatePicker from 'react-datepicker';
import uuid from 'uuid/v4';
import { string } from 'prop-types';
import { Customer } from '../types/customer';


interface IProps{
    customer?:Customer
}
interface IDate{
    dob?:Date
}

const AddCustomer : React.FC<IProps> = (customerProp) =>{
const showOrHide = useSelector((state: AppState) => state.manageCustomerList.showHideManageCustomer);
const dispatch = useDispatch();

const [firstName,setFirstName] = useState(customerProp.customer ? customerProp.customer.firstName : '');
const [lastName,setLastName] = useState(customerProp.customer ? customerProp.customer.lastName : '');
// const [dob,setDob] = useState<IDate>({dob: customerProp.customer ? customerProp.customer.dob : null});

const [dob,setDob] = useState(customerProp.customer ? customerProp.customer.dob : null);


const closeAddCustomer = () =>{
    dispatch(showHideManagecustomer(false));
}
const addCustomer = () => {
    closeAddCustomer();
}

const selectDOB = (date: Date) =>{
setDob(date);
}
const firstNameChange = (e: React.FormEvent<HTMLInputElement>) =>{
  setFirstName(e.currentTarget.value);
}
const lastNameChange = (e: React.FormEvent<HTMLInputElement>) =>{
    setLastName(e.currentTarget.value);
}
return (

    <Modal open={showOrHide} >
    <Modal.Header>Enter the customer details (All fields are mandatory)</Modal.Header>
    <Modal.Content>
      <Modal.Description>
      <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' onChange={firstNameChange} value={firstName}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' onChange={lastNameChange} value={lastName}/>
    </Form.Field>
    <Form.Field>
      <label>Date of Birth</label>
      <span>
      <DatePicker showMonthDropdown={true} maxDate={new Date()} showYearDropdown={true} selected={dob} onChange={selectDOB} placeholderText="Click to select a date" />
      </span>
    </Form.Field>
    </Form>
      </Modal.Description>
      <Divider />
        <Button color='green' onClick={()=>addCustomer()}>Save</Button>   
        <Button color='red' onClick={()=>closeAddCustomer()} >Cancel</Button>  
     
    </Modal.Content>

  </Modal>  
)
}
export default AddCustomer;