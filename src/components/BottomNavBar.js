import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { AssessmentOutlined, ReceiptOutlined, TuneOutlined } from '@material-ui/icons';

export default class BottomNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }
    render() {
        return (
            <BottomNavigation
                value={this.state.value}
                onChange={(event, newValue) => {
                    this.setState({
                        value: newValue
                    });
                }}
                showLabels
            >
                <BottomNavigationAction label="Dashboard" icon={<AssessmentOutlined />} />
                <BottomNavigationAction label="Transactions" icon={<ReceiptOutlined />} />
                <BottomNavigationAction label="Configure" icon={<TuneOutlined />} />
            </BottomNavigation>
        );
    }
}