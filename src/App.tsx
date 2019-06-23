import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector,useDispatch  } from 'react-redux';
import { AppState } from './store/configureStore';
import { addingCustomer, deleteCustomer, deletingCustomer } from './actions/customers';
import { Customer } from './types/customer';
import CustomerList from './components/CustomerListing';
const App: React.FC = () => {

  const [counter, setCounter] = useState(0);
  const customers = useSelector((state: AppState) => state.manageCustomerList.customers) || [];
  const dispatch = useDispatch()    
  const addCustomer = () =>{
    const c : Customer = {
      id: counter.toString(),
      firstName: "first" + counter.toString(),
      lastName: "last",
      dob: new Date()
    }
    dispatch(addingCustomer(c));
    setCounter(counter+1);
  }
  const deleteCustomer = (id: string) =>{
    dispatch(deletingCustomer(id));
  }
  let customerHTML = customers.map( (customer) => {
    return (
      <div key={customer.id}>
        <span>{customer.firstName + ' ' + customer.lastName}</span>
        <button onClick={()=>deleteCustomer(customer.id)}>delete button</button>

      </div>
    )
  })
  return (
    <div className="">
      {/* <header className="App-header">
      <button onClick={ ()=>addCustomer()}>Add Customer</button>
       <div  >
         
         {counter} {customers.length}
       </div>
       <div>
       {customerHTML}
       </div>
      </header> */}

   <CustomerList />
    </div>
  );
}

export default App;
