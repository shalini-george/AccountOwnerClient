import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Owner } from 'src/app/_interfaces/owner.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {

  public ownerForm: FormGroup;
  public owner: Owner;
  public errorMessage: string = '';

  constructor(private activeRoute: ActivatedRoute,
    private repo: RepositoryService,
    private datePipe: DatePipe,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    })

    this.getOwnerById();
  }

  public validateControl(controlName: string) {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker(event) {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }

  public redirectToOwnerList() {
    this.router.navigate(['/owner/list']);
  }

  public updateOwner(ownerFromValue) {
    if (this.ownerForm.valid)
      this.executeOwnerUpdate(ownerFromValue);
  }

  private executeOwnerUpdate(ownerFromValue) {
    this.owner.name = ownerFromValue.name;
    this.owner.dateOfBirth = ownerFromValue.dateOfBirth;
    this.owner.address = ownerFromValue.address;

    this.repo.update(`api/owner/${this.owner.id}`, this.owner)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      )
  }

  private getOwnerById() {
    let id = this.activeRoute.snapshot.params['id'];

    this.repo.getData(`api/owner/${id}`)
      .subscribe(res => {
        this.owner = res as Owner;
        this.ownerForm.patchValue(this.owner);
        $('#dateOfBirth').val(this.datePipe.transform(this.owner.dateOfBirth, 'MM/dd/yyyy'));
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      )
  }
}
