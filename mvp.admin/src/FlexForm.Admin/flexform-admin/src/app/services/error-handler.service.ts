import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ErrorDialogComponent } from '../components/common/error-dialog/error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  isConsoleLogEnabled: boolean;
  isDialogWindowEnabled: boolean;

  constructor(public dialog: MatDialog) {
    this.isConsoleLogEnabled = true;
    this.isDialogWindowEnabled = true;
   }

  public handle(response: HttpErrorResponse):void{
    if(this.isDialogWindowEnabled){
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        height: '250px',
        data: {title: "Error", message: response.message}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    if(this.isDialogWindowEnabled){
      console.log(response);
    }
  }
}
