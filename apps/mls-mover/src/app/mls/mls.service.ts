import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { Merchant, MerchantStatus } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MlsService {
  public merchants$ = new BehaviorSubject<Array<Merchant>>([]);
  public merchantStatus$ = new Subject<MerchantStatus>();
  private statuses: MerchantStatus[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadMerchants();
  }

  loadMerchants() {
    console.log('getting merchants');
    this.httpClient
      .get<Array<Merchant>>('http://localhost:3000/merchants')
      .subscribe((list) => this.merchants$.next(list));
  }

  loadMerchantStatus(mid: string) {
    const merchant = this.statuses.find((m) => m.merchantNumber == mid);
    if (merchant) {
      this.merchantStatus$.next(merchant);
      return;
    }

    this.httpClient
      .get<Array<MerchantStatus>>(
        `http://localhost:3000/merchantStatuses?merchantNumber=${mid}`
      )
      .subscribe((merchants) => {
        const m = merchants[0];
        this.merchantStatus$.next(m);
        this.statuses = [m, ...this.statuses];
      });
  }
}
