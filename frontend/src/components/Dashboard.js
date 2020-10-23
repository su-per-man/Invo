import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Grid, Box, Divider, Avatar, Typography, Card, CardActionArea, Collapse, Button } from "@material-ui/core"
import { green, red } from '@material-ui/core/colors'
import { CallMade, CallReceived, Comment, Extension, LocalOffer, ShoppingCart, Store } from '@material-ui/icons'

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
                                    <Grid container spacing={2}>
                                        <Grid item sm>
                                            <Button aria-label="Warehouse" startIcon={<Store />}>WAREHOUSE</Button>
                                        </Grid>
                                        <Grid item sm>
                                            <Button aria-label="Cost/Unit" startIcon={<LocalOffer />}>Cost/Unit</Button>
                                        </Grid>
                                        <Grid item sm>
                                            <Button aria-label="Total Units" startIcon={<ShoppingCart />}>Total Unit</Button>
                                        </Grid>
                                        <Grid item sm>
                                            <Button aria-label="Item" startIcon={<Extension />}>Item</Button>
                                        </Grid>
                                        <Grid item sm>
                                            Hey there!!Hey there!!Hey there!!Hey there!!Hey there!!
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Collapse>
                        </CardActionArea>
                    </Card>
                    <Divider variant="inset" component="li" />
                </List>
            </React.Fragment>
        );
    }
} 