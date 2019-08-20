/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw } from "rxjs/observable/throw";

/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {
  public handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.log("FATAL ERROR; ", errorResponse);
    //return _throw (errorResponse.error || errorResponse.error.error || 'Server error');
    return _throw (errorResponse);
  }
}
