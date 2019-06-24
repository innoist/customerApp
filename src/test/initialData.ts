import { Customer, ManageCustomer } from "./../types/customer";
export const getInitialData = (): ManageCustomer => {
  const c1: Customer = {
    id: "1",
    firstName: "first",
    lastName: "last",
    dob: new Date()
  };
  const c2: Customer = {
    id: "3",
    firstName: "first",
    lastName: "last",
    dob: new Date()
  };
  const defaultData: ManageCustomer = {
    customers: [c1, c2],
    showHideManageCustomer: false
  };
  return defaultData;
};
