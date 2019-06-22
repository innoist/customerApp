import { AppActions, ADD_CUSTOMER, CustomerActionTypes, DELETE_CUSTOMER, SET_CUSTOMERS, EDIT_CUSTOMER } from './../types/actions';
import { Customer } from './../types/customer';
import { statement } from '@babel/template';
const customerReducerDefaultState : Customer[] = [];

const customerReducer = (state=customerReducerDefaultState, action: CustomerActionTypes): Customer[]  => {

    switch(action.type){

        case  ADD_CUSTOMER:
        return [...state, action.customer];
 
        case SET_CUSTOMERS:
        return action.customers;

        case DELETE_CUSTOMER:
        return state.filter( ({id})=> id !==action.id);

        case EDIT_CUSTOMER:
        return state.map(customer=> {
            if(customer.id == action.customer.id){
                return{
                    ...customer, ...action.customer
                };
            }
            else{
                return customer;
            }
        })
        default:
        return state;
    }
    
    
}

export default customerReducer;