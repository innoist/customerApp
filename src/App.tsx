import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector,useDispatch  } from 'react-redux';
import { AppState } from './store/configureStore';
import { addingCustomer, deleteCustomer, deletingCustomer } from './actions/customers';
import { Customer } from './types/customer';

const App: React.FC = () => {

  const [counter, setCounter] = useState(0);
  const customers = useSelector((state: AppState) => state.customers);
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
      <div>
        <span>{customer.firstName + ' ' + customer.lastName}</span>
        <button onClick={()=>deleteCustomer(customer.id)}>delete button</button>

      </div>
    )
  })
  return (
    <div className="App">
      <header className="App-header">
       <div onClick={ ()=>addCustomer()}>
         {counter} {customers.length}
       </div>
       <div>
       {customerHTML}
       </div>
      </header>
    </div>
  );
}

export default App;
