import { EmployeesItemType } from "./genericTypes"

export type EmployeesStateTypes = {
  employeeData: Array<EmployeesItemType>;
}

export type EmployeesStoreTypes = {
  employee: EmployeesStateTypes;
};

