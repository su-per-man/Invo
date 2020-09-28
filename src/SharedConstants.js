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

export const Transactions_Form = [
    { id: 'TransactionDate', label: 'Transaction Date', objectType: DynamicForm.DateField, required: true },
    { id: 'Warehouse', label: 'Warehouse', objectType: DynamicForm.SelectField, required: true, dropdownValues: ['warehouse', 'Name'] }, //{ Name: 1, _id: 0 }
    { id: 'Contact', label: 'Buyer/Seller', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'KG;Piece;Bundle' },
    { id: 'TotalUnits', label: 'Total Units', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Unit', label: 'Unit', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'KG;Piece;Bundle', defaultValue: 'KG' },
    { id: 'CostPerUnit', label: 'Cost Per Unit', objectType: DynamicForm.TextField, required: true, inputType: DynamicForm.NumberType },
    { id: 'Item', label: 'Item', objectType: DynamicForm.SelectField, required: true, dropdownValues: 'KG;Piece;Bundle' },
]