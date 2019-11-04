import React from 'react'
import NavSideNav from './NavSideNav'
import {Button, Icon, Input} from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav:[],
      title:''
    }
  }

  componentDidMount() {
    fetch("api/get?id=1")
    .then(blob => blob.json())
    .then(data => {
      data.data.sort((x,y) => x.order < y.order ? 1 : -1)
      this.updateNav(data)
    })
  }

  updateNav = (data) => {
    this.setState({
      nav:[...data.data],
      title:data.title
    })
  }

  checkDisabled = (value) => {
    // if(value == 1) {
      return true
    // } else {
      // return false
    // }
  }

  handleChange = (e) => {
    // let nav = this.state.nav
    // nav.forEach(x => x.id == e.target.dataset.key ? x.icon = e.target.value : x.icon = x.icon)
    // if(e.target.dataset.key == "submitChange") {
    //   this.setState({nav: nav})
    //   fetch("api/update", {
    //     method:"PUT",
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       id:'1',
    //       data:this.state.nav
    //     })
    //   }).then(res => console.log(res))
    // <Button onClick={this.handleChange} data-key = "submitChange"></Button>
    // }
  }

  render() {
    return (
      <nav className="mainNav">
       <div className="nav-wrapper">
           <HashLink to ="/#main" smooth>
             <input className="brand-logo center mainLogo" placeholder={this.state.title} disabled = {this.checkDisabled()} />
           </HashLink>
         <ul id="nav-mobile">
           { this.state.nav.map(x => {
             return x.position == "left" ? (
               <input data-key={x.id} onChange={this.handleChange} key={x.icon} className="hide-on-small-only navInputs" placeholder={x.icon} disabled={this.checkDisabled()} />
             ) : ( x.hash ? (
                 <a href={x.hash} className="hide-on-small-only icons"><li key={x.icon} className={x.icon}></li></a>
               ) : ( <NavSideNav trig={<li key={x.icon} className={`${x.icon} burger`}></li> } />)
             )
           })}
         </ul>
       </div>
     </nav>
    );
  }
}
