import React from 'react'
import { Button, Header, Image, Modal, Divider, Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/configureStore';
import { showHideManagecustomer, addingCustomer, selectingCustomer } from '../actions/customers';
import DatePicker from 'react-datepicker';
import uuid from 'uuid/v4';
import { string } from 'prop-types';
import { Customer, newCustomer } from '../types/customer';


interface IProps{
    selectedCustomer:Customer
}
interface IState {

    id: string;
    firstName: string;
     lastName: string;
        dob? : Date   
}
const AddCustomer : React.FC<IProps> = (Props) =>{
const showOrHide = useSelector((state: AppState) => state.manageCustomerList.showHideManageCustomer);

const dispatch = useDispatch();
const selectedCustomer   = Props.selectedCustomer  ;
// const [customerState,setCustomerState] = useState <IState> ({
//     id: selectedCustomer?selectedCustomer.id : uuid(),
//      firstName: selectedCustomer ? selectedCustomer.firstName : '',
//      lastName: selectedCustomer? selectedCustomer.lastName  : '',
//     dob: selectedCustomer ? selectedCustomer.dob : undefined
// });


// const [firstName,setFirstName] = useState(customerProp.customer ? customerProp.customer.firstName : '');
// const [lastName,setLastName] = useState(customerProp.customer ? customerProp.customer.lastName : '');
// // const [dob,setDob] = useState<IDate>({dob: customerProp.customer ? customerProp.customer.dob : null});

// const [dob,setDob] = useState(customerProp.customer ? customerProp.customer.dob : null);


const closeAddCustomer = () =>{
    dispatch(selectingCustomer(newCustomer));
    dispatch(showHideManagecustomer(false));
}
const addCustomer = () => {

    
    if(selectedCustomer.id == ""){
        dispatch(addingCustomer({...selectedCustomer,id:uuid()}));
    }
    else{
        dispatch(addingCustomer(selectedCustomer));
    }
    closeAddCustomer();
}

const selectDOB = (date: Date) =>{
dispatch(selectingCustomer({...selectedCustomer, dob: date}));
}
const firstNameChange = (e: React.FormEvent<HTMLInputElement>) =>{
//   setFirstName(e.currentTarget.value);
// setCustomerState({...customerState,firstName: e.currentTarget.value});
dispatch(selectingCustomer({...selectedCustomer, firstName: e.currentTarget.value}));
}
const lastNameChange = (e: React.FormEvent<HTMLInputElement>) =>{
    dispatch(selectingCustomer({...selectedCustomer, lastName: e.currentTarget.value}));
}
const areStatesValid = selectedCustomer.firstName.length >0 && selectedCustomer.lastName.length >0 && selectedCustomer.dob; 

return (

    <Modal open={showOrHide} >
    <Modal.Header>Enter the customer details (All fields are mandatory)</Modal.Header>
    <Modal.Content>
      <Modal.Description>
      <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' onChange={firstNameChange} value={selectedCustomer.firstName}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' onChange={lastNameChange} value={selectedCustomer.lastName}/>
    </Form.Field>
    <Form.Field>
      <label>Date of Birth</label>
      <span>
      <DatePicker showMonthDropdown={true} maxDate={new Date()} showYearDropdown={true} selected={selectedCustomer.dob} onChange={selectDOB} placeholderText="Click to select a date" />
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