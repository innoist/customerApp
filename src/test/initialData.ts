import { Customer, ManageCustomer } from "./../types/customer";
export const getInitialData = (): ManageCustomer => {
  const c1: Customer = {
    id: "1",
    firstName: "Syed",
    lastName: "Usman",
    dob: new Date()
  };
  const c2: Customer = {
    id: "3",
    firstName: "Jame",
    lastName: "Drive",
    dob: new Date()
  };
  const defaultData: ManageCustomer = {
    customers: [c1, c2],
    showHideManageCustomer: false
  };
  return defaultData;
};
