import { AppState } from './../store/configureStore';
import { Customer } from './../types/customer';
import { AppActions, ADD_CUSTOMER, DELETE_CUSTOMER, EDIT_CUSTOMER, SHOW_HIDE_MANAGE_CUSTOMER, SEARCH_CUSTOMER, SET_CUSTOMERS, SELECTED_CUSTOMER } from './../types/actions';
import { Dispatch } from 'redux';

export const addCustomer =(customer: Customer): AppActions => ({
type: ADD_CUSTOMER,
customer

});

export const editCustomer =(customer: Customer): AppActions => ({
    type: EDIT_CUSTOMER,
    customer    
    });

export const showHideManagecustomer = (showOrHide: boolean): AppActions => ({
    type: SHOW_HIDE_MANAGE_CUSTOMER,
    showOrHide
});
export const selectedCustomer =(customer: Customer): AppActions => ({
    type: SELECTED_CUSTOMER,
    customer    
    });
export const deleteCustomer =(id: string): AppActions => ({
    type: DELETE_CUSTOMER,
    id    
    });

    export const searchCustomer =(search: string): AppActions => ({
        type: SEARCH_CUSTOMER,
        search    
        });
    

        export const setCustomers =(customers: Customer[]): AppActions => ({
            type: SET_CUSTOMERS,
            customers    
            });
        



export const addingCustomer = (customer: Customer ) =>{
return (dispatch : Dispatch <AppActions>, getState: ()=>AppState) =>{
        dispatch(addCustomer(customer));
}
    
}

export const editingCustomer = (customer: Customer ) =>{
    return (dispatch : Dispatch <AppActions>, getState: ()=>AppState) =>{
            dispatch(editCustomer(customer));
    }
    }

    export const selectingCustomer = (customer: Customer ) =>{
        return (dispatch : Dispatch <AppActions>, getState: ()=>AppState) =>{
                dispatch(selectedCustomer(customer));
        }
        }
    export const deletingCustomer = (id: string ) =>{
        return (dispatch : Dispatch <AppActions>, getState: ()=>AppState) =>{
                dispatch(deleteCustomer(id));
        }
        }

        
    export const searchingCustomer = (search: string ) =>{
        return (dispatch : Dispatch <AppActions>, getState: ()=>AppState) =>{
                dispatch(searchCustomer(search));
        }
        }


        export const settingCustomer = (customers: Customer[] ) =>{
            return (dispatch : Dispatch <AppActions>, getState: ()=>AppState) =>{
                    dispatch(setCustomers(customers));
            }
            }