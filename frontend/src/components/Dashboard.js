import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Grid, Box, Divider, Avatar, Typography, Card, CardActionArea, Collapse } from "@material-ui/core"
import { green, red } from '@material-ui/core/colors'
import { CallMade, CallReceived, Store } from '@material-ui/icons'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            dyncamicCardExpand: false
        }
    }
    handleClick = () => {
        this.setState({ dyncamicCardExpand: !this.state.dyncamicCardExpand })
    }
    render() {
        return (
            <React.Fragment>
                <h1>Dashboard</h1 >
                <List>
                    <Card elevation={0}>
                        <CardActionArea onClick={this.handleClick}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: green[500] }}> <CallReceived /> </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <React.Fragment>
                                        Vendor
                                <Typography component="span" variant="overline" color="textPrimary"> - Responsible</Typography>
                                    </React.Fragment>} secondary="September 14, 2016" />
                                <Box alignItems="right">
                                    <Typography variant="h6">₹ {500}</Typography>
                                </Box>
                            </ListItem>
                            <Collapse in={this.state.dyncamicCardExpand} timeout="auto" unmountOnExit>
                                <ListItem>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <ListItemText primary={<React.Fragment><Store /> Warehouse: </React.Fragment>} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <ListItemText primary={<React.Fragment><CallMade /> CPU: </React.Fragment>} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <ListItemText primary={<React.Fragment><CallMade /> Total Units: </React.Fragment>} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <ListItemText primary={<React.Fragment><CallMade /> Item: </React.Fragment>} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Collapse>
                        </CardActionArea>
                    </Card>
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