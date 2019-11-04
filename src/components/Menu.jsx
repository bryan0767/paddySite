import React from 'react'
import { Row, Col, Button } from 'react-materialize'

import Nav from "./Nav"
import MenuSlider from "./MenuSlider"
import MenuItems from "./MenuItems"

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      main:[],
      items:[]
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this._isMounted = true;
    this.fetchData()
  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  fetchData = () => {
    fetch("api/get?id=7")
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        items: [...data.data]
      })
    })

    fetch("api/get?id=2")
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        main: [...data.data].filter(x => x.page == 2)
      })
    })
  }

  render() {
    return (
      <div>
        {this._isMounted ? (
        <div style={{ overflow:"auto" }}>
          <Nav />
          <MenuSlider data={this.state.main} />
          <MenuItems data={this.state.items}/>
        </div>
        ) : (<div>Not Loaded</div>)}
      </div>
    )
  }
}
