export interface Customer {

    id: string;
    firstName: string;
    lastName: string;
    dob: Date;
}

export interface ManageCustomer {


    customers : Customer[],
    showHideManageCustomer: boolean,
    customerForm?: Customer
}