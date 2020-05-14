import React from 'react'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import styles from '../styles.scss'

import Home from './Home'
import Menu from './Menu'
import Footer from './Footer'

 export default class App extends React.Component {

  componentDidMount = () => {
    console.log(this.props.store.getState())
  }

  render() {
    return (
      <div className="Container">
        <BrowserRouter>
          <Switch>
            <Route exact path ="/" component={Home} store={this.props.store} />
            <Route path ="/menu" component={Menu} store={this.props.store} />
            <Route component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
