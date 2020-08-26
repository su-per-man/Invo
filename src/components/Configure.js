import React from 'react'
import CRUDTable from './CRUDTable'

export default class Transaction extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Configure</h1>
                <CRUDTable />
            </React.Fragment>
        );
    }
} 