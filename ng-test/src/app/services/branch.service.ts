import {Injectable} from '@angular/core';

const rowData = [
    { orderNumber: { value: 1, editable: false }, make: { value: "Toyota", editable:true }, model: { value: 'Celica', editable:true}, price: { value: 35000, editable:true} },
    { orderNumber: { value: 5, editable: false }, make: { value: "Ford", editable: true },  model: { value: "Mondeo", editable:true}, price: { value: 32000, editable:true} },
    { orderNumber: { value: 7, editable: false }, make: { value: "Porsche", editable:true }, model: { value: "Boxter", editable:true}, price: { value: 7200, editable:true} },
    { orderNumber: { value: 11, editable: false }, make: { value: "Seat", editable:true }, model: { value: "Leon", editable:true}, price: { value: 32000, editable:true} },
    { orderNumber: { value: 20, editable: false }, make: { value: "Honda", editable:true }, model: { value: "CRV", editable:true, class: 'valid'}, price: { value: 35000, editable:true, class: 'invalid'} }
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
