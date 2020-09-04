import React from 'react'
import CRUDTable from './CRUDTable'
import { AppBar, Tabs, Tab, Box, Snackbar } from "@material-ui/core"
import { Alert, Skeleton } from '@material-ui/lab'
import axios from 'axios'
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

    renderBody = () => {
        switch (this.state.warehouses) {
            case null:
                return <Skeleton />
            case 500:
                return <Box>
                    <Box justifyContent="center" display="flex">
                        <File size={200} mood="ko" color="#83D1FB" />
                    </Box>
                    <Alert severity="error" variant="outlined">Internal Server Down</Alert>
                </Box>
            default:
                return <CRUDTable rows={this.state.warehouses} />
        }
    }

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
                    {this.renderBody}
                </Box>
            </React.Fragment>
        );
    }
} 