import React from 'react';
import { Button, ButtonGroup, Card, CardContent, TextField, FormControl, Select, Grid, MenuItem } from '@material-ui/core'

export default class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedMode: "Buy"
        }
    }
    render() {
        let dt = new Date()
        let month = dt.getMonth() + 1
        let today = dt.getFullYear() + "-" + (month < 10 ? 0 : '') + month + "-" + dt.getDate()

        return (
            <React.Fragment>
                <h1>Transactions</h1 >
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Transaction Date" variant="outlined" margin="dense" autoComplete="off"
                                    type="date" defaultValue={today} InputLabelProps={{ shrink: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl variant="outlined" size="small" margin="dense" fullWidth>
                                    <Select value="Mogra"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value="-1" disabled>Warehouse</MenuItem>
                                        <MenuItem value="Mogra">Mogra</MenuItem>
                                        <MenuItem value="Piece">Piece</MenuItem>
                                        <MenuItem value="Bundle">Bundle</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl variant="outlined" size="small" margin="dense" fullWidth>
                                    <Select
                                        value="-1"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value="-1" disabled>Buyer/Seller</MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Total Units" type="number" variant="outlined" margin="dense" autoComplete="off" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl variant="outlined" size="small" margin="dense" fullWidth>
                                    <Select
                                        value="KG"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value="-1" disabled>Unit</MenuItem>
                                        <MenuItem value="KG">KG</MenuItem>
                                        <MenuItem value="Piece">Piece</MenuItem>
                                        <MenuItem value="Bundle">Bundle</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Cost per Unit" type="number" variant="outlined" margin="dense" autoComplete="off" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <FormControl variant="outlined" size="small" margin="dense" fullWidth>
                                    <Select
                                        value="KG"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value="KG">KG</MenuItem>
                                        <MenuItem value="Piece">Piece</MenuItem>
                                        <MenuItem value="Bundle">Bundle</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl margin="dense">
                                    <ButtonGroup disableElevation color="primary">
                                        <Button variant={this.state.selectedMode === "Buy" ? "contained" : ""}
                                            onClick={() => this.setState({ selectedMode: "Buy" })}>Buy</Button>
                                        <Button variant={this.state.selectedMode === "Sell" ? "contained" : ""}
                                            onClick={() => this.setState({ selectedMode: "Sell" })}>Sell</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl margin="dense">
                                    <Button variant="contained" color="primary">Save</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </React.Fragment >
        );
    }
} 