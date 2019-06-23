import React from 'react'
import { Button, Header, Image, Modal, Divider, Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/configureStore';
import { showHideManagecustomer } from '../actions/customers';

const AddCustomer : React.FC = () =>{
const showOrHide = useSelector((state: AppState) => state.manageCustomerList.showHideManageCustomer);
const dispatch = useDispatch();

const closeAddCustomer = () =>{
    dispatch(showHideManagecustomer(false));
}
const addCustomer = () => {
    closeAddCustomer();
}
return (

    <Modal open={showOrHide} >
    <Modal.Header>Enter the customer details</Modal.Header>
    <Modal.Content>
      <Modal.Description>
      <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <label>Date of Birth</label>
      <input placeholder='Last Name' type="date" />
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