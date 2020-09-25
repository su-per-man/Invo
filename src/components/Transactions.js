import React from 'react';
import { Box, Button, ButtonGroup, Card, CardContent, TextField, FormControl, Select, Grid, MenuItem } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { Transactions_Form, DynamicForm } from '../SharedConstants'
import axios from 'axios'

export default class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedMode: "Buy"
        }
    }
    componentDidMount() {
        axios.get('/invo-api/transaction')
            .then(resp => {
                console.log(resp.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    generateDynamicForm() {
        let dt = new Date()
        let month = dt.getMonth() + 1
        let today = dt.getFullYear() + "-" + (month < 10 ? 0 : '') + month + "-" + dt.getDate()

        let breakPoint = 0
        let tempObj = []
        let generatedForm =
            Transactions_Form.map(field => {
                let rawObj = null
                switch (field.objectType) {
                    case DynamicForm.TextField:
                        rawObj = <TextField name={field.id} label={field.label} type={field.inputType} variant="outlined" margin="dense" autoComplete="off" fullWidth />
                        break;
                    case DynamicForm.DateField:
                        rawObj = <TextField name={field.id} label={field.label} variant="outlined" margin="dense" autoComplete="off"
                            type="date" defaultValue={today} InputLabelProps={{ shrink: true }} fullWidth />
                        break;
                    case DynamicForm.SelectField:
                        rawObj = <FormControl variant="outlined" size="small" margin="dense" fullWidth>
                            <Select name={field.id} value={(field.defaultValue === -1 ? -1 : -1)}
                            // onChange={handleChange}
                            >
                                <MenuItem value="-1" disabled><em>{field.label}</em></MenuItem>
                            </Select>
                        </FormControl>
                        break;
                    default:
                        return console.log("Error Object Type : " + field.objectType)
                }
                tempObj.push(<Grid item xs={12} sm={4}> {rawObj} </Grid>)
                breakPoint++
                if (breakPoint % 3 === 0 || breakPoint === Transactions_Form.length) {
                    let temp = <Grid container spacing={3}>{tempObj}</Grid>
                    tempObj = []
                    return temp
                }
                return null
            })
        return generatedForm
    }
    render() {
        return (
            <React.Fragment>
                <h1>Transactions</h1 >
                <Card>
                    <CardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            let fd = new FormData(e.target)
                            let obj = {}
                            fd.forEach((value, key) => { obj[key] = value });
                            console.log(obj)
                            axios.post("invo-api/create-transaction", obj).then(resp => console.log(resp.data))
                                .catch(e => console.log(e))
                        }}>
                            <Box display="flex" justifyContent="center">
                                <FormControl margin="dense">
                                    <ButtonGroup disableElevation color="primary">
                                        <Button variant={this.state.selectedMode === "Buy" ? "contained" : ""}
                                            onClick={() => this.setState({ selectedMode: "Buy" })}>Buy</Button>
                                        <Button variant={this.state.selectedMode === "Sell" ? "contained" : ""}
                                            onClick={() => this.setState({ selectedMode: "Sell" })}>Sell</Button>
                                    </ButtonGroup>
                                </FormControl>
                            </Box>
                            {this.generateDynamicForm()}
                            <Box display="flex" justifyContent="center">
                                <FormControl margin="dense">
                                    <Button type="submit" color="primary" variant="contained" startIcon={<Save />} disableElevation autoFocus>Save</Button>
                                </FormControl>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </React.Fragment >
        );
    }
} 