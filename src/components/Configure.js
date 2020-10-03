import React from 'react'
import CRUDTable from './CRUDTable'
import { AppBar, Tabs, Tab, Box, Snackbar } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { File } from 'react-kawaii'
import { Configure_Warehouse, Configure_Item, Configure_Vendor } from '../SharedConstants'

export default class Configure extends React.Component {
    constructor(props) {
        super(props)
        this._configurableTabs = [
            { label: "warehouses", value: "warehouse", columns: Configure_Warehouse },
            { label: "items", value: "item", columns: Configure_Item },
            { label: "vendor", value: "vendor", columns: Configure_Vendor }
        ]
        this.state = {
            selectedTab: this._configurableTabs[0].value,
            dataVar: null,
            showStatus: false,
            statusMessage: null
        }
    }

    componentDidMount() {
        this.fetchAll()
    }

    fetchAll() {
        axios.get('/invo-api/' + this.state.selectedTab).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(this.handleError)
    }

    handleChange = (event, newValue) => {
        this.setState({
            selectedTab: newValue
        }, this.fetchAll)
    };
    handleDeleteDoc = (docID) => {
        axios.post('/invo-api/delete-' + this.state.selectedTab, { id: docID }).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(this.handleError)
    }
    handleUpdateDoc = (docID, doc) => {
        axios.post('/invo-api/update-' + this.state.selectedTab, { id: docID, data: doc }).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(this.handleError)
    }
    handleCreateDoc = (doc) => {
        axios.post('/invo-api/create-' + this.state.selectedTab, doc).then(resp => {
            this.setState({ dataVar: resp.data })
        }).catch(this.handleError)
    }
    handleError = (e) => {
        let temp = e.request.response
        if (temp.includes("E11000"))
            this.setState({ showStatus: true, statusMessage: "Already exists. Duplicate is not allowed" })
        else if (temp.includes("Proxy error:"))
            this.setState({ dataVar: "Proxy Error" })
    }

    renderBody = (status) => {
        if (status === null)
            return <Skeleton count={5} height={50} />
        else if (status === "Proxy Error")
            return <Box>
                <Box justifyContent="center" display="flex">
                    <File size={200} mood="sad" color="#83D1FB" />
                </Box>
                <Alert severity="error" variant="outlined">Internal Server Down</Alert>
            </Box>
        else
            return <CRUDTable rows={this.state.dataVar} columns={
                this._configurableTabs.filter((tab) => {
                    return tab.value === this.state.selectedTab
                })[0].columns
            } onCreate={this.handleCreateDoc} onDelete={this.handleDeleteDoc} onUpdate={this.handleUpdateDoc} />
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
                <Snackbar open={this.state.showStatus} autoHideDuration={6000}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onClose={() => this.setState({ showStatus: false })}
                    message={this.state.statusMessage}>
                </Snackbar>
            </React.Fragment >
        );
    }
} 