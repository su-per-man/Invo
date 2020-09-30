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

export const Configure_Contact = [
    { id: 'FirstName', label: 'First Name', objectType: DynamicForm.TextField, required: true },
    { id: 'LastName', label: 'Last Name', objectType: DynamicForm.TextField },
    { id: 'Company', label: 'Company', objectType: DynamicForm.TextField, required: true },
    { id: 'Location', label: 'Location', objectType: DynamicForm.TextField, required: true },
    { id: 'Phone', label: 'Phone', objectType: DynamicForm.TextField }
];

const Transactions_Form = [
    { id: 'TransactionDate', label: 'Transaction Date', objectType: DynamicForm.DateField, required: true },
    { id: 'Warehouse', label: 'Warehouse', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['warehouse', 'Name'] }, //{ Name: 1, _id: 0 }
    { id: 'Contact', label: 'Buyer/Seller', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['contact', 'FirstName'] },
    { id: 'TotalUnits', label: 'Total Units', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Unit', label: 'Unit', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'KG;Piece;Bundle', defaultValue: 'KG' },
    { id: 'CostPerUnit', label: 'Cost Per Unit', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Item', label: 'Item', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['item', 'Name'] },
];

export const getDynamicForm = (formName) => {
    return new Promise((resolve, reject) => {
        let result
        const allPromiseList = []
        switch (formName) {
            case 'Transactions_Form':
                result = Transactions_Form
                break;
            default:
                console.log(formName + ' doesn\'t exists')
        }
        result.map((field, i) => {
            switch (field.objectType) {
                case DynamicForm.SelectField:
                    if (typeof (field.dropdownValues) === 'object')
                        allPromiseList.push(
                            fillDropdownValues(field.dropdownValues)
                                .then(res => {
                                    result[i].dropdownValues = res
                                })
                                .catch(e => console.log(e)))
                    else {
                        result[i].dropdownValues = field.dropdownValues.split(';').map(f => f)
                    }
                    break;
                default:
                    break;
            }
            return 1
        })
        Promise.all(allPromiseList).then(() => resolve(result))
    })
}

const fillDropdownValues = (dopDownValObj) => {
    return new Promise((resolve, reject) => {
        axios.post('/invo-api/fetch-field', { collectionParam: dopDownValObj[0], fieldParam: dopDownValObj[1] })
            .then(resp => {
                let temp = {}
                temp = resp.data.map(obj => obj[dopDownValObj[1]])
                resolve(temp)
            })
            .catch(e => reject(console.log(e)))
    })
}