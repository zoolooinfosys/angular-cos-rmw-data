import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient  } from '@angular/common/http';
import {Observable} from 'rxjs';
import { CustomerSummary } from '../models/customer.models'

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient ) { }

  public createRmwData(regionalId: number, service: string, data: any) : Observable<any> {
  
    console.log(data);

    return this.http.post(`${environment.apiUrl}/CreateRmwData?type=${service}"&regionalId=${regionalId}`, 
                    data, {responseType: 'json'});
  }

  public getRmwData(regionalId: number, service: string, id: string) : Observable<any>{
    return this.http.get(`${environment.apiUrl}/CreateRmwData?type=${service}"&regionalId=${regionalId}&id=${id}`);
  }

  public getAllCustomers(regionalId: number) : Observable<CustomerSummary[]> {
    return this.http
        .get<CustomerSummary[]>(`${environment.apiUrl}/GetCountrySummaries?regionalId=${regionalId}`);

  }
}
