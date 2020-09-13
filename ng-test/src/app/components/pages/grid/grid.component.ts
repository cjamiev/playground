import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {Column, ColumnApi, GridApi, GridReadyEvent, RowNode} from 'ag-grid';
import {FormCellComponent} from './form-cell/form-cell.component';
import { BranchService } from '../../../services/branch.service';

const COLUMN_DEF = [
    {
        headerName: 'Order #',
        field: 'orderNumber',
        width: 110,
        suppressSizeToFit: true
    },
    {
        headerName: 'Make',
        field: 'make',
        cellRenderer: 'formCell'
    },
    {
        headerName: 'Model',
        field: 'model',
        cellRenderer: 'formCell'
    },
    {
        headerName: 'Price',
        field: 'price',
        cellRenderer: 'formCell'
    }
];

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
})

export class GridComponent {
    private api: GridApi;
    private columnApi: ColumnApi;
    gridForm: FormGroup = new FormGroup({gridData: new FormGroup({})});
    columnDefs;
    rowData;

    constructor(private branchService: BranchService) {
        this.columnDefs = COLUMN_DEF;
        this.updateForm();
    }

    updateForm(): void {
        this.rowData = this.branchService.branches.rowData.map(row => {
            return row.reduce((accumulator, cell) => {
              return {
                ...accumulator,
                [cell.header]: cell.value
              };
            }, {});
          });
    }

    refreshFormControls(): void {
        if (this.api) {
            this.createFormControls();
            this.api.refreshCells({force: true});
        }
    }

    gridReady(params: GridReadyEvent): void {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.refreshFormControls();
        this.api.sizeColumnsToFit();
    }

    private createFormControls(): void {
        const columns = this.columnApi.getAllColumns();
        const gridDataGroup = (<FormGroup>this.gridForm.controls['gridData']);

        this.api.forEachNode((rowNode: RowNode) => {
            console.log(rowNode);
            const formArray: FormArray = new FormArray([]);
            columns
                .forEach((column: Column) => {
                    const key = this.createKey(this.columnApi, column);
                    formArray.setControl(<any>key, new FormControl());
                });
            gridDataGroup.addControl(<any>rowNode.id, formArray);
        });
    }

    getComponents(){
        return {'formCell': FormCellComponent};
    }

    getContext() {
        return {
            cellProperties: this.branchService.branches.rowData,
            formGroup: this.gridForm.controls.gridData,
            createKey: this.createKey
        };
    }

    onSubmit() {
        console.log(this.gridForm.value);
    }

    private createKey(columnApi: ColumnApi, column: Column): any {
        return columnApi.getAllColumns().indexOf(column) - 1;
    }
}
