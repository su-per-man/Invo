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
        this._configurableTabs = [
            { label: "warehouses", value: "warehouse" },
            { label: "items", value: "item" },
            { label: "contacts", value: "contact" }
        ]
        this.state = { selectedTab: this._configurableTabs[0].value, dataVar: null }
    }

    componentDidMount() {
        this.fetchAll()
    }

    fetchAll() {
        axios.get('/invo-api/' + this.state.selectedTab).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(e => this.setState({ dataVar: e.response.status }))
    }

    handleChange = (event, newValue) => {
        this.setState({
            selectedTab: newValue
        }, this.fetchAll)
    };
    handleDeleteDoc = (docID) => {
        axios.post('/invo-api/delete-' + this.state.selectedTab, { id: docID }).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(e => this.setState({ dataVar: e.response.status }))
    }
    handleUpdateDoc = (docID, doc) => {
        axios.post('/invo-api/update-' + this.state.selectedTab, { id: docID, data: doc }).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(e => this.setState({ dataVar: e.response.status }))
    }
    handleCreateDoc = (doc) => {
        axios.post('/invo-api/create-' + this.state.selectedTab, doc).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(e => this.setState({ dataVar: e.response.status }))
    }

    renderBody = (status) => {
        if (status === null)
            return <Skeleton count={5} height={50} />
        if (status === 500)
            return <Box>
                <Box justifyContent="center" display="flex">
                    <File size={200} mood="sad" color="#83D1FB" />
                </Box>
                <Alert severity="error" variant="outlined">Internal Server Down</Alert>
            </Box>
        if (status.toString() === '')
            return <Box>
                <Box justifyContent="center" display="flex">
                    <File size={200} mood="ko" color="#83D1FB" />
                </Box>
                <Alert severity="info" variant="outlined">Nothing is there!</Alert>
            </Box>

        return <CRUDTable rows={this.state.dataVar}
            onCreate={this.handleCreateDoc} onDelete={this.handleDeleteDoc} onUpdate={this.handleUpdateDoc} />
    }

    render() {
        return (
            <React.Fragment>
                <h1>Configure</h1>
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
                    {this.renderBody(this.state.dataVar)}
                </Box>
            </React.Fragment>
        );
    }
} 