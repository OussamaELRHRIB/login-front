import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddTransferService {
  private apiUrl = 'https://196.12.255.241:7020/api/BridgeHubMTO/AddTransfer';

  constructor(private http: HttpClient) {}

  addTransfer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
