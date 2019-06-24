import React from "react";
import { Button, Modal, Divider, Form } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/configureStore";
import {
  showHideManagecustomer,
  addingCustomer,
  selectingCustomer,
  editingCustomer
} from "../actions/customers";
import DatePicker from "react-datepicker";
import uuid from "uuid/v4";
import { Customer, newCustomer } from "../types/customer";
interface IProps {
  selectedCustomer: Customer;
}
const AddCustomer: React.FC<IProps> = Props => {
  const showOrHide = useSelector(
    (state: AppState) => state.manageCustomerList.showHideManageCustomer
  );
  const dispatch = useDispatch();
  const selectedCustomer = Props.selectedCustomer;
  const closeAddCustomer = () => {
    dispatch(selectingCustomer(newCustomer));
    dispatch(showHideManagecustomer(false));
  };
  const addCustomer = () => {
    if (selectedCustomer.id === "") {
      dispatch(addingCustomer({ ...selectedCustomer, id: uuid() }));
    } else {
      dispatch(editingCustomer(selectedCustomer));
    }
    closeAddCustomer();
  };

  const selectDOB = (date: Date) => {
    dispatch(selectingCustomer({ ...selectedCustomer, dob: date }));
  };
  const firstNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(
      selectingCustomer({
        ...selectedCustomer,
        firstName: e.currentTarget.value
      })
    );
  };
  const lastNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(
      selectingCustomer({
        ...selectedCustomer,
        lastName: e.currentTarget.value
      })
    );
  };
  const areStatesValid =
    selectedCustomer.firstName.length > 0 &&
    selectedCustomer.lastName.length > 0 &&
    selectedCustomer.dob;

  return (
    <Modal open={showOrHide}>
      <Modal.Header>
        Enter the customer details (All fields are mandatory)
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                onChange={firstNameChange}
                value={selectedCustomer.firstName}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                onChange={lastNameChange}
                value={selectedCustomer.lastName}
              />
            </Form.Field>
            <Form.Field>
              <label>Date of Birth</label>
              <span>
                <DatePicker
                  showMonthDropdown={true}
                  maxDate={new Date()}
                  showYearDropdown={true}
                  selected={selectedCustomer.dob}
                  onChange={selectDOB}
                  placeholderText="Click to select a date"
                />
              </span>
            </Form.Field>
          </Form>
        </Modal.Description>
        <Divider />
        <Button color="green" disabled={!areStatesValid} onClick={addCustomer}>
          Save
        </Button>
        <Button color="red" onClick={closeAddCustomer}>
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
  );
};
export default AddCustomer;
