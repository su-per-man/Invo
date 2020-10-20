import React from 'react';
import { Box, AppBar, Tabs, Tab } from '@material-ui/core'
import { getDynamicForm, TransactionsForm, OtherTransactionsForm } from '../SharedConstants'
import CRUDTable from './CRUDTable'
import { Alert } from '@material-ui/lab'
import { File } from 'react-kawaii'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';


export default class Transactions extends React.Component {
    constructor() {
        super()
        this._configurableTabs = [
            { label: "item", value: "transaction", columns: TransactionsForm },
            { label: "other", value: "othertransaction", columns: OtherTransactionsForm },
        ]
        this.state = {
            mybody: null,
            rows: null,
            columns: null,
            selectedTab: this._configurableTabs[0].value
        }
    }
    componentDidMount() {
        this.fetchAll()
    }
    fetchAll() {
        let promisesList = []
        promisesList.push(getDynamicForm(
            this._configurableTabs.filter((tab) => {
                return tab.value === this.state.selectedTab
            })[0].columns
        ).then((resp) => {
            this.fetchedForm = resp
        }).catch(e => {
            this.setState({
                mybody: 'Error'
            })
        }))
        promisesList.push(axios.get('/invo-api/' + this.state.selectedTab)
            .then(resp => this.fetchedRows = resp.data)
            .catch(this.handleError))
        Promise.all(promisesList).then(() => {
            this.setState({
                columns: this.fetchedForm || [],
                rows: this.fetchedRows || []
            })
        })
    }
    handleChange = (e, newVal) => {
        this.setState({ selectedTab: newVal }, this.fetchAll)
    }
    handleCreateDoc = (doc) => {
        axios.post('/invo-api/create-' + this.state.selectedTab, doc).then(resp => {
            this.setState({ rows: resp.data })
        }).catch(this.handleError)
    }
    handleUpdateDoc = (docID, doc) => {
        axios.post('/invo-api/update-' + this.state.selectedTab, { id: docID, data: doc }).then(resp => {
            this.setState({ rows: resp.data })
        }).catch(this.handleError)
    }
    handleDeleteDoc = (docID) => {
        axios.post('/invo-api/delete-' + this.state.selectedTab, { id: docID }).then(resp => {
            this.setState({ rows: resp.data })
        }).catch(this.handleError)
    }
    handleError = (e) => {
    }
    generateColor() {
        return '#' + Math.random().toString(16).substr(-6);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Transactions</h1 >
                <Box mb={3}>
                    <AppBar position="static" color="default">
                        <Tabs value={this.state.selectedTab} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                            {
                                this._configurableTabs.map((row) => {
                                    return <Tab label={row.label} value={row.value} />;
                                })
                            }
                        </Tabs>
                    </AppBar>
                </Box>
                <Box>
                    {
                        () => {
                            if (this.state.rows && this.state.columns) {
                                if (this.state.columns.length !== 0)
                                    return <CRUDTable rows={this.state.rows} columns={this.state.columns}
                                        onCreate={this.handleCreateDoc} onUpdate={this.handleUpdateDoc} onDelete={this.handleDeleteDoc} />
                                else
                                    return <Box p={3}>
                                        <Box justifyContent="center" display="flex">
                                            <File size={200} mood="sad" color="#83D1FB" />
                                        </Box>
                                        <Alert severity="error" variant="outlined">Internal Server Down</Alert>
                                    </Box>
                            }
                            return <Skeleton count={5} height={50} />
                        }
                    }
                </Box>
            </React.Fragment >
        );
    }
} 