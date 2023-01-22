import { LightningElement , wire} from 'lwc';
import getAccounts from '@salesforce/apex/tableController.getAccounts';

const COLUMNS = [
    {label:'Account Name', fieldName:'Name'},
    {label:'Annual Revenue',fieldName:'AnnualRevenue', type:'currency',cellAttributes:{
        class:{fieldName:'amountColor'}
    }},
    {label:'Industry', fieldName:'Industry', type:'text'},
    {label:'Phone', fieldName:'Phone', type:'phone'},   //by adding type currency we it will auromatically show $
]

export default class DataTableDemo extends LightningElement {
    tableData
    columns = COLUMNS;
    @wire(getAccounts)
    accountsHandler({data, error}){
        if(data){
          
            this.tableData=data.map(item=>{
                let amountColor = item.AnnualRevenue < 500000 ? "slds-text-color_error" : "slds-text-color_success"
                return {...item , "amountColor":amountColor}
            });
            console.log(this.tableData)
        }
        if(error){
            console.log(error)
        }
    }
}










// @wire(getAccounts)
// accountsHandler({data, error}){
//     if(data){
//         console.log(data)
//     }
//     if(error){
//         console.log(error)
//     }
// }