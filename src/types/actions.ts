import { selectedCustomer } from './../actions/customers';
import { CustomerActionTypes, SetCustomerAction } from './actions';
import { Customer } from './customer';
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const EDIT_CUSTOMER = "EDIT_CUSTOMER";
export const SELECTED_CUSTOMER = "SELECTED_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const SEARCH_CUSTOMER = "SEARCH_CUSTOMER";
export const SHOW_HIDE_MANAGE_CUSTOMER = "SHOW_HIDE_MANAGE_CUSTOMER";


export interface SetCustomerAction {
    type: typeof SET_CUSTOMERS;
    customers: Customer[];
}

export interface EditCustomerAction {
    type: typeof EDIT_CUSTOMER;
    customer: Customer;
}

export interface SelectedCustomerAction {
    type: typeof SELECTED_CUSTOMER;
    customer: Customer;
}
export interface DeleteCustomerAction {
    type: typeof DELETE_CUSTOMER;
    id: string;
}

export interface AddCustomerAction {
    type: typeof ADD_CUSTOMER;
    customer: Customer;
}


export interface SearchCustomerAction {
    type: typeof SEARCH_CUSTOMER;
    search: string;
}


export interface ShowHideManageCustomerAction{
    type: typeof SHOW_HIDE_MANAGE_CUSTOMER,
    showOrHide: boolean
}
export type CustomerActionTypes = SetCustomerAction | AddCustomerAction | EditCustomerAction | DeleteCustomerAction | SearchCustomerAction | ShowHideManageCustomerAction | SelectedCustomerAction;

export type AppActions = CustomerActionTypes;
