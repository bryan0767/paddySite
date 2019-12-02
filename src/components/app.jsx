import React from 'react'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import styles from '../styles.scss'

import Home from './Home'
import Menu from './Menu'
import Footer from './Footer'

export default class App extends React.Component {
  render() {
    return (
      <div className="Container">
        <BrowserRouter>
          <Switch>
            <Route exact path ="/" component={Home}/>
            <Route path ="/menu" component={Menu}/>
            <Route component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
