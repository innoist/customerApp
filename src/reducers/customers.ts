import { showHideManagecustomer, selectedCustomer } from './../actions/customers';
import { AppActions, ADD_CUSTOMER, CustomerActionTypes, DELETE_CUSTOMER, SET_CUSTOMERS, EDIT_CUSTOMER, SHOW_HIDE_MANAGE_CUSTOMER, SELECTED_CUSTOMER } from './../types/actions';
import { Customer, ManageCustomer } from './../types/customer';
import { statement } from '@babel/template';
const customerReducerDefaultState : ManageCustomer = {showHideManageCustomer:false, customers:[]};

const customerReducer = (state=customerReducerDefaultState, action: CustomerActionTypes): ManageCustomer => {

    switch(action.type){

        case  ADD_CUSTOMER:
        return Object.assign({},{...state},{customers: state.customers.concat(action.customer)});
       
        case  SHOW_HIDE_MANAGE_CUSTOMER:
        return {...state, showHideManageCustomer: action.showOrHide};
 
               
        case  SELECTED_CUSTOMER:
        return {...state, selectedCustomer: action.customer};
        // case SET_CUSTOMERS:
        // return action.customers;

        case DELETE_CUSTOMER:
        return  Object.assign({},{...state},{customers:state.customers.filter( ({id})=> id !==action.id)});

        case EDIT_CUSTOMER:
        return Object.assign ( {}, {...state}, {customers: state.customers.map(customer=> {
            if(customer.id == action.customer.id){
                return{
                    ...customer, ...action.customer
                };
            }
            else{
                return customer;
            }
        })});
        default:
        return state;
    }
    
    
}

export default customerReducer;