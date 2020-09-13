import {Injectable} from '@angular/core';

const rowData = [
    [
        { header: 'orderNumber', value: '1', type: 'valid'},
        { header: 'make', value: 'Toyota', type: 'invalid'},
        { header: 'model', value: 'Celica'},
        { header: 'price', value: '35000.00'}
    ]
];



@Injectable()
export class BranchService {
    private branchData = {
        rowData
    };

    get branches(): any {
        return this.branchData;
    }
}
