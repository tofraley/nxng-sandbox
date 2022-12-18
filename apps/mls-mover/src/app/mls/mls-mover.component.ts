import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MlsService } from './mls.service';
import { Merchant, MerchantStatus } from '../models';

@Component({
  selector: 'nxng-sandbox-mls-mover',
  template: `
    <div>
      <h1>MLS Mover</h1>
      <p>
        Caution! MLS Mover will break the merchant in Compass, but can be useful
        if you are testing a boarding process.
      </p>
      <div>
        <ng-container *ngIf="this.merchants$ | async as merchants">
          <ul>
            <li
              *ngFor="let merchant of merchants"
              (click)="selectMerchant(merchant.id)"
            >
              {{ merchant.id }}
            </li>
          </ul>
        </ng-container>
      </div>
      <div>
        <div *ngIf="this.merchantStatus$ | async as merchant">
          <p>{{ merchant.status.displayName }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MlsMoverComponent implements OnInit {
  selectedMid: string | undefined;
  merchants$: BehaviorSubject<Array<Merchant>>;
  merchantStatus$: Observable<MerchantStatus>;

  constructor(private mlsService: MlsService) {
    this.merchants$ = new BehaviorSubject<Array<Merchant>>([]);
    this.merchantStatus$ = new Observable<MerchantStatus>();
  }

  ngOnInit(): void {
    this.merchants$ = this.mlsService.merchants$;
    this.merchantStatus$ = this.mlsService.merchantStatus$;
  }

  selectMerchant(mid: string) {
    this.selectedMid = mid;
    this.mlsService.loadMerchantStatus(mid);
  }
}
