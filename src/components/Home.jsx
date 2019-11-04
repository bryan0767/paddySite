import React from 'react'
import Main from './Main.jsx'
import Specials from './Specials.jsx'
import Events from './Events.jsx'
import Form from './Form.jsx'
import Nav from './Nav'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Main page="1"/>
        <Specials />
        <Events />
        <Form />
      </div>
    )
  }
}
