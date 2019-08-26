import { Component, OnInit } from '@angular/core';

import { Owner } from 'src/app/_interfaces/owner.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  public owners: Owner[];
  public errorMessage: string = "";

  constructor(
    private repo: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getAllOwners();
  }

  private getAllOwners() {
   
    return this.repo.getData('api/owner')
      .subscribe(
        owners => {        
          {
            this.owners = owners as Owner[];                   
          }
        }
      ),
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
  }

  public getOwnerDetails(id: string) {
    this.router.navigate([`/owner/details/${id}`])
  }

  public redirectToUpdatePage(id: string) {
    this.router.navigate([`/owner/update/${id}`]);
  }

  public redirectToDeletePage(id: string) {
    this.router.navigate([`/owner/delete/${id}`]);
  }
}
