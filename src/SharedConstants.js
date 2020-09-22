export const DynamicForm = {
    TextField: 'TextField',
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