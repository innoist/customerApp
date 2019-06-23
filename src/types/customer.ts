export interface Customer {

    id: string;
    firstName: string;
    lastName: string;
    dob?: Date;
};
export const newCustomer: Customer = {
    id:'',
    firstName:'',
    lastName: '',
    dob: undefined
}

export interface ManageCustomer {


    customers : Customer[],
    showHideManageCustomer: boolean,
    selectedCustomer?: Customer
}