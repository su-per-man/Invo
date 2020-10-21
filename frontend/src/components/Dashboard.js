import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Box, Divider, Avatar, Typography } from "@material-ui/core"
import { green, red } from '@material-ui/core/colors'
import { CallMade, CallReceived } from '@material-ui/icons'

export default class Dashboard extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Dashboard</h1 >
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: green[500] }}> <CallReceived /> </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Suman Kumar" secondary="September 14, 2016" />
                        <Box alignItems="right">
                            <Typography variant="h6" color="red">₹ {500}</Typography>
                        </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: red[500] }}> <CallMade /> </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Suman Kumar" secondary="September 14, 2016" />
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
} 