import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
    selector: 'app-form-cell',
    templateUrl: './form-cell.component.html',
    styleUrls: ['./form-cell.component.css'],
})

export class FormCellComponent {
    formGroup: FormArray;
    private key: number;
    private value: string;
    private columnName: string;
    private rowId: number;

    agInit(params: any): void {
        this.columnName = params.column.colDef.headerName;
        this.key = params.context.createKey(params.columnApi, params.column);
        this.value = params.value;
        this.rowId = params.node.id;
    }

    refresh(params: any): boolean {
        this.formGroup = params.context.formGroup.controls[this.rowId];
        this.formGroup.at(this.key).patchValue(this.value);

        return true;
    }
}
