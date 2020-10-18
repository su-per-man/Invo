import React from 'react';
import { Box, AppBar, Tabs, Tab, Card, CardHeader, CardActionArea, Divider, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { getDynamicForm, TransactionsForm } from '../SharedConstants'
import CRUDTable from './CRUDTable'
import { Alert } from '@material-ui/lab'
import { File } from 'react-kawaii'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import { green, red } from '@material-ui/core/colors';
import { CallMade, CallReceived } from '@material-ui/icons';


export default class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            mybody: null,
            rows: null,
            columns: null,
            selectedTab: 'ItemFlow'
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
    handleChange = (e, newVal) => {
        this.setState({ selectedTab: newVal })
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
                            <Tab label='Item Flow' value='ItemFlow' />
                            <Tab label='Cash Flow' value='CashFlow' />
                        </Tabs>
                    </AppBar>
                </Box>
                <Box>
                    {
                        (
                            this.state.selectedTab === 'ItemFlow' && this.state.rows && this.state.columns &&
                            (
                                (
                                    this.state.columns.length !== 0 &&
                                    <CRUDTable rows={this.state.rows} columns={this.state.columns}
                                        onCreate={this.handleCreateDoc} onUpdate={this.handleUpdateDoc} onDelete={this.handleDeleteDoc} />
                                )
                                ||
                                <Box p={3}>
                                    <Box justifyContent="center" display="flex">
                                        <File size={200} mood="sad" color="#83D1FB" />
                                    </Box>
                                    <Alert severity="error" variant="outlined">Internal Server Down</Alert>
                                </Box>
                            )
                            ||
                            this.state.selectedTab === 'CashFlow' &&
                            (
                                <List>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar style={{ backgroundColor: green[500] }}> <CallReceived /> </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Suman Kumar" secondary="September 14, 2016" />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar style={{ backgroundColor: red[500] }}> <CallMade /> </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Suman Kumar" secondary="September 14, 2016" />
                                    </ListItem>
                                </List>
                            )

                        )
                        ||
                        <Skeleton count={5} height={50} />
                    }
                </Box>
            </React.Fragment >
        );
    }
} 