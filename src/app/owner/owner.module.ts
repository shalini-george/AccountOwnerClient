import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { OwnerUpdateComponent } from './owner-update/owner-update.component';
import { OwnerDeleteComponent } from './owner-delete/owner-delete.component';

@NgModule({
  declarations: [
    OwnerListComponent, 
    OwnerDetailsComponent, 
    OwnerCreateComponent, 
    OwnerUpdateComponent, 
    OwnerDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: OwnerListComponent },
      { path: 'details/:id', component: OwnerDetailsComponent },
      { path: 'create', component: OwnerCreateComponent },
      { path: 'update/:id', component: OwnerUpdateComponent },
      { path: 'delete/:id', component: OwnerDeleteComponent }
    ])    
  ]
})
export class OwnerModule { }
