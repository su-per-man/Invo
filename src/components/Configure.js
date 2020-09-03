import React from 'react'
import CRUDTable from './CRUDTable'
import { AppBar, Tabs, Tab, Box } from "@material-ui/core"
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'

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
                return <Skeleton count={10} height={50} />
            case 500:
                return alert(this.state.warehouses)
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