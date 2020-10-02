import React from 'react';
import { Box, Button, ButtonGroup, Card, CardContent, FormControl } from '@material-ui/core'
import { getDynamicForm, TransactionsForm } from '../SharedConstants'
import CRUDTable from './CRUDTable'
import axios from 'axios'

export default class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedMode: "Buy",
            mybody: null,
            rows: [],
            columns: []
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
                <Card>
                    <CardContent>
                        {<form>
                            <Box display="flex" justifyContent="center">
                                <FormControl margin="dense">
                                    <ButtonGroup disableElevation color="primary">
                                        <Button variant={this.state.selectedMode === "Buy" ? "contained" : ""}
                                            onClick={() => this.setState({ selectedMode: "Buy" })}>Buy</Button>
                                        <Button variant={this.state.selectedMode === "Sell" ? "contained" : ""}
                                            onClick={() => this.setState({ selectedMode: "Sell" })}>Sell</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Box>
                            {this.state.mybody}
                        </form>
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <CRUDTable rows={this.state.rows} columns={this.state.columns}
                            onCreate={this.handleCreateDoc} onUpdate={this.handleUpdateDoc} onDelete={this.handleDeleteDoc} />
                    </CardContent>
                </Card>
            </React.Fragment >
        );
    }
} 