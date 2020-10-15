import React from 'react';
import { Box, AppBar, Tabs, Tab } from '@material-ui/core'
import { getDynamicForm, TransactionsForm } from '../SharedConstants'
import CRUDTable from './CRUDTable'
import { Alert } from '@material-ui/lab'
import { File } from 'react-kawaii'
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
            .catch(this.handleError))
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
    handleError = (e) => {
    }

    render() {
        return (
            <React.Fragment>
                <h1>Transactions</h1 >
                <Box>
                    <AppBar position="static" color="default">
                        <Tabs value={this.state.selectedTab} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                            <Tab label='Item Flow' value='Item Flow' />
                            <Tab label='Cash Flow' value='Cash Flow' />;
                        </Tabs>
                    </AppBar>
                </Box>
                <Box>
                    {this.state.rows && this.state.columns
                        ?
                        (this.state.columns.length !== 0
                            ?
                            <CRUDTable rows={this.state.rows} columns={this.state.columns}
                                onCreate={this.handleCreateDoc} onUpdate={this.handleUpdateDoc} onDelete={this.handleDeleteDoc} />
                            :
                            <Box p={3}>
                                <Box justifyContent="center" display="flex">
                                    <File size={200} mood="sad" color="#83D1FB" />
                                </Box>
                                <Alert severity="error" variant="outlined">Internal Server Down</Alert>
                            </Box>
                        )
                        :
                        <Skeleton count={5} height={50} />
                    }
                </Box>
            </React.Fragment >
        );
    }
} 