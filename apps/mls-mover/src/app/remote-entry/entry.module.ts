import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { MlsMoverComponent } from '../mls/mls-mover.component';
import { remoteRoutes } from './entry.routes';
import { HttpClientModule } from '@angular/common/http';
import { MlsService } from '../mls/mls.service';

@NgModule({
  declarations: [RemoteEntryComponent, MlsMoverComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(remoteRoutes),
  ],
  providers: [MlsService],
})
export class RemoteEntryModule {}
