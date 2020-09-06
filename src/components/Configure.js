import React from 'react'
import CRUDTable from './CRUDTable'
import { AppBar, Tabs, Tab, Box } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { File } from 'react-kawaii'

export default class Configure extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedIndex: 0, warehouses: null }
    }

    componentDidMount() {
        axios.get('/warehouses/').then(resp => {
            this.setState({ warehouses: resp.data })
        }).catch(e => this.setState({ warehouses: e.response.status }))
    }

    handleChange = (event, newValue) => {
        this.setState({
            selectedIndex: newValue
        })
    };
    handleDeleteDoc = (collectionName, docID) => {
        axios.post('/warehouses/delete', { id: docID }).then(resp => {
            this.setState({ warehouses: resp.data })
        }).catch(e => this.setState({ warehouses: e.response.status }))
    }
    handleUpdateDoc = (collectionName, docID, doc) => {
        axios.post('/warehouses/update', { id: docID, data: doc }).then(resp => {
            this.setState({ warehouses: resp.data })
        }).catch(e => this.setState({ warehouses: e.response.status }))
    }
    handleCreateDoc = (collectionName, doc) => {
        axios.post('/warehouses/create', doc).then(resp => {
            this.setState({ warehouses: resp.data })
        }).catch(e => this.setState({ warehouses: e.response.status }))
    }

    renderBody = (status) => {
        switch (status) {
            case null:
                return <Skeleton count={5} height={50} />
            case 500:
                return <Box>
                    <Box justifyContent="center" display="flex">
                        <File size={200} mood="sad" color="#83D1FB" />
                    </Box>
                    <Alert severity="error" variant="outlined">Internal Server Down</Alert>
                </Box>
            default:
                return <CRUDTable rows={this.state.warehouses} collectionName="warehouses"
                    onCreate={this.handleCreateDoc} onDelete={this.handleDeleteDoc} onUpdate={this.handleUpdateDoc} />
        }
    };

    render() {
        return (
            <React.Fragment>
                <h1>Configure</h1>
                <Box mb={3}>
                    <AppBar position="static" color="default">
                        <Tabs value={this.state.selectedIndex} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                            <Tab label="Warehouses" />
                            <Tab label="Items" />
                            <Tab label="Contacts" />
                        </Tabs>
                    </AppBar>
                </Box>
                <Box>
                    {this.renderBody(this.state.warehouses)}
                </Box>
            </React.Fragment>
        );
    }
} 