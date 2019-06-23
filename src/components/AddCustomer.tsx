import React, { useState } from 'react'
import { Button, Header, Image, Modal, Divider, Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/configureStore';
import { showHideManagecustomer, addingCustomer } from '../actions/customers';
import DatePicker from 'react-datepicker';
import uuid from 'uuid/v4';
import { string } from 'prop-types';
import { Customer } from '../types/customer';


interface IProps{
    customer?:Customer
}
interface IState {

    id: string;
    firstName: string;
     lastName: string;
        dob? : Date   
}
const AddCustomer : React.FC<IProps> = (customerProp) =>{
const showOrHide = useSelector((state: AppState) => state.manageCustomerList.showHideManageCustomer);
const dispatch = useDispatch();
const custProp = customerProp.customer;
const [customerState,setCustomerState] = useState <IState> ({
    id: custProp?custProp.id : uuid(),
     firstName: custProp ? custProp.firstName : '',
     lastName: custProp? custProp.lastName  : '',
    dob: custProp ? custProp.dob : undefined
});


// const [firstName,setFirstName] = useState(customerProp.customer ? customerProp.customer.firstName : '');
// const [lastName,setLastName] = useState(customerProp.customer ? customerProp.customer.lastName : '');
// // const [dob,setDob] = useState<IDate>({dob: customerProp.customer ? customerProp.customer.dob : null});

// const [dob,setDob] = useState(customerProp.customer ? customerProp.customer.dob : null);


const closeAddCustomer = () =>{
    dispatch(showHideManagecustomer(false));
}
const addCustomer = () => {

    
    if(!customerProp.customer){
        dispatch(addingCustomer(   customerState as Customer));
    }
    closeAddCustomer();
}

const selectDOB = (date: Date) =>{
setCustomerState({...customerState,dob: date});
}
const firstNameChange = (e: React.FormEvent<HTMLInputElement>) =>{
//   setFirstName(e.currentTarget.value);
setCustomerState({...customerState,firstName: e.currentTarget.value});
}
const lastNameChange = (e: React.FormEvent<HTMLInputElement>) =>{
    setCustomerState({...customerState,lastName: e.currentTarget.value});
}
const areStatesValid = customerState.firstName.length >0 && customerState.lastName.length >0 && customerState.dob; 

return (

    <Modal open={showOrHide} >
    <Modal.Header>Enter the customer details (All fields are mandatory)</Modal.Header>
    <Modal.Content>
      <Modal.Description>
      <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' onChange={firstNameChange} value={customerState.firstName}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' onChange={lastNameChange} value={customerState.lastName}/>
    </Form.Field>
    <Form.Field>
      <label>Date of Birth</label>
      <span>
      <DatePicker showMonthDropdown={true} maxDate={new Date()} showYearDropdown={true} selected={customerState.dob} onChange={selectDOB} placeholderText="Click to select a date" />
      </span>
    </Form.Field>
    </Form>
      </Modal.Description>
      <Divider />
        <Button color='green' disabled={!areStatesValid} onClick={()=>addCustomer()}>Save</Button>   
        <Button color='red' onClick={()=>closeAddCustomer()} >Cancel</Button>  
     
    </Modal.Content>

  </Modal>  
)
}
export default AddCustomer;