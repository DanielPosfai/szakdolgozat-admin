import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-confirmDialog',
    templateUrl: 'confirmDialog.component.html',
})

export class ConfirmDialogComponent { 

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string;
        }
    ){}

}