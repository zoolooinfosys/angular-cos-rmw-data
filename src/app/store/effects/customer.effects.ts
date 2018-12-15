import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';

import {
  CustomerActionTypes,
  CreateCustomer,
  CreateCustomerSuccess,
  DeleteCustomer,
  DeleteCustomerSuccess,
  Failure,
  LoadCustomer,
  LoadAllCustomers,
  LoadAllCustomerSuccess,
  LoadCustomerSuccess
} from '../actions/customer.actions';

import {Actions, Effect, ofType} from '@ngrx/effects';
import { CustomerSummary } from '../../models/customer.models';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { CustomersService } from '../../services/customer.service';

@Injectable()
export class CustomersEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
      ofType(CustomerActionTypes.LOAD_ALL_CUSTOMERS), /* When [Customer] LOAD ALL action is dispatched */
      startWith((action: LoadAllCustomers) => new LoadAllCustomers(action.payload)),
      switchMap( (action: LoadAllCustomers) => this.customersService.getAllCustomers(action.payload.regionId)), /* Hit the Contacts Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'Customer Reducers' will take care of the rest */
      map((customers: CustomerSummary[]) => new LoadAllCustomerSuccess(customers))
    );

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(CustomerActionTypes.LOAD_CUSTOMER),
    map( (action: LoadCustomer ) => action.payload),
    switchMap(val => this.customersService.getRmwData(val.regionId, "ValidateCustomer",  String(val.bpid))),
    map(val => new LoadCustomerSuccess(val))
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(CustomerActionTypes.CREATE_CUSTOMER),
    map((action: CreateCustomer) => action.payload),
    switchMap(val => this.customersService.createRmwData(val.regionId, "ValidateCustomer", val.data)),
    map( (createCustomer: any) => new CreateCustomerSuccess(createCustomer)),
    catchError(err => {
      alert(err['message']);
      return of(new Failure({concern: 'CREATE', error: err}));
    })
  );


  //@Effect()
  //destroy$: Observable<Action> = this.actions$.pipe(
  //  ofType(CustomerActionTypes.DELETE_CUSTOMER),
  //  map((action: DeleteCustomer) => action.payload),
  //  switchMap(
  //    (bpid: number) => this.contactsService.destroy(bpid).pipe(
  //      map( () => new DeleteCustomerSuccess(id))
  //    )
  //  )
  //);



  constructor(
      private actions$: Actions,
      private customersService: CustomersService
  ) {}


}
