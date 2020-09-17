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
    private editable: boolean = false;
    private class: string;

    agInit(params: any): void {
        this.columnName = params.column.colDef.headerName;
        this.key = params.context.createKey(params.columnApi, params.column);
        this.rowId = params.node.id;
        const data = params.value;
        this.value = data.value;
        this.editable = data.editable;
        this.class = data.class || 'default';
    }

    refresh(params: any): boolean {
        this.formGroup = params.context.formGroup.controls[this.rowId];
        this.formGroup.at(this.key).patchValue(this.value);

        return true;
    }
}
