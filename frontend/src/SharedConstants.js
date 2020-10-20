import axios from 'axios'

export const DynamicForm = {
    TextField: 'TextField',
    DateField: 'DateField',
    SelectField: 'SelectField',
    NumberType: 'number'
}
export const CRUDModes = {
    Create: 'Create',
    Update: 'Update',
    Delete: 'Delete',
}

export const Configure_Warehouse = [
    { id: 'Name', label: 'Name', objectType: DynamicForm.TextField, required: true },
    { id: 'Location', label: 'Location', objectType: DynamicForm.TextField },
    { id: 'Description', label: 'Description', objectType: DynamicForm.TextField }
];

export const Configure_Item = [
    { id: 'Name', label: 'Name', objectType: DynamicForm.TextField, required: true },
    { id: 'Description', label: 'Description', objectType: DynamicForm.TextField }
];

export const Configure_Vendor = [
    { id: 'Vendor', label: 'Vendor', objectType: DynamicForm.TextField, required: true },
    { id: 'Responsible', label: 'Responsible', objectType: DynamicForm.TextField, required: true },
    { id: 'Location', label: 'Location', objectType: DynamicForm.TextField, required: true },
    { id: 'Phone', label: 'Phone', objectType: DynamicForm.TextField }
];

export const TransactionsForm = [
    { id: 'TransactionDate', label: 'Date', objectType: DynamicForm.DateField, required: true },
    { id: 'TransactionType', label: 'Type', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'Buy;Sell' },
    { id: 'Warehouse', label: 'Warehouse', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['warehouse', 'Name'] }, //{ Name: 1, _id: 0 }
    { id: 'Vendor', label: 'Vendor', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['vendor', 'Vendor'] },
    { id: 'TotalUnits', label: 'Total Units', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Unit', label: 'Unit', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'KG;Piece;Bundle', defaultValue: 'KG' },
    { id: 'CostPerUnit', label: 'Cost Per Unit', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Item', label: 'Item', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['item', 'Name'] },
];

export const OtherTransactionsForm = [
    { id: 'TransactionDate', label: 'Date', objectType: DynamicForm.DateField, required: true },
    { id: 'TransactionType', label: 'Type', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'Income;Expenditure' },
    { id: 'Vendor', label: 'Vendor', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['vendor', 'Vendor'] },
    { id: 'Amount', label: 'Amount', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Notes', label: 'Notes', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.TextField },
];

export const getDynamicForm = (frmObj) => {
    let inputForm = JSON.parse(JSON.stringify(frmObj))  //Clone object without reference
    return new Promise((resolve, reject) => {
        const allPromiseList = []
        inputForm.map((field, i) => {
            switch (field.objectType) {
                case DynamicForm.SelectField:
                    if (typeof (field.dropdownValues) === 'object') {
                        allPromiseList.push(
                            fillDropdownValues(field.dropdownValues)
                                .then(res => {
                                    inputForm[i].dropdownValues = res
                                })
                                .catch(e => reject(e)))
                    }
                    else {
                        inputForm[i].dropdownValues = field.dropdownValues.split(';').map((f, x) => f)
                    }
                    break;
                default:
                    break;
            }
            return 1
        })
        Promise.all(allPromiseList).then(() => resolve(inputForm))
    })
}

const fillDropdownValues = (dropDownValObj) => {
    return new Promise((resolve, reject) => {
        axios.post('/invo-api/fetch-field', { collectionParam: dropDownValObj[0], fieldParam: dropDownValObj[1] })
            .then(resp => {
                let temp = {}
                temp = resp.data.map(obj => obj[dropDownValObj[1]])
                resolve(temp)
            })
            .catch(e => reject(e))
    })
}