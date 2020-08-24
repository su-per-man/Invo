import React from 'react'
import PropTypes from 'prop-types'
import BottomNavBar from './components/BottomNavBar'

const menuList = [
  { id: "Dashboard", icon: "fa fa-pie-chart" },
  { id: "Transactions", icon: "fa fa-exchange" },
  { id: "Configure", icon: "fa fa-cogs" }
]
export default class App extends React.Component {
  static propTypes = {
    menuConfig: PropTypes.array,
    clickHandler: PropTypes.func
  }
  changePage = (val) => {
    // alert(val);
  }
  render() {
    return (
      <div>
        <BottomNavBar menuConfig={menuList} clickHandler={this.changePage} />
      </div>
    );
  }
}