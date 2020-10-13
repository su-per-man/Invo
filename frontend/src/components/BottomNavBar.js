import React from 'react';
import PropTypes from 'prop-types'
import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'

export default class BottomNavBar extends React.Component {
    static propTypes = {
        clickHandler: PropTypes.func,
        menuConfig: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }
    handleClick = (event, newValue) => {
        this.setState({
            value: newValue
        })
        this.props.clickHandler(newValue);
    };
    render() {
        const actn = [
            this.props.menuConfig.map(function (obj) {
                return <BottomNavigationAction label={obj.id} icon={<Icon className={obj.icon} />} />
            })
        ]
        return (
            <Paper>
                <BottomNavigation value={this.state.value} onChange={this.handleClick} showLabels>
                    {actn}
                </BottomNavigation>
            </Paper>
        );
    }
}