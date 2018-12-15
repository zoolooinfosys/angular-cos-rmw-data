import {Action} from '@ngrx/store';
import { CustomerSummary } from '../../models/customer.models';


export enum CustomerActionTypes {

  LOAD_ALL_CUSTOMERS = '[Customers] LOAD ALL',
  LOAD_ALL_CUSTOMERS_SUCCESS = '[Customers] LOAD ALL SUCCESS',

  LOAD_CUSTOMER = '[Customers] LOAD',
  LOAD_CUSTOMER_SUCCESS = '[Customers] LOAD SUCCESS',

  CREATE_CUSTOMER = '[Customers] CREATE',
  CREATE_CUSTOMER_SUCCESS = '[Customers] CREATE SUCCESS',

  DELETE_CUSTOMER = '[Customers] DELETE',
  DELETE_CUSTOMER_SUCCESS = '[Customers] DELETE SUCCESS',

  FAILURE = '[Customers] FAILURE',
}

export class LoadAllCustomers implements Action {
  readonly type = CustomerActionTypes.LOAD_ALL_CUSTOMERS;
  constructor(public payload : { regionId: number }) {}
}

export class LoadCustomer implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER;
  constructor(public payload: { regionId: number, bpid: number }) {}
}

export class CreateCustomer implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER;
  constructor(public payload: { regionId:number, data: any}) {}
}

export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER;
  constructor(public payload: {regionId: number, bpid: number}) {}
}

export class LoadAllCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.LOAD_ALL_CUSTOMERS;
  constructor(public payload: CustomerSummary[]) {}
}

export class LoadCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_SUCCESS;
  constructor(public payload: {bpid: number}) {}
}

export class Failure implements Action {
  readonly type = CustomerActionTypes.FAILURE;
  constructor (public payload: {concern: 'CREATE' | 'PATCH', error: any}) {}
}

export type CustomerActions =
    | LoadAllCustomers
    | LoadCustomer
    | CreateCustomer
    | DeleteCustomer
    | LoadAllCustomerSuccess
    | LoadCustomerSuccess
    | CreateCustomerSuccess
    | DeleteCustomerSuccess
    | Failure;
