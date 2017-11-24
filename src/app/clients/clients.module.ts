import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientsService } from './clients.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientsListComponent
      },
      {
        path: ':id',
        component: ClientDetailComponent
      },
      {
        path: ':id/edit',
        component: ClientEditComponent,
      }
    ]),
    PaginationModule.forRoot()
  ],
  declarations: [
    ClientsListComponent,
    ClientDetailComponent,
    ClientEditComponent
  ],
  providers: [
    ClientsService
  ]
})
export class ClientsModule { }
