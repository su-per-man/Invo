import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Grid, Box, Avatar, Typography, Card, CardActionArea, Collapse } from "@material-ui/core"
import { green, red } from '@material-ui/core/colors'
import { CallMade, CallReceived, Extension, LocalOffer, ShoppingCart, Store } from '@material-ui/icons'

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
                    <Card>
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
                                    <Grid container spacing={2}>
                                        <Grid item sm>
                                            <Grid container direction="row" alignItems="center" spacing={2} aria-label="Warehouse">
                                                <Grid item><Store /></Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle2">Hey</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm>
                                            <Grid container direction="row" alignItems="center" spacing={2} aria-label="Cost/Unit">
                                                <Grid item><LocalOffer /></Grid>
                                                <Typography variant="subtitle2">Hey</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm>
                                            <Grid container direction="row" alignItems="center" spacing={2} aria-label="Total Units">
                                                <Grid item><ShoppingCart /></Grid>
                                                <Typography variant="subtitle2">Hey</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm>
                                            <Grid container direction="row" alignItems="center" spacing={2} aria-label="Item">
                                                <Grid item><Extension /></Grid>
                                                <Typography variant="subtitle2">Hey</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <ListItemText secondary="Hey there! Hey there! Hey there!" />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Collapse>
                        </CardActionArea>
                    </Card>
                </List>
            </React.Fragment>
        );
    }
} 