import {EntityState, createEntityAdapter} from '@ngrx/entity';

import {
  CustomerActionTypes, CustomerActions,
} from '../actions/customer.actions';
import { CustomerSummary } from '../../models/customer.models';

// This adapter will allow is to manipulate customers (mostly CRUD operations)
export const customerssAdapter = createEntityAdapter<CustomerSummary>({
  selectId: (customer: CustomerSummary) => customer.bpid,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[] | number[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface CustomerState extends EntityState<CustomerSummary> {
    ids: string[] | number[];
    entities: { [id: string]: CustomerSummary };
}

export const INIT_STATE: CustomerState = customerssAdapter.getInitialState({
  currentBpId: undefined
});



export function reducer(
  state: CustomerState = INIT_STATE,
  {type, payload}: CustomerActions
) {

  switch (type) {

    case CustomerActionTypes.LOAD_ALL_CUSTOMERS : {
      return customerssAdapter.addAll(payload, state);
    }


    case CustomerActionTypes.LOAD_CUSTOMER_SUCCESS : {
      return customerssAdapter.addOne(payload, {
        ...state,
        currentCustomerId: payload.bpid
      });
    }

    case CustomerActionTypes.CREATE_CUSTOMER_SUCCESS : {
      return customerssAdapter.addOne(payload, {
        ...state
      });
    }

    case CustomerActionTypes.DELETE_CUSTOMER_SUCCESS : {
      return customerssAdapter.removeOne(payload, state);
    }

    default: return state;

  }
}
