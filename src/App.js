import React from 'react'
import PropTypes from 'prop-types'
import BottomNavBar from './components/BottomNavBar'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Configure from './components/Configure'
import { Grow, Container } from '@material-ui/core';
import temp from "./config/ConnectMongo";

const x = new temp()

const menuList = [
  { id: "Dashboard", icon: "fa fa-pie-chart", link: <Dashboard /> },
  { id: "Transactions", icon: "fa fa-exchange", link: <Transactions /> },
  { id: "Configure", icon: "fa fa-cogs", link: <Configure /> }
]
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedIndex: 0
    }
  }
  static propTypes = {
    menuConfig: PropTypes.array,
    clickHandler: PropTypes.func
  }
  changePage = (val) => {
    this.setState({
      clickedIndex: val
    })
  }
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="md">
          {
            menuList.map((obj, i) =>
              <Grow in={this.state.clickedIndex === i} style={{ transformOrigin: '0 0 0' }} unmountOnExit={true}>
                <div hidden={this.state.clickedIndex !== i}>
                  {obj.link}
                </div>
              </Grow>
            )
          }
        </Container>
        <div className="footer">
          <BottomNavBar menuConfig={menuList} clickHandler={this.changePage} />
        </div>
      </React.Fragment>
    );
  }
}