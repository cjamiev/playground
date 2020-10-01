import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Column, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid';
import { FormCellComponent } from './form-cell/form-cell.component';
import { BranchService } from '../../../services/branch.service';

const COLUMN_DEF = [
    {
        headerName: 'Order #',
        field: 'orderNumber',
        cellRenderer: 'formCell'
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
        this.rowData = this.branchService.branches.rowData;
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
            const formArray: FormArray = new FormArray([]);
            columns
                .forEach((column: Column) => {
                    const key = this.createKey(this.columnApi, column);
                    formArray.setControl(<number> key, new FormControl());
                });
            gridDataGroup.addControl(<string> rowNode.id, formArray);
        });
    }

    getComponents(): any {
        return {'formCell': FormCellComponent};
    }

    getContext(): any {
        return {
            rowData: this.branchService.branches.rowData,
            formGroup: this.gridForm.controls.gridData,
            createKey: this.createKey
        };
    }

    onSubmit(): void {
        const rowData = this.branchService.branches.rowData;
        const editedData = this.gridForm.value.gridData;
        const formattedData = rowData.map((row, rowIndex) => {
            const editedRow = editedData[rowIndex];
            return Object.entries(row).map((cell, colId) => {
              const colName = cell[0];
              const colValue = cell[1] as object;
              return {
                [colName]: {
                  ...colValue,
                  value: editedRow[colId]
                }
              };
            });
          });

        console.log(formattedData);
    }

    private createKey(columnApi: ColumnApi, column: Column): any {
        return columnApi.getAllColumns().indexOf(column);
    }
}