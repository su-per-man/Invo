import React from 'react'
import CRUDTable from './CRUDTable'
import { AppBar, Tabs, Tab, Box } from "@material-ui/core"
import axios from 'axios'

export default class Configure extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedIndex: 0 }
    }

    componentDidMount() {
        axios.get('/warehouses/').then(resp => {
            console.log(resp.data)
        })
    }

    handleChange = (event, newValue) => {
        this.setState({
            selectedIndex: newValue
        })
    };

    render() {
        return (
            <React.Fragment>
                <h1>Configure</h1>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.selectedIndex}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Warehouse" />
                        <Tab label="Items" />
                        <Tab label="People" />
                    </Tabs>
                </AppBar>
                <Box component="span" m={1}>
                    <CRUDTable />
                </Box>
            </React.Fragment>
        );
    }
} 