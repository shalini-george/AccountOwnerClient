import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OwnerForCreation } from 'src/app/_interfaces/owner.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {

  public ownerForm: FormGroup;
  public errorMessage: string = '';
  
  constructor(
    private repo: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public validateControl(controlName: string){
    if(this.ownerForm.controls[controlName].invalid &&  this.ownerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string){
    if(this.ownerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker(event){
    this.ownerForm.patchValue({'dateOfBirth': event });
  }

  public createOwner(ownerFormvalue){
    if(this.ownerForm.valid){
      this.executeOwnerCreation(ownerFormvalue);
    }
  }

  private executeOwnerCreation(ownerFormvalue: any) {
    let owner: OwnerForCreation = {
      name: ownerFormvalue.name,
      dateOfBirth: ownerFormvalue.dateOfBirth,
      address: ownerFormvalue.address
    }

    this.repo.create('api/owner', owner)
    .subscribe(res =>{
        $('#successModal').modal();
      },
      (error) =>{
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    )
  }

  public redirectToOwnerList(){  
    console.log('redirectToOwnerList');
    this.router.navigate(['/owner/list']);  
  }

}
