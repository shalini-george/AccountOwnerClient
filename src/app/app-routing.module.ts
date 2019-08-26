import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';

const route: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'owner', loadChildren: './owner/owner.module#OwnerModule'},
  { path: '404', component: NotFoundComponent},
  { path: '500', component: InternalServerComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
] 

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(route) ]
})
export class AppRoutingModule { }
