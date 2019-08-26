import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/_interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  
  public owner: Owner;
  public errorMessage: string = "";

  constructor(
    private repo: RepositoryService,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getOwnerDetails();
  }
  
  private getOwnerDetails() {    
    let id = this.activeRoute.snapshot.params["id"];

    this.repo.getData(`api/owner/${id}`)
    .subscribe(      
      owner =>  {    
        this.owner = owner as Owner;        
      }
    ),
    (error) =>
    {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    }
  }

  private goBack(){
    this.location.back();
  }

}
