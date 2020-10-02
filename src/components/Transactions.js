import React from 'react';
import { Box } from '@material-ui/core'
import { getDynamicForm, TransactionsForm } from '../SharedConstants'
import CRUDTable from './CRUDTable'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';

export default class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            mybody: null,
            rows: null,
            columns: null
        }
    }
    componentDidMount() {
        let promisesList = []
        promisesList.push(getDynamicForm(TransactionsForm).then((resp) => {
            this.fetchedForm = resp
        }).catch(e => {
            this.setState({
                mybody: 'Error'
            })
        }))
        promisesList.push(axios.get('/invo-api/transaction')
            .then(resp => this.fetchedRows = resp.data)
            .catch(e => {
                console.log(e)
            }))
        Promise.all(promisesList).then(() => {
            this.setState({
                columns: this.fetchedForm || [],
                rows: this.fetchedRows || []
            })
        })
    }
    handleCreateDoc = (doc) => {
        axios.post('/invo-api/create-transaction', doc).then(resp => {
            this.setState({ rows: resp.data })
        }).catch(this.handleError)
    }
    handleUpdateDoc = (docID, doc) => {
        axios.post('/invo-api/update-transaction', { id: docID, data: doc }).then(resp => {
            this.setState({ rows: resp.data })
        }).catch(this.handleError)
    }
    handleDeleteDoc = (docID) => {
        axios.post('/invo-api/delete-transaction', { id: docID }).then(resp => {
            this.setState({ rows: resp.data })
        }).catch(this.handleError)
    }
    render() {
        return (
            <React.Fragment>
                <h1>Transactions</h1 >
                <Box>
                    {this.state.rows && this.state.columns
                        ?
                        <CRUDTable rows={this.state.rows} columns={this.state.columns}
                            onCreate={this.handleCreateDoc} onUpdate={this.handleUpdateDoc} onDelete={this.handleDeleteDoc} />
                        :
                        <Skeleton count={5} height={50} />
                    }
                </Box>
            </React.Fragment >
        );
    }
} 