import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Grid, Box, Avatar, Typography, Card, CardActionArea, Collapse } from "@material-ui/core"
import { green, red } from '@material-ui/core/colors'
import { CallMade, CallReceived, Extension, LocalOffer, ShoppingCart, Store } from '@material-ui/icons'
import axios from 'axios'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            dyncamicCardExpand: {},
            fetchedRows: []
        }
    }
    handleClick = (id) => {
        let obj = this.state.dyncamicCardExpand
        obj[id] = !obj[id]
        this.setState({
            dyncamicCardExpand: obj,
        })
    }
    componentDidMount() {
        axios.get('/invo-api/transaction')
            .then(resp => this.setState({ fetchedRows: resp.data }))
    }
    render() {
        return (
            <React.Fragment>
                <h1>Dashboard</h1 >
                <List>
                    {
                        this.state.fetchedRows.map(t => {
                            return (
                                <Card>
                                    <CardActionArea onClick={this.handleClick.bind(this, t._id)}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                {t.TransactionType === "Buy" && <Avatar style={{ backgroundColor: green[500] }}> <CallReceived /> </Avatar>}
                                                {t.TransactionType === "Sell" && <Avatar style={{ backgroundColor: red[500] }}> <CallMade /> </Avatar>}
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <React.Fragment>
                                                    {t.Vendor}
                                                    <Typography component="span" variant="overline" color="textPrimary"> - Responsible</Typography>
                                                </React.Fragment>} secondary={
                                                    new Date(t.TransactionDate).toLocaleDateString('en-GB', {
                                                        year: 'numeric', month: 'short', day: 'numeric'
                                                    })
                                                } />
                                            <Box alignItems="right">
                                                <Typography variant="h6">₹ {t.CostPerUnit * t.TotalUnits}</Typography>
                                            </Box>
                                        </ListItem>
                                        <Collapse in={this.state.dyncamicCardExpand[t._id]} timeout="auto" unmountOnExit>
                                            <ListItem>
                                                <Grid container spacing={2}>
                                                    <Grid item sm>
                                                        <Grid container direction="row" alignItems="center" spacing={2} aria-label="Warehouse">
                                                            <Grid item><Store /></Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle2">{t.Warehouse}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item sm>
                                                        <Grid container direction="row" alignItems="center" spacing={2} aria-label="Cost/Unit">
                                                            <Grid item><LocalOffer /></Grid>
                                                            <Typography variant="subtitle2">₹ {t.CostPerUnit}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item sm>
                                                        <Grid container direction="row" alignItems="center" spacing={2} aria-label="Total Units">
                                                            <Grid item><ShoppingCart /></Grid>
                                                            <Typography variant="subtitle2">{t.TotalUnits + " " + t.Unit}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item sm>
                                                        <Grid container direction="row" alignItems="center" spacing={2} aria-label="Item">
                                                            <Grid item><Extension /></Grid>
                                                            <Typography variant="subtitle2">{t.Item}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item sm={12}>
                                                        <ListItemText secondary={t.description} />
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </Collapse>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    }
                </List>
            </React.Fragment >
        );
    }
} 