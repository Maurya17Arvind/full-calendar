import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import data from '../../assets/data.json'

@Injectable({
  providedIn: 'root'
})
export class ClosePopupServiceService {

  public token:any = "5cd6d0b2f8c210f645e9f6a270033012c5c97bd4";
  public header = new HttpHeaders().set('Authorization', this.token);
  constructor(private http:HttpClient) { 
   
  }

  getData():any {
    return data;
  }

  public getPromoData(){
    const params = {
      "filter_options": {},
      "company": 622,
      "firstday": "2022-08-28",
      "lastday": "2022-12-31",
      "monthno": 12,
      "year": 2022,
      "page": 1,
      "limit": 2000
    }
    let urlSearchParams = new HttpParams();
    urlSearchParams =this.getUrlSearchParams(params);
    return this.http.get('https://staging.promoprep.com/api/promoprep/promos', { params: urlSearchParams ,headers: this.header})
  }
  public getUrlSearchParams(object:any): HttpParams {
    let urlSearchParams = new HttpParams();
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if (key === 'filter_options') {
          const filterObj = object['filter_options'];
          for (let key in filterObj) {
            urlSearchParams = urlSearchParams.append(`filter_options[${key}]`, filterObj[key]);
          }
        } else {
          urlSearchParams = urlSearchParams.append(key, object[key]);
        }
      }
    }
    return urlSearchParams;
  }
}
