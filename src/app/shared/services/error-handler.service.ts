import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  errorMessage: string = "";

  constructor(private router: Router) { }

  public handleError( error: HttpErrorResponse ){
    if(error.status === 500){
      this.handle500Error(error);
    }
    else if(error.status === 404){
      this.handle404Error(error);
    }
    else{
      this.handleOtherError(error);
    }
  }
  
  private handle404Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private handle500Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }
  
  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    $('#errorModal').modal();
  }
  
  private createErrorMessage(error: HttpErrorResponse) {
    this.errorMessage = error.error? error.error : error.statusText;
  }
}
